'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Tab = 'personal' | 'enquiries' | 'wishlist';

export default function AccountsPage() {
    const [activeTab, setActiveTab] = useState<Tab>('personal');
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const currentUser = localStorage.getItem('gs_current_user');
        if (!currentUser) {
            router.push('/auth');
        } else {
            setUser(JSON.parse(currentUser));
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('gs_current_user');
        router.push('/');
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'personal':
                return <PersonalDetails user={user} />;
            case 'enquiries':
                return <EnquiriesList />;
            case 'wishlist':
                return <WishlistGrid />;
            default:
                return <PersonalDetails user={user} />;
        }
    };

    if (!user) {
        return <div className="min-h-screen bg-brand-primary flex items-center justify-center text-white font-bold tracking-widest uppercase">Checking Authorization...</div>;
    }

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <div className="flex-grow container mx-auto px-4 py-12 max-w-6xl">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row min-h-[600px]">

                    {/* Sidebar / Sidebar Tabs */}
                    <div className="w-full md:w-80 bg-brand-primary p-8 text-white">
                        <div className="flex flex-col h-full">
                            <div className="mb-10">
                                <h1 className="text-2xl font-bold text-brand-secondary">Welcome, {user.username}</h1>
                                <p className="text-gray-400 text-sm mt-1">Manage your profile and properties</p>
                            </div>

                            <nav className="space-y-4 flex-grow">
                                <TabButton
                                    active={activeTab === 'personal'}
                                    onClick={() => setActiveTab('personal')}
                                    icon="👤"
                                    label="Personal Details"
                                />
                                <TabButton
                                    active={activeTab === 'enquiries'}
                                    onClick={() => setActiveTab('enquiries')}
                                    icon="📋"
                                    label="My Enquiries"
                                />
                                <TabButton
                                    active={activeTab === 'wishlist'}
                                    onClick={() => setActiveTab('wishlist')}
                                    icon="❤️"
                                    label="Wishlist"
                                />
                            </nav>

                            <div className="pt-10 border-t border-gray-700">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-3 text-red-400 hover:text-red-300 transition font-medium w-full text-left"
                                >
                                    <span>🚪</span>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-grow p-8 md:p-12 overflow-y-auto">
                        {renderTabContent()}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: string, label: string }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl transition-all duration-300 ${active
                ? 'bg-brand-secondary text-white shadow-lg transform translate-x-2'
                : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
        >
            <span className="text-xl">{icon}</span>
            <span className="font-bold tracking-wide uppercase text-sm">{label}</span>
        </button>
    );
}

function PersonalDetails({ user }: { user: any }) {
    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-extrabold text-brand-primary mb-8 border-b border-gray-100 pb-4">Personal Profile</h2>

            <div className="space-y-8 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                        <p className="text-lg font-bold text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-100">{user?.fullName || 'Not provided'}</p>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">User ID</label>
                        <p className="text-lg font-bold text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-100">{user?.username}</p>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
                        <p className="text-lg font-bold text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-100">{user?.phone || 'Not provided'}</p>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Member Since</label>
                        <p className="text-lg font-bold text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-100">
                            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'Jan 2024'}
                        </p>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-50">
                    <button className="px-8 py-3 bg-brand-primary text-white rounded-lg font-bold hover:bg-brand-primary-dark transition-all transform hover:scale-105 shadow-lg">
                        Edit Profile Details
                    </button>
                </div>
            </div>
        </div>
    );
}

function EnquiriesList() {
    const fakeEnquiries = [
        { id: '1', property: 'Godrej Zenith', date: 'Jan 25, 2026', status: 'Site Visit' },
        { id: '2', property: 'DLF Privana', date: 'Jan 22, 2026', status: 'Negotiation' },
    ];

    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-extrabold text-brand-primary mb-8 border-b border-gray-100 pb-4">My Enquiries</h2>

            <div className="space-y-4">
                {fakeEnquiries.map(enq => (
                    <div key={enq.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center justify-between hover:shadow-md transition">
                        <div>
                            <h3 className="font-extrabold text-xl text-brand-primary">{enq.property}</h3>
                            <p className="text-gray-500 text-sm mt-1">Submitted on {enq.date}</p>
                        </div>
                        <div className="text-right">
                            <span className="inline-block px-4 py-1 bg-brand-secondary/10 text-brand-secondary text-xs font-bold rounded-full uppercase tracking-widest border border-brand-secondary/20">
                                {enq.status}
                            </span>
                            <button className="block text-brand-primary text-sm font-bold mt-2 hover:underline">View Progress →</button>
                        </div>
                    </div>
                ))}

                {fakeEnquiries.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 font-bold">No enquiries submitted yet.</p>
                        <button className="mt-4 text-brand-secondary font-bold hover:underline">Explore Properties</button>
                    </div>
                )}
            </div>
        </div>
    );
}

function WishlistGrid() {
    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-extrabold text-brand-primary mb-8 border-b border-gray-100 pb-4">My Wishlist</h2>

            <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <div className="text-5xl mb-4 opacity-30">🏠</div>
                <p className="text-gray-400 font-bold">Your wishlist is empty.</p>
                <p className="text-gray-400 text-sm mt-1">Save properties to compare them later.</p>
                <button className="mt-6 px-10 py-3 bg-brand-primary text-white rounded-lg font-bold hover:bg-brand-primary-dark transition shadow-lg">
                    Browse Properties
                </button>
            </div>
        </div>
    );
}
