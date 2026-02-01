'use client';

import { useState, useEffect, Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';

function DubaiProjectsContent() {
    const [allProjects, setAllProjects] = useState<any[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [locations, setLocations] = useState<any[]>([]);

    useEffect(() => {
        fetchProjects();
        fetchLocations();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const [projsRes, locsRes] = await Promise.all([
                fetch('/api/projects'),
                fetch('/api/locations')
            ]);

            if (projsRes.ok && locsRes.ok) {
                const projects = await projsRes.json();
                const locationsData = await locsRes.json();

                setLocations(locationsData);

                // Identify Dubai location IDs
                const dubaiLocationIds = locationsData
                    .filter((loc: any) => loc.name?.toLowerCase().includes('dubai'))
                    .map((loc: any) => loc.id);

                // Filter projects
                const dubaiProjs = projects.filter((item: any) => {
                    // Check if location string mentions Dubai
                    const mentionsDubai = item.location?.toLowerCase().includes('dubai');

                    // Check if any of its linked locationIds are for "Dubai"
                    const hasDubaiId = item.locationIds?.some((id: string) =>
                        dubaiLocationIds.includes(id)
                    );

                    return mentionsDubai || hasDubaiId;
                });

                setAllProjects(dubaiProjs);
                setFilteredProjects(dubaiProjs);
            }
        } catch (error) {
            console.error('Error fetching Dubai projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchLocations = async () => {
        // Already handled in fetchProjects for better sync
    };

    const handleFilter = (type: string, value: string) => {
        let filtered = [...allProjects];

        if (type === 'type' && value) {
            filtered = filtered.filter(p => p.type?.toLowerCase() === value.toLowerCase());
        }

        if (type === 'status' && value) {
            // Add status filtering logic if needed
        }

        setFilteredProjects(filtered);
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&h=600&fit=crop')",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/60"></div>
                </div>

                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tighter">Global Projects</h1>
                    <p className="text-xl text-gray-200 font-bold uppercase tracking-widest text-sm">Industrial Automation excellence and premium solutions worldwide</p>
                </div>
            </section>

            <div className="container mx-auto px-4 max-w-7xl py-12">
                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 bg-white p-6 rounded-sm shadow-xl border border-gray-100">
                    <div className="flex items-center gap-6 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        <span className="text-gray-700 font-black uppercase tracking-widest text-xs whitespace-nowrap">Filter by:</span>

                        {/* Type Filter */}
                        <div className="relative">
                            <select
                                className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-3 pl-6 pr-12 rounded-sm focus:outline-none focus:ring-2 focus:ring-globe-red focus:border-transparent cursor-pointer font-bold text-sm min-w-[160px] uppercase tracking-wider transition-all"
                                onChange={(e) => handleFilter('type', e.target.value)}
                            >
                                <option value="">All Systems</option>
                                <option value="automation">Automation</option>
                                <option value="security">Security</option>
                                <option value="support">Support</option>
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
                                <option>Active</option>
                                <option>Deployed</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-globe-red">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 md:mt-0 text-gray-500 font-black uppercase tracking-widest text-xs">
                        Showing <span className="text-globe-red font-black underline decoration-2 underline-offset-4">{filteredProjects.length}</span> Solutions
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-black text-globe-black uppercase tracking-tighter">Global Portfolio</h2>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
                    </div>
                ) : filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project._id} property={project} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="text-6xl mb-4">🏙️</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Dubai projects found</h3>
                        <p className="text-gray-600">
                            We currently don't have any projects listed in Dubai. Check back soon!
                        </p>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}

export default function DubaiProjectsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
            <DubaiProjectsContent />
        </Suspense>
    );
}
