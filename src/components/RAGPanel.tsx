
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Link as LinkIcon,
    Play,
    Code,
    CheckCircle,
    Database,
    AlertCircle,
    Loader2,
    Bot,
    Send,
    Copy,
    FileText,
    Server,
    Globe,
    Upload,
    Leaf,
    File as FileIcon,
    Plus,
    X
} from 'lucide-react';
import { marked } from 'marked';

interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
}

type SourceType = 'web' | 'text' | 'postgres' | 'cms' | 'mongo' | 'file';

export const RAGPanel: React.FC = () => {
    // Ingest State
    const [sourceType, setSourceType] = useState<SourceType>('web');

    // Config States
    const [url, setUrl] = useState('');
    const [rawText, setRawText] = useState('');
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [pgConfig, setPgConfig] = useState({
        user: '', host: '', database: '', password: '', port: 5432, tableName: '',
        idCol: 'id', contentCol: 'content'
    });
    const [mongoConfig, setMongoConfig] = useState({
        uri: '', database: '', collection: '',
        contentField: 'content'
    });
    const [cmsConfig, setCmsConfig] = useState({ apiUrl: '', apiKey: '' });

    const [ingesting, setIngesting] = useState(false);
    const [ingestStatus, setIngestStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    // Connected Sources Log
    const [connectedSources, setConnectedSources] = useState<string[]>([]);

    // Chat Preview State
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'assistant', content: 'Hello! I am your embedded bot. I have read the content you provided. Ask me anything about it!' }
    ]);
    const [input, setInput] = useState('');
    const [isChatLoading, setIsChatLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Config State
    const [selectedModel, setSelectedModel] = useState('');
    const [assistantName, setAssistantName] = useState('Assistant');
    const [inputPlaceholder, setInputPlaceholder] = useState('Type a message...');
    const [models, setModels] = useState<any[]>([]);

    useEffect(() => {
        // Fetch models
        fetch('/api/models')
            .then(res => res.json())
            .then(data => {
                const availableModels = data.models || [];
                setModels(availableModels);
                const defaultModel = availableModels.find((m: any) => m.id === data.default) || availableModels[0];
                setSelectedModel(defaultModel?.id || '');
            });
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleIngest = async () => {
        setIngesting(true);
        setIngestStatus('idle');

        try {
            if (sourceType === 'file') {
                if (!selectedFiles || selectedFiles.length === 0) {
                    setIngesting(false);
                    return;
                }
                const formData = new FormData();
                Array.from(selectedFiles).forEach(file => {
                    formData.append('file', file);
                });

                const res = await fetch('/api/rag/ingest-file', {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'File ingestion failed');

                setConnectedSources(prev => [...prev, `Uploaded ${selectedFiles.length} files`]);
                setIngestStatus('success');
                setStatusMessage(data.message);
                setSelectedFiles(null);
                if (fileInputRef.current) fileInputRef.current.value = '';

            } else {
                // JSON Payload sources
                let payload: any = { type: sourceType };
                let sourceLabel = '';

                if (sourceType === 'web') {
                    if (!url) { setIngesting(false); return; }
                    payload.config = { url };
                    sourceLabel = `Web: ${url}`;
                } else if (sourceType === 'text') {
                    if (!rawText) { setIngesting(false); return; }
                    payload.config = { text: rawText, title: 'User Paste' };
                    sourceLabel = 'Raw Text Snippet';
                } else if (sourceType === 'postgres') {
                    payload.config = {
                        user: pgConfig.user, host: pgConfig.host, database: pgConfig.database,
                        password: pgConfig.password, port: Number(pgConfig.port), tableName: pgConfig.tableName,
                        columns: { id: pgConfig.idCol, content: pgConfig.contentCol }
                    };
                    sourceLabel = `Postgres: ${pgConfig.database}`;
                } else if (sourceType === 'mongo') {
                    payload.config = {
                        uri: mongoConfig.uri,
                        database: mongoConfig.database,
                        collection: mongoConfig.collection,
                        fields: { content: mongoConfig.contentField.split(',').map(s => s.trim()) }
                    };
                    sourceLabel = `MongoDB: ${mongoConfig.database}`;
                } else if (sourceType === 'cms') {
                    payload.config = cmsConfig;
                    sourceLabel = `CMS: ${cmsConfig.apiUrl}`;
                }

                const res = await fetch('/api/rag/ingest', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Ingestion failed');

                setConnectedSources(prev => [...prev, sourceLabel]);
                setIngestStatus('success');
                setStatusMessage(`Successfully connected source.`);
            }
        } catch (error: any) {
            setIngestStatus('error');
            setStatusMessage(error.message);
        } finally {
            setIngesting(false);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || isChatLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsChatLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [
                        { role: 'system', content: `You are ${assistantName}, a helpful assistant.` },
                        ...messages.map(m => ({ role: m.role, content: m.content })),
                        userMessage
                    ],
                    model: selectedModel,
                    stream: true,
                    useRag: true // Enable RAG
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
        } finally {
            setIsChatLoading(false);
        }
    };

    const getEmbedCode = () => {
        const embedUrl = typeof window !== 'undefined' ? `${window.location.origin}/embed/preview?model=${selectedModel}&name=${encodeURIComponent(assistantName)}&placeholder=${encodeURIComponent(inputPlaceholder)}` : '';
        return `<iframe src="${embedUrl}" width="400" height="600" frameborder="0" style="border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);"></iframe>`;
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const renderSourceForm = () => {
        switch (sourceType) {
            case 'web':
                return (
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">Target URL</label>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com/documentation"
                            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
                        />
                    </div>
                );
            case 'text':
                return (
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">Paste Text Content</label>
                        <textarea
                            value={rawText}
                            onChange={(e) => setRawText(e.target.value)}
                            placeholder="Paste your document text here..."
                            rows={6}
                            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none hover:border-primary/20 transition-all custom-scrollbar"
                        />
                    </div>
                );
            case 'file':
                return (
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">Upload Files (PDF, DOCX, TXT)</label>
                        <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-surface-hover transition-all cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                            <FileIcon className="mx-auto h-10 w-10 text-primary mb-2 opacity-50" />
                            <p className="text-sm text-text-muted">Click to select files</p>
                            <p className="text-xs text-text-muted opacity-60 mt-1">Supports multiple files</p>
                        </div>
                        <input
                            type="file"
                            multiple
                            className="hidden"
                            ref={fileInputRef}
                            onChange={(e) => setSelectedFiles(e.target.files)}
                        />
                        {selectedFiles && selectedFiles.length > 0 && (
                            <div className="mt-4 space-y-2">
                                {Array.from(selectedFiles).map((f, i) => (
                                    <div key={i} className="text-xs bg-surface border border-border px-3 py-2 rounded-lg text-text-primary flex items-center gap-2">
                                        <FileIcon size={12} /> {f.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            case 'postgres':
                return (
                    <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-bold text-text-muted mb-1">Host</label>
                                <input type="text" value={pgConfig.host} onChange={(e) => setPgConfig({ ...pgConfig, host: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm" placeholder="localhost" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-text-muted mb-1">Port</label>
                                <input type="number" value={pgConfig.port} onChange={(e) => setPgConfig({ ...pgConfig, port: Number(e.target.value) })} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm" placeholder="5432" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-bold text-text-muted mb-1">Database</label>
                                <input type="text" value={pgConfig.database} onChange={(e) => setPgConfig({ ...pgConfig, database: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-text-muted mb-1">User</label>
                                <input type="text" value={pgConfig.user} onChange={(e) => setPgConfig({ ...pgConfig, user: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-text-muted mb-1">Password</label>
                            <input type="password" value={pgConfig.password} onChange={(e) => setPgConfig({ ...pgConfig, password: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm" />
                        </div>
                        <div className="pt-2 border-t border-border">
                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-text-muted mb-1">Table Name</label>
                                    <input type="text" value={pgConfig.tableName} onChange={(e) => setPgConfig({ ...pgConfig, tableName: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm" placeholder="documents" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-text-muted mb-1">ID Column</label>
                                    <input type="text" value={pgConfig.idCol} onChange={(e) => setPgConfig({ ...pgConfig, idCol: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm" placeholder="id" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-text-muted mb-1">Content Column</label>
                                    <input type="text" value={pgConfig.contentCol} onChange={(e) => setPgConfig({ ...pgConfig, contentCol: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm" placeholder="body" />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'mongo':
                return (
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">Connection URI</label>
                            <input type="password" value={mongoConfig.uri} onChange={(e) => setMongoConfig({ ...mongoConfig, uri: e.target.value })} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/50" placeholder="mongodb+srv://..." />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-bold text-text-muted mb-1">Database</label>
                                <input type="text" value={mongoConfig.database} onChange={(e) => setMongoConfig({ ...mongoConfig, database: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-text-muted mb-1">Collection</label>
                                <input type="text" value={mongoConfig.collection} onChange={(e) => setMongoConfig({ ...mongoConfig, collection: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">Content Fields (comma separated)</label>
                            <input type="text" value={mongoConfig.contentField} onChange={(e) => setMongoConfig({ ...mongoConfig, contentField: e.target.value })} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/50" placeholder="title, body, description" />
                        </div>
                    </div>
                );
            case 'cms':
                return (
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">CMS API URL</label>
                            <input type="text" value={cmsConfig.apiUrl} onChange={(e) => setCmsConfig({ ...cmsConfig, apiUrl: e.target.value })} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/50" placeholder="https://api.cms.com/v1" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">API Key</label>
                            <input type="password" value={cmsConfig.apiKey} onChange={(e) => setCmsConfig({ ...cmsConfig, apiKey: e.target.value })} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/50" />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="h-full flex flex-col md:flex-row overflow-hidden bg-background">
            {/* Configuration Panel */}
            <div className="w-full md:w-1/2 p-6 md:p-10 border-r border-border overflow-y-auto custom-scrollbar">
                <div className="mb-8">
                    <h2 className="text-3xl font-heading font-bold text-text-primary mb-2 flex items-center gap-3">
                        <Database className="text-primary" />
                        Embed Manager
                    </h2>
                    <p className="text-text-secondary text-sm leading-relaxed">
                        Configure your embedded chatbot. Connect a data source to train the bot. You can connect multiple sources.
                    </p>
                </div>

                {/* 1. Data Source */}
                <section className="mb-10">
                    <h3 className="text-xs font-heading font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                        <LinkIcon size={14} /> 1. Connect Data Sources
                    </h3>

                    {/* Source Type Selector */}
                    <div className="grid grid-cols-6 gap-2 mb-6">
                        <button onClick={() => setSourceType('web')} className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${sourceType === 'web' ? 'bg-primary/20 border-primary text-primary' : 'bg-surface border-border text-text-muted hover:bg-surface-hover'}`}>
                            <Globe size={20} className="mb-1" />
                            <span className="text-[10px] font-bold uppercase">Web</span>
                        </button>
                        <button onClick={() => setSourceType('text')} className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${sourceType === 'text' ? 'bg-primary/20 border-primary text-primary' : 'bg-surface border-border text-text-muted hover:bg-surface-hover'}`}>
                            <FileText size={20} className="mb-1" />
                            <span className="text-[10px] font-bold uppercase">Text</span>
                        </button>
                        <button onClick={() => setSourceType('file')} className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${sourceType === 'file' ? 'bg-primary/20 border-primary text-primary' : 'bg-surface border-border text-text-muted hover:bg-surface-hover'}`}>
                            <FileIcon size={20} className="mb-1" />
                            <span className="text-[10px] font-bold uppercase">Files</span>
                        </button>
                        <button onClick={() => setSourceType('postgres')} className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${sourceType === 'postgres' ? 'bg-primary/20 border-primary text-primary' : 'bg-surface border-border text-text-muted hover:bg-surface-hover'}`}>
                            <Server size={20} className="mb-1" />
                            <span className="text-[10px] font-bold uppercase">PG SQL</span>
                        </button>
                        <button onClick={() => setSourceType('mongo')} className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${sourceType === 'mongo' ? 'bg-primary/20 border-primary text-primary' : 'bg-surface border-border text-text-muted hover:bg-surface-hover'}`}>
                            <Leaf size={20} className="mb-1" />
                            <span className="text-[10px] font-bold uppercase">Mongo</span>
                        </button>
                        <button onClick={() => setSourceType('cms')} className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${sourceType === 'cms' ? 'bg-primary/20 border-primary text-primary' : 'bg-surface border-border text-text-muted hover:bg-surface-hover'}`}>
                            <Upload size={20} className="mb-1" />
                            <span className="text-[10px] font-bold uppercase">CMS</span>
                        </button>
                    </div>

                    <div className="p-6 bg-surface border border-border rounded-2xl shadow-sm hover:border-primary/20 transition-all">
                        {renderSourceForm()}

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={handleIngest}
                                disabled={ingesting}
                                className="px-6 py-2 bg-primary hover:bg-primary-hover text-background font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {ingesting ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} />}
                                {ingesting ? 'Processing...' : (sourceType === 'file' ? 'Upload & Ingest' : 'Connect & Ingest')}
                            </button>
                        </div>

                        {/* Status Feedback */}
                        <AnimatePresence>
                            {ingestStatus !== 'idle' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className={`mt-4 p-3 rounded-xl flex items-start gap-3 text-sm ${ingestStatus === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                                        }`}
                                >
                                    {ingestStatus === 'success' ? <CheckCircle size={16} className="mt-0.5" /> : <AlertCircle size={16} className="mt-0.5" />}
                                    <div>
                                        <p className="font-bold">{ingestStatus === 'success' ? 'Success' : 'Error'}</p>
                                        <p className="opacity-90">{statusMessage}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Active Connections List */}
                    {connectedSources.length > 0 && (
                        <div className="mt-6">
                            <h4 className="text-[10px] uppercase font-bold text-text-muted tracking-wide mb-2">Connected Knowledge Base</h4>
                            <div className="flex flex-wrap gap-2">
                                {connectedSources.map((source, i) => (
                                    <div key={i} className="bg-surface border border-border px-3 py-1.5 rounded-full text-xs flex items-center gap-2">
                                        <CheckCircle size={10} className="text-green-500" />
                                        {source}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* 2. Model Selection */}
                <section className="mb-10">
                    <h3 className="text-xs font-heading font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                        <Bot size={14} /> 2. Customize Assistant
                    </h3>
                    <div className="p-6 bg-surface border border-border rounded-2xl shadow-sm space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">Model</label>
                            <select
                                value={selectedModel}
                                onChange={(e) => setSelectedModel(e.target.value)}
                                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/50 appearance-none cursor-pointer"
                            >
                                {models.map(m => (
                                    <option key={m.id} value={m.id}>{m.displayName || m.id}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-2">Bot Name</label>
                                <input
                                    type="text"
                                    value={assistantName}
                                    onChange={(e) => setAssistantName(e.target.value)}
                                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
                                    placeholder="Assistant"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-2">Placeholder Text</label>
                                <input
                                    type="text"
                                    value={inputPlaceholder}
                                    onChange={(e) => setInputPlaceholder(e.target.value)}
                                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
                                    placeholder={inputPlaceholder}
                                />
                            </div>
                        </div>

                    </div>
                </section>

                {/* 3. Integration Code */}
                <section>
                    <h3 className="text-xs font-heading font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                        <Code size={14} /> 3. Integration Code
                    </h3>
                    <div className="p-0 bg-black/80 border border-border rounded-2xl overflow-hidden relative group">
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => copyToClipboard(getEmbedCode())}
                                className="p-2 bg-surface hover:bg-surface-hover text-text-primary rounded-lg border border-border"
                                title="Copy Code"
                            >
                                <Copy size={16} />
                            </button>
                        </div>
                        <pre className="p-6 text-xs font-mono text-green-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                            {getEmbedCode()}
                        </pre>
                    </div>
                </section>
            </div>

            {/* Preview Panel */}
            <div className="w-full md:w-1/2 bg-surface/50 p-6 md:p-10 flex flex-col h-full">
                <h3 className="text-xs font-heading font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                    <Play size={14} /> Live Preview
                </h3>

                {/* Chat Container Mockup */}
                <div className="flex-1 bg-surface border border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden max-w-sm mx-auto w-full h-[600px] md:h-auto relative">
                    {/* Mock Header */}
                    <div className="bg-primary p-4 text-background flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <Bot size={18} className="text-white" />
                        </div>
                        <div>
                            <div className="font-bold text-sm">{assistantName}</div>
                            <div className="text-[10px] opacity-80 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Online
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-background">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user'
                                    ? 'bg-primary text-background rounded-tr-none'
                                    : 'bg-surface-hover text-text-primary border border-border rounded-tl-none'
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
                    <div className="p-4 border-t border-border bg-surface">
                        <div className="relative">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder={inputPlaceholder}
                                className="w-full bg-surface-hover border border-border rounded-full px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/50 pr-10"
                            />
                            <button
                                onClick={handleSend}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary text-background rounded-full hover:bg-primary-hover transition-all"
                            >
                                <Send size={14} />
                            </button>
                        </div>
                        <div className="text-center mt-2">
                            <span className="text-[10px] text-text-muted">Powered by Moonu Bot</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
