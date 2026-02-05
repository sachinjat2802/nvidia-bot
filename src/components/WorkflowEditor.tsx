'use client';

import { useCallback, useState, useEffect, useRef } from 'react';
import ReactFlow, {
    Node,
    Edge,
    addEdge,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    Connection,
    NodeTypes,
    MarkerType,
    ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';

import WorkflowNode from './WorkflowNode';
import NodePalette from './NodePalette';
import PropertiesPanel from './PropertiesPanel';
import { WorkflowDefinition, WorkflowStep, StepType } from '@/workflow';
import { PanelLeftClose, PanelRightClose, PanelLeft, PanelRight, Maximize, Minimize } from 'lucide-react';
import { validate, WorkflowSchema, formatValidationErrors } from '@/lib/validation';

const nodeTypes: NodeTypes = {
    workflowNode: WorkflowNode,
};

interface WorkflowEditorProps {
    initialWorkflow?: WorkflowDefinition;
    onSave: (workflow: WorkflowDefinition) => Promise<void>;
    onExecute?: (workflow: WorkflowDefinition) => Promise<void>;
}

const NODE_COLORS: Record<StepType, string> = {
    llm: 'rgb(147, 51, 234)',
    code: 'rgb(59, 130, 246)',
    conditional: 'rgb(234, 179, 8)',
    delay: 'rgb(107, 114, 128)',
    http: 'rgb(34, 197, 94)',
    file: 'rgb(249, 115, 22)',
    database: 'rgb(99, 102, 241)',
    email: 'rgb(236, 72, 153)',
    storage: 'rgb(6, 182, 212)',
    webhook: 'rgb(239, 68, 68)',
    transform: 'rgb(20, 184, 166)',
};

export default function WorkflowEditor({ initialWorkflow, onSave, onExecute }: WorkflowEditorProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [workflowName, setWorkflowName] = useState(initialWorkflow?.name || 'New Workflow');
    const [workflowDescription, setWorkflowDescription] = useState(initialWorkflow?.description || '');
    const [workflowTags, setWorkflowTags] = useState(initialWorkflow?.tags?.join(', ') || '');
    const [saving, setSaving] = useState(false);
    const [executing, setExecuting] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [leftPanelOpen, setLeftPanelOpen] = useState(true);
    const [rightPanelOpen, setRightPanelOpen] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

    // Detect screen size breakpoints
    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Fit view when nodes/edges change
    useEffect(() => {
        if (reactFlowInstance.current && nodes.length > 0) {
            const timeout = setTimeout(() => {
                reactFlowInstance.current?.fitView({
                    padding: 0.2,
                    includeHiddenNodes: false,
                    duration: 300
                });
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [nodes.length, edges.length]);

    // Load initial workflow
    useEffect(() => {
        if (initialWorkflow) {
            const flowNodes: Node[] = initialWorkflow.steps.map((step, index) => ({
                id: step.id,
                type: 'workflowNode',
                position: { x: 100 + (index % 3) * 250, y: 100 + Math.floor(index / 3) * 150 },
                data: {
                    step: {
                        ...step,
                        // Ensure all step configs have proper defaults
                        llmConfig: step.llmConfig || { model: '', content: '' },
                        codeConfig: step.codeConfig || { code: '' },
                        conditionalConfig: step.conditionalConfig || { condition: '' },
                        delayConfig: step.delayConfig || { milliseconds: 1000 },
                        httpConfig: step.httpConfig || { url: '', method: 'GET' },
                        fileConfig: step.fileConfig || { operation: 'read', path: '' },
                        databaseConfig: step.databaseConfig || { operation: 'query' },
                        emailConfig: step.emailConfig || { to: '', subject: '', body: '' },
                        storageConfig: step.storageConfig || { provider: 's3', operation: 'upload' },
                        webhookConfig: step.webhookConfig || { url: '', method: 'POST' },
                        transformConfig: step.transformConfig || { mapping: [] },
                    },
                    onSelect: () => setSelectedNode({
                        id: step.id,
                        type: 'workflowNode',
                        position: { x: 0, y: 0 },
                        data: { step: step as WorkflowStep }
                    } as Node),
                },
            }));

            const flowEdges: Edge[] = [];
            initialWorkflow.steps.forEach((step) => {
                if (step.dependsOn) {
                    step.dependsOn.forEach((depId) => {
                        flowEdges.push({
                            id: `${depId}-${step.id}`,
                            source: depId,
                            target: step.id,
                            type: 'smoothstep',
                            markerEnd: { type: MarkerType.ArrowClosed },
                        });
                    });
                }
            });

            setNodes(flowNodes);
            setEdges(flowEdges);
            setWorkflowName(initialWorkflow.name);
            setWorkflowDescription(initialWorkflow.description || '');
            setWorkflowTags(initialWorkflow.tags?.join(', ') || '');
        }
    }, [initialWorkflow, setNodes, setEdges]);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge({
            ...params,
            type: 'smoothstep',
            markerEnd: { type: MarkerType.ArrowClosed },
        }, eds)),
        [setEdges]
    );

    const onPaneClick = useCallback(() => {
        setSelectedNode(null);
    }, []);

    const onInit = useCallback((instance: ReactFlowInstance) => {
        reactFlowInstance.current = instance;
    }, []);

    const handleAddNode = (type: StepType) => {
        const id = `${type}_${Date.now()}`;
        const newNode: Node = {
            id,
            type: 'workflowNode',
            position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
            data: {
                step: {
                    id,
                    type,
                    name: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`,
                    description: '',
                    outputMapping: {},
                } as WorkflowStep,
                onSelect: () => setSelectedNode({
                    id,
                    type: 'workflowNode',
                    position: { x: 0, y: 0 },
                    data: {
                        step: {
                            id,
                            type,
                            name: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`
                        } as WorkflowStep
                    }
                } as Node),
            },
        };
        setNodes((nds) => nds.concat(newNode));
        setSelectedNode(newNode);
    };

    const handleUpdateNode = (step: WorkflowStep) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === step.id) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            step,
                        },
                    };
                }
                return node;
            })
        );
    };

    const handleDeleteNode = (nodeId: string) => {
        setNodes((nds) => nds.filter((node) => node.id !== nodeId));
        setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
        setSelectedNode(null);
    };

    const buildWorkflowDefinition = useCallback((): WorkflowDefinition => {
        const steps: WorkflowStep[] = nodes.map((node) => {
            const step = (node.data as any).step as WorkflowStep;
            const dependsOn = edges
                .filter((edge) => edge.target === node.id)
                .map((edge) => edge.source);

            return {
                ...step,
                dependsOn: dependsOn.length > 0 ? dependsOn : undefined,
            };
        });

        return {
            name: workflowName,
            description: workflowDescription,
            version: '1.0.0',
            steps,
            globalContext: {},
            retryPolicy: {
                maxRetries: 3,
                backoffMs: 1000,
            },
            timeoutMs: 300000,
            concurrency: 1,
            tags: workflowTags.split(',').map((t) => t.trim()).filter(Boolean),
        };
    }, [nodes, edges, workflowName, workflowDescription, workflowTags]);

    const handleSave = useCallback(async () => {
        try {
            setSaving(true);
            setValidationError(null);

            const workflow = buildWorkflowDefinition();

            // Validate workflow before saving
            const validation = validate(WorkflowSchema, workflow);
            if (validation.errors) {
                const formattedErrors = formatValidationErrors(validation.errors);
                const firstError = Object.values(formattedErrors)[0];
                setValidationError(firstError || 'Invalid workflow configuration');
                return;
            }

            await onSave(workflow);
        } finally {
            setSaving(false);
        }
    }, [buildWorkflowDefinition, onSave]);

    const handleExecute = useCallback(async () => {
        try {
            setExecuting(true);
            setValidationError(null);

            const workflow = buildWorkflowDefinition();

            // Validate workflow before executing
            const validation = validate(WorkflowSchema, workflow);
            if (validation.errors) {
                const formattedErrors = formatValidationErrors(validation.errors);
                const firstError = Object.values(formattedErrors)[0];
                setValidationError(firstError || 'Invalid workflow configuration');
                return;
            }

            if (onExecute) {
                await onExecute(workflow);
            }
        } finally {
            setExecuting(false);
        }
    }, [buildWorkflowDefinition, onExecute]);

    const handleFitView = useCallback(() => {
        reactFlowInstance.current?.fitView({
            padding: 0.2,
            includeHiddenNodes: false,
            duration: 300
        });
    }, []);

    const handleToggleFullscreen = useCallback(() => {
        setIsFullscreen(!isFullscreen);
    }, [isFullscreen]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 's') {
                e.preventDefault();
                handleSave();
            }
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                e.preventDefault();
                handleExecute();
            }
            if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
                e.preventDefault();
                handleFitView();
            }
            if (e.key === 'Escape' && selectedNode) {
                setSelectedNode(null);
            }
            if (e.key === 'Delete' && selectedNode) {
                handleDeleteNode(selectedNode.id);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedNode, handleSave, handleExecute, handleFitView, handleDeleteNode]);

    const selectedStep = selectedNode ? (selectedNode.data as any).step as WorkflowStep : null;

    // Mobile layout
    if (isMobile) {
        return (
            <div className="h-[100dvh] flex flex-col bg-background overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-3 py-2 bg-surface border-b border-border shrink-0 gap-2">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                        <input
                            type="text"
                            value={workflowName}
                            onChange={(e) => setWorkflowName(e.target.value)}
                            className="text-base font-bold bg-transparent border-none outline-none text-primary placeholder-text-muted truncate w-full"
                            placeholder="Workflow Name"
                        />
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-2.5 py-1.5 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs whitespace-nowrap"
                            title="Save (Ctrl+S)"
                        >
                            {saving ? '...' : 'Save'}
                        </button>
                        {onExecute && (
                            <button
                                onClick={handleExecute}
                                disabled={executing}
                                className="px-2.5 py-1.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs whitespace-nowrap"
                                title="Execute (Ctrl+Enter)"
                            >
                                {executing ? '...' : 'Run'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Validation Error Display */}
                {validationError && (
                    <div className="px-3 py-2 bg-red-500/10 border-b border-red-500/30 text-red-500 text-xs">
                        {validationError}
                    </div>
                )}

                {/* Mobile Panel Toggles */}
                <div className="flex items-center justify-around py-1.5 bg-surface border-b border-border shrink-0">
                    <button
                        onClick={() => setLeftPanelOpen(!leftPanelOpen)}
                        className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-text-secondary hover:text-text-primary"
                        title={leftPanelOpen ? 'Hide nodes panel' : 'Show nodes panel'}
                    >
                        {leftPanelOpen ? <PanelLeftClose size={14} /> : <PanelLeft size={14} />}
                        <span className="truncate">Nodes</span>
                    </button>
                    <button
                        onClick={() => setRightPanelOpen(!rightPanelOpen)}
                        className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-text-secondary hover:text-text-primary"
                        title={rightPanelOpen ? 'Hide properties' : 'Show properties'}
                    >
                        {rightPanelOpen ? <PanelRightClose size={14} /> : <PanelRight size={14} />}
                        <span className="truncate">Properties</span>
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex overflow-hidden relative min-h-0">
                    {/* Left Palette - Toggleable */}
                    <div className={`${leftPanelOpen ? 'w-56' : 'w-9'} bg-surface border-r border-border overflow-hidden transition-all duration-300 ease-in-out shrink-0 flex flex-col`}>
                        {leftPanelOpen ? (
                            <div className="h-full overflow-y-auto overflow-x-hidden">
                                <NodePalette onAddNode={handleAddNode} />
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center">
                                <button
                                    onClick={() => setLeftPanelOpen(true)}
                                    className="p-1.5 hover:bg-surface-hover rounded"
                                    title="Open node palette"
                                >
                                    <PanelLeft size={18} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Main Canvas - Always visible */}
                    <div className="flex-1 relative min-w-0" ref={reactFlowWrapper} onClick={onPaneClick}>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            onNodeDragStop={() => { }}
                            nodeTypes={nodeTypes}
                            fitView
                            onInit={onInit}
                            style={{ width: '100%', height: '100%' }}
                            proOptions={{ hideAttribution: true }}
                        >
                            <Background color="#374151" gap={16} />
                            <Controls />
                            <MiniMap
                                nodeColor={(node) => {
                                    const stepType = (node.data as any).step?.type as StepType;
                                    return NODE_COLORS[stepType] || '#6b7280';
                                }}
                                maskColor="rgba(0, 0, 0, 0.6)"
                            />
                        </ReactFlow>
                    </div>

                    {/* Right Properties Panel - Toggleable */}
                    <div className={`${rightPanelOpen ? 'w-64' : 'w-9'} bg-surface border-l border-border overflow-hidden transition-all duration-300 ease-in-out shrink-0 flex flex-col`}>
                        {rightPanelOpen ? (
                            <div className="h-full overflow-y-auto overflow-x-hidden">
                                <PropertiesPanel
                                    step={selectedStep}
                                    onUpdate={handleUpdateNode}
                                    onDelete={handleDeleteNode}
                                />
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center">
                                <button
                                    onClick={() => setRightPanelOpen(true)}
                                    className="p-1.5 hover:bg-surface-hover rounded"
                                    title="Open properties"
                                >
                                    <PanelRight size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Desktop layout
    return (
        <div className="h-[100dvh] flex flex-col bg-background overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-surface border-b border-border shrink-0">
                <div className="flex items-center gap-4 min-w-0">
                    <input
                        type="text"
                        value={workflowName}
                        onChange={(e) => setWorkflowName(e.target.value)}
                        className="text-xl font-bold bg-transparent border-none outline-none text-primary placeholder-text-muted truncate"
                        placeholder="Workflow Name"
                    />
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-4 py-2 bg-primary text-[var(--text-on-primary)] font-bold rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        title="Save (Ctrl+S)"
                    >
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                    {onExecute && (
                        <button
                            onClick={handleExecute}
                            disabled={executing}
                            className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            title="Execute (Ctrl+Enter)"
                        >
                            {executing ? 'Running...' : 'Execute'}
                        </button>
                    )}
                    <button
                        onClick={handleFitView}
                        className="px-3 py-2 bg-surface-hover text-text-primary rounded-lg hover:bg-surface-border transition-all"
                        title="Fit view (Ctrl+F)"
                    >
                        <Maximize size={18} />
                    </button>
                    <button
                        onClick={handleToggleFullscreen}
                        className="px-3 py-2 bg-surface-hover text-text-primary rounded-lg hover:bg-surface-border transition-all"
                        title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                    >
                        {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                    </button>
                </div>
            </div>

            {/* Validation Error Display */}
            {validationError && (
                <div className="px-6 py-3 bg-red-500/10 border-b border-red-500/30 text-red-500 text-sm">
                    {validationError}
                </div>
            )}

            <div className="flex-1 flex overflow-hidden min-h-0">
                {/* Left Palette - Toggleable */}
                <div className={`${leftPanelOpen && !isFullscreen ? 'w-64' : 'w-0'} bg-surface border-r border-border overflow-hidden flex flex-col shrink-0 transition-all duration-300`}>
                    <div className="flex-1 overflow-y-auto overflow-x-hidden">
                        {leftPanelOpen && !isFullscreen && <NodePalette onAddNode={handleAddNode} />}
                    </div>
                </div>

                {/* Main Canvas */}
                <div className={`flex-1 relative min-w-0 ${isFullscreen ? '' : ''}`} ref={reactFlowWrapper} onClick={onPaneClick}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onNodeDragStop={() => { }}
                        nodeTypes={nodeTypes}
                        fitView
                        onInit={onInit}
                        style={{ width: '100%', height: '100%' }}
                        proOptions={{ hideAttribution: true }}
                    >
                        <Background color="#374151" gap={16} />
                        <Controls />
                        <MiniMap
                            nodeColor={(node) => {
                                const stepType = (node.data as any).step?.type as StepType;
                                return NODE_COLORS[stepType] || '#6b7280';
                            }}
                            maskColor="rgba(0, 0, 0, 0.6)"
                        />
                    </ReactFlow>
                </div>

                {/* Right Properties Panel - Toggleable */}
                <div className={`${rightPanelOpen && !isFullscreen ? 'w-80' : 'w-0'} bg-surface border-l border-border overflow-hidden flex flex-col shrink-0 transition-all duration-300`}>
                    <div className="flex-1 overflow-y-auto overflow-x-hidden">
                        {rightPanelOpen && !isFullscreen && (
                            <PropertiesPanel
                                step={selectedStep}
                                onUpdate={handleUpdateNode}
                                onDelete={handleDeleteNode}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}