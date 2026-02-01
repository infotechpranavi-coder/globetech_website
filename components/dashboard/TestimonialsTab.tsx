'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Testimonial {
    _id?: string;
    name: string;
    role: string;
    quote: string;
    description: string;
    image: string;
    createdAt?: string;
}

export default function TestimonialsTab() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial | null>(null);
    const [formData, setFormData] = useState<Testimonial>({
        name: '',
        role: '',
        quote: '',
        description: '',
        image: '',
    });
    const [submitting, setSubmitting] = useState(false);

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
        if (testimonial) {
            setCurrentTestimonial(testimonial);
            setFormData(testimonial);
        } else {
            setCurrentTestimonial(null);
            setFormData({
                name: '',
                role: '',
                quote: '',
                description: '',
                image: '',
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
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
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                fetchTestimonials();
                handleCloseModal();
            } else {
                const error = await response.json();
                alert(error.message || 'Something went wrong');
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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
                    <p className="text-gray-600 mt-2">Manage customer reviews and testimonials</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-brand-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-brand-primary-dark transition shadow-md"
                >
                    Add Testimonial
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                    <div key={testimonial._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                        <div className="p-6 flex-grow">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                    <Image
                                        src={testimonial.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"}
                                        alt={testimonial.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="text-brand-secondary font-medium italic mb-2">"{testimonial.quote}"</p>
                            <p className="text-gray-600 text-sm line-clamp-3">{testimonial.description}</p>
                        </div>
                        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
                            <button
                                onClick={() => handleOpenModal(testimonial)}
                                className="text-brand-primary hover:text-brand-primary-dark font-medium text-sm"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => testimonial._id && handleDelete(testimonial._id)}
                                className="text-red-600 hover:text-red-700 font-medium text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

                {testimonials.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-white rounded-xl border-2 border-dashed border-gray-200">
                        <div className="text-4xl mb-4">💬</div>
                        <h3 className="text-gray-900 font-semibold">No testimonials found</h3>
                        <p className="text-gray-500 mt-1">Start by adding your first customer review</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleSubmit}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                                        {currentTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-brand-primary focus:border-brand-primary text-gray-900"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="e.g. Arjun Sharma"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Role / Designation</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-brand-primary focus:border-brand-primary text-gray-900"
                                                value={formData.role}
                                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                                placeholder="e.g. Corporate Executive"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Short Quote *</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-brand-primary focus:border-brand-primary text-gray-900"
                                                value={formData.quote}
                                                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                                                placeholder="e.g. Best real estate agency!"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Review Description</label>
                                            <textarea
                                                rows={4}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-brand-primary focus:border-brand-primary text-gray-900"
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                placeholder="Tell the full story..."
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-brand-primary focus:border-brand-primary text-gray-900"
                                                value={formData.image}
                                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                                placeholder="Paste image URL here"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-brand-primary text-base font-medium text-white hover:bg-brand-primary-dark focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                                    >
                                        {submitting ? 'Saving...' : 'Save Testimonial'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
