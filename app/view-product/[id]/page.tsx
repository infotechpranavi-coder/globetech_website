'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PremiumHero from '@/components/PremiumHero';

interface Product {
    _id: string;
    title: string;
    description: string;
    image: string;
    price?: string;
    specifications?: Array<{ key: string; value: string }>;
    gallery?: string[];
    youtubeUrl?: string;
    isSqFt?: boolean;
}

const DUMMY_PRODUCTS: { [key: string]: Product } = {
    "demo-1": {
        _id: "demo-1",
        title: "High Speed Doors",
        description: "Durable high-speed doors designed for efficiency, safety, and smooth operation in demanding industrial environments.",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070&auto=format&fit=crop",
        price: "₹1,200",
        specifications: [
            { key: "Minimum Order Quantity", value: "50 sq ft" },
            { key: "Material", value: "Stainless Steel" },
            { key: "Open Style", value: "Slide" },
            { key: "Surface Finish", value: "Painted" },
            { key: "Type", value: "Automatic" },
            { key: "Size", value: "16 Feet" },
            { key: "Opening Style", value: "Sliding" },
            { key: "Mechanism", value: "Remote" },
            { key: "Usage/Application", value: "both commercial and residence" },
            { key: "Frequency", value: "50 Hz" },
            { key: "Voltage", value: "220-240 V" },
            { key: "Power Source", value: "Electric" },
            { key: "Operating Temperature", value: "-20 C + 55 Degree C" },
            { key: "Motor Speed", value: "1380 r/min" }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1000",
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
            "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000"
        ]
    }
};

const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regExp);
    return match ? match[1] : null;
};

