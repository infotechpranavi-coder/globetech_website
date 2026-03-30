'use client';

import { useState, useEffect } from 'react';

export default function SocialLinksTab() {
    const [links, setLinks] = useState({
        facebook: '',
        instagram: '',
        linkedin: '',
        twitter: '',
        youtube: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await fetch('/api/settings');
            if (response.ok) {
                const data = await response.json();
                setLinks({
                    facebook: data.facebook || '',
                    instagram: data.instagram || '',
                    linkedin: data.linkedin || '',
                    twitter: data.twitter || '',
                    youtube: data.youtube || ''
                });
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            // First get current settings to preserve videoUrl and brochureUrl
            const currentResponse = await fetch('/api/settings');
            const currentData = await currentResponse.json();

            const response = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...currentData,
                    ...links
                }),
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'Social links updated successfully!' });
            } else {
                setMessage({ type: 'error', text: 'Failed to update social links.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred while saving.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500 italic">Synchronizing social nodes...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white p-8 rounded-sm border border-gray-200 shadow-xl border-t-8 border-globe-black">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-1 h-8 bg-globe-red"></div>
                    <h2 className="text-3xl font-black text-globe-black uppercase tracking-tight">Social Network Management</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Facebook */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <span className="text-[#1877F2]">Facebook</span> Official URL
                            </label>
                            <input
                                type="url"
                                value={links.facebook}
                                onChange={(e) => setLinks({ ...links, facebook: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-sm outline-none focus:ring-2 focus:ring-globe-red font-medium transition"
                                placeholder="https://facebook.com/..."
                            />
                        </div>

                        {/* LinkedIn */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <span className="text-[#0A66C2]">LinkedIn</span> Corporate Profile
                            </label>
                            <input
                                type="url"
                                value={links.linkedin}
                                onChange={(e) => setLinks({ ...links, linkedin: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-sm outline-none focus:ring-2 focus:ring-globe-red font-medium transition"
                                placeholder="https://linkedin.com/company/..."
                            />
                        </div>

                        {/* Instagram */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <span className="text-[#E4405F]">Instagram</span> Showcase URL
                            </label>
                            <input
                                type="url"
                                value={links.instagram}
                                onChange={(e) => setLinks({ ...links, instagram: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-sm outline-none focus:ring-2 focus:ring-globe-red font-medium transition"
                                placeholder="https://instagram.com/..."
                            />
                        </div>

                        {/* YouTube */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <span className="text-[#FF0000]">YouTube</span> Channel Link
                            </label>
                            <input
                                type="url"
                                value={links.youtube}
                                onChange={(e) => setLinks({ ...links, youtube: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-sm outline-none focus:ring-2 focus:ring-globe-red font-medium transition"
                                placeholder="https://youtube.com/@..."
                            />
                        </div>

                        {/* X (Twitter) */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <span className="text-black">X (Twitter)</span> Official Feed
                            </label>
                            <input
                                type="url"
                                value={links.twitter}
                                onChange={(e) => setLinks({ ...links, twitter: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-sm outline-none focus:ring-2 focus:ring-globe-red font-medium transition"
                                placeholder="https://x.com/..."
                            />
                        </div>
                    </div>

                    {message.text && (
                        <div className={`p-4 rounded-sm text-sm font-black uppercase tracking-widest ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    <div className="pt-6 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-globe-black text-white px-10 py-4 rounded-sm font-black uppercase tracking-widest hover:bg-globe-red transition-all disabled:opacity-50 shadow-xl"
                        >
                            {saving ? 'Synchronizing...' : 'Update Social Ecosystem'}
                        </button>
                    </div>
                </form>
            </div>
            
            <div className="bg-gray-50 border-l-8 border-globe-red p-8">
                <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">
                    Note: These links are globally reflected in the Header, Footer, and Contact sidebars. Ensure all regional URLs are fully qualified (starting with https://).
                </p>
            </div>
        </div>
    );
}
