'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Clear error when toggling modes
        setError('');
    }, [isLogin]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (isLogin) {
            if (!username || !password) {
                setError('Please fill in all fields.');
                return;
            }
        } else {
            if (!username || !password || !fullName || !phone) {
                setError('Please fill in all fields.');
                return;
            }
        }

        const storedUsers = JSON.parse(localStorage.getItem('gs_users') || '[]');

        if (isLogin) {
            // Login Logic
            const user = storedUsers.find((u: any) => u.username === username && u.password === password);
            if (user) {
                localStorage.setItem('gs_current_user', JSON.stringify(user));
                router.push('/accounts');
            } else {
                setError('Invalid username or password.');
            }
        } else {
            // Signup Logic
            const exists = storedUsers.some((u: any) => u.username === username);
            if (exists) {
                setError('Username already exists.');
                return;
            }

            const newUser = {
                username,
                password,
                fullName,
                phone,
                createdAt: new Date().toISOString()
            };
            storedUsers.push(newUser);
            localStorage.setItem('gs_users', JSON.stringify(storedUsers));
            localStorage.setItem('gs_current_user', JSON.stringify(newUser));

            alert('Account created successfully!');
            router.push('/accounts');
        }
    };

    return (
        <main className="min-h-screen bg-brand-primary flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo Section */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block transform hover:scale-105 transition-transform duration-300">
                        <Image
                            src="/WhatsApp_Image_2026-01-30_at_11.21.42_PM-removebg-preview.png"
                            alt="Globe-Tech Logo"
                            width={300}
                            height={300}
                            className="mx-auto h-28 w-auto object-contain invert brightness-95 hue-rotate-180 saturate-200 contrast-125"
                        />
                    </Link>
                    <h1 className="text-3xl font-extrabold text-white mt-6">
                        {isLogin ? 'Welcome Back' : 'Join Globe-Tech'}
                    </h1>
                    <p className="text-gray-400 mt-2">
                        {isLogin ? 'Log in to access your automation dashboard' : 'Create an account to start your automation journey'}
                    </p>
                </div>

                {/* Form Section */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100 relative overflow-hidden">
                    {/* Brand Accent */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-secondary to-yellow-600"></div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100 flex items-center">
                                <span className="mr-2">⚠️</span> {error}
                            </div>
                        )}

                        {!isLogin && (
                            <>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-secondary focus:bg-white outline-none text-gray-900 font-medium transition-all"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-secondary focus:bg-white outline-none text-gray-900 font-medium transition-all"
                                        placeholder="e.g. +91 98765 43210"
                                    />
                                </div>
                            </>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Username / UserID</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-secondary focus:bg-white outline-none text-gray-900 font-medium transition-all"
                                placeholder="Choose a unique userid"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-secondary focus:bg-white outline-none text-gray-900 font-medium transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-brand-primary text-white font-extrabold rounded-xl shadow-lg hover:shadow-brand-primary/20 hover:bg-brand-primary-dark transform hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest"
                        >
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-sm font-bold text-gray-500 hover:text-brand-secondary transition"
                        >
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <span className="text-brand-primary underline ml-1">
                                {isLogin ? 'Sign Up' : 'Log In'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Back Link */}
                <div className="text-center mt-8">
                    <Link href="/" className="text-gray-500 hover:text-white transition flex items-center justify-center space-x-2 text-sm font-medium">
                        <span>←</span>
                        <span>Back to Home</span>
                    </Link>
                </div>
            </div>
        </main>
    );
}
