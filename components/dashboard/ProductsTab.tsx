'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Product {
    _id: string;
    title: string;
    description: string;
    image: string;
    link: string;
    showInFooter?: boolean;
}

export default function ProductsTab() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [link, setLink] = useState('#');
    const [showInFooter, setShowInFooter] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/products');
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setImage('');
        setLink('#');
        setShowInFooter(false);
        setEditingProduct(null);
        setIsAdding(false);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setTitle(product.title);
        setDescription(product.description || '');
        setImage(product.image);
        setLink(product.link || '#');
        setShowInFooter(product.showInFooter || false);
        setIsAdding(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const payload = { title, description, image, link, showInFooter };
            const url = editingProduct ? `/api/products/${editingProduct._id}` : '/api/products';
            const method = editingProduct ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                fetchProducts();
                resetForm();
            } else {
                alert('Failed to save product');
            }
        } catch (error) {
            console.error('Error saving product:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
            if (response.ok) {
                fetchProducts();
            }
        } catch (error) {
            console.error('Error deleting product:', error);
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

    if (loading) return <div className="p-8 text-center text-gray-500">Loading products...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 uppercase italic tracking-tighter">Products Portfolio</h2>
                    <p className="text-gray-600">Manage the technical solutions displayed in your "Automation Solutions" grid</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-globe-red text-white px-6 py-3 rounded-sm font-black uppercase tracking-widest hover:bg-black transition shadow-lg"
                >
                    + Add New Product
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-8 rounded-sm border-4 border-gray-100 shadow-2xl animate-fade-in max-w-4xl">
                    <h3 className="text-xl font-black mb-6 uppercase italic text-globe-red">
                        {editingProduct ? 'Edit Product Details' : 'Register New Product'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Product Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-sm outline-none focus:ring-2 focus:ring-globe-red transition bg-white text-gray-900"
                                        placeholder="e.g., High Speed Doors"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Detail Link (Optional)</label>
                                    <input
                                        type="text"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-sm outline-none focus:ring-2 focus:ring-globe-red transition bg-white text-gray-900"
                                        placeholder="#"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Technical Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-sm outline-none focus:ring-2 focus:ring-globe-red transition bg-white text-gray-900 h-32 resize-none"
                                        placeholder="Enter detailed technical specs/summary..."
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
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Product Engineering Shot</label>
                                <div
                                    className="relative aspect-square w-full rounded-sm border-4 border-dashed border-gray-100 flex items-center justify-center overflow-hidden cursor-pointer hover:border-globe-red transition-all"
                                    onClick={() => document.getElementById('product-image-upload')?.click()}
                                >
                                    {image ? (
                                        <Image src={image} alt="Preview" fill className="object-cover" />
                                    ) : (
                                        <div className="text-center p-8">
                                            <span className="text-4xl">📸</span>
                                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-4">Click to upload photo</p>
                                        </div>
                                    )}
                                </div>
                                <input
                                    id="product-image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                <p className="text-[10px] text-gray-400 italic">Recommended aspect ratio: 4:3 or 1:1 square. Professional industrial shots only.</p>
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
                                {submitting ? 'Processing...' : uploading ? 'Uploading...' : 'Deploy Product Card'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div key={product._id} className="bg-white rounded-sm border border-gray-200 overflow-hidden shadow-sm group flex flex-col h-full">
                        <div className="relative aspect-video bg-globe-black">
                            <Image src={product.image} alt={product.title} fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="p-6 flex-grow">
                            <h4 className="font-black text-globe-black uppercase italic text-xl mb-3">{product.title}</h4>
                            <p className="text-gray-500 text-sm line-clamp-3 mb-6 font-medium italic leading-relaxed">
                                {product.description}
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(product)}
                                    className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-globe-red border border-globe-red rounded-sm hover:bg-globe-red hover:text-white transition-all"
                                >
                                    Modify Product
                                </button>
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="py-3 px-4 text-red-500 border border-red-500 bg-red-50 rounded-sm hover:bg-red-100 hover:text-red-700 transition"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {products.length === 0 && !isAdding && (
                    <div className="col-span-full py-20 text-center bg-white rounded-sm border-4 border-dashed border-gray-100">
                        <p className="text-gray-400 font-black uppercase tracking-widest text-lg">No Products Registered</p>
                        <p className="text-gray-400 text-sm italic mt-2">Start showcasing your automation solutions by adding a new product.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
