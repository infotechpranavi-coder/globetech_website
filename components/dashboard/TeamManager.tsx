'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface TeamMember {
    _id: string;
    name: string;
    designation: string;
    image: string;
    showOnAbout: boolean;
}

export default function TeamManager() {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

    // Form state
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [image, setImage] = useState('');
    const [showOnAbout, setShowOnAbout] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [showTeamSection, setShowTeamSection] = useState(true);
    const [savingSettings, setSavingSettings] = useState(false);

    useEffect(() => {
        fetchMembers();
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/settings');
            if (res.ok) {
                const data = await res.json();
                setShowTeamSection(data.showTeamSection !== false);
            }
        } catch (err) {
            console.error('Error fetching settings:', err);
        }
    };

    const handleToggleGlobalVisibility = async (enabled: boolean) => {
        setSavingSettings(true);
        try {
            // First fetch current settings to avoid overwriting other fields
            const res = await fetch('/api/settings');
            const currentData = await res.json();

            const response = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...currentData,
                    showTeamSection: enabled
                }),
            });

            if (response.ok) {
                setShowTeamSection(enabled);
            }
        } catch (error) {
            console.error('Error updating team visibility:', error);
        } finally {
            setSavingSettings(false);
        }
    };

    const fetchMembers = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/team');
            if (response.ok) {
                const data = await response.json();
                setMembers(data);
            }
        } catch (error) {
            console.error('Error fetching team:', error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setName('');
        setDesignation('');
        setImage('');
        setShowOnAbout(false);
        setEditingMember(null);
        setIsAdding(false);
    };

    const handleEdit = (member: TeamMember) => {
        setEditingMember(member);
        setName(member.name);
        setDesignation(member.designation);
        setImage(member.image);
        setShowOnAbout(member.showOnAbout);
        setIsAdding(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const payload = { name, designation, image, showOnAbout };
            const url = editingMember ? `/api/team/${editingMember._id}` : '/api/team';
            const method = editingMember ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                fetchMembers();
                resetForm();
            } else {
                alert('Failed to save team member');
            }
        } catch (error) {
            console.error('Error saving team member:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to remove this team member?')) return;

        try {
            const response = await fetch(`/api/team/${id}`, { method: 'DELETE' });
            if (response.ok) {
                fetchMembers();
            }
        } catch (error) {
            console.error('Error deleting team member:', error);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload/image', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setImage(data.url);
            } else {
                alert('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading team members...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight italic">Team & Leadership Manager</h2>
                    <p className="text-gray-600 font-medium text-sm">Manage corporate personnel and About Page hero placement</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-globe-red text-white px-6 py-3 rounded-sm font-black hover:bg-black transition shadow-lg uppercase tracking-widest text-xs"
                >
                    + Add New Member
                </button>
            </div>

            {/* Global Visibility Control */}
            <div className="bg-white p-6 rounded-sm border-l-8 border-globe-black shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-100">
                <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-sm border-2 transition-colors ${showTeamSection ? 'bg-green-50 border-green-200 text-green-600' : 'bg-red-50 border-red-200 text-red-600'}`}>
                        {showTeamSection ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.04m5.753-1.606A9.954 9.954 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l3.59 3.59m0 0A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m-3.99-3.99a3 3 0 11-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                        )}
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-globe-black uppercase tracking-tight">Global Visibility Controller</h4>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Status: <span className={showTeamSection ? 'text-green-600' : 'text-red-500'}>{showTeamSection ? 'ACTIVE ON PUBLIC PAGES' : 'HIDDEN FROM PUBLIC PAGES'}</span></p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-gray-50 px-6 py-3 rounded-sm border border-gray-100">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{showTeamSection ? 'DEACTIVATE' : 'ACTIVATE'} SECTION</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={showTeamSection} 
                            onChange={(e) => handleToggleGlobalVisibility(e.target.checked)}
                            className="sr-only peer"
                            disabled={savingSettings}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-globe-red"></div>
                    </label>
                </div>
            </div>

            {isAdding && (
                <div className="bg-white p-8 rounded-sm border-l-8 border-globe-red shadow-2xl animate-fade-in">
                    <h3 className="text-xl font-black mb-6 uppercase tracking-tight underline decoration-globe-red decoration-2 underline-offset-8">
                        {editingMember ? 'Update Personnel Record' : 'Enroll New Expert'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-sm outline-none focus:ring-2 focus:ring-globe-red transition text-gray-900 font-bold"
                                    placeholder="Kapil Sachdev"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Designation</label>
                                <input
                                    type="text"
                                    value={designation}
                                    onChange={(e) => setDesignation(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-sm outline-none focus:ring-2 focus:ring-globe-red transition text-gray-900 font-bold"
                                    placeholder="Chief Solution Provider"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Personnel Photo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-sm outline-none focus:ring-2 focus:ring-globe-red transition bg-gray-50 text-gray-900 font-bold text-sm"
                                />
                                {image && (
                                    <div className="relative mt-4 aspect-square max-w-[200px] rounded-sm overflow-hidden border-2 border-gray-100 shadow-xl">
                                        <Image src={image} alt="Preview" fill className="object-cover" />
                                    </div>
                                )}
                            </div>
                            <div className="bg-gray-50 p-6 rounded-sm border border-gray-100 mt-6 md:mt-0">
                                <div className="flex items-center gap-4">
                                    <input
                                        type="checkbox"
                                        id="showOnAbout"
                                        checked={showOnAbout}
                                        onChange={(e) => setShowOnAbout(e.target.checked)}
                                        className="w-6 h-6 rounded border-gray-300 text-globe-red focus:ring-globe-red cursor-pointer"
                                    />
                                    <div>
                                        <label htmlFor="showOnAbout" className="text-sm font-black text-globe-black cursor-pointer uppercase tracking-tight">Highlight on About Page</label>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">If enabled, this member's image will be used in the first section of the About page. Only one member can be highlighted.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-8 py-3 bg-gray-100 rounded-sm font-black text-gray-600 hover:bg-gray-200 transition uppercase tracking-widest text-xs"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting || uploading}
                                className="px-8 py-3 bg-globe-black text-white rounded-sm font-black hover:bg-globe-red transition disabled:opacity-50 uppercase tracking-widest text-xs shadow-xl"
                            >
                                {submitting ? 'Authenticating...' : uploading ? 'Transmitting Photo...' : editingMember ? 'Apply Updates' : 'Authorize Enrollment'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {members.map((member) => (
                    <div key={member._id} className="bg-white rounded-sm border border-gray-100 overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-300">
                        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                            <Image src={member.image} alt={member.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            {member.showOnAbout && (
                                <div className="absolute top-3 left-3 bg-globe-red text-white text-[9px] font-black px-2 py-1 rounded-sm uppercase tracking-widest shadow-lg animate-pulse">
                                    Featured Leader
                                </div>
                            )}
                        </div>
                        <div className="p-5">
                            <h4 className="font-black text-globe-black text-lg uppercase tracking-tight truncate">{member.name}</h4>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest truncate mb-6 pb-2 border-b border-gray-50">{member.designation}</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(member)}
                                    className="flex-1 py-3 text-[10px] font-black text-globe-black border-2 border-globe-black rounded-sm hover:bg-globe-black hover:text-white transition uppercase tracking-widest"
                                >
                                    Refine
                                </button>
                                <button
                                    onClick={() => handleDelete(member._id)}
                                    className="py-3 px-4 text-red-500 border-2 border-red-100 rounded-sm hover:bg-red-50 transition"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {members.length === 0 && !isAdding && (
                    <div className="col-span-full py-20 text-center bg-gray-50 rounded-sm border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 font-black uppercase tracking-[0.2em] italic mb-4">No personnel records found in the database.</p>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Enroll your first team member to populate the public interfaces.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
