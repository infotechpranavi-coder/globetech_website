'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TeamMember {
    _id: string;
    name: string;
    designation: string;
    image: string;
}

export default function TeamSection() {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [showSection, setShowSection] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // Fetch visibility setting
                const settingsRes = await fetch('/api/settings');
                if (settingsRes.ok) {
                    const settings = await settingsRes.json();
                    setShowSection(settings.showTeamSection !== false);
                }

                // Fetch team members
                const teamRes = await fetch('/api/team');
                if (teamRes.ok) {
                    const data = await teamRes.json();
                    if (data && data.length > 0) {
                        setTeam(data);
                    } else {
                        // Fallback to initial team for preview if db is empty
                        setTeam([
                            {
                                _id: '1',
                                name: "Kapil Sachdev",
                                designation: "Founder & Chief Solution Provider",
                                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                            },
                            {
                                _id: '2',
                                name: "Bobby Abhishek Madaan",
                                designation: "Director",
                                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
                            },
                            {
                                _id: '3',
                                name: "Ramesh Chand Sharma",
                                designation: "Director - Sales & Operations",
                                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
                            },
                            {
                                _id: '4',
                                name: "Dr. Deepika Monga",
                                designation: "Director- Branding & Marketing",
                                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
                            }
                        ]);
                    }
                }
            } catch (err) {
                console.error('Error fetching initial team data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    if (showSection === false) return null;

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-1 h-8 bg-globe-red"></div>
                            <span className="text-gray-400 font-bold tracking-widest text-sm uppercase">Our Team</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-globe-black leading-tight">
                            Expert Team Driving Innovation Forward
                        </h2>
                    </div>

                    <Link
                        href="#"
                        className="inline-block bg-globe-red text-white font-black py-4 px-8 rounded-sm hover:bg-black hover:text-white transition-colors text-center whitespace-nowrap uppercase tracking-wider"
                    >
                        Our Experts
                    </Link>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-globe-red mx-auto"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <div key={member._id} className="group cursor-pointer">
                                {/* Image Area */}
                                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-gray-100 mb-6 transition-all duration-500 group-hover:shadow-2xl">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                    />
                                </div>

                                {/* Text Area */}
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold text-globe-black group-hover:text-globe-red transition-colors uppercase">
                                        {member.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm font-medium">
                                        {member.designation}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
}
