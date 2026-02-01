'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Location {
    id: string | number;
    name: string;
    state: string;
    image: string;
    propertyCount: number;
}

export default function FindByLocations() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch('/api/locations');
                if (response.ok) {
                    const data = await response.json();
                    // API returns sorted by createdAt desc, which is what we want (newest first)
                    // Take top 6
                    setLocations(data.slice(0, 6));
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);

    if (loading) {
        return (
            <section className="py-24 bg-sky-50/30">
                <div className="container mx-auto px-4 max-w-7xl text-center">
                    <p>Loading locations...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center mb-4">
                        <span className="text-gray-400 relative inline-block">
                            Find By
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-secondary"></span>
                        </span>
                        <span className="text-gray-900 ml-4">Locations</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {locations.map((location) => (
                        <div
                            key={location.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100"
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
                                    <h3 className="text-xl font-bold text-brand-primary mb-1">
                                        {location.name}, {location.state}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {location.propertyCount} {location.propertyCount === 1 ? 'project' : 'projects'}
                                    </p>
                                </div>

                                {/* Arrow Button */}
                                <Link
                                    href={`/properties?locationId=${location.id}`}
                                    className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center text-white hover:bg-brand-primary-dark transition shadow-lg shadow-brand-primary/10"
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
                    ))}
                </div>

                {/* Explore All Locations Button */}
                <div className="text-center mt-12">
                    <Link
                        href="/properties"
                        className="inline-flex items-center justify-center px-10 py-4 text-base font-bold text-white transition-all duration-200 bg-brand-primary rounded-full hover:bg-brand-primary-dark hover:shadow-xl hover:-translate-y-1 focus:outline-none"
                    >
                        Explore All Locations
                        <svg
                            className="w-5 h-5 ml-2 -mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
