'use client';

import { useState } from 'react';
import Image from 'next/image';

interface DashboardLoginProps {
    onLogin: () => void;
}

export default function DashboardLogin({ onLogin }: DashboardLoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulated auth check with user-provided credentials
        setTimeout(() => {
            if (username === 'admin_01' && password === 'admin@123') {
                localStorage.setItem('gs_admin_session', 'authenticated_' + Date.now());
                onLogin();
            } else {
                setError('Invalid credentials. Please try again.');
            }
            setIsLoading(false);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-brand-primary/20 rounded-full blur-[120px]"></div>
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-brand-secondary/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                    {/* Logo Section */}
                    <div className="flex flex-col items-center mb-8">
                        <Image
                            src="/WhatsApp_Image_2026-01-30_at_11.21.42_PM-removebg-preview.png"
                            alt="Globe-Tech"
                            width={180}
                            height={60}
                            className="mb-4 brightness-110"
                        />
                        <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h1>
                        <p className="text-gray-400 text-sm mt-1">Authorized Access Only</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm text-center animate-shake">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Username</label>
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 focus:border-brand-secondary/50 transition-all"
                                placeholder="Enter admin username"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 focus:border-brand-secondary/50 transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-primary/20 transform transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group flex items-center justify-center"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Unlock Dashboard</span>
                                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 7l5 5-5 5" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-gray-500 text-xs uppercase tracking-widest font-bold">
                        &copy; {new Date().getFullYear()} Globe-Tech Automation. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    );
}
