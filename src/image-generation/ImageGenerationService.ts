import OpenAI from 'openai';
import {
    GenerationParams,
    GeneratedImage,
    ImageBatch,
    ImageVariationParams,
    ImageEditParams,
    OutpaintParams,
    PromptRefinementParams,
    RefineResponse,
    VariationResponse,
    EditResponse,
    OutpaintResponse,
    GenerateResponse,
    ImageFormat,
    AspectRatio
} from './types';
import { Config } from '../config';

// Cost estimates per image (in USD) - adjust based on actual provider pricing
const COST_TABLE: Record<string, number> = {
    '1:1': 0.02,
    '16:9': 0.025,
    '9:16': 0.025,
    '4:3': 0.022,
    '3:4': 0.022,
    'custom': 0.03,
};

export class ImageGenerationService {
    private client: OpenAI;
    private config: Config;
    private imageStorageDir: string;
    private generatedImages: Map<string, GeneratedImage> = new Map();
    private imageBatches: Map<string, ImageBatch> = new Map();

    constructor(config: Config, imageStorageDir?: string) {
        this.config = config;
        this.client = new OpenAI({
            apiKey: config.apiKey,
            baseURL: config.baseUrl,
        });
        this.imageStorageDir = imageStorageDir || './generated-images';
    }

