'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Industry {
    _id: string;
    name: string;
    image: string;
    order: number;
    showInFooter?: boolean;
}

export default function IndustriesTab() {
    const [industries, setIndustries] = useState<Industry[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingIndustry, setEditingIndustry] = useState<Industry | null>(null);

    // Form state
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [order, setOrder] = useState(0);
    const [showInFooter, setShowInFooter] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchIndustries();
    }, []);

    const fetchIndustries = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/industries');
            if (response.ok) {
                const data = await response.json();
                setIndustries(data);
            }
        } catch (error) {
            console.error('Error fetching industries:', error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setName('');
        setImage('');
        setOrder(industries.length + 1);
        setShowInFooter(false);
        setEditingIndustry(null);
        setIsAdding(false);
    };

    const handleEdit = (industry: Industry) => {
        setEditingIndustry(industry);
        setName(industry.name);
        setImage(industry.image);
        setOrder(industry.order);
        setShowInFooter(industry.showInFooter || false);
        setIsAdding(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const payload = { name, image, order, showInFooter };
            const url = editingIndustry ? `/api/industries/${editingIndustry._id}` : '/api/industries';
            const method = editingIndustry ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                fetchIndustries();
                resetForm();
            } else {
                alert('Failed to save industry');
            }
        } catch (error) {
            console.error('Error saving industry:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this industry?')) return;

        try {
            const response = await fetch(`/api/industries/${id}`, { method: 'DELETE' });
            if (response.ok) {
                fetchIndustries();
            }
        } catch (error) {
            console.error('Error deleting industry:', error);
        }
    };

    const [uploading, setUploading] = useState(false);

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
                const error = await response.json();
                alert(error.error || 'Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading industries...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 uppercase italic tracking-tighter">Industries Manager</h2>
                    <p className="text-gray-600">Manage the "Industries We Serve" section on your homepage</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-globe-red text-white px-6 py-3 rounded-sm font-black uppercase tracking-widest hover:bg-black transition shadow-lg"
                >
                    + Add New Industry
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-8 rounded-sm border-4 border-gray-100 shadow-2xl animate-fade-in max-w-4xl">
                    <h3 className="text-xl font-black mb-6 uppercase italic text-globe-red">
                        {editingIndustry ? 'Edit Industry' : 'Add New Industry'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Industry Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-sm outline-none focus:ring-2 focus:ring-globe-red transition bg-white text-gray-900"
                                placeholder="e.g., Automobile Industry"
                                required
                            />
                        </div>

                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-sm border border-gray-200">
                            <input
                                type="checkbox"
                                id="showInFooter"
                                checked={showInFooter}
                                onChange={(e) => setShowInFooter(e.target.checked)}
                                className="w-5 h-5 text-globe-red border-gray-300 rounded focus:ring-globe-red cursor-pointer"
                            />
                            <label htmlFor="showInFooter" className="text-sm font-black text-gray-700 uppercase tracking-tight cursor-pointer">
                                Show in Footer Expertise Section
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Display Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-sm outline-none focus:ring-2 focus:ring-globe-red transition bg-white file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-black file:uppercase file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                                />
                                {image && (
                                    <div className="relative mt-4 aspect-video w-full rounded-sm overflow-hidden border-2 border-gray-100">
                                        <Image src={image} alt="Preview" fill className="object-cover" />
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Sort Order (Auto-incremented)</label>
                                <input
                                    type="number"
                                    value={order}
                                    onChange={(e) => setOrder(parseInt(e.target.value))}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-sm outline-none focus:ring-2 focus:ring-globe-red transition bg-white text-gray-900 font-bold"
                                />
                                <p className="text-xs text-gray-500 italic">This will determines the number (01, 02...) and position in the slider.</p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-8 py-3 border border-gray-300 rounded-sm font-black uppercase text-xs tracking-widest text-gray-600 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting || uploading}
                                className="px-8 py-3 bg-globe-red text-white rounded-sm font-black uppercase text-xs tracking-widest hover:bg-black transition-all disabled:opacity-50"
                            >
                                {submitting ? 'Saving...' : uploading ? 'Uploading Image...' : 'Save Industry Card'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {industries.map((ind) => (
                    <div key={ind._id} className="bg-white rounded-sm border border-gray-200 overflow-hidden shadow-sm group">
                        <div className="relative aspect-[3/4] bg-globe-black">
                            <Image src={ind.image} alt={ind.name} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-4 left-4 bg-globe-red text-white text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-widest">
                                Order {ind.order}
                            </div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <h4 className="font-black text-white uppercase italic text-lg leading-tight">{ind.name}</h4>
                            </div>
                        </div>
                        <div className="p-4 flex gap-2">
                            <button
                                onClick={() => handleEdit(ind)}
                                className="flex-1 py-2 text-xs font-black uppercase tracking-widest text-globe-red border border-globe-red rounded-sm hover:bg-globe-red hover:text-white transition-all underline-offset-4"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(ind._id)}
                                className="py-2 px-3 text-red-500 border border-red-100 rounded-sm hover:bg-red-50 transition"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}

                {industries.length === 0 && !isAdding && (
                    <div className="col-span-full py-20 text-center bg-white rounded-sm border-4 border-dashed border-gray-100">
                        <p className="text-gray-400 font-black uppercase tracking-widest text-lg">No Industries Featured Yet</p>
                        <p className="text-gray-400 text-sm italic mt-2">Click "Add New Industry" to populate the homepage slider.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
