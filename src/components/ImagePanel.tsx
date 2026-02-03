'use client';

import React, { useState } from 'react';
import { Download, Play, Image as ImageIcon, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const ImagePanel: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt.trim() || isGenerating) return;

        setIsGenerating(true);
        setGeneratedImage(null);

        try {
            const response = await fetch('/api/image/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });

            const data = await response.json();
            if (data.dataUrl) {
                setGeneratedImage(data.dataUrl);
            } else {
                throw new Error(data.error || 'Failed to generate image');
            }
        } catch (error) {
            console.error(error);
            alert('Error generating image. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="h-full flex flex-col md:flex-row p-6 gap-6">
            <div className="w-full md:w-[400px] flex flex-col gap-6">
                <div className="flex-1 flex flex-col gap-4">
                    <h3 className="font-heading text-primary text-xs uppercase tracking-widest">Image Prompt</h3>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe the image you want to create..."
                        className="flex-1 bg-surface border border-white/5 rounded-2xl p-4 text-text-primary resize-none focus:border-primary/30 outline-none transition-all"
                    />
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isGenerating}
                    className={`h-14 rounded-2xl font-heading text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${prompt.trim() && !isGenerating
                            ? 'bg-primary text-background shadow-glow'
                            : 'bg-white/5 text-text-muted cursor-not-allowed'
                        }`}
                >
                    {isGenerating ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <Play size={20} />
                    )}
                    {isGenerating ? 'Generating...' : 'Generate Image'}
                </button>
            </div>

            <div className="flex-1 flex flex-col gap-4">
                <h3 className="font-heading text-primary text-xs uppercase tracking-widest">Result</h3>
                <div className="flex-1 glass rounded-2xl overflow-hidden flex items-center justify-center relative group">
                    {generatedImage ? (
                        <>
                            <img src={generatedImage} alt="Generated" className="w-full h-full object-contain" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                <a
                                    href={generatedImage}
                                    download="generated-image.png"
                                    className="p-4 bg-primary text-background rounded-full hover:scale-110 transition-transform"
                                >
                                    <Download size={24} />
                                </a>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center gap-4 opacity-20">
                            <ImageIcon size={64} />
                            <p className="text-sm">Your creation will appear here</p>
                        </div>
                    )}

                    {isGenerating && (
                        <div className="absolute inset-0 bg-background/20 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                            <p className="text-primary font-heading text-xs tracking-widest uppercase animate-pulse">Refining Details...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
