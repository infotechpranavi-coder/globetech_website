'use client';

import { useState, useEffect } from 'react';

export default function SettingsTab() {
    const [videoUrl, setVideoUrl] = useState('');
    const [brochureUrl, setBrochureUrl] = useState('');
    const [uploadingBrochure, setUploadingBrochure] = useState(false);
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
                setVideoUrl(data.videoUrl || '');
                setBrochureUrl(data.brochureUrl || '');
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBrochureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploadingBrochure(true);
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload/image', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setBrochureUrl(data.url);
            } else {
                const error = await response.json();
                alert(error.error || 'Failed to upload brochure');
            }
        } catch (error) {
            console.error('Error uploading brochure:', error);
            alert('Error uploading brochure. Please try again.');
        } finally {
            setUploadingBrochure(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ videoUrl, brochureUrl }),
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'Settings updated successfully!' });
            } else {
                setMessage({ type: 'error', text: 'Failed to update settings.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred while saving.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading settings...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Global Site Settings</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                            Corporate Film YouTube URL
                        </label>
                        <input
                            type="url"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-globe-red transition bg-white text-gray-900"
                            placeholder="https://www.youtube.com/watch?v=..."
                            required
                        />
                        <p className="text-sm text-gray-500 italic">
                            Enter the full YouTube link. This video will be displayed in the "Corporate Film" section of the homepage.
                        </p>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-gray-100">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Global Product Brochure (PDF)</label>
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={() => document.getElementById('global-brochure-upload')?.click()}
                                disabled={uploadingBrochure}
                                className="px-4 py-2 bg-gray-100 text-gray-700 font-bold uppercase text-xs rounded-sm hover:bg-gray-200 border border-gray-300"
                            >
                                {uploadingBrochure ? 'Uploading...' : 'Upload Global Catalogue'}
                            </button>
                            <input
                                id="global-brochure-upload"
                                type="file"
                                accept="application/pdf"
                                onChange={handleBrochureUpload}
                                className="hidden"
                            />
                            {brochureUrl ? (
                                <div className="flex items-center gap-2 text-sm text-green-600 font-bold">
                                    <span>✅ Brochure Uploaded</span>
                                    <button type="button" onClick={() => setBrochureUrl('')} className="text-red-500 hover:text-red-700 text-xs uppercase underline">Remove</button>
                                </div>
                            ) : (
                                <span className="text-xs text-gray-400 italic">No file selected</span>
                            )}
                        </div>
                        {brochureUrl && (
                            <div className="text-xs text-blue-600 bg-blue-50 p-3 rounded-sm border border-blue-100 flex items-center justify-between">
                                <span className="break-all">{brochureUrl}</span>
                                <a href={brochureUrl} target="_blank" rel="noopener noreferrer" className="ml-2 underline font-bold">View</a>
                            </div>
                        )}
                        <p className="text-sm text-gray-500 italic">
                            This PDF will be available for download on ALL product detail pages.
                        </p>
                    </div>

                    {message.text && (
                        <div className={`p-4 rounded-lg text-sm font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-globe-red text-white px-8 py-3 rounded-lg font-black uppercase tracking-wider hover:bg-black transition-all disabled:opacity-50 shadow-lg shadow-globe-red/20"
                        >
                            {saving ? 'Updating...' : 'Save All Settings'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
