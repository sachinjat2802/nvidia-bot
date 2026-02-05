'use client';

import { memo, useMemo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { WorkflowStep, StepType } from '@/workflow';

const NODE_COLORS: Record<StepType, { bg: string; border: string; text: string; icon: string }> = {
    llm: { 
        bg: 'bg-purple-500', 
        border: 'border-purple-600', 
        text: 'text-white',
        icon: '🤖'
    },
    code: { 
        bg: 'bg-blue-500', 
        border: 'border-blue-600', 
        text: 'text-white',
        icon: '💻'
    },
    conditional: { 
        bg: 'bg-yellow-500', 
        border: 'border-yellow-600', 
        text: 'text-black',
        icon: '🔀'
    },
    delay: { 
        bg: 'bg-gray-500', 
        border: 'border-gray-600', 
        text: 'text-white',
        icon: '⏱️'
    },
    http: { 
        bg: 'bg-green-500', 
        border: 'border-green-600', 
        text: 'text-white',
        icon: '🌐'
    },
    file: { 
        bg: 'bg-orange-500', 
        border: 'border-orange-600', 
        text: 'text-white',
        icon: '📁'
    },
    database: { 
        bg: 'bg-indigo-500', 
        border: 'border-indigo-600', 
        text: 'text-white',
        icon: '🗄️'
    },
    email: { 
        bg: 'bg-pink-500', 
        border: 'border-pink-600', 
        text: 'text-white',
        icon: '📧'
    },
    storage: { 
        bg: 'bg-cyan-500', 
        border: 'border-cyan-600', 
        text: 'text-white',
        icon: '☁️'
    },
    webhook: { 
        bg: 'bg-red-500', 
        border: 'border-red-600', 
        text: 'text-white',
        icon: '🔗'
    },
    transform: { 
        bg: 'bg-teal-500', 
        border: 'border-teal-600', 
        text: 'text-white',
        icon: '⚡'
    },
};

function WorkflowNode({ data, selected }: NodeProps) {
    const step = data.step as WorkflowStep;
    const colors = NODE_COLORS[step.type];
    
    const hasInput = step.type !== 'llm' && step.type !== 'http' && step.type !== 'webhook' && step.type !== 'delay';
    const hasOutput = step.type !== 'conditional' && step.type !== 'delay';

    return (
        <div 
            className={`
                min-w-[180px] max-w-[220px] rounded-lg border-2 shadow-lg transition-all
                ${colors.bg} ${colors.border} ${selected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
            `}
        >
            {/* Input Handle */}
            {hasInput && (
                <Handle
                    type="target"
                    position={Position.Left}
                    className="w-3 h-3 bg-white border-2 border-gray-800"
                />
            )}

            {/* Node Content */}
            <div className="p-3">
                <div className="flex items-start gap-2 mb-2">
                    <span className="text-xl">{colors.icon}</span>
                    <div className="flex-1 min-w-0">
                        <div className={`font-bold text-sm ${colors.text} truncate`}>
                            {step.name}
                        </div>
                        <div className={`text-xs ${colors.text} opacity-75 truncate`}>
                            {step.type}
                        </div>
                    </div>
                </div>
                
                {step.description && (
                    <div className={`text-xs ${colors.text} opacity-90 line-clamp-2 mt-1`}>
                        {step.description}
                    </div>
                )}

                {/* Show output mapping preview */}
                {step.outputMapping && Object.keys(step.outputMapping).length > 0 && (
                    <div className={`mt-2 text-xs ${colors.text} opacity-80`}>
                        <div className="font-semibold">Maps:</div>
                        {Object.entries(step.outputMapping).slice(0, 2).map(([key, path]) => (
                            <div key={key} className="truncate">
                                {key} ← {path}
                            </div>
                        ))}
                        {Object.keys(step.outputMapping).length > 2 && (
                            <div className="opacity-75">+{Object.keys(step.outputMapping).length - 2} more</div>
                        )}
                    </div>
                )}
            </div>

            {/* Output Handle */}
            {hasOutput && (
                <Handle
                    type="source"
                    position={Position.Right}
                    className="w-3 h-3 bg-white border-2 border-gray-800"
                />
            )}
        </div>
    );
}

export default memo(WorkflowNode);