    // Ensure storage directory exists
    async ensureStorageDir(): Promise<void> {
        const fs = await import('fs');
        const path = await import('path');
        const fullPath = path.resolve(this.imageStorageDir);
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
        }
    }

    // Generate unique ID
    private generateId(): string {
        return `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Calculate dimensions from aspect ratio
    private calculateDimensions(aspectRatio: AspectRatio, customWidth?: number, customHeight?: number): { width: number; height: number } {
        const baseSize = 1024; // Base dimension for 1:1

        switch (aspectRatio) {
            case '1:1':
                return { width: baseSize, height: baseSize };
            case '16:9':
                return { width: baseSize, height: Math.round(baseSize * 9 / 16) };
            case '9:16':
                return { width: Math.round(baseSize * 9 / 16), height: baseSize };
            case '4:3':
                return { width: baseSize, height: Math.round(baseSize * 3 / 4) };
            case '3:4':
                return { width: Math.round(baseSize * 3 / 4), height: baseSize };
            case '2:3':
                return { width: Math.round(baseSize * 2 / 3), height: baseSize };
            case '3:2':
                return { width: baseSize, height: Math.round(baseSize * 3 / 2) };
            case 'custom':
                return {
                    width: customWidth || baseSize,
                    height: customHeight || baseSize
                };
            default:
                return { width: baseSize, height: baseSize };
        }
    }

    // Map aspect ratio to FLUX format
    private mapAspectRatioToFlux(aspectRatio: AspectRatio): string {
        // FLUX uses specific aspect ratio strings
        switch (aspectRatio) {
            case '1:1':
                return '1:1';
            case '16:9':
                return '16:9';
            case '9:16':
                return '9:16';
            case '4:3':
                return '4:3';
            case '3:4':
                return '3:4';
            case '2:3':
                return '2:3';
            case '3:2':
                return '3:2';
            default:
                return '1:1';  // Default to square
        }
    }

    // Build enhanced prompt from parameters
    private buildPrompt(params: GenerationParams): string {
        let prompt = params.prompt;

        // Add style
        if (params.style && params.style !== 'custom') {
            prompt += `, ${params.style} style`;
        }

        // Add mood
        if (params.mood) {
            prompt += `, ${params.mood} mood`;
        }

        // Add lighting
        if (params.lighting && params.lighting !== 'custom') {
            prompt += `, ${params.lighting} lighting`;
        }

        // Add camera angle
        if (params.cameraAngle && params.cameraAngle !== 'custom') {
            prompt += `, ${params.cameraAngle} camera angle`;
        }

        return prompt;
    }

    // Refine/enhance a prompt using LLM
    async refinePrompt(params: PromptRefinementParams): Promise<RefineResponse> {
        const systemPrompt = `You are an expert at crafting detailed, effective image generation prompts.
Your task is to transform user prompts into rich, descriptive prompts that will produce high-quality images.
Include details about:
- Subject and composition
- Visual style (photorealistic, cinematic, anime, etc.)
- Lighting and atmosphere
- Camera angle and framing
- Colors and mood
- Technical quality terms (high resolution, detailed, sharp focus, etc.)

Do not add content that wasn't in the original prompt.
Keep the core intent exactly the same.`;

        const userPrompt = `Original prompt: "${params.originalPrompt}"

Please create an enhanced version. Target length: ${params.targetLength || 'medium'}.

${params.customInstructions ? `Additional instructions: ${params.customInstructions}` : ''}

Return ONLY the refined prompt, nothing else.`;

        try {
            const response = await this.client.chat.completions.create({
                model: this.config.defaultModel,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                max_tokens: 500,
                temperature: 0.7,
            });

            const refinedPrompt = response.choices[0]?.message?.content?.trim() || params.originalPrompt;

            // Generate suggestions
            const suggestions = [
                "Try adding lighting details: 'dramatic lighting', 'soft natural light'",
                "Specify camera angle: 'wide shot', 'close-up', 'low angle'",
                "Add style: 'cinematic', 'photorealistic', 'anime style'",
                "Include mood: 'mysterious', 'cheerful', 'melancholic'"
            ];

            return {
                success: true,
                originalPrompt: params.originalPrompt,
                refinedPrompt,
                suggestions
            };
        } catch (error: any) {
            console.error('Prompt refinement failed:', error);
            return {
                success: false,
                originalPrompt: params.originalPrompt,
                refinedPrompt: params.originalPrompt,
                suggestions: []
            };
        }
    }

    // Main generation method
    async generate(params: GenerationParams): Promise<GenerateResponse> {
        const startTime = Date.now();
        const imageIds: string[] = [];
        const images: GeneratedImage[] = [];
        const batchSize = params.batchSize || 1;

        // Ensure storage directory
        await this.ensureStorageDir();

        // Refine prompt if needed (auto-enhance)
        let finalPrompt = params.prompt;
        if (params.prompt.length < 20) {
            // Auto-refine short prompts
            const refined = await this.refinePrompt({
                originalPrompt: params.prompt,
                targetLength: 'medium'
            });
            if (refined.success) {
                finalPrompt = refined.refinedPrompt;
            }
        } else {
            finalPrompt = this.buildPrompt(params);
        }

        const dimensions = this.calculateDimensions(
            params.aspectRatio,
            params.width,
            params.height
        );

        try {
            // Use NVIDIA's Black Forest Labs FLUX Model
            // Model: black-forest-labs/flux.1-kontext-dev

            for (let i = 0; i < batchSize; i++) {
                const seed = params.seed || Math.floor(Math.random() * 1000000);

                try {
                    // NVIDIA FLUX.1-dev API (as requested by user)
                    const payload: any = {
                        prompt: finalPrompt,
                        mode: "base",
                        cfg_scale: 3.5,
                        width: dimensions.width,
                        height: dimensions.height,
                        seed: seed,
                        steps: 50
                    };

                    console.log('NVIDIA FLUX.1-dev API Request Payload:', JSON.stringify(payload, null, 2));

                    const apiKey = this.config.apiKey;
                    if (!apiKey) {
                        throw new Error('NVIDIA_API_KEY is not configured. Please set it in environment variables.');
                    }

                    const response = await fetch('https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.1-dev', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${apiKey}`,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });

                    if (!response.ok) {
                        const errBody = await response.text();
                        console.error('NVIDIA API Error Response:', errBody);
                        throw new Error(`NVIDIA API error: ${response.status} ${errBody}`);
                    }

                    const result = await response.json() as any;

                    // Extract base64 image from FLUX response
                    const imageB64 = result.image;
                    if (!imageB64) {
                        throw new Error('No image data in response');
                    }

                    // Ensure it has the correct prefix for a data URL if it doesn't already
                    const dataUrl = imageB64.startsWith('data:') ? imageB64 : `data:image/png;base64,${imageB64}`;

                    const imageId = this.generateId();

                    const generatedImage: GeneratedImage = {
                        id: imageId,
                        url: dataUrl, // Directly send base64 to frontend
                        prompt: params.prompt,
                        negativePrompt: params.negativePrompt,
                        params: { ...params },
                        seed,
                        format: params.format,
                        width: dimensions.width,
                        height: dimensions.height,
                        createdAt: new Date(),
                        metadata: {
                            model: 'black-forest-labs/flux.1-dev',
                            generationTimeMs: Date.now() - startTime,
                            cost: COST_TABLE[params.aspectRatio] || 0.02,
                        }
                    };

                    this.generatedImages.set(imageId, generatedImage);
                    imageIds.push(imageId);
                    images.push(generatedImage);

                } catch (apiError: any) {
                    console.error(`Image ${i + 1} generation failed:`, apiError);
                    // Don't create placeholder - return error instead
                    // If batchSize > 1, we could continue for other images, but for now fail the whole batch
                    throw apiError;
                }
            }

            // Create batch record
            const batchId = `batch_${Date.now()}`;
            const batch: ImageBatch = {
                id: batchId,
                images,
                prompt: params.prompt,
                params,
                createdAt: new Date()
            };
            this.imageBatches.set(batchId, batch);

            return {
                success: true,
                images,
                batchId,
                promptUsed: finalPrompt,
                cost: images.reduce((sum, img) => sum + (img.metadata.cost || 0), 0)
            };

        } catch (error: any) {
            console.error('Image generation failed:', error);
            return {
                success: false,
                images: [],
                promptUsed: finalPrompt,
                warnings: [error.message]
            };
        }
    }

    // Generate variations of an existing image
    async createVariations(params: ImageVariationParams): Promise<VariationResponse> {
        const sourceImage = this.generatedImages.get(params.sourceImageId);
        if (!sourceImage) {
            throw new Error(`Source image not found: ${params.sourceImageId}`);
        }

        const variations: GeneratedImage[] = [];

        // In production, this would call the image variation API
        // For now, we'll generate new images with similar prompt but slight modifications

        for (let i = 0; i < params.count; i++) {
            const variationParams: GenerationParams = {
                prompt: params.preserveComposition ? sourceImage.prompt : `${sourceImage.prompt} - variation ${i + 1}`,
                negativePrompt: sourceImage.negativePrompt,
                style: params.keepStyle ? sourceImage.params.style : undefined,
                aspectRatio: sourceImage.params.aspectRatio,
                format: sourceImage.format,
                width: sourceImage.width,
                height: sourceImage.height,
                seed: params.seed ? params.seed + i : undefined,
                batchSize: 1,
            };

            // Apply detail changes
            if (params.changeDetails && params.changeDetails.length > 0) {
                variationParams.prompt += `, ${params.changeDetails.join(', ')}`;
            }

            const result = await this.generate(variationParams);
            if (result.success && result.images.length > 0) {
                variations.push(result.images[0]);
            }
        }

        return {
            success: true,
            variations,
            sourceImageId: params.sourceImageId
        };
    }

    // Edit specific region of an image (inpainting)
    async editImage(params: ImageEditParams): Promise<EditResponse> {
        const sourceImage = this.generatedImages.get(params.sourceImageId);
        if (!sourceImage) {
            throw new Error(`Source image not found: ${params.sourceImageId}`);
        }

        // In production, this would send mask + edit instructions to the API
        // For now, we'll generate a new image with modified prompt

        let editPrompt = sourceImage.prompt;
        if (params.editType === 'replace-background') {
            editPrompt = `New background: ${params.instructions}. Original subject: ${sourceImage.prompt}`;
        } else if (params.editType === 'change-color') {
            editPrompt = `${sourceImage.prompt}, color changed: ${params.instructions}`;
        } else if (params.editType === 'remove-object') {
            editPrompt = `${sourceImage.prompt}, without ${params.instructions}`;
        } else if (params.editType === 'add-object') {
            editPrompt = `${sourceImage.prompt}, with ${params.instructions}`;
        } else {
            editPrompt = `${sourceImage.prompt}. Edit: ${params.instructions}`;
        }

        const generateParams: GenerationParams = {
            prompt: editPrompt,
            negativePrompt: params.negativePrompt || sourceImage.negativePrompt,
            style: sourceImage.params.style,
            aspectRatio: sourceImage.params.aspectRatio,
            format: sourceImage.format,
            width: sourceImage.width,
            height: sourceImage.height,
            seed: params.seed,
            batchSize: 1,
        };

        const result = await this.generate(generateParams);

        if (!result.success || result.images.length === 0) {
            throw new Error('Edit generation failed');
        }

        const editedImage = result.images[0];
        editedImage.metadata.styleLockedFrom = params.sourceImageId;

        return {
            success: true,
            editedImage,
            sourceImageId: params.sourceImageId,
            editMask: params.region?.mask
        };
    }

    // Outpaint (extend image beyond borders)
    async outpaint(params: OutpaintParams): Promise<OutpaintResponse> {
        const sourceImage = this.generatedImages.get(params.sourceImageId);
        if (!sourceImage) {
            throw new Error(`Source image not found: ${params.sourceImageId}`);
        }

        // Calculate new dimensions
        let newWidth = sourceImage.width;
        let newHeight = sourceImage.height;
        const expandPx = params.expandBy;

        switch (params.direction) {
            case 'left':
                newWidth += expandPx;
                break;
            case 'right':
                newWidth += expandPx;
                break;
            case 'top':
                newHeight += expandPx;
                break;
            case 'bottom':
                newHeight += expandPx;
                break;
            case 'all':
                newWidth += expandPx * 2;
                newHeight += expandPx * 2;
                break;
        }

        // In production, this would send the original image + expansion params to the API
        // For now, generate a new image with expanded dimensions

        const generateParams: GenerationParams = {
            prompt: params.prompt
                ? `${params.prompt} (extended from original)`
                : `${sourceImage.prompt} (extended to ${newWidth}x${newHeight})`,
            negativePrompt: params.negativePrompt,
            style: sourceImage.params.style,
            aspectRatio: 'custom',
            width: newWidth,
            height: newHeight,
            format: sourceImage.format,
            seed: params.seed,
            batchSize: 1,
        };

        const result = await this.generate(generateParams);

        if (!result.success || result.images.length === 0) {
            throw new Error('Outpaint generation failed');
        }

        const outpaintedImage = result.images[0];
        outpaintedImage.metadata.styleLockedFrom = params.sourceImageId;

        return {
            success: true,
            outpaintedImage,
            sourceImageId: params.sourceImageId,
            expandedDimensions: { width: newWidth, height: newHeight }
        };
    }

    // Get image by ID
    getImage(id: string): GeneratedImage | undefined {
        return this.generatedImages.get(id);
    }

    // List all generated images
    listImages(): GeneratedImage[] {
        return Array.from(this.generatedImages.values());
    }

    // Delete an image
    deleteImage(id: string): boolean {
        const image = this.generatedImages.get(id);
        if (image) {
            if (image.localPath) {
                const fs = require('fs');
                if (fs.existsSync(image.localPath)) {
                    fs.unlinkSync(image.localPath);
                }
            }
            this.generatedImages.delete(id);
            return true;
        }
        return false;
    }

    // Get batch by ID
    getBatch(batchId: string): ImageBatch | undefined {
        return this.imageBatches.get(batchId);
    }

    // Clear all images (for cleanup)
    clearAll(): void {
        const fs = require('fs');
        this.generatedImages.forEach(image => {
            if (image.localPath && fs.existsSync(image.localPath)) {
                fs.unlinkSync(image.localPath);
            }
        });
        this.generatedImages.clear();
        this.imageBatches.clear();
    }
}