export default function ProductDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [quoteForm, setQuoteForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [submittingQuote, setSubmittingQuote] = useState(false);
    const [quoteSuccess, setQuoteSuccess] = useState(false);
    const [globalBrochure, setGlobalBrochure] = useState('');

    useEffect(() => {
        fetchGlobalSettings();
        if (params.id) {
            fetchProduct();
        }
    }, [params.id]);

    const fetchGlobalSettings = async () => {
        try {
            const response = await fetch('/api/settings');
            if (response.ok) {
                const data = await response.json();
                setGlobalBrochure(data.brochureUrl || '');
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        }
    };

    useEffect(() => {
        if (product) {
            if (product.youtubeUrl) {
                setSelectedImage('youtube');
            } else {
                setSelectedImage(product.image);
            }
        }
    }, [product]);

    const fetchProduct = async () => {
        const id = params.id as string;

        // Check for dummy data first
        if (DUMMY_PRODUCTS[id]) {
            setProduct(DUMMY_PRODUCTS[id]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`/api/products/${id}`);
            if (!response.ok) throw new Error('Product not found');
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="flex items-center justify-center h-96">
                    <div className="w-12 h-12 border-4 border-gray-100 border-t-globe-red rounded-full animate-spin"></div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <h2 className="text-2xl font-black text-globe-black mb-4 uppercase tracking-tight">Product Not Found</h2>
                        <button
                            onClick={() => router.push('/')}
                            className="text-globe-red font-bold hover:underline uppercase tracking-widest text-sm"
                        >
                            Go back to homepage
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <Header />

            <PremiumHero
                titlePrefix="PRODUCT"
                titleSuffix="DETAILS"
                description={product.title}
                backgroundImage={product.image}
            />

            <div className="container mx-auto px-4 max-w-7xl py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Image Area */}
                    <div className="lg:col-span-7">
                        <div className="relative aspect-video rounded-sm overflow-hidden shadow-[0_0_50px_rgba(238,42,36,0.15)] border-4 border-white/5 ring-1 ring-white/10 group mb-6 bg-globe-black">
                            {selectedImage === 'youtube' && product.youtubeUrl ? (
                                <div className="absolute inset-0 w-full h-full">
                                    <iframe
                                        className="absolute inset-0 w-full h-full"
                                        src={`https://www.youtube.com/embed/${getYoutubeId(product.youtubeUrl)}?autoplay=1&mute=1&loop=1&playlist=${getYoutubeId(product.youtubeUrl)}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    ></iframe>
                                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-globe-red opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-globe-red opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                </div>
                            ) : selectedImage && (selectedImage.match(/\.(mp4|webm|ogg)$/i) || selectedImage.includes('video')) ? (
                                <video
                                    src={selectedImage}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    controls
                                    autoPlay
                                    muted
                                    loop
                                />
                            ) : getYoutubeId(selectedImage || product.image) ? (
                                <div className="absolute inset-0 w-full h-full">
                                    <iframe
                                        className="absolute inset-0 w-full h-full"
                                        src={`https://www.youtube.com/embed/${getYoutubeId(selectedImage || product.image)}?autoplay=1&mute=1&loop=1&playlist=${getYoutubeId(selectedImage || product.image)}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    ></iframe>
                                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-globe-red opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-globe-red opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                </div>
                            ) : (
                                <Image
                                    src={selectedImage || product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover transition-all duration-500 ease-in-out"
                                    priority
                                />
                            )}
                        </div>

                        {/* Gallery Thumbnails */}
                        {(product.gallery && product.gallery.length > 0 || product.youtubeUrl) && (
                            <div className="grid grid-cols-4 md:grid-cols-5 gap-3 mb-10">
                                <button
                                    onClick={() => setSelectedImage(product.image)}
                                    className={`relative aspect-square rounded-sm overflow-hidden border-2 transition-all ${selectedImage === product.image ? 'border-globe-red ring-2 ring-globe-red ring-opacity-50' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    {getYoutubeId(product.image) ? (
                                        <div className="relative w-full h-full">
                                            <img src={`https://img.youtube.com/vi/${getYoutubeId(product.image)}/0.jpg`} alt="Main Thumbnail" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20"><span className="text-white text-xs">▶</span></div>
                                        </div>
                                    ) : product.image.match(/\.(mp4|webm|ogg)$/i) || product.image.includes('video') ? (
                                        <video src={product.image} className="w-full h-full object-cover" />
                                    ) : (
                                        <Image src={product.image} alt="Main" fill className="object-cover" />
                                    )}
                                </button>
                                
                                {product.youtubeUrl && (
                                    <button
                                        onClick={() => setSelectedImage('youtube')}
                                        className={`relative aspect-square rounded-sm overflow-hidden border-2 transition-all group ${selectedImage === 'youtube' ? 'border-globe-red ring-2 ring-globe-red ring-opacity-50' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                        <img 
                                            src={`https://img.youtube.com/vi/${getYoutubeId(product.youtubeUrl)}/0.jpg`} 
                                            alt="YouTube Video" 
                                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100" 
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="bg-white/90 p-2 rounded-full shadow-lg">
                                                <span className="text-globe-red text-xl">▶</span>
                                            </div>
                                        </div>
                                    </button>
                                )}

                                {product.gallery?.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(item)}
                                        className={`relative aspect-square rounded-sm overflow-hidden border-2 transition-all ${selectedImage === item ? 'border-globe-red ring-2 ring-globe-red ring-opacity-50' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                        {getYoutubeId(item) ? (
                                            <div className="relative w-full h-full">
                                                <img src={`https://img.youtube.com/vi/${getYoutubeId(item)}/0.jpg`} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20"><span className="text-white text-xs">▶</span></div>
                                            </div>
                                        ) : item.match(/\.(mp4|webm|ogg)$/i) || item.includes('video') ? (
                                            <video src={item} className="w-full h-full object-cover" />
                                        ) : (
                                            <Image src={item} alt={`Gallery ${index}`} fill sizes="10vw" className="object-cover" />
                                        )}
                                        {getYoutubeId(item) || item.match(/\.(mp4|webm|ogg)$/i) || item.includes('video') ? (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                <span className="text-white text-xl">▶</span>
                                            </div>
                                        ) : null}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Specifications Table */}
                        {product.specifications && product.specifications.length > 0 && (
                            <div className="mt-12">
                                <h3 className="text-2xl font-black text-globe-black mb-8 uppercase tracking-tight flex items-center gap-3">
                                    <span className="w-8 h-[2px] bg-globe-red"></span>
                                    Product Details:
                                </h3>
                                <div className="border border-gray-100 rounded-sm overflow-hidden shadow-sm">
                                    <table className="w-full text-left border-collapse">
                                        <tbody>
                                            {product.specifications.map((spec, index) => (
                                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                    <td className="py-4 px-6 text-sm font-bold text-gray-500 tracking-wider border-r border-gray-100 w-1/3">
                                                        {spec.key}
                                                    </td>
                                                    <td className="py-4 px-6 text-sm font-medium text-gray-900">
                                                        {spec.value}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-5 flex flex-col lg:-mt-28">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-1 h-8 bg-globe-red"></div>
                            <span className="text-gray-400 font-bold tracking-widest text-sm uppercase">Technical Solution</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-globe-black mb-4 leading-tight tracking-tight">
                            {product.title}
                        </h1>

                        {product.price && (
                            <div className="mb-8 p-6 bg-gray-50 border-l-4 border-globe-red rounded-sm">
                                <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Approx Price</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-black text-globe-red">{product.price}</span>
                                    {product.isSqFt !== false && <span className="text-sm font-bold text-gray-500">/ sq ft</span>}
                                </div>
                            </div>
                        )}


                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => setIsQuoteModalOpen(true)}
                                className="w-full bg-globe-red text-white font-black py-5 px-8 rounded-sm hover:bg-black transition-all transform hover:-translate-y-1 shadow-lg uppercase tracking-widest text-sm"
                            >
                                Request Quotation
                            </button>
                            {globalBrochure ? (
                                <a
                                    href={`/api/download-brochure?url=${encodeURIComponent(globalBrochure)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-globe-black text-white font-black py-5 px-8 rounded-sm hover:bg-globe-red transition-all transform hover:-translate-y-1 shadow-lg uppercase tracking-widest text-sm text-center block"
                                >
                                    Download Specs PDF
                                </a>
                            ) : (
                                <button disabled className="w-full bg-gray-300 text-gray-500 font-black py-5 px-8 rounded-sm cursor-not-allowed uppercase tracking-widest text-sm">
                                    Specs PDF Not Available
                                </button>
                            )}
                        </div>

                        {/* Quotation Modal */}
                        {isQuoteModalOpen && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                                <div className="bg-white w-full max-w-md rounded-sm p-8 relative shadow-2xl animate-fadeIn">
                                    <button
                                        onClick={() => setIsQuoteModalOpen(false)}
                                        className="absolute top-4 right-4 text-gray-400 hover:text-globe-red transition"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>

                                    <h3 className="text-2xl font-black text-globe-black mb-6 uppercase tracking-tight">Request Quotation</h3>

                                    {quoteSuccess ? (
                                        <div className="text-center py-8">
                                            <div className="text-5xl mb-4">✅</div>
                                            <h4 className="text-xl font-bold text-gray-900 mb-2">Request Sent!</h4>
                                            <p className="text-gray-600 mb-6">We'll get back to you shortly.</p>
                                            <button
                                                onClick={() => { setIsQuoteModalOpen(false); setQuoteSuccess(false); }}
                                                className="bg-globe-black text-white font-bold py-3 px-8 rounded-sm hover:bg-globe-red transition uppercase text-sm"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={async (e) => {
                                            e.preventDefault();
                                            setSubmittingQuote(true);

                                            try {
                                                const response = await fetch('/api/orders', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    },
                                                    body: JSON.stringify({
                                                        name: quoteForm.name,
                                                        email: quoteForm.email,
                                                        phone: quoteForm.phone,
                                                        subject: product.title,
                                                        message: quoteForm.message || `Quotation request for ${product.title}`,
                                                    }),
                                                });

                                                if (response.ok) {
                                                    setQuoteSuccess(true);
                                                    setQuoteForm({ name: '', email: '', phone: '', message: '' });
                                                } else {
                                                    throw new Error('Failed to submit request');
                                                }
                                            } catch (error) {
                                                console.error('Error submitting quotation:', error);
                                                alert('Failed to submit request. Please try again.');
                                            } finally {
                                                setSubmittingQuote(false);
                                            }
                                        }} className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    className="w-full border border-gray-300 p-3 rounded-sm outline-none focus:ring-2 focus:ring-globe-red transition text-gray-900"
                                                    value={quoteForm.name}
                                                    onChange={e => setQuoteForm({ ...quoteForm, name: e.target.value })}
                                                    placeholder="Your full name"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email</label>
                                                <input
                                                    required
                                                    type="email"
                                                    className="w-full border border-gray-300 p-3 rounded-sm outline-none focus:ring-2 focus:ring-globe-red transition text-gray-900"
                                                    value={quoteForm.email}
                                                    onChange={e => setQuoteForm({ ...quoteForm, email: e.target.value })}
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Phone</label>
                                                <input
                                                    required
                                                    type="tel"
                                                    className="w-full border border-gray-300 p-3 rounded-sm outline-none focus:ring-2 focus:ring-globe-red transition text-gray-900"
                                                    value={quoteForm.phone}
                                                    onChange={e => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                                                    placeholder="Your contact number"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Message (Optional)</label>
                                                <textarea
                                                    className="w-full border border-gray-300 p-3 rounded-sm outline-none focus:ring-2 focus:ring-globe-red transition text-gray-900 h-24 resize-none"
                                                    value={quoteForm.message}
                                                    onChange={e => setQuoteForm({ ...quoteForm, message: e.target.value })}
                                                    placeholder="Specific requirements..."
                                                ></textarea>
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={submittingQuote}
                                                className="w-full bg-globe-red text-white font-black py-4 rounded-sm hover:bg-black transition uppercase tracking-widest text-sm mt-2"
                                            >
                                                {submittingQuote ? 'Sending...' : 'Submit Request'}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="mt-12 pt-8 border-t border-gray-100 grid grid-cols-2 gap-8 mb-10">
                            <div>
                                <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Compliance</span>
                                <span className="font-bold text-gray-900">ISO 9001:2015</span>
                            </div>
                            <div>
                                <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Support</span>
                                <span className="font-bold text-gray-900">24/7 Technical Assistance</span>
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed italic border-l-4 border-gray-100 pl-6 normal-case">
                            {product.description}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
