'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PremiumHero from '@/components/PremiumHero';
import WhyChooseUs from '@/components/WhyChooseUs';

// Custom SVG Icon Components for Technical Parameters
const SettingsIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
    </svg>
);

const ShieldIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 002 12c0 2.514.806 4.852 2.168 6.742L12 22l7.832-3.258C21.194 16.852 22 14.514 22 12c0-3.078-.62-5.94-1.782-8.016z"></path>
    </svg>
);

const ClockIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
);

const ZapIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
    </svg>
);

const ActivityIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
    </svg>
);

const PowerIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
    </svg>
);

const CheckCircleIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
);

const LayersIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 13v-1m4 1v-1m4 1v-1M3 21h18M3 10h18M3 4h18L12 2 3 4zm0 16l9 2 9-2"></path>
    </svg>
);

const MonitorIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-1.75-3M3 13V6a2 2 0 012-2h14a2 2 0 012 2v7m-4 0v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5"></path>
    </svg>
);

const SmartphoneIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
    </svg>
);

const ChevronLeftIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
    </svg>
);

const ChevronRightIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
    </svg>
);


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
    const [currentSlide, setCurrentSlide] = useState(0);
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

    const allImages = product ? [product.image, ...(product.gallery || [])] : [];

    const nextSlide = () => {
        if (!allImages.length) return;
        setCurrentSlide((prev) => (prev + 1) % allImages.length);
    };

    const prevSlide = () => {
        if (!allImages.length) return;
        setCurrentSlide((prev) => (prev - 1 + allImages.length) % allImages.length);
    };

    useEffect(() => {
        if (product) {
            setCurrentSlide(0);
        }
    }, [product]);

    useEffect(() => {
        if (!allImages.length) return;
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [allImages.length, currentSlide]);

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
        <main className="min-h-screen bg-white relative">
            <Header />

            {/* Floating Contact Sidebar */}
            <div className="fixed right-2 top-1/2 -translate-y-1/2 z-[100] flex flex-col bg-black/90 backdrop-blur-md rounded-full overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <button onClick={() => setIsQuoteModalOpen(true)} className="p-4 hover:bg-globe-red transition-all group border-b border-white/5">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
                <a href="https://maps.google.com" target="_blank" className="p-4 hover:bg-globe-red transition-all group border-b border-white/5">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </a>
                <a href="mailto:info@toshiautomation.com" className="p-4 hover:bg-globe-red transition-all group border-b border-white/5">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </a>
                <a href="https://wa.me/918047641503" target="_blank" className="p-4 hover:bg-globe-red transition-all group border-b border-white/5">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </a>
                <a href="tel:918047641503" className="p-4 hover:bg-globe-red transition-all group">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </a>
            </div>

            {/* Top Single-Slide Header */}
            <div className="relative w-full overflow-hidden bg-black">
                <div 
                    className="flex transition-transform duration-1000 ease-in-out h-[450px] md:h-[750px]"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {allImages.map((img, idx) => (
                        <div key={idx} className="flex-none w-full relative group bg-globe-black">
                            {getYoutubeId(img) ? (
                                <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${getYoutubeId(img)}?autoplay=0&mute=1`} frameBorder="0" allowFullScreen></iframe>
                            ) : (
                                <Image src={img} alt={`${product.title} ${idx}`} fill className="object-cover" priority={idx === currentSlide} />
                            )}
                            {/* Premium Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none"></div>
                        </div>
                    ))}
                </div>

                {/* Slider Navigation */}
                <button 
                    onClick={prevSlide} 
                    className="absolute left-8 top-1/2 -translate-y-1/2 bg-black/20 backdrop-blur-xl text-white p-5 rounded-full hover:bg-globe-red transition-all z-20 shadow-2xl border border-white/10 group"
                >
                    <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button 
                    onClick={nextSlide} 
                    className="absolute right-8 top-1/2 -translate-y-1/2 bg-black/20 backdrop-blur-xl text-white p-5 rounded-full hover:bg-globe-red transition-all z-20 shadow-2xl border border-white/10 group"
                >
                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                </button>

                {/* Counter */}
                <div className="absolute bottom-10 left-10 z-20 flex items-center gap-4">
                    <div className="h-[2px] w-24 bg-white/30 overflow-hidden">
                        <div 
                            className="h-full bg-globe-red transition-all duration-[5000ms] ease-linear"
                            style={{ width: '100%' }}
                            key={currentSlide}
                        ></div>
                    </div>
                    <span className="text-white font-black text-xs tracking-widest uppercase">
                        {(currentSlide + 1).toString().padStart(2, '0')} / {allImages.length.toString().padStart(2, '0')}
                    </span>
                </div>
            </div>

            {/* Central Info Bar */}
            <div className="bg-white border-b border-gray-100 sticky top-16 sm:top-24 z-30 shadow-sm">
                <div className="container mx-auto px-4 max-w-7xl py-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-black text-globe-red uppercase tracking-[0.2em]">Product Solution</span>
                            <div className="w-12 h-px bg-gray-200"></div>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-globe-black uppercase tracking-tighter italic">
                            {product.title}
                        </h1>
                    </div>
                    {product.price && (
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Indicative Pricing</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black text-globe-red">{product.price}</span>
                                {product.isSqFt !== false && <span className="text-sm font-bold text-gray-500 uppercase tracking-tighter">/ sq ft</span>}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-8 space-y-16">
                        {/* Description */}
                        <div>
                            <h3 className="text-xl font-black text-globe-black mb-6 uppercase tracking-widest flex items-center gap-4">
                                <span className="w-8 h-1 bg-globe-red"></span>
                                System Overview
                            </h3>
                            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed font-medium italic border-l-4 border-gray-50 pl-8">
                                {product.description}
                            </div>
                        </div>


                        {/* Specifications Card Grid */}
                        {product.specifications && product.specifications.length > 0 && (
                            <div>
                                <h3 className="text-xl font-black text-globe-black mb-10 uppercase tracking-widest flex items-center gap-4">
                                    <span className="w-8 h-1 bg-globe-red"></span>
                                    Technical Parameters
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-gray-100">
                                    {product.specifications.map((spec, index) => {
                                        const iconPaths = [
                                            "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                                            "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                                            "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                                            "M13 10V3L4 14h7v7l9-11h-7z",
                                            "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                                            "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                                        ];
                                        const path = iconPaths[index % iconPaths.length];
                                        return (
                                            <div key={index} className="flex flex-col p-8 border-r border-b border-gray-100 bg-white hover:bg-gray-50/50 transition-colors gap-6 group">
                                                <div className="flex justify-between items-start">
                                                    <svg className="w-8 h-8 text-black group-hover:text-globe-red transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
                                                    </svg>
                                                    <span className="text-lg font-black text-globe-red/30 italic group-hover:text-globe-red transition-colors">
                                                        {(index + 1).toString().padStart(2, '0')}
                                                    </span>
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                                        {spec.key}
                                                    </span>
                                                    <span className="block text-sm font-bold text-gray-900 leading-relaxed uppercase">
                                                        {spec.value}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Actions */}
                    <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit">
                        <div className="bg-white p-8 border-4 border-gray-50 shadow-2xl space-y-8">
                            <div className="text-center pb-6 border-b border-gray-100">
                                <h4 className="text-lg font-black text-globe-black uppercase tracking-widest mb-2 italic">Ready for Installation?</h4>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-tight leading-relaxed">Schedule a technical survey and get an accurate quotation today.</p>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={() => setIsQuoteModalOpen(true)}
                                    className="w-full bg-globe-red text-white font-black py-5 rounded-sm hover:bg-black transition-all shadow-xl uppercase tracking-widest text-sm flex items-center justify-center gap-3"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Request Quotation
                                </button>
                                {globalBrochure ? (
                                    <a
                                        href={`/api/download-brochure?url=${encodeURIComponent(globalBrochure)}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className="w-full bg-globe-black text-white font-black py-5 rounded-sm hover:bg-globe-red transition-all shadow-xl uppercase tracking-widest text-sm text-center block"
                                    >
                                        Download PDF Specs
                                    </a>
                                ) : (
                                    <button disabled className="w-full bg-gray-300 text-gray-500 font-black py-5 rounded-sm cursor-not-allowed uppercase tracking-widest text-sm">PDF Catalogue Unavailable</button>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                                <div className="text-center">
                                    <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Compliance</span>
                                    <span className="text-[10px] font-bold text-gray-900">ISO 9001:2015</span>
                                </div>
                                <div className="text-center border-l border-gray-100">
                                    <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Support</span>
                                    <span className="text-[10px] font-bold text-gray-900">24/7 Experts</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cinematic Video Showcase Section */}
            {product.youtubeUrl && (
                <section className="bg-globe-black py-32 relative overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-5"></div>
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent opacity-20"></div>
                    
                    <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
                        <div className="inline-flex items-center gap-4 mb-10">
                            <div className="h-0.5 w-12 bg-globe-red"></div>
                            <span className="text-globe-red font-black text-xs uppercase tracking-[0.5em]">Demonstration</span>
                            <div className="h-0.5 w-12 bg-globe-red"></div>
                        </div>
                        
                        <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter italic mb-20">
                            SYSTEM <span className="text-globe-red border-t-2 border-b-2 border-globe-red/30 px-4">IN ACTION</span>
                        </h2>

                        {/* Video Player Frame */}
                        <div className="relative group max-w-5xl mx-auto">
                            {/* Glass Glow */}
                            <div className="absolute -inset-4 bg-globe-red/20 blur-3xl opacity-0 group-hover:opacity-50 transition-all duration-1000"></div>
                            
                            <div className="relative aspect-video rounded-xl overflow-hidden border-[12px] border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.8)] bg-black group">
                                <iframe 
                                    className="absolute inset-0 w-full h-full" 
                                    src={`https://www.youtube.com/embed/${getYoutubeId(product.youtubeUrl)}?autoplay=0&rel=0`} 
                                    title={product.title}
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                ></iframe>
                                
                                {/* Tactical Corners */}
                                <div className="absolute top-6 left-6 w-12 h-12 border-t-4 border-l-4 border-globe-red opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                                <div className="absolute bottom-6 right-6 w-12 h-12 border-b-4 border-r-4 border-globe-red opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                            </div>

                            {/* Captions / Details */}
                            <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-10 text-white/40">
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-globe-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                    <span className="text-[10px] font-black uppercase tracking-widest">4K High Definition</span>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-white/20 hidden md:block"></div>
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-globe-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Real-time Kinematics</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Panoramic Quote Terminal (Center Glide-in from Left) */}
            <div className={`fixed inset-0 z-[160] flex items-center justify-center p-4 md:p-10 transition-all duration-700 ${isQuoteModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                {/* Minimal Overlay */}
                <div 
                    className="absolute inset-0 bg-black/40 backdrop-blur-md" 
                    onClick={() => setIsQuoteModalOpen(false)}
                ></div>
                
                <div 
                    className={`relative w-full max-w-7xl bg-white shadow-[0_0_100px_rgba(0,0,0,0.3)] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] border-l-[12px] border-globe-red overflow-hidden sm:rounded-sm ${isQuoteModalOpen ? 'translate-x-0' : '-translate-x-[150%]'}`}
                >
                    <button onClick={() => setIsQuoteModalOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-globe-red transition-all p-3 hover:bg-gray-50 rounded-full z-50">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    <div className="flex flex-col lg:flex-row min-h-[500px]">
                        {/* Column 1: Branding & Context */}
                        <div className="lg:w-1/4 bg-gray-50 p-12 flex flex-col justify-between border-r border-gray-100">
                            <div>
                                <span className="text-globe-red font-black uppercase tracking-[0.4em] text-[10px]">Toshi Automation</span>
                                <h3 className="text-4xl font-black text-globe-black mt-4 uppercase tracking-tighter leading-none italic">Technical Terminal</h3>
                                <div className="w-20 h-2 bg-globe-red mt-6"></div>
                                <p className="mt-10 text-gray-500 font-medium text-sm leading-relaxed italic">Requirement briefing for <br/><span className="text-globe-black font-black uppercase underline decoration-globe-red decoration-2">{product.title}</span></p>
                            </div>
                            
                            <div className="space-y-4 pt-10 border-t border-gray-200/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Support Node Active</span>
                                </div>
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-loose">Automated requirement analysis will commence immediately upon transmission.</p>
                            </div>
                        </div>

                        {/* Success State View */}
                        {quoteSuccess ? (
                            <div className="lg:w-3/4 p-20 flex flex-col items-center justify-center text-center space-y-8 animate-fadeIn">
                                <div className="bg-green-50 w-28 h-28 rounded-full flex items-center justify-center border-8 border-green-100">
                                    <svg className="w-14 h-14 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <h4 className="text-4xl font-black text-globe-black uppercase italic tracking-tighter">Transmission Authorized</h4>
                                <p className="text-gray-500 font-medium text-xl leading-relaxed max-w-lg">Our engineering division has received your requirement. A specialist will initiate contact within 24 operational hours.</p>
                                <button onClick={() => { setIsQuoteModalOpen(false); setQuoteSuccess(false); }} className="px-20 py-6 bg-globe-black text-white font-black hover:bg-globe-red transition-all uppercase text-sm tracking-[0.3em] shadow-2xl">Return to Display</button>
                            </div>
                        ) : (
                            /* Column 2 & 3: Form Controls */
                            <form 
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    setSubmittingQuote(true);
                                    try {
                                        const response = await fetch('/api/orders', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ name: quoteForm.name, email: quoteForm.email, phone: quoteForm.phone, subject: product.title, message: quoteForm.message || `Priority inquiry for ${product.title}` }),
                                        });
                                        if (response.ok) { setQuoteSuccess(true); setQuoteForm({ name: '', email: '', phone: '', message: '' }); }
                                        else { throw new Error('Fail'); }
                                    } catch (error) { alert('Service Interruption. Contact Hotline: +91 80476 41503'); }
                                    finally { setSubmittingQuote(false); }
                                }} 
                                className="lg:w-3/4 flex flex-col lg:flex-row"
                            >
                                {/* Column 2: Personal Identifiers */}
                                <div className="lg:w-1/2 p-12 space-y-12">
                                    <div className="space-y-4">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-3">
                                            <span className="w-6 h-px bg-gray-200"></span>
                                            01. Full Identity
                                        </label>
                                        <input required type="text" className="w-full bg-gray-50/50 border-0 border-b-2 border-gray-100 p-5 outline-none focus:border-globe-red transition text-2xl text-gray-900 font-black placeholder-gray-200" placeholder="Contact Name" value={quoteForm.name} onChange={e => setQuoteForm({ ...quoteForm, name: e.target.value })} />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-3">
                                            <span className="w-6 h-px bg-gray-200"></span>
                                            02. Email Connection
                                        </label>
                                        <input required type="email" className="w-full bg-gray-50/50 border-0 border-b-2 border-gray-100 p-5 outline-none focus:border-globe-red transition text-2xl text-gray-900 font-black placeholder-gray-200" placeholder="your@email.com" value={quoteForm.email} onChange={e => setQuoteForm({ ...quoteForm, email: e.target.value })} />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-3">
                                            <span className="w-6 h-px bg-gray-200"></span>
                                            03. Direct Line
                                        </label>
                                        <input required type="tel" className="w-full bg-gray-50/50 border-0 border-b-2 border-gray-100 p-5 outline-none focus:border-globe-red transition text-2xl text-gray-900 font-black placeholder-gray-200" placeholder="+91 XXXXX XXXXX" value={quoteForm.phone} onChange={e => setQuoteForm({ ...quoteForm, phone: e.target.value })} />
                                    </div>
                                </div>

                                {/* Column 3: Briefing & Submission */}
                                <div className="lg:w-1/2 p-12 bg-white flex flex-col justify-between border-l border-gray-50">
                                    <div className="space-y-4">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-3">
                                            <span className="w-6 h-px bg-gray-200"></span>
                                            04. Requirement Brief
                                        </label>
                                        <textarea className="w-full bg-gray-50/50 border-0 border-b-2 border-gray-100 p-5 outline-none focus:border-globe-red transition text-xl text-gray-900 font-black h-56 resize-none placeholder-gray-200" placeholder="Describe site dimensions, automation level, or custom hardware requirements..." value={quoteForm.message} onChange={e => setQuoteForm({ ...quoteForm, message: e.target.value })} />
                                    </div>

                                    <button type="submit" disabled={submittingQuote} className="w-full bg-globe-red text-white font-black py-8 rounded-sm hover:bg-globe-black transition-all uppercase tracking-[0.3em] shadow-[0_30px_60px_rgba(238,42,36,0.3)] mt-12 flex items-center justify-center gap-6 text-xl group overflow-hidden relative">
                                        <span className={`transition-transform duration-500 ${submittingQuote ? '-translate-y-full' : 'translate-y-0'}`}>
                                            {submittingQuote ? 'Data Syncing...' : 'Transmit Enquiry'}
                                        </span>
                                        {!submittingQuote && <svg className="w-8 h-8 group-hover:translate-x-3 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <WhyChooseUs />
            <Footer />
        </main>
    );
}
