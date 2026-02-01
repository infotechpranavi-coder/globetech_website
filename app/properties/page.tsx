'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';

// Wrap the main content in Suspense for useSearchParams
function PropertiesContent() {
    const searchParams = useSearchParams();
    const initialSearch = searchParams.get('search') || '';

    const [properties, setProperties] = useState<any[]>([]);
    const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(initialSearch);

    useEffect(() => {
        fetchProperties();
    }, []);

    useEffect(() => {
        if (properties.length > 0) {
            filterProperties(searchQuery);
        }
    }, [searchQuery, properties]);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/projects');
            if (response.ok) {
                const data = await response.json();
                // Ensure data is mapped correctly if needed, ProjectCard expects 'property' prop
                setProperties(data);
                setFilteredProperties(data);
            }
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterProperties = (query: string) => {
        if (!query) {
            setFilteredProperties(properties);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = properties.filter((prop) => {
            return (
                prop.name?.toLowerCase().includes(lowerQuery) ||
                prop.location?.toLowerCase().includes(lowerQuery) ||
                prop.developer?.toLowerCase().includes(lowerQuery) ||
                prop.description?.toLowerCase().includes(lowerQuery)
            );
        });
        setFilteredProperties(filtered);
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero Section with Background Image */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=600&fit=crop')",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/60"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tighter">Our Projects</h1>
                </div>
            </section>

            <div className="container mx-auto px-4 max-w-7xl py-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-sm shadow-xl border border-gray-100">
                    <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        <span className="text-globe-black font-black uppercase tracking-widest text-xs whitespace-nowrap">Filter by:</span>

                        {/* Type Filter */}
                        <div className="relative">
                            <select
                                className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-3 pl-6 pr-12 rounded-sm focus:outline-none focus:ring-2 focus:ring-globe-red focus:border-transparent cursor-pointer font-bold text-sm min-w-[160px] uppercase tracking-wider transition-all"
                                onChange={(e) => filterProperties(e.target.value)}
                            >
                                <option value="">All Solutions</option>
                                <option value="industrial">Industrial</option>
                                <option value="entrance">Entrance</option>
                                <option value="security">Security</option>
                                <option value="parking">Parking</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-globe-red">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div className="relative">
                            <select className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-3 pl-6 pr-12 rounded-sm focus:outline-none focus:ring-2 focus:ring-globe-red focus:border-transparent cursor-pointer font-bold text-sm min-w-[160px] uppercase tracking-wider transition-all">
                                <option>All Status</option>
                                <option>Completed</option>
                                <option>Ongoing</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-globe-red">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 md:mt-0 text-gray-400 font-bold uppercase tracking-widest text-xs">
                        Showing <span className="text-globe-red font-black text-lg">{filteredProperties.length}</span> Solutions
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-globe-red"></div>
                    </div>
                ) : filteredProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredProperties.map((property) => (
                            <ProjectCard key={property._id} property={property} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-96 bg-white rounded-sm shadow-xl border border-gray-100">
                        <div className="text-6xl mb-6">⚙️</div>
                        <h3 className="text-2xl font-black text-globe-black mb-2 uppercase tracking-tight">No solutions found</h3>
                        <p className="text-gray-500 font-medium">
                            Try adjusting your filters or browse all automation projects.
                        </p>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="mt-8 px-8 py-3 bg-globe-red text-white rounded-sm font-black hover:bg-black transition-all shadow-lg uppercase tracking-widest"
                            >
                                Clear Search
                            </button>
                        )}
                    </div>
                )}
            </div>

            <Footer />
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
