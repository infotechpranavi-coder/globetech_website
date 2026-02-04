'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PremiumHero from '@/components/PremiumHero';

interface Location {
    id: string | number;
    name: string;
    state: string;
    image: string;
    propertyCount: number;
}

export default function LocationsPage() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch('/api/locations');
                if (response.ok) {
                    const data = await response.json();
                    setLocations(data);
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow pt-20"> {/* pt-20 to account for fixed header if applicable */}
                <PremiumHero
                    titlePrefix="GLOBAL"
                    titleSuffix="PRESENCE"
                    description="Our worldwide network ensures localized support and 24/7 technical excellence."
                    backgroundImage="https://images.unsplash.com/photo-1526772662000-3f88f10c053e?q=80&w=1600"
                />

                <div className="container mx-auto px-4 max-w-7xl py-12">
                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
                        {loading ? (
                            <div className="col-span-full flex justify-center items-center">
                                <p>Loading locations...</p>
                            </div>
                        ) : locations.length === 0 ? (
                            <div className="col-span-full flex justify-center items-center">
                                <p>No locations found.</p>
                            </div>
                        ) : (
                            locations.map((location) => (
                                <div
                                    key={location.id}
                                    className="bg-white rounded-sm overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group border border-gray-100"
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={location.image}
                                            alt={`${location.name}, ${location.state}`}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex items-center justify-between">
                                        <div>
                                            <h3 className="text-xl font-black text-globe-black mb-2 uppercase tracking-tight">
                                                {location.name}, {location.state}
                                            </h3>
                                            <p className="text-gray-400 text-xs font-black uppercase tracking-widest">
                                                {location.propertyCount} {location.propertyCount === 1 ? 'Solution' : 'Solutions'} Deployed
                                            </p>
                                        </div>

                                        {/* Explore Solution Button */}
                                        <Link
                                            href={`/properties?location=${location.name.toLowerCase()}`}
                                            className="w-12 h-12 rounded-sm bg-globe-red flex items-center justify-center text-white hover:bg-globe-black transition shadow-lg"
                                        >
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
