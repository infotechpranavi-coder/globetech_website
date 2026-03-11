'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Testimonial {
    _id?: string;
    name: string;
    quote: string;
    image?: string;
}

export default function TestimonialsTab() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial | null>(null);
    const [formData, setFormData] = useState<Testimonial>({
        name: '',
        quote: '',
        image: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await fetch('/api/testimonials');
            if (response.ok) {
                const data = await response.json();
                setTestimonials(data);
            }
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (testimonial: Testimonial | null = null) => {
        console.log('Opening Modal...', testimonial);
        if (testimonial) {
            setCurrentTestimonial(testimonial);
            setFormData(testimonial);
        } else {
            setCurrentTestimonial(null);
            setFormData({
                name: '',
                quote: '',
                image: '',
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        console.log('Closing Modal...');
        setIsModalOpen(false);
        setCurrentTestimonial(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const url = currentTestimonial
                ? `/api/testimonials/${currentTestimonial._id}`
                : '/api/testimonials';

            const method = currentTestimonial ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    company: formData.name, // Support home page field mapping
                }),
            });

            if (response.ok) {
                fetchTestimonials();
                handleCloseModal();
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error saving testimonial:', error);
            alert('Failed to save testimonial');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this testimonial?')) return;

        try {
            const response = await fetch(`/api/testimonials/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchTestimonials();
            } else {
                alert('Failed to delete testimonial');
            }
        } catch (error) {
            console.error('Error deleting testimonial:', error);
            alert('Error deleting testimonial');
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);
            const uploadData = new FormData();
            uploadData.append('file', file);

            const response = await fetch('/api/upload/image', {
                method: 'POST',
                body: uploadData,
            });

            if (response.ok) {
                const data = await response.json();
                setFormData({ ...formData, image: data.url });
            } else {
                alert('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image');
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-globe-red"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-globe-black tracking-tight">Testimonials</h1>
                    <p className="text-gray-500 mt-2 font-medium">Manage what clients say about Globe-Tech</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-globe-red text-white px-8 py-3 rounded-lg font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl uppercase tracking-wider text-sm"
                >
                    + Add New
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                    <div key={testimonial._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-500">
                        <div className="p-8 flex-grow">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-50">
                                    <Image
                                        src={testimonial.image || "/gs_realty.png"}
                                        alt={testimonial.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-globe-black uppercase tracking-tight">{testimonial.name}</h3>
                                    <div className="w-8 h-0.5 bg-globe-red mt-1"></div>
                                </div>
                            </div>
                            <div className="relative">
                                <span className="absolute -top-4 -left-2 text-4xl text-gray-100 font-serif leading-none">"</span>
                                <p className="text-gray-600 text-lg leading-relaxed italic relative z-10">
                                    {testimonial.quote}
                                </p>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-2">
                            <button
                                onClick={() => handleOpenModal(testimonial)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-bold text-xs uppercase"
                            >
                                ✏️ Edit
                            </button>
                            <button
                                onClick={() => testimonial._id && handleDelete(testimonial._id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-bold text-xs uppercase"
                            >
                                🗑️ Delete
                            </button>
                        </div>
                    </div>
                ))}

                {testimonials.length === 0 && (
                    <div className="col-span-full py-24 text-center bg-white rounded-2xl border-2 border-dashed border-gray-200">
                        <div className="text-6xl mb-6">💬</div>
                        <h3 className="text-globe-black font-black text-2xl uppercase italic">No Testimonials Yet</h3>
                        <p className="text-gray-400 mt-2 font-medium">Your client feedback will appear here once added.</p>
                        <button
                            onClick={() => handleOpenModal()}
                            className="mt-8 bg-globe-red text-white px-8 py-3 rounded-lg font-bold hover:bg-black transition-all shadow-lg uppercase tracking-widest text-sm"
                        >
                            Add Your First
                        </button>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm bg-black/60">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
                        <div className="bg-globe-black px-6 py-4 flex items-center justify-between">
                            <h2 className="text-white font-black uppercase tracking-tighter italic">
                                {currentTestimonial ? 'Update Feedback' : 'New Client Feedback'}
                            </h2>
                            <button onClick={handleCloseModal} className="text-white/60 hover:text-white transition-colors text-2xl font-light">×</button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div>
                                <label className="block text-xs font-black text-globe-black uppercase tracking-[0.2em] mb-2 text-center">Client / Firm Name *</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-100 focus:border-globe-red focus:ring-0 text-gray-900 bg-gray-50 font-bold transition-all outline-none text-center uppercase tracking-tight"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Maruti Suzuki"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-globe-black uppercase tracking-[0.2em] mb-2 text-center">Their Feedback *</label>
                                <textarea
                                    rows={4}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-100 focus:border-globe-red focus:ring-0 text-gray-900 bg-gray-50 font-medium transition-all outline-none resize-none italic"
                                    value={formData.quote}
                                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                                    placeholder="Write the testimonial here..."
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-globe-black uppercase tracking-[0.2em] mb-2 text-center">User Image (Optional)</label>
                                <div className="flex flex-col items-center space-y-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="testimonial-image"
                                    />
                                    <label
                                        htmlFor="testimonial-image"
                                        className="w-full py-3 px-4 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-globe-red hover:bg-red-50 transition-all font-bold text-gray-500 text-xs uppercase"
                                    >
                                        {uploading ? '⌛ Uploading...' : '📁 Choose Photo'}
                                    </label>

                                    {formData.image && (
                                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-gray-50 shadow-md transform rotate-3">
                                            <Image src={formData.image} alt="Preview" fill className="object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, image: '' })}
                                                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                                            >
                                                <span className="text-white text-xs font-bold uppercase">Remove</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-100 text-gray-400 font-bold hover:bg-gray-50 transition-all text-xs uppercase tracking-widest"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting || uploading}
                                    className="flex-1 px-6 py-3 bg-globe-red text-white rounded-lg font-black hover:bg-black transition-all shadow-lg disabled:opacity-50 text-xs uppercase tracking-widest"
                                >
                                    {submitting ? 'Processing...' : 'Save Feedback'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
