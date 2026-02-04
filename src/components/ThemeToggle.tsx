'use client';

import React, { useEffect, useState } from 'react';
import { Zap, Sun, Moon, MessageSquare, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Theme = 'cyber' | 'light' | 'pitch-black' | 'chatgpt';

const themes: { id: Theme; label: string; icon: React.ReactNode }[] = [
    { id: 'cyber', label: 'Cyber Dark', icon: <Zap size={14} /> },
    { id: 'light', label: 'B&W Light', icon: <Sun size={14} /> },
    { id: 'pitch-black', label: 'W&B Dark', icon: <Moon size={14} /> },
    { id: 'chatgpt', label: 'Classic', icon: <MessageSquare size={14} /> },
];

export const ThemeToggle = () => {
    const [theme, setTheme] = useState<Theme>('cyber');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('moonu_theme') as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }, []);

    const toggleTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        setIsOpen(false);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('moonu_theme', newTheme);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-surface hover:bg-surface-hover border border-border rounded-full transition-all group scale-90 md:scale-100"
            >
                <Palette size={14} className="text-primary" />
                <span className="text-[10px] font-heading font-bold tracking-widest text-text-secondary uppercase">
                    Theme
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-[60]"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-2xl shadow-2xl z-[70] overflow-hidden p-1"
                        >
                            {themes.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => toggleTheme(t.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${theme === t.id
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                                        }`}
                                >
                                    <span className={theme === t.id ? 'text-primary' : 'text-text-muted'}>
                                        {t.icon}
                                    </span>
                                    {t.label}
                                </button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
