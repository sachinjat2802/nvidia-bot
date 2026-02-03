import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Workflow,
  BookOpen,
  Image as ImageIcon,
  Settings,
  Menu,
  X,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Component imports (to be created)
// import ChatPanel from './components/Chat/ChatPanel';
// import WorkflowsPanel from './components/Workflows/WorkflowsPanel';
// import RAGPanel from './components/RAG/RAGPanel';
// import ImagePanel from './components/Image/ImagePanel';

type Tab = 'chat' | 'workflows' | 'rag' | 'image';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const tabs = [
    { id: 'chat', label: 'Chat', icon: <MessageSquare size={18} /> },
    { id: 'workflows', label: 'Workflows', icon: <Workflow size={18} /> },
    { id: 'rag', label: 'RAG', icon: <BookOpen size={18} /> },
    { id: 'image', label: 'Image', icon: <ImageIcon size={18} /> },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#1a1b23] text-[#f0f0f3] overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 shrink-0 z-50 bg-[#1a1b23]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#004e92] flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.4)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" />
              <path d="M2 17L12 22L22 17" />
              <path d="M2 12L12 17L22 12" />
            </svg>
          </div>
          <h1 className="font-['Orbitron'] font-bold text-xl tracking-wider text-[#00e5ff] drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">
            MOONU BOT
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="md:hidden p-2 hover:bg-white/5 rounded-lg text-[#b8b9c1]"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="flex px-6 border-b border-white/5 bg-[#0a0a10]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`flex items-center gap-2 px-6 py-4 font-['Orbitron'] text-sm font-semibold tracking-wide transition-all relative ${activeTab === tab.id ? 'text-[#00e5ff]' : 'text-[#888995] hover:text-[#f0f0f3]'
              }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00e5ff] shadow-[0_0_10px_#00e5ff]"
              />
            )}
          </button>
        ))}
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden flex relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 h-full overflow-hidden"
          >
            {activeTab === 'chat' && <div className="p-8 text-center text-[#888995]">Chat UI Building...</div>}
            {activeTab === 'workflows' && <div className="p-8 text-center text-[#888995]">Workflows UI Building...</div>}
            {activeTab === 'rag' && <div className="p-8 text-center text-[#888995]">RAG UI Building...</div>}
            {activeTab === 'image' && <div className="p-8 text-center text-[#888995]">Image UI Building...</div>}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-[#1a1b23] border-r border-white/10 z-[70] md:hidden p-6"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-['Orbitron'] text-[#00e5ff] text-sm uppercase tracking-widest">Chat History</h3>
                <button onClick={() => setIsSidebarOpen(false)}><X size={20} /></button>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center text-sm text-[#888995]">
                  No recent chats
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
