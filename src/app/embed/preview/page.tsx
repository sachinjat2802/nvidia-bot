
'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, Bot, Loader2 } from 'lucide-react';
import { marked } from 'marked';

interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
}

function ChatInterface() {
    const searchParams = useSearchParams();
    const modelParam = searchParams.get('model');
    const [model, setModel] = useState(modelParam || 'nvidia/nemotron-4-340b-instruct');

    const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'assistant', content: 'Hello! How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (modelParam) setModel(modelParam);
    }, [modelParam]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [
                        { role: 'system', content: 'You are a helpful assistant.' },
                        ...messages.map(m => ({ role: m.role, content: m.content })),
                        userMessage
                    ],
                    model: model,
                    stream: true,
                    useRag: true
                })
            });

            if (!response.ok) throw new Error('Failed to send message');

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let assistantContent = '';
            const assistantId = (Date.now() + 1).toString();

            setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

            while (reader) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const dataStr = line.slice(6);
                        if (dataStr === '[DONE]') continue;
                        try {
                            const data = JSON.parse(dataStr);
                            if (data.content) {
                                assistantContent += data.content;
                                setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: assistantContent } : m));
                            }
                        } catch (e) { }
                    }
                }
            }
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-background text-text-primary">
            {/* Header */}
            <div className="h-14 bg-surface border-b border-border flex items-center px-4 justify-between shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <Bot size={18} />
                    </div>
                    <span className="font-heading font-bold text-sm">Moonu Bot</span>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${msg.role === 'user' ? 'bg-surface border border-border' : 'bg-primary text-background'
                            }`}>
                            {msg.role === 'user' ? 'U' : <Bot size={16} />}
                        </div>
                        <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                ? 'bg-surface border border-border text-text-primary rounded-tr-none'
                                : 'bg-transparent text-text-primary rounded-tl-none'
                            }`}>
                            {msg.role === 'assistant' ? (
                                <div
                                    className="prose prose-sm max-w-none prose-invert"
                                    dangerouslySetInnerHTML={{ __html: marked.parse(msg.content) as string }}
                                />
                            ) : (
                                msg.content
                            )}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-surface border-t border-border shrink-0">
                <div className="relative">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type a message..."
                        className="w-full bg-surface-hover border border-border rounded-full px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/50 pr-12 transition-all"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary text-background rounded-full hover:bg-primary-hover disabled:opacity-50 disabled:hover:bg-primary transition-all"
                    >
                        {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function EmbedPreviewPage() {
    return (
        <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>}>
            <ChatInterface />
        </Suspense>
    );
}
