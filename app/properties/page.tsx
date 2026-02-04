'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import PremiumHero from '@/components/PremiumHero';

// Wrap the main content in Suspense for useSearchParams
function PropertiesContent() {
    const searchParams = useSearchParams();
    const initialSearch = searchParams.get('search') || '';

    const [properties, setProperties] = useState<any[]>([]);
    const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        fetchProperties();
    }, []);

    useEffect(() => {
        if (properties.length > 0) {
            filterProperties(searchQuery, activeFilter);
        }
    }, [searchQuery, properties, activeFilter]);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/projects');
            if (response.ok) {
                const data = await response.json();
                if (data && data.length > 0) {
                    setProperties(data);
                    setFilteredProperties(data);
                    return;
                }
            }

            // Fallback for UI Preview
            const dummyData = [
                {
                    _id: 'd1',
                    name: 'Vertical High Speed Door',
                    type: 'Industrial',
                    subCategory: 'Industrial',
                    price: 250000,
                    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=800&auto=format&fit=crop',
                    description: 'High-performance vertical rolling door for cleanroom and warehouse environments.'
                },
                {
                    _id: 'd2',
                    name: 'Automatic Boom Barrier',
                    type: 'Security',
                    subCategory: 'Security',
                    price: 85000,
                    image: 'https://images.unsplash.com/photo-1590674899484-d3066d482563?q=80&w=800&auto=format&fit=crop',
                    description: 'Heavy-duty 6m boom barrier with integrated brushless DC motor for high-frequency traffic.'
                },
                {
                    _id: 'd3',
                    name: 'Industrial Sectional Door',
                    type: 'Industrial',
                    subCategory: 'Industrial',
                    price: 320000,
                    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop',
                    description: 'Insulated sectional doors for climate-controlled docking areas and workshops.'
                },
                {
                    _id: 'd4',
                    name: 'Automatic Sliding Gate',
                    type: 'Entrance',
                    subCategory: 'Entrance',
                    price: 150000,
                    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
                    description: 'Full-height perimeter security sliding gate with infrared safety sensors.'
                },
                {
                    _id: 'd5',
                    name: 'UHF Parking System',
                    type: 'Parking',
                    subCategory: 'Parking',
                    price: 120000,
                    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=800&auto=format&fit=crop',
                    description: 'Long-range RFID parking system for seamless vehicle entry and exit management.'
                },
                {
                    _id: 'd6',
                    name: 'Turnstile Access Control',
                    type: 'Security',
                    subCategory: 'Security',
                    price: 95000,
                    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
                    description: 'Biometric tripod turnstile for high-security office lobbies and stadiums.'
                }
            ];
            setProperties(dummyData);
            setFilteredProperties(dummyData);
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterProperties = (query: string, category: string) => {
        let filtered = properties;

        if (category !== 'all') {
            filtered = filtered.filter(prop =>
                prop.type?.toLowerCase().includes(category.toLowerCase()) ||
                prop.subCategory?.toLowerCase().includes(category.toLowerCase())
            );
        }

        if (query) {
            const lowerQuery = query.toLowerCase();
            filtered = filtered.filter((prop) => {
                return (
                    prop.name?.toLowerCase().includes(lowerQuery) ||
                    prop.location?.toLowerCase().includes(lowerQuery) ||
                    prop.description?.toLowerCase().includes(lowerQuery)
                );
            });
        }

        setFilteredProperties(filtered);
    };

    return (
        <main className="min-h-screen bg-[#FDFDFD]">
            <Header />

            <PremiumHero
                titlePrefix="ADVANCED"
                titleSuffix="SOLUTIONS"
                description="Precision-engineered automated systems for high-performance industrial facilities."
                backgroundImage="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600"
            />

            <div className="container mx-auto px-4 max-w-7xl -mt-16 relative z-20 pb-24">
                {/* Glassmorphism Filter Bar */}
                <div className="bg-white/70 backdrop-blur-xl p-2 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 mb-16 sticky top-24">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                        {/* Quick Filter Tabs */}
                        <div className="flex items-center gap-2 p-1 bg-gray-100/50 rounded-xl w-full lg:w-auto overflow-x-auto no-scrollbar">
                            {['all', 'industrial', 'entrance', 'security', 'parking'].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveFilter(cat)}
                                    className={`px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeFilter === cat
                                        ? 'bg-globe-red text-white shadow-lg shadow-globe-red/20'
                                        : 'text-gray-500 hover:text-globe-black hover:bg-white'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full lg:max-w-md">
                            <input
                                type="text"
                                placeholder="Search solutions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/50 border border-gray-100 py-3 px-6 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-globe-red/20 focus:border-globe-red font-bold text-xs uppercase tracking-widest transition-all"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-globe-red">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid Content */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64 gap-4">
                        <div className="w-12 h-12 border-4 border-gray-100 border-t-globe-red rounded-full animate-spin"></div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Loading solutions...</span>
                    </div>
                ) : filteredProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {filteredProperties.map((property, idx) => (
                            <div key={property._id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                                <ProjectCard property={property} />
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
                {!loading && filteredProperties.length > 0 && (
                    <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                                <span className="text-[40px] font-black text-globe-black leading-none">{filteredProperties.length}</span>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Deployments</span>
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

export default function PropertiesPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
            <PropertiesContent />
        </Suspense>
    );
}
