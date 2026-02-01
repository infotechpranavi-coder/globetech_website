'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroSlide {
    _id: string;
    title: string;
    subtitle?: string;
    image: string;
    order: number;
}

export default function HeroManager() {
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);

    // Form state
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [image, setImage] = useState('');
    const [order, setOrder] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/hero');
            if (response.ok) {
                const data = await response.json();
                setSlides(data);
            }
        } catch (error) {
            console.error('Error fetching slides:', error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setTitle('');
        setSubtitle('');
        setImage('');
        setOrder(slides.length);
        setEditingSlide(null);
        setIsAdding(false);
    };

    const handleEdit = (slide: HeroSlide) => {
        setEditingSlide(slide);
        setTitle(slide.title);
        setSubtitle(slide.subtitle || '');
        setImage(slide.image);
        setOrder(slide.order);
        setIsAdding(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const payload = { title, subtitle, image, order };
            const url = editingSlide ? `/api/hero/${editingSlide._id}` : '/api/hero';
            const method = editingSlide ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                fetchSlides();
                resetForm();
            } else {
                alert('Failed to save slide');
            }
        } catch (error) {
            console.error('Error saving slide:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this slide?')) return;

        try {
            const response = await fetch(`/api/hero/${id}`, { method: 'DELETE' });
            if (response.ok) {
                fetchSlides();
            }
        } catch (error) {
            console.error('Error deleting slide:', error);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading hero slides...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Hero Section Manager</h2>
                    <p className="text-gray-600">Manage the carousel slides on your home page</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-brand-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-brand-primary-dark transition shadow-md"
                >
                    + Add New Slide
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-fade-in">
                    <h3 className="text-lg font-bold mb-4">{editingSlide ? 'Edit Slide' : 'Add New Slide'}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Slide Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary transition pr-4"
                                    placeholder="Find Your Sweet Home"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Subtitle / Description</label>
                                <input
                                    type="text"
                                    value={subtitle}
                                    onChange={(e) => setSubtitle(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary transition pr-4"
                                    placeholder="Optional description text"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Background Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary transition bg-white"
                                />
                                {image && (
                                    <div className="relative mt-2 h-32 w-full rounded-lg overflow-hidden border border-gray-200">
                                        <Image src={image} alt="Preview" fill className="object-cover" />
                                    </div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Display Order</label>
                                <input
                                    type="number"
                                    value={order}
                                    onChange={(e) => setOrder(parseInt(e.target.value))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary transition"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-2 border border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-6 py-2 bg-brand-primary text-white rounded-lg font-bold hover:bg-brand-primary-dark transition disabled:opacity-50"
                            >
                                {submitting ? 'Saving...' : 'Save Slide'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {slides.map((slide) => (
                    <div key={slide._id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm group">
                        <div className="relative h-40">
                            <Image src={slide.image} alt={slide.title} fill className="object-cover" />
                            <div className="absolute top-2 left-2 bg-brand-primary/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded">
                                Order: {slide.order}
                            </div>
                        </div>
                        <div className="p-4">
                            <h4 className="font-bold text-gray-900 truncate">{slide.title}</h4>
                            <p className="text-sm text-gray-500 truncate mb-4">{slide.subtitle || 'No subtitle'}</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(slide)}
                                    className="flex-1 py-2 text-sm font-bold text-brand-primary border border-brand-primary rounded-lg hover:bg-brand-primary hover:text-white transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(slide._id)}
                                    className="py-2 px-3 text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {slides.length === 0 && !isAdding && (
                    <div className="col-span-full py-12 text-center bg-white rounded-xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 font-bold">No custom hero slides yet.</p>
                        <p className="text-gray-400 text-sm">Add your first slide to replace the hardcoded content.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
