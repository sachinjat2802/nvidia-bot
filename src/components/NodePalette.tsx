'use client';

import { StepType } from '@/workflow';

interface NodePaletteProps {
    onAddNode: (type: StepType) => void;
}

const NODE_TYPES: { type: StepType; label: string; description: string; icon: string }[] = [
    { type: 'llm', label: 'LLM', description: 'Call NVIDIA AI models', icon: '🤖' },
    { type: 'http', label: 'HTTP', description: 'Make HTTP requests', icon: '🌐' },
    { type: 'code', label: 'Code', description: 'Execute JavaScript/TypeScript', icon: '💻' },
    { type: 'database', label: 'Database', description: 'Query databases (Postgres, MySQL, MongoDB)', icon: '🗄️' },
    { type: 'email', label: 'Email', description: 'Send emails via SMTP', icon: '📧' },
    { type: 'storage', label: 'Storage', description: 'Cloud storage (S3, GCS, Azure)', icon: '☁️' },
    { type: 'webhook', label: 'Webhook', description: 'Send webhooks', icon: '🔗' },
    { type: 'transform', label: 'Transform', description: 'Map, filter, sort data', icon: '⚡' },
    { type: 'conditional', label: 'Conditional', description: 'Branch execution', icon: '🔀' },
    { type: 'delay', label: 'Delay', description: 'Wait for specified time', icon: '⏱️' },
    { type: 'file', label: 'File', description: 'File system operations', icon: '📁' },
];

export default function NodePalette({ onAddNode }: NodePaletteProps) {
    return (
        <div className="p-4">
            <h2 className="text-lg font-bold text-text-primary mb-4">
                Node Palette
            </h2>
            
            <div className="space-y-2">
                {NODE_TYPES.map(({ type, label, description, icon }) => (
                    <button
                        key={type}
                        onClick={() => onAddNode(type)}
                        className="w-full p-3 bg-background border border-border rounded-lg hover:border-primary hover:shadow-[0_0_10px_rgba(0,229,255,0.3)] transition-all text-left group"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl group-hover:scale-110 transition-transform">
                                {icon}
                            </span>
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-text-primary text-sm">
                                    {label}
                                </div>
                                <div className="text-xs text-text-secondary truncate">
                                    {description}
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-6 p-3 bg-primary/10 border border-primary/30 rounded-lg">
                <div className="text-xs font-bold text-primary mb-1">
                    💡 Tip
                </div>
                <div className="text-xs text-text-secondary">
                    Drag nodes onto the canvas or click to add. Connect nodes by dragging from output to input handles.
                </div>
            </div>

            <div className="mt-4 p-3 bg-surface rounded-lg">
                <div className="text-xs font-semibold text-text-primary mb-2">
                    Quick Actions
                </div>
                <div className="space-y-1">
                    <button
                        onClick={() => onAddNode('llm')}
                        className="w-full text-left px-2 py-1 text-xs text-text-secondary hover:text-primary transition-colors"
                    >
                        + Add AI Processing
                    </button>
                    <button
                        onClick={() => onAddNode('http')}
                        className="w-full text-left px-2 py-1 text-xs text-text-secondary hover:text-primary transition-colors"
                    >
                        + Add API Call
                    </button>
                    <button
                        onClick={() => onAddNode('transform')}
                        className="w-full text-left px-2 py-1 text-xs text-text-secondary hover:text-primary transition-colors"
                    >
                        + Add Data Transform
                    </button>
                </div>
            </div>
        </div>
    );
}