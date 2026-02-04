'use client';

import React, { useState } from 'react';
import {
    MessageSquare,
    Workflow,
    BookOpen,
    Image as ImageIcon,
    Menu,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { ChatPanel } from '@/components/ChatPanel';
import { ThemeToggle } from '@/components/ThemeToggle';

const WorkflowsPanel = () => <div className="p-8 h-full flex items-center justify-center text-text-muted italic opacity-50">Workflows Interface Integration in progress...</div>;
const RAGPanel = () => <div className="p-8 h-full flex items-center justify-center text-text-muted italic opacity-50">RAG Interface Integration in progress...</div>;
const ImagePanel = () => <div className="p-8 h-full flex items-center justify-center text-text-muted italic opacity-50">Image Interface Integration in progress...</div>;

type TabId = 'chat' | 'workflows' | 'rag' | 'image';

export default function Home() {
    const [activeTab, setActiveTab] = useState<TabId>('chat');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const tabs = [
        { id: 'chat', label: 'Chat', icon: <MessageSquare size={18} /> },
        { id: 'workflows', label: 'Workflows', icon: <Workflow size={18} /> },
        { id: 'rag', label: 'RAG', icon: <BookOpen size={18} /> },
        { id: 'image', label: 'Image', icon: <ImageIcon size={18} /> },
    ];

    return (
        <div className="flex flex-col h-screen bg-background text-text-primary overflow-hidden font-sans transition-colors duration-300">
            {/* Header */}
            <header className="h-[70px] border-b border-border flex items-center justify-between px-8 bg-background/80 backdrop-blur-xl z-50">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center group overflow-hidden relative">
                        <img
                            src="/logo-m.png"
                            alt="Moonu Bot Logo"
                            className="w-full h-full object-contain relative z-10 brightness-110 contrast-125"
                            style={{ filter: 'invert(1) hue-rotate(180deg) brightness(1.5)' }}
                        />
                    </div>
                    <div>
                        <h1 className="font-heading font-black text-2xl tracking-[0.1em] text-text-primary glow-text uppercase leading-none">
                            Moonu Bot
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-4 md:gap-6">
                    <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-full">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-glow" />
                        <span className="text-[11px] font-heading font-bold tracking-widest text-text-secondary uppercase">SYSTEM ONLINE</span>
                    </div>

                    <ThemeToggle />

                    <button
                        className="md:hidden p-2.5 hover:bg-surface-hover rounded-xl text-text-secondary transition-all border border-border"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Tabs Navigation */}
            <nav className="flex px-10 border-b border-border bg-background z-40">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as TabId)}
                        className={`flex items-center gap-3 px-8 py-5 font-heading text-[11px] font-bold tracking-[0.2em] transition-all relative group ${activeTab === tab.id ? 'text-primary' : 'text-text-muted hover:text-text-primary'
                            }`}
                    >
                        <span className={`transition-transform duration-300 ${activeTab === tab.id ? 'scale-110 drop-shadow-[0_0_8px_var(--primary)] text-primary' : 'group-hover:scale-110'}`}>
                            {tab.icon}
                        </span>
                        <span className="hidden sm:inline uppercase">{tab.label}</span>
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTabUnderline"
                                className="absolute bottom-0 left-4 right-4 h-[2px] bg-primary shadow-[0_0_15px_rgba(0,229,255,0.8)]"
                            />
                        )}
                    </button>
                ))}
            </nav>

            {/* Main Panel Content */}
            <main className="flex-1 overflow-hidden relative bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,0.03)_0%,transparent_50%)]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="h-full w-full"
                    >
                        {activeTab === 'chat' && <ChatPanel />}
                        {activeTab === 'workflows' && <WorkflowsPanel />}
                        {activeTab === 'rag' && <RAGPanel />}
                        {activeTab === 'image' && <ImagePanel />}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Sidebar Overlay (Mobile) */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] md:hidden"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-[320px] bg-surface border-r border-border z-[70] md:hidden p-8"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="font-heading text-primary text-xs uppercase tracking-[0.3em] font-black">History</h3>
                                <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-surface-hover rounded-lg"><X size={20} /></button>
                            </div>
                            <div className="space-y-4">
                                <div className="p-6 rounded-2xl bg-surface-hover border border-border text-center text-sm text-text-muted italic opacity-60">
                                    No histories found.
                                    <br />
                                    Start a conversation!
                                </div>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
