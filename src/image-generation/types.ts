// Image Generation Types
// Comprehensive types for text-to-image, variations, editing, and outpainting

export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4' | '2:3' | '3:2' | 'custom';
export type ImageFormat = 'png' | 'jpg' | 'webp' | 'jpeg';
export type ImageStyle = 'photorealistic' | 'cinematic' | 'anime' | 'digital-art' | 'painting' | 'sketch' | '3d-render' | 'fantasy' | 'retro' | 'custom';
export type Lighting = 'natural' | 'studio' | 'dramatic' | 'soft' | 'neon' | 'sunset' | 'moonlight' | 'custom';
export type CameraAngle = 'front' | 'side' | 'above' | 'below' | 'wide' | 'close-up' | 'macro' | 'fish-eye' | 'custom';

export interface GenerationParams {
    // Core
    prompt: string;
    negativePrompt?: string;

    // Style & Aesthetics
    style?: ImageStyle | string;
    mood?: string; // e.g., "dark", "cheerful", "mysterious"
    lighting?: Lighting | string;
    cameraAngle?: CameraAngle | string;

    // Technical
    aspectRatio: AspectRatio;
    width?: number; // for custom aspect ratio
    height?: number; // for custom aspect ratio
    format: ImageFormat;
    quality?: number; // 1-100

    // Control
    seed?: number; // for deterministic generation
    styleLock?: boolean; // reuse style from previous image
    styleReferenceId?: string; // ID of image to lock style from

    // Reference images
    referenceImages?: ReferenceImage[];

    // Advanced
    referenceImage?: string; // base64 encoded image
    steps?: number; // generation steps (if supported)
    cfgScale?: number; // classifier-free guidance scale
    batchSize?: number; // number of images to generate (1-4)
}

export interface ReferenceImage {
    id: string; // stored image ID
    type: 'style' | 'composition' | 'content';
    weight?: number; // 0-1, influence strength
}

export interface ImageVariationParams {
    sourceImageId: string;
    count: number; // number of variations (1-4)
    preserveComposition: boolean;
    changeDetails: string[]; // what to change
    keepStyle: boolean;
    seed?: number; // for deterministic variations
}

export interface ImageEditParams {
    sourceImageId: string;
    editType: 'replace-background' | 'change-color' | 'remove-object' | 'add-object' | 'custom';
    region?: EditRegion; // mask/region to edit
    instructions: string; // what to change
    negativePrompt?: string;
    seed?: number;
}

export interface EditRegion {
    x: number; // 0-100 (percentage)
    y: number;
    width: number;
    height: number;
    mask?: string; // base64 mask image
}

export interface OutpaintParams {
    sourceImageId: string;
    direction: 'left' | 'right' | 'top' | 'bottom' | 'all';
    expandBy: number; // pixels or percentage
    prompt?: string; // guidance for expanded area
    negativePrompt?: string;
    seed?: number;
}

export interface PromptRefinementParams {
    originalPrompt: string;
    targetLength?: 'short' | 'medium' | 'long' | 'auto';
    enhanceStyle?: boolean;
    addDetails?: boolean;
    specifyLighting?: boolean;
    specifyCamera?: boolean;
    customInstructions?: string;
}

export interface GeneratedImage {
    id: string;
    url: string;
    localPath?: string;
    prompt: string;
    negativePrompt?: string;
    params: GenerationParams;
    seed: number;
    format: ImageFormat;
    width: number;
    height: number;
    createdAt: Date;
    metadata: {
        model?: string;
        generationTimeMs?: number;
        cost?: number;
        styleLockedFrom?: string; // parent image ID if style locked
    };
}

export interface ImageBatch {
    id: string;
    images: GeneratedImage[];
    prompt: string;
    params: GenerationParams;
    createdAt: Date;
}

export interface StylePreset {
    id: string;
    name: string;
    description?: string;
    params: Partial<GenerationParams>;
}

export interface ImageSession {
    id: string;
    userId?: string;
    images: GeneratedImage[];
    conversationContext: ConversationTurn[];
    createdAt: Date;
    updatedAt: Date;
}

export interface ConversationTurn {
    id: string;
    type: 'generate' | 'variation' | 'edit' | 'outpaint' | 'refine' | 'chat';
    timestamp: Date;
    userInput?: string;
    userInstruction?: string; // for edits: "make it darker"
    sourceImageId?: string; // if editing/varying
    resultImageId?: string;
    params?: GenerationParams | ImageEditParams | ImageVariationParams;
    promptUsed?: string; // final prompt sent to model
}

// API Response types
export interface GenerateResponse {
    success: boolean;
    images: GeneratedImage[];
    batchId?: string;
    promptUsed?: string; // refined/enhanced prompt
    warnings?: string[];
    cost?: number;
}

export interface VariationResponse {
    success: boolean;
    variations: GeneratedImage[];
    sourceImageId: string;
}

export interface EditResponse {
    success: boolean;
    editedImage: GeneratedImage;
    sourceImageId: string;
    editMask?: string; // base64 of mask used
}

export interface OutpaintResponse {
    success: boolean;
    outpaintedImage: GeneratedImage;
    sourceImageId: string;
    expandedDimensions: { width: number; height: number };
}

export interface RefineResponse {
    success: boolean;
    originalPrompt: string;
    refinedPrompt: string;
    suggestions?: string[];
}

// Cost tracking
export interface ImageCost {
    resolution: string;
    format: ImageFormat;
    costPerImage: number;
    estimatedTimeMs: number;
}
