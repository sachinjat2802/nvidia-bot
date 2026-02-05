'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Sparkles, User, Bot, ChevronDown, History, Plus, Trash2, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { marked } from 'marked';

interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
}

interface ChatSession {
    id: string;
    title: string;
    updatedAt: number;
}

export const ChatPanel: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentModel, setCurrentModel] = useState('');
    const [models, setModels] = useState<any[]>([]);
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('English');
    const [currentAge, setCurrentAge] = useState('25');
    const [streamError, setStreamError] = useState<string | null>(null);

    const languages = [
        'English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati', 'Urdu', 'Kannada', 'Odia', 'Malayalam', 'Punjabi'
    ];

    const ages = [
        '0-5', '6-10', '11-15', '16-20', '21-25', '26-30', '31-35', '36-40', '41-50', '51-60', '61-70', '71+'
    ];

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial load: models and sessions
    useEffect(() => {
        // Fetch models
        fetch('/api/models', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                const availableModels = data.models || [];
                setModels(availableModels);
                const defaultModel = availableModels.find((m: any) => m.id === data.default) || availableModels[0];
                setCurrentModel(defaultModel?.id || '');
            })
            .catch(err => {
                console.error('Failed to fetch models:', err);
            });

        // Fetch sessions
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        try {
            const res = await fetch('/api/history', {
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.ok) {
                const data = await res.json();
                setSessions(data);
            }
        } catch (err) {
            console.error('Failed to fetch sessions', err);
        }
    };

    const loadSession = async (id: string) => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/history/${id}`);
            if (res.ok) {
                const session = await res.json();
                if (session && session.messages) {
                    setMessages(session.messages);
                    setCurrentSessionId(id);
                }
            }
        } catch (err) {
            console.error('Failed to load session', err);
        } finally {
            setIsLoading(false);
            setIsHistoryOpen(false);
        }
    };

    const startNewChat = () => {
        setMessages([]);
        setCurrentSessionId(null);
        setIsHistoryOpen(false);
        setStreamError(null);
    };

    const deleteSession = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        try {
            await fetch(`/api/history/${id}`, { method: 'DELETE' });
            setSessions(prev => prev.filter(s => s.id !== id));
            if (currentSessionId === id) {
                startNewChat();
            }
        } catch (err) {
            console.error('Failed to delete session', err);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input
        };

        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);
        setStreamError(null);

        try {
            let sessionId = currentSessionId;
            let currentTitle = '';

            // 1. Create or Update Session
            if (!sessionId) {
                // New session
                currentTitle = input.slice(0, 30) + (input.length > 30 ? '...' : '');
                const createRes = await fetch('/api/history', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: currentTitle,
                        messages: [userMessage]
                    })
                });
                if (createRes.ok) {
                    const sessionData = await createRes.json();
                    sessionId = sessionData.id;
                    setCurrentSessionId(sessionId);
                    fetchSessions(); // Refresh list
                }
            } else {
                // Update existing session
                await fetch(`/api/history/${sessionId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        messages: newMessages
                    })
                });
            }

            // 2. Clear to stream response
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    messages: [
                        {
                            role: 'system',
                            content: `You are Moonu Bot, a helpful and intelligent AI assistant.
                            STRICT RULES:
                            1. NEVER output your internal reasoning, chain of thought, or "thoughts" to the user.
                            2. Output ONLY the final response.
                            3. The user is ${currentAge} years old. Tailor the depth, tone, and complexity of your explanation to be perfectly suited for this age.
                            ${currentLanguage !== 'English' ? `4. Answer in ${currentLanguage} ONLY.` : ''}`
                        },
                        ...newMessages.map(m => ({ role: m.role, content: m.content }))
                    ],
                    model: currentModel,
                    stream: true
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to send message: ${response.status} ${errorText}`);
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let assistantContent = '';
            let buffer = '';

            const assistantId = (Date.now() + 1).toString();
            setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

            if (!reader) {
                throw new Error('No response reader available');
            }

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                buffer += chunk;
                const lines = buffer.split('\n');
                buffer = lines.pop() || ''; // Keep incomplete line in buffer

                for (const line of lines) {
                    const trimmedLine = line.trim();
                    if (!trimmedLine.startsWith('data: ')) continue;

                    const dataStr = trimmedLine.slice(6);
                    if (dataStr === '[DONE]') continue;

                    try {
                        const data = JSON.parse(dataStr);
                        if (data.content) {
                            assistantContent += data.content;
                            setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: assistantContent } : m));
                        }
                        // Handle error in stream
                        if (data.error) {
                            throw new Error(data.error);
                        }
                    } catch (parseError) {
                        console.error('Failed to parse stream data:', parseError, 'Raw data:', dataStr);
                    }
                }
            }

            // Process any remaining buffer
            if (buffer.trim().startsWith('data: ')) {
                const dataStr = buffer.trim().slice(6);
                if (dataStr !== '[DONE]') {
                    try {
                        const data = JSON.parse(dataStr);
                        if (data.content) {
                            assistantContent += data.content;
                            setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: assistantContent } : m));
                        }
                        if (data.error) {
                            throw new Error(data.error);
                        }
                    } catch (parseError) {
                        console.error('Failed to parse final buffer:', parseError, 'Raw data:', dataStr);
                    }
                }
            }

            // 3. Save assistant response to history
            if (sessionId) {
                const finalAssistantMessage: Message = { id: assistantId, role: 'assistant', content: assistantContent };
                const updatedMessages = [...newMessages, finalAssistantMessage];

                // Update local state is already done incrementally
                // Persist to DB
                await fetch(`/api/history/${sessionId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        messages: updatedMessages
                    })
                });
                fetchSessions(); // Update timestamps
            }

        } catch (error: any) {
            console.error('Chat error:', error);
            setStreamError(error.message || 'Failed to get response');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-full relative overflow-hidden">
            {/* History Sidebar Drawer */}
            <AnimatePresence>
                {isHistoryOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsHistoryOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40"
                        />
                        <motion.div
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            className="absolute left-0 top-0 bottom-0 w-[300px] bg-surface border-r border-white/10 z-50 p-6 flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-heading text-xs uppercase tracking-[0.2em] font-bold text-primary">Chat History</h3>
                                <button onClick={startNewChat} className="p-2 hover:bg-surface-hover rounded-lg text-primary" title="New Chat">
                                    <Plus size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
                                {sessions.length === 0 ? (
                                    <div className="text-center py-10 text-text-muted italic opacity-50 text-sm">No history yet</div>
                                ) : (
                                    sessions.map(s => (
                                        <div
                                            key={s.id}
                                            onClick={() => loadSession(s.id)}
                                            className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${currentSessionId === s.id ? 'bg-primary/10 border-primary/30 text-primary' : 'hover:bg-surface-hover border-transparent text-text-secondary'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <MessageCircle size={16} className="shrink-0" />
                                                <span className="truncate text-sm font-medium">{s.title}</span>
                                            </div>
                                            <button
                                                onClick={(e) => deleteSession(e, s.id)}
                                                className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/10 hover:text-red-500 rounded-md transition-all"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col relative">
                {/* Float History Toggle */}
                <button
                    onClick={() => setIsHistoryOpen(true)}
                    className="absolute left-6 top-6 p-3 bg-surface border border-border rounded-xl text-text-muted hover:text-primary transition-all z-30 shadow-xl"
                >
                    <History size={20} />
                </button>

                <div className="flex-1 overflow-y-auto pt-20 md:pt-24 pb-32 space-y-10 custom-scrollbar px-4 md:px-8 lg:px-16 max-w-5xl mx-auto w-full">
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center py-20">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="w-20 h-20 rounded-3xl overflow-hidden shadow-glow border border-primary/20 mb-8"
                            >
                                <img
                                    src="/logo-m.png"
                                    alt="Bot"
                                    className="w-full h-full object-contain"
                                    style={{ filter: 'invert(1) hue-rotate(180deg) brightness(1.5)' }}
                                />
                            </motion.div>
                            <h2 className="text-3xl font-heading mb-4 text-text-primary tracking-tight">How can I help you today?</h2>
                        </div>
                    )}

                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-3 md:gap-5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            <div className={`w-8 h-8 md:w-9 md:h-9 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${msg.role === 'user'
                                ? 'bg-surface border-border'
                                : 'bg-gradient-to-br from-primary to-primary-hover border-primary/20 text-background shadow-glow'
                                }`}>
                                {msg.role === 'user' ? (
                                    <User size={18} className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                                ) : (
                                    <img
                                        src="/logo-m.png"
                                        alt="Bot"
                                        className="w-full h-full object-contain"
                                        style={{ filter: 'invert(1) hue-rotate(180deg) brightness(1.5)' }}
                                    />
                                )}
                            </div>
                            <div className={`max-w-[90%] md:max-w-[85%] rounded-2xl px-4 md:px-6 py-3 md:py-4 leading-relaxed text-[0.95rem] md:text-[1rem] shadow-sm ${msg.role === 'user'
                                ? 'bg-surface border border-border text-text-primary rounded-tr-none'
                                : 'bg-transparent text-text-primary rounded-tl-none'
                                }`}>
                                {msg.role === 'assistant' ? (
                                    <div
                                        className={`prose max-w-none prose-p:leading-relaxed prose-pre:bg-background/50 prose-pre:border prose-pre:border-border prose-code:text-primary ${typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light' ? '' : 'prose-invert'
                                            }`}
                                        dangerouslySetInnerHTML={{ __html: marked.parse(msg.content) as string }}
                                    />
                                ) : (
                                    <div className="whitespace-pre-wrap">{msg.content}</div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Error Display */}
                {streamError && (
                    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-2 rounded-lg text-sm z-20">
                        Error: {streamError}
                    </div>
                )}

                {/* Input Area */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none">
                    <div className="max-w-4xl mx-auto relative group pointer-events-auto">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-primary-hover/30 rounded-3xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />

                        <div className="relative glass rounded-2xl md:rounded-3xl p-3 md:p-4 flex flex-col gap-1 shadow-2xl border-border hover:border-primary/30 transition-all">
                            {/* Mobile Selectors (Top) */}
                            <div className="flex md:hidden items-center gap-2 overflow-x-auto hide-scrollbar pb-2 min-h-[40px] border-b border-white/5 mb-2">
                                <div className="relative flex items-center shrink-0">
                                    <select
                                        value={currentModel}
                                        onChange={(e) => setCurrentModel(e.target.value)}
                                        className="bg-surface-hover text-[10px] uppercase tracking-wider font-heading text-text-muted px-2 py-1.5 rounded-lg border border-border outline-none appearance-none cursor-pointer"
                                    >
                                        {models.map(m => (
                                            <option key={m.id} value={m.id} className="bg-surface text-text-primary lowercase font-sans">{m.displayName}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={10} className="absolute right-1 pointer-events-none text-text-muted" />
                                </div>
                                <div className="relative flex items-center shrink-0">
                                    <select
                                        value={currentLanguage}
                                        onChange={(e) => setCurrentLanguage(e.target.value)}
                                        className="bg-surface-hover text-[10px] uppercase tracking-wider font-heading text-text-muted px-2 py-1.5 rounded-lg border border-border outline-none appearance-none cursor-pointer"
                                    >
                                        {languages.map(lang => (
                                            <option key={lang} value={lang} className="bg-surface text-text-primary lowercase font-sans">{lang}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={10} className="absolute right-1 pointer-events-none text-text-muted" />
                                </div>
                                <div className="relative flex items-center shrink-0">
                                    <select
                                        value={currentAge}
                                        onChange={(e) => setCurrentAge(e.target.value)}
                                        className="bg-surface-hover text-[10px] uppercase tracking-wider font-heading text-text-muted px-2 py-1.5 rounded-lg border border-border outline-none appearance-none cursor-pointer"
                                    >
                                        {ages.map(age => (
                                            <option key={age} value={age} className="bg-surface text-text-primary lowercase font-sans">Age: {age}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={10} className="absolute right-1 pointer-events-none text-text-muted" />
                                </div>
                            </div>

                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                placeholder="Ask Moonu Bot anything..."
                                rows={1}
                                className="bg-transparent border-none outline-none px-4 py-2 text-text-primary resize-none placeholder:text-text-muted text-lg focus:ring-0 min-h-[50px]"
                            />

                            <div className="flex items-center justify-between px-2 md:px-3 pb-1 pt-2 border-t border-border">
                                {/* Desktop Selectors (Bottom Row) */}
                                <div className="hidden md:flex items-center gap-3 flex-1 overflow-x-auto hide-scrollbar pb-0">
                                    <button className="p-2 text-text-muted hover:text-text-primary hover:bg-surface-hover rounded-xl transition-all shrink-0">
                                        <Paperclip size={18} />
                                    </button>

                                    <div className="relative flex items-center group/select shrink-0">
                                        <select
                                            value={currentModel}
                                            onChange={(e) => setCurrentModel(e.target.value)}
                                            className="bg-surface-hover hover:bg-surface text-[11px] uppercase tracking-widest font-heading text-text-muted hover:text-primary px-3 py-1.5 rounded-lg border border-border outline-none appearance-none cursor-pointer transition-all pr-8"
                                        >
                                            {models.map(m => (
                                                <option key={m.id} value={m.id} className="bg-surface text-text-primary lowercase font-sans py-2">
                                                    {m.displayName}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown size={12} className="absolute right-2 pointer-events-none text-text-muted" />
                                    </div>

                                    <div className="relative flex items-center group/select shrink-0">
                                        <select
                                            value={currentLanguage}
                                            onChange={(e) => setCurrentLanguage(e.target.value)}
                                            className="bg-surface-hover hover:bg-surface text-[11px] uppercase tracking-widest font-heading text-text-muted hover:text-primary px-3 py-1.5 rounded-lg border border-border outline-none appearance-none cursor-pointer transition-all pr-8"
                                        >
                                            {languages.map(lang => (
                                                <option key={lang} value={lang} className="bg-surface text-text-primary lowercase font-sans py-2">
                                                    {lang}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown size={12} className="absolute right-2 pointer-events-none text-text-muted" />
                                    </div>

                                    <div className="relative flex items-center group/select shrink-0">
                                        <select
                                            value={currentAge}
                                            onChange={(e) => setCurrentAge(e.target.value)}
                                            className="bg-surface-hover hover:bg-surface text-[11px] uppercase tracking-widest font-heading text-text-muted hover:text-primary px-3 py-1.5 rounded-lg border border-border outline-none appearance-none cursor-pointer transition-all pr-8"
                                        >
                                            {ages.map(age => (
                                                <option key={age} value={age} className="bg-surface text-text-primary lowercase font-sans py-2">
                                                    Age: {age}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown size={12} className="absolute right-2 pointer-events-none text-text-muted" />
                                    </div>
                                </div>

                                {/* Mobile Only Paperclip */}
                                <div className="md:hidden flex items-center">
                                    <button className="p-2 text-text-muted hover:text-text-primary hover:bg-white/5 rounded-xl transition-all">
                                        <Paperclip size={18} />
                                    </button>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className={`p-2 md:p-2.5 rounded-xl transition-all flex items-center justify-center shrink-0 ml-2 ${input.trim() && !isLoading
                                        ? 'bg-primary text-background shadow-glow'
                                        : 'bg-surface-hover text-text-muted opacity-40'
                                        }`}
                                >
                                    <Send size={20} className={`w-4 h-4 md:w-5 md:h-5 ${isLoading ? 'animate-pulse' : ''}`} />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};