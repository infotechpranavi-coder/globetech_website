'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PremiumHero from '@/components/PremiumHero';

function ProductsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialSearch = searchParams.get('search') || '';

    const [products, setProducts] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const getYoutubeId = (url: string) => {
        if (!url) return null;
        const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
        const match = url.match(regExp);
        return match ? match[1] : null;
    };

    const isYoutubeUrl = (url: string) => !!getYoutubeId(url);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/products');
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.length > 0) {
                        setProducts(data);
                        setFilteredProducts(data);
                        setLoading(false);
                        return;
                    }
                }

                // Fallback for UI Preview
                const dummyData = [
                    {
                        _id: 'd1',
                        title: 'High Speed Doors',
                        category: 'Industrial',
                        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=800&auto=format&fit=crop',
                        description: 'Durable high-speed doors designed for efficiency, safety, and smooth operation in demanding industrial environments.'
                    },
                    {
                        _id: 'd2',
                        title: 'Boom Barriers',
                        category: 'Security',
                        image: 'https://images.unsplash.com/photo-1590674899484-d3066d482563?q=80&w=800&auto=format&fit=crop',
                        description: 'Efficient boom barriers for secure access control, traffic management, and seamless vehicle flow.'
                    },
                    {
                        _id: 'd3',
                        title: 'Rolling Shutters',
                        category: 'Industrial',
                        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop',
                        description: 'Rolling shutters offering reliable protection, privacy control, and smooth operation for industrial and commercial spaces.'
                    }
                ];
                setProducts(dummyData);
                setFilteredProducts(dummyData);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (products.length >= 0) {
            let filtered = products;

            if (searchQuery) {
                const lowerQuery = searchQuery.toLowerCase();
                filtered = filtered.filter((prod) => {
                    return (
                        prod.title?.toLowerCase().includes(lowerQuery) ||
                        prod.description?.toLowerCase().includes(lowerQuery)
                    );
                });
            }

            setFilteredProducts(filtered);
        }
    }, [searchQuery, products]);

    return (
        <main className="min-h-screen bg-[#FDFDFD]">
            <Header />

            <PremiumHero
                titlePrefix="OUR"
                titleSuffix="PRODUCTS"
                description="Precision-engineered automated systems for high-performance industrial facilities."
                backgroundImage="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop"
            />

            <div className="container mx-auto px-4 max-w-7xl -mt-16 relative z-20 pb-24">

                {/* Grid Content */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                        <div className="w-12 h-12 border-4 border-gray-100 border-t-globe-red rounded-full animate-spin"></div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Loading automation solutions...</span>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product: any, index: number) => (
                            <div
                                key={index}
                                onClick={() => {
                                    const target = product.slug || product._id;
                                    router.push(`/${target}`);
                                }}
                                className="group flex flex-col h-full bg-globe-black overflow-hidden rounded-sm cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Image Area */}
                                <div className="relative aspect-[4/3] overflow-hidden bg-globe-black">
                                    {isYoutubeUrl(product.image || '') || (product.youtubeUrl && (!product.image || isYoutubeUrl(product.image))) ? (
                                        <div className="relative w-full h-full">
                                            <img 
                                                src={`https://img.youtube.com/vi/${getYoutubeId(product.youtubeUrl || product.image)}/maxresdefault.jpg`} 
                                                alt={product.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${getYoutubeId(product.youtubeUrl || product.image)}/0.jpg`;
                                                }}
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="bg-white/90 p-3 rounded-full shadow-lg group-hover:bg-globe-red group-hover:scale-110 transition-all duration-300">
                                                    <span className="text-globe-red text-2xl group-hover:text-white">▶</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <Image
                                            src={product.image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"}
                                            alt={product.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                        />
                                    )}
                                </div>

                                {/* Text Area */}
                                <div className="flex-grow p-8 flex flex-col items-center text-center transition-colors duration-300 group-hover:bg-globe-red">
                                    <h3 className="text-xl font-bold text-globe-red mb-4 group-hover:text-white transition-colors uppercase tracking-tight">
                                        {product.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-white/90 transition-colors">
                                        {product.description?.split(' ').slice(0, 12).join(' ')}...
                                    </p>

                                    <button
                                        className="flex items-center gap-2 text-globe-red font-black text-xs uppercase tracking-widest group-hover:text-white transition-colors"
                                    >
                                        View Details
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7M3 12h18" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black text-globe-black mb-2 uppercase tracking-tight">No solutions found</h3>
                        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">
                            Refine your search parameters to find matching results.
                        </p>
                    </div>
                )}

                {/* Stats Footer */}
                {!loading && filteredProducts.length > 0 && (
                    <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                                <span className="text-[40px] font-black text-globe-black leading-none">{filteredProducts.length}</span>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Solutions</span>
                            </div>
                            <div className="w-px h-12 bg-gray-100 hidden md:block"></div>
                            <div className="flex flex-col">
                                <span className="text-[40px] font-black text-globe-red leading-none">100%</span>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Success Rate</span>
                            </div>
                        </div>
                        <button className="px-10 py-4 bg-globe-black text-white rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-globe-red transition-all shadow-xl shadow-black/10">
                            Download Catalog
                        </button>
                    </div>
                )}
            </div>

            {/* Floating Search Dock (Right Side) */}
            <div className={`fixed right-10 top-1/2 -translate-y-1/2 z-[100] flex items-center gap-2 transition-all duration-500 ${isSearchOpen ? 'translate-x-0' : 'translate-x-[calc(100%-50px)] md:translate-x-[calc(100%-60px)]'}`}>
                <div className={`flex items-center bg-black/90 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl overflow-hidden transition-all duration-500 ${isSearchOpen ? 'w-[300px] md:w-[450px] opacity-100' : 'w-0 opacity-0'}`}>
                    <input 
                        type="text" 
                        placeholder="SEARCH SOLUTIONS..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent border-none outline-none px-8 py-4 text-white font-black text-xs uppercase tracking-[0.2em] placeholder-white/30"
                        autoFocus={isSearchOpen}
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="pr-4 text-white/40 hover:text-white transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    )}
                </div>
                
                <button 
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className={`h-[50px] w-[50px] md:h-[60px] md:w-[60px] rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl border ${isSearchOpen ? 'bg-globe-red border-globe-red scale-90' : 'bg-black border-white/10 active:scale-95 hover:bg-globe-red hover:border-globe-red'}`}
                >
                    {isSearchOpen ? (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                    ) : (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    )}
                </button>
            </div>

            <Footer />

            <style jsx global>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </main>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
            <ProductsContent />
        </Suspense>
    );
}
