'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Location {
    id: string;
    _id?: string;
    name: string;
    state: string;
    image: string;
    propertyCount: number;
}

export default function LocationManager() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        state: '',
        image: '',
        propertyCount: 0
    });
    const [editingId, setEditingId] = useState<string | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const fetchLocations = async () => {
        try {
            const response = await fetch('/api/locations');
            if (response.ok) {
                const data = await response.json();
                setLocations(data);
            }
        } catch (error) {
            console.error('Failed to fetch locations', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        try {
            const uploadData = new FormData();
            uploadData.append('file', file);

            const response = await fetch('/api/upload/image', {
                method: 'POST',
                body: uploadData,
            });

            if (!response.ok) throw new Error('Upload failed');
            const data = await response.json();
            setFormData(prev => ({ ...prev, image: data.url }));
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleEdit = (loc: Location) => {
        setEditingId(loc.id);
        setFormData({
            name: loc.name,
            state: loc.state,
            image: loc.image,
            propertyCount: loc.propertyCount
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this location?')) return;

        try {
            const response = await fetch(`/api/locations/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setMessage('Location deleted successfully');
                fetchLocations();
            } else {
                setMessage('Failed to delete location');
            }
        } catch (error) {
            setMessage('Error deleting location');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            const url = editingId ? `/api/locations/${editingId}` : '/api/locations';
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage(editingId ? 'Location updated successfully!' : 'Location added successfully!');
                setFormData({ name: '', state: '', image: '', propertyCount: 0 });
                setEditingId(null);
                fetchLocations();
            } else {
                const data = await response.json();
                setMessage(data.error || 'Failed to save location');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-brand-primary">Location Management</h2>
                    <p className="text-gray-600 mt-2">Manage "Find By Location" cards</p>
                </div>
            </div>

            {/* Add/Edit Location Form */}
            <div className="mb-10 bg-gray-50/50 p-8 rounded-xl border border-gray-100 shadow-sm transition-all">
                <h3 className="text-xl font-bold mb-6 text-brand-primary">
                    {editingId ? 'Edit Location' : 'Create New Location Card'}
                </h3>
                {message && (
                    <div className={`p-4 rounded-lg mb-6 flex items-center shadow-sm animate-fade-in ${message.includes('success')
                            ? 'bg-green-50 text-green-700 border border-green-100'
                            : 'bg-red-50 text-red-700 border border-red-100'
                        }`}>
                        <span className="mr-2">{message.includes('success') ? '✅' : '❌'}</span>
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">City Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. South Mumbai"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition text-black bg-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">State/Region</label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                placeholder="e.g. Maharashtra"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition text-black bg-white"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider text-black">
                                Location Image
                            </label>
                            <div className="flex flex-col space-y-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-primary file:text-white hover:file:bg-brand-primary-dark cursor-pointer transition"
                                />
                                {uploadingImage && (
                                    <p className="text-xs text-brand-primary animate-pulse flex items-center">
                                        ⏱️ Uploading image to Cloudinary...
                                    </p>
                                )}
                                <div className="flex gap-2 items-center text-gray-400">
                                    <span className="h-px flex-1 bg-gray-200"></span>
                                    <span className="text-[10px] font-bold uppercase">OR</span>
                                    <span className="h-px flex-1 bg-gray-200"></span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Paste manual image URL"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition text-black bg-white text-sm"
                                />
                            </div>
                        </div>

                        {formData.image && (
                            <div className="flex flex-col justify-center">
                                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">Preview</label>
                                <div className="relative h-32 w-full rounded-xl overflow-hidden border-2 border-brand-secondary/20 shadow-md">
                                    <Image src={formData.image} alt="Preview" fill className="object-cover" unoptimized />
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, image: '' })}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting || uploadingImage}
                            className="flex-1 md:flex-none px-10 py-3 bg-brand-primary text-white rounded-lg font-bold hover:bg-brand-primary-dark transition-all transform hover:scale-105 disabled:opacity-50 shadow-lg shadow-brand-primary/20"
                        >
                            {isSubmitting ? 'Saving...' : editingId ? 'Update Location' : 'Save Location Card'}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingId(null);
                                    setFormData({ name: '', state: '', image: '', propertyCount: 0 });
                                }}
                                className="px-10 py-3 bg-white border-2 border-gray-200 text-gray-600 rounded-lg font-bold hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Existing Locations List */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-brand-primary">Active Cards</h3>
                    <div className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {locations.length} Locations
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                        <div className="w-10 h-10 border-4 border-brand-primary border-t-brand-secondary rounded-full animate-spin"></div>
                        <p className="text-gray-500 font-medium">Fetching locations...</p>
                    </div>
                ) : locations.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <div className="text-5xl mb-4 opacity-30">📍</div>
                        <p className="text-gray-500 font-bold">No locations found.</p>
                        <p className="text-gray-400 text-sm">Add your first location card above.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {locations.map((loc) => (
                            <div key={loc.id} className="group bg-white border-2 border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="relative h-44 w-full overflow-hidden">
                                    <Image
                                        src={loc.image}
                                        alt={loc.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                        <button
                                            onClick={() => handleEdit(loc)}
                                            className="bg-white text-brand-primary p-2 rounded-full shadow-lg hover:bg-brand-secondary hover:text-white transition"
                                            title="Edit"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => handleDelete(loc.id)}
                                            className="bg-white text-red-500 p-2 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition"
                                            title="Delete"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                                <div className="p-5 bg-white">
                                    <h4 className="font-extrabold text-xl text-brand-primary">{loc.name}</h4>
                                    <p className="text-gray-500 text-sm font-medium flex items-center">
                                        <span className="mr-1">📍</span> {loc.state}
                                    </p>
                                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                                        <div className="text-xs font-bold text-brand-secondary uppercase tracking-widest bg-brand-secondary/10 px-2 py-1 rounded">
                                            {loc.propertyCount} Properties
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

