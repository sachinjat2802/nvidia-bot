'use client';

import { useState, useEffect } from 'react';
import { Zap, MessageSquare, Database, Image, Workflow, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { ChatPanel } from '@/components/ChatPanel';
import { RAGPanel } from '@/components/RAGPanel';
import { ImagePanel } from '@/components/ImagePanel';
import WorkflowEditor from '@/components/WorkflowEditor';
import { ThemeToggle } from '@/components/ThemeToggle';
import { WorkflowDefinition } from '@/workflow';
import { SupabaseWorkflowService } from '@/lib/supabase';
import UserMenu from '@/components/UserMenu';
import { useSession } from 'next-auth/react';

type TabType = 'chat' | 'rag' | 'image' | 'workflows';

interface Tab {
    id: TabType;
    label: string;
    icon: React.ReactNode;
}

const tabs: Tab[] = [
    { id: 'chat', label: 'Chat', icon: <MessageSquare size={18} /> },
    { id: 'rag', label: 'RAG & Embed', icon: <Database size={18} /> },
    { id: 'image', label: 'Image Gen', icon: <Image size={18} /> },
    { id: 'workflows', label: 'Workflows', icon: <Workflow size={18} /> },
];

export default function HomePage() {
    const { data: session, status } = useSession();
    const [activeTab, setActiveTab] = useState<TabType>('chat');
    const [workflows, setWorkflows] = useState<WorkflowDefinition[]>([]);
    const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowDefinition | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // Load Workflows
    const loadWorkflows = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/workflows');
            if (res.ok) {
                const data = await res.json();
                setWorkflows(data.workflows.map((w: any) => ({
                    ...w.definition,
                    id: w.id // Ensure ID from DB is attached
                })));
            }
        } catch (error: any) {
            console.error('Failed to load workflows:', error.message);
        } finally {
            setLoading(false);
        }
    };

    // Load on mount and tab change
    useEffect(() => {
        if (activeTab === 'workflows' && session?.user?.id) {
            loadWorkflows();
        }
    }, [activeTab, session]);

    // Show loading while checking auth
    if (status === 'loading') {
        return (
            <div className="h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-text-secondary">Loading...</p>
                </div>
            </div>
        );
    }

    // Redirect handled by middleware, but show message if no session
    if (!session) {
        return (
            <div className="h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <p className="text-text-secondary mb-4">Redirecting to login...</p>
                </div>
            </div>
        );
    }

    const handleSaveWorkflow = async (workflow: WorkflowDefinition) => {
        try {
            setMessage(null);

            let method = 'POST';
            let url = '/api/workflows';

            // If we have an ID, it's an update
            if (selectedWorkflow?.id) {
                method = 'PUT';
                url = `/api/workflows/${selectedWorkflow.id}`;
            }

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(workflow)
            });

            if (!response.ok) throw new Error(`Save failed: ${response.statusText}`);

            const result = await response.json();
            const savedWorkflow = {
                ...result.workflow.definition,
                id: result.workflow.id
            };

            if (method === 'POST') {
                setWorkflows(prev => [...prev, savedWorkflow]);
                setSelectedWorkflow(savedWorkflow);
            } else {
                setWorkflows(prev => prev.map(w => w.id === savedWorkflow.id ? savedWorkflow : w));
                // Update selected workflow too to keep UI in sync
                setSelectedWorkflow(savedWorkflow);
            }

            setMessage({ type: 'success', text: 'Workflow saved successfully!' });
        } catch (error: any) {
            setMessage({ type: 'error', text: `Failed to save workflow: ${error.message}` });
        }
    };

    const handleExecuteWorkflow = async (workflow: WorkflowDefinition) => {
        if (!workflow.id) {
            setMessage({ type: 'error', text: 'Please save the workflow before executing.' });
            return;
        }

        try {
            setMessage(null);
            const response = await fetch(`/api/workflows/${workflow.id}/execute`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input: {} }) // Add ability to pass input later
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Execution failed');
            }

            const result = await response.json();
            setMessage({ type: 'success', text: `Workflow executed! Execution ID: ${result.execution?.id}` });
        } catch (error: any) {
            setMessage({ type: 'error', text: `Failed to execute workflow: ${error.message}` });
        }
    };

    const handleSelectWorkflow = (workflow: WorkflowDefinition) => {
        setSelectedWorkflow(workflow);
    };

    const handleCreateNew = () => {
        setSelectedWorkflow(undefined);
    };

    return (
        <div className="h-screen flex flex-col bg-background">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between px-6 py-3 bg-surface border-b border-border">
                <div className="flex items-center gap-6">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <img src="/logo-m.png" alt="Moonu Bot" className="w-8 h-8 invert" />
                        <h1 className="text-lg font-bold text-primary font-heading tracking-tight">
                            Moonu Bot
                        </h1>
                    </div>

                    {/* Navigation Tabs */}
                    <nav className="flex items-center gap-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === tab.id
                                    ? 'text-primary bg-primary/10'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                                    }`}
                            >
                                {tab.icon}
                                <span className="hidden md:inline">{tab.label}</span>
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/30"
                                        initial={false}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-3">
                    {/* Theme Toggle */}
                    <ThemeToggle />

                    {/* Status Message */}
                    {message && (
                        <div className={`px-4 py-2 rounded-lg text-sm font-medium border ${message.type === 'success'
                            ? 'bg-green-500/10 text-green-400 border-green-500/30'
                            : 'bg-red-500/10 text-red-400 border-red-500/30'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    {/* User Menu */}
                    <UserMenu />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden">
                {activeTab === 'chat' && (
                    <ChatPanel />
                )}

                {activeTab === 'rag' && (
                    <RAGPanel />
                )}

                {activeTab === 'image' && (
                    <ImagePanel />
                )}

                {activeTab === 'workflows' && (
                    <WorkflowEditor
                        initialWorkflow={selectedWorkflow}
                        onSave={handleSaveWorkflow}
                        onExecute={handleExecuteWorkflow}
                    />
                )}
            </div>
        </div>
    );
}