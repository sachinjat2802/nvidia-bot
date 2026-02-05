'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';
import { User, LogOut, ChevronDown, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UserMenu() {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (status === 'loading') {
        return (
            <div className="w-8 h-8 rounded-full bg-surface border border-border animate-pulse" />
        );
    }

    if (!session) {
        return null;
    }

    const userName = session.user?.name || session.user?.email?.split('@')[0] || 'User';
    const userEmail = session.user?.email || '';
    const userImage = session.user?.image || null;

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-hover transition-all border border-transparent hover:border-border"
            >
                {userImage ? (
                    <img
                        src={userImage}
                        alt={userName}
                        className="w-7 h-7 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                        <User size={14} className="text-primary" />
                    </div>
                )}
                <ChevronDown size={14} className="text-text-secondary hidden md:block" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 top-full mt-2 w-64 bg-surface border border-border rounded-xl shadow-xl z-50 overflow-hidden"
                        >
                            <div className="p-4 border-b border-border">
                                <p className="font-semibold text-text-primary truncate">{userName}</p>
                                <p className="text-sm text-text-muted truncate">{userEmail}</p>
                            </div>

                            <div className="p-2">
                                <button
                                    onClick={() => {
                                        signOut({ callbackUrl: '/login' });
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-all"
                                >
                                    <LogOut size={16} />
                                    <span>Sign out</span>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}