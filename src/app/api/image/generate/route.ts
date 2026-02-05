import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { loadConfig } from '@/config';
import { authOptions } from '@/lib/auth-options';
import { validate, ImageGenSchema, formatValidationErrors } from '@/lib/validation';
import { ImageGenerationService } from '@/image-generation/ImageGenerationService';
import { AspectRatio, ImageFormat } from '@/image-generation/types';

// POST /api/image/generate - Generate image with NVIDIA
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();

        // Validate request
        const { data, errors } = validate(ImageGenSchema, body);
        if (errors || !data) {
            return NextResponse.json(
                { error: 'Validation failed', details: errors ? formatValidationErrors(errors) : 'Invalid data' },
                { status: 400 }
            );
        }

        const { prompt, style = 'cyberpunk', negative_prompt, width, height } = data;

        const config = loadConfig();
        const imageService = new ImageGenerationService(config);

        // Determine aspect ratio based on width/height or default to 1:1
        let aspectRatio: AspectRatio = '1:1';
        if (width && height) {
            // Calculate closest standard aspect ratio
            const ratio = width / height;
            const ratios: [AspectRatio, number][] = [
                ['1:1', 1],
                ['16:9', 16/9],
                ['9:16', 9/16],
                ['4:3', 4/3],
                ['3:4', 3/4],
            ];
            let minDiff = Infinity;
            for (const [ar, r] of ratios) {
                const diff = Math.abs(ratio - r);
                if (diff < minDiff) {
                    minDiff = diff;
                    aspectRatio = ar;
                }
            }
        }

        const result = await imageService.generate({
            prompt,
            negativePrompt: negative_prompt,
            style,
            aspectRatio,
            format: 'png' as ImageFormat,
            width: width,
            height: height,
            batchSize: 1,
        });

        if (!result.success || result.images.length === 0) {
            throw new Error(result.warnings?.[0] || 'Image generation failed');
        }

        const generatedImage = result.images[0];

        return NextResponse.json({
            success: true,
            image: generatedImage.url,
            seed: generatedImage.seed,
            promptUsed: result.promptUsed,
            cost: result.cost
        });
    } catch (error: any) {
        console.error('Image generation error:', error);
        return NextResponse.json({ error: error.message || 'Failed to generate image' }, { status: 500 });
    }
}