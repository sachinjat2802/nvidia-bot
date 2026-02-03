import { NextRequest, NextResponse } from 'next/server';
import { ImageGenerationService } from '@/image-generation/ImageGenerationService';
import { loadConfig } from '@/config';

export async function POST(req: NextRequest) {
    try {
        const { prompt, width, height, steps, cfg_scale } = await req.json();
        const config = loadConfig();
        const imageService = new ImageGenerationService(config);

        const result = await imageService.generate({
            prompt,
            aspectRatio: '1:1', // Default
            width: width || 1024,
            height: height || 1024,
            format: 'png',
            batchSize: 1
        });

        if (result.success && result.images && result.images.length > 0) {
            return NextResponse.json({ dataUrl: result.images[0].url });
        } else {
            return NextResponse.json({ error: result.warnings?.[0] || 'Generation failed' }, { status: 500 });
        }
    } catch (error: any) {
        console.error('Image API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
