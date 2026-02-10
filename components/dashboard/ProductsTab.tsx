'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Product {
    _id: string;
    title: string;
    description: string;
    image: string;
    link: string;
    price?: string;
    specifications?: Array<{ key: string; value: string }>;
    gallery?: string[];
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
    const [price, setPrice] = useState('');
    const [specifications, setSpecifications] = useState<Array<{ key: string; value: string }>>([]);
    const [showInFooter, setShowInFooter] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [newSpecKey, setNewSpecKey] = useState('');
    const [newSpecValue, setNewSpecValue] = useState('');

    // Gallery state
    const [gallery, setGallery] = useState<string[]>([]);
    const [galleryUrlInput, setGalleryUrlInput] = useState('');
    const [uploadingGallery, setUploadingGallery] = useState(false);

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
        setPrice('');
        setSpecifications([]);
        setGallery([]);
        setGallery([]);
        setShowInFooter(false);
        setEditingProduct(null);
        setIsAdding(false);
        setNewSpecKey('');
        setNewSpecValue('');
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setTitle(product.title);
        setDescription(product.description || '');
        setImage(product.image);
        setLink(product.link || '#');
        setPrice(product.price || '');
        setSpecifications(product.specifications || []);
        setGallery(product.gallery || []);
        setGallery(product.gallery || []);
        setShowInFooter(product.showInFooter || false);
        setIsAdding(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const payload = { title, description, image, link, price, specifications, gallery, showInFooter };
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

    const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploadingGallery(true);
        try {
            const newUrls: string[] = [];

            for (let i = 0; i < files.length; i++) {
                const formData = new FormData();
                formData.append('file', files[i]);

                const response = await fetch('/api/upload/image', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    newUrls.push(data.url);
                }
            }

            setGallery(prev => [...prev, ...newUrls]);
        } catch (error) {
            console.error('Error uploading gallery files:', error);
            alert('Error uploading files. Please try again.');
        } finally {
            setUploadingGallery(false);
        }
    };

    const addGalleryUrl = () => {
        if (galleryUrlInput) {
            setGallery([...gallery, galleryUrlInput]);
            setGalleryUrlInput('');
        }
    };

    const removeGalleryItem = (index: number) => {
        setGallery(gallery.filter((_, i) => i !== index));
    };


    const addSpecification = () => {
        if (newSpecKey && newSpecValue) {
            setSpecifications([...specifications, { key: newSpecKey, value: newSpecValue }]);
            setNewSpecKey('');
            setNewSpecValue('');
        }
    };

    const removeSpecification = (index: number) => {
        setSpecifications(specifications.filter((_, i) => i !== index));
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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Approx Price / sq ft</label>
                                        <input
                                            type="text"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-sm outline-none focus:ring-2 focus:ring-globe-red transition bg-white text-gray-900"
                                            placeholder="e.g., ₹500"
                                        />
                                    </div>
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

                                <div className="space-y-4 pt-4 border-t border-gray-100">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Technical Specifications</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            value={newSpecKey}
                                            onChange={(e) => setNewSpecKey(e.target.value)}
                                            placeholder="e.g., Material"
                                            className="px-3 py-2 border border-gray-300 rounded-sm text-sm text-gray-900 bg-white"
                                        />
                                        <input
                                            type="text"
                                            value={newSpecValue}
                                            onChange={(e) => setNewSpecValue(e.target.value)}
                                            placeholder="e.g., Stainless Steel"
                                            className="px-3 py-2 border border-gray-300 rounded-sm text-sm text-gray-900 bg-white"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addSpecification}
                                        className="w-full py-2 bg-gray-100 text-gray-600 font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition"
                                    >
                                        + Add Specification
                                    </button>

                                    {specifications.length > 0 && (
                                        <div className="space-y-2 mt-4">
                                            {specifications.map((spec, index) => (
                                                <div key={index} className="flex justify-between items-center bg-gray-50 p-2 border border-gray-200 rounded-sm">
                                                    <span className="text-xs font-bold uppercase text-gray-900">{spec.key}: <span className="font-medium normal-case text-gray-700">{spec.value}</span></span>
                                                    <button type="button" onClick={() => removeSpecification(index)} className="text-red-500 hover:text-red-700">×</button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
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
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Product Engineering Shot (Image/Video)</label>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-globe-red">Option 1: Paste Direct URL</label>
                                        <input
                                            type="text"
                                            value={image}
                                            onChange={(e) => setImage(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-sm outline-none focus:ring-2 focus:ring-globe-red transition bg-white text-gray-900 text-sm"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                    </div>

                                    <div className="relative py-2">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-200"></div>
                                        </div>
                                        <div className="relative flex justify-center text-[10px] uppercase font-black text-gray-400">
                                            <span className="bg-white px-2 italic">OR</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-globe-red">Option 2: Upload from Computer</label>
                                        <div
                                            className="relative aspect-video w-full rounded-sm border-4 border-dashed border-gray-100 flex items-center justify-center overflow-hidden cursor-pointer hover:border-globe-red transition-all group"
                                            onClick={() => document.getElementById('product-image-upload')?.click()}
                                        >
                                            {image ? (
                                                <>
                                                    {image.match(/\.(mp4|webm|ogg)$/i) || image.includes('video') ? (
                                                        <video src={image} className="w-full h-full object-cover" controls={false} autoPlay muted loop />
                                                    ) : (
                                                        <Image src={image} alt="Preview" fill className="object-cover" />
                                                    )}
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <span className="text-white text-[10px] font-black uppercase tracking-widest">Change Media</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-center p-8">
                                                    <span className="text-4xl">📸</span>
                                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-4">{uploading ? 'Uploading...' : 'Click to upload photo/video'}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <input
                                    id="product-image-upload"
                                    type="file"
                                    accept="image/*,video/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                <p className="text-[10px] text-gray-400 italic">Professional industrial shots/videos only. Max file size: 50MB.</p>
                            </div>

                            {/* Gallery Section */}
                            <div className="space-y-4 pt-6 border-t border-gray-100">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Product Gallery (Multiple Images/Videos)</label>

                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={galleryUrlInput}
                                            onChange={(e) => setGalleryUrlInput(e.target.value)}
                                            className="flex-grow px-3 py-2 border border-gray-300 rounded-sm outline-none focus:ring-2 focus:ring-globe-red transition bg-white text-gray-900 text-sm"
                                            placeholder="Paste image/video URL via link..."
                                        />
                                        <button
                                            type="button"
                                            onClick={addGalleryUrl}
                                            className="px-4 py-2 bg-gray-100 text-gray-700 font-bold uppercase text-xs rounded-sm hover:bg-gray-200"
                                        >
                                            Add
                                        </button>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-200"></div>
                                        </div>
                                        <div className="relative flex justify-center text-[10px] uppercase font-black text-gray-400">
                                            <span className="bg-white px-2 italic">OR UPLOAD</span>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => document.getElementById('gallery-upload')?.click()}
                                        disabled={uploadingGallery}
                                        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-sm text-gray-500 font-bold text-xs uppercase hover:border-globe-red hover:text-globe-red transition bg-gray-50"
                                    >
                                        {uploadingGallery ? 'Uploading...' : '+ Upload Multiple Files'}
                                    </button>
                                    <input
                                        id="gallery-upload"
                                        type="file"
                                        multiple
                                        accept="image/*,video/*"
                                        onChange={handleGalleryUpload}
                                        className="hidden"
                                    />

                                    {/* Gallery Grid */}
                                    {gallery.length > 0 && (
                                        <div className="grid grid-cols-3 gap-2 mt-4">
                                            {gallery.map((url, index) => (
                                                <div key={index} className="relative aspect-square border border-gray-200 rounded-sm overflow-hidden group">
                                                    {url.match(/\.(mp4|webm|ogg)$/i) || url.includes('video') ? (
                                                        <video src={url} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Image src={url} alt={`Gallery ${index}`} fill className="object-cover" />
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeGalleryItem(index)}
                                                        className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
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
