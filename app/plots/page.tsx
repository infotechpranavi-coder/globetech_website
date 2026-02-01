'use client';

import { useState, useEffect, Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';

function PlotsContent() {
    const [allPlots, setAllPlots] = useState<any[]>([]);
    const [filteredPlots, setFilteredPlots] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [locations, setLocations] = useState<any[]>([]);

    useEffect(() => {
        fetchPlots();
        fetchLocations();
    }, []);

    const fetchPlots = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/projects');
            if (response.ok) {
                const data = await response.json();
                // Filter specifically for plots
                const onlyPlots = data.filter((item: any) => item.type === 'plot');
                setAllPlots(onlyPlots);
                setFilteredPlots(onlyPlots);
            }
        } catch (error) {
            console.error('Error fetching plots:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchLocations = async () => {
        try {
            const response = await fetch('/api/locations');
            if (response.ok) {
                const data = await response.json();
                setLocations(data);
            }
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const handleFilter = (type: string, value: string) => {
        let filtered = [...allPlots];

        if (type === 'location' && value) {
            filtered = filtered.filter(p => p.location?.toLowerCase() === value.toLowerCase());
        }

        if (type === 'status' && value) {
            // Add status filtering logic if status field is implemented
            // For now, it's a UI placeholder matching the properties page
        }

        setFilteredPlots(filtered);
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=1600&h=600&fit=crop')",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/60"></div>
                </div>

                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tighter">Industrial Sites</h1>
                    <p className="text-xl text-gray-200 font-bold uppercase tracking-widest text-sm">Strategic land and industrial units for your automation projects</p>
                </div>
            </section>

            <div className="container mx-auto px-4 max-w-7xl py-12">
                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 bg-white p-6 rounded-sm shadow-xl border border-gray-100">
                    <div className="flex items-center gap-6 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        <span className="text-gray-700 font-black uppercase tracking-widest text-xs whitespace-nowrap">Filter by:</span>

                        {/* Type Filter */}
                        <div className="relative">
                            <select className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-3 pl-6 pr-12 rounded-sm focus:outline-none focus:ring-2 focus:ring-globe-red focus:border-transparent cursor-pointer font-bold text-sm min-w-[160px] uppercase tracking-wider transition-all">
                                <option value="plot">Industrial Site</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-globe-red">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div className="relative">
                            <select className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-3 pl-6 pr-12 rounded-sm focus:outline-none focus:ring-2 focus:ring-globe-red focus:border-transparent cursor-pointer font-bold text-sm min-w-[160px] uppercase tracking-wider transition-all">
                                <option>All Status</option>
                                <option>Available</option>
                                <option>Leased</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-globe-red">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Location Filter */}
                        <div className="relative">
                            <select
                                className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-3 pl-6 pr-12 rounded-sm focus:outline-none focus:ring-2 focus:ring-globe-red focus:border-transparent cursor-pointer font-bold text-sm min-w-[160px] uppercase tracking-wider transition-all"
                                onChange={(e) => handleFilter('location', e.target.value)}
                            >
                                <option value="">All Regions</option>
                                {locations.map(loc => (
                                    <option key={loc.id} value={loc.name}>{loc.name}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-globe-red">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 md:mt-0 text-gray-500 font-black uppercase tracking-widest text-xs">
                        Showing <span className="text-globe-red font-black underline decoration-2 underline-offset-4">{filteredPlots.length}</span> Sites
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-black text-globe-black uppercase tracking-tighter">Manufacturing Units</h2>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
                    </div>
                ) : filteredPlots.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPlots.map((plot) => (
                            <ProjectCard key={plot._id} property={plot} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="text-6xl mb-4">🏜️</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No plots found</h3>
                        <p className="text-gray-600">
                            We currently don't have any plots matching your criteria.
                        </p>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}

export default function PlotsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
            <PlotsContent />
        </Suspense>
    );
}
