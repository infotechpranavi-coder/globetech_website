'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PartnerSection from "@/components/PartnerSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FloatingActions from "@/components/FloatingActions";
import PremiumHero from "@/components/PremiumHero";

export default function ClientsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />

            <PremiumHero
                titlePrefix="VALUED"
                titleSuffix="PARTNERS"
                description="Powering the automation infrastructure of global industry leaders and Fortune 500 conglomerates."
                backgroundImage="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop"
            />

            {/* Comprehensive Client Grid */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-8 h-1 bg-globe-red"></div>
                                <span className="text-gray-400 font-bold tracking-widest text-xs uppercase">The Network</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-globe-black uppercase tracking-tighter leading-none italic">
                                INDUSTRY <span className="text-globe-red">TITANS</span>
                            </h2>
                        </div>
                        <p className="text-gray-500 font-medium text-lg leading-relaxed max-w-sm italic border-l-4 border-gray-50 pl-6">
                            Deploying advanced automation solutions for the world's most demanding environments.
                        </p>
                    </div>

                    <ClientShowcaseGrid />
                </div>
            </section>

            {/* Industry Focus & Capability Section */}
            <section className="py-32 bg-globe-black text-white relative overflow-hidden border-t border-white/5">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-globe-red/5 skew-x-12 translate-x-1/2"></div>
                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-1 h-12 bg-globe-red"></div>
                                <div className="flex flex-col">
                                    <span className="text-globe-red font-black tracking-[0.3em] text-[10px] uppercase">Global Impact</span>
                                    <span className="text-gray-500 font-bold tracking-tighter text-xs">A Legacy of Performance</span>
                                </div>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black mb-10 uppercase tracking-tighter leading-none">
                                PREFERRED FOR<br />
                                <span className="text-globe-red italic underline decoration-white/10 decoration-8 underline-offset-8">FORTUNE 500</span>
                            </h2>
                            <p className="text-gray-400 text-xl leading-relaxed mb-12 font-medium italic border-l-2 border-white/10 pl-8">
                                Our legacy is built on the trust of industry titans. From complex automobile assembly lines
                                to sensitive pharmaceutical storage, Globe-Tech Automation delivers precision that scales.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-8 bg-white/5 border border-white/10 rounded-sm hover:bg-globe-red transition-all duration-500 group">
                                    <div className="text-5xl font-black mb-2 italic group-hover:scale-110 transition-transform origin-left">15+</div>
                                    <div className="text-[10px] font-black text-gray-500 group-hover:text-white uppercase tracking-widest">Global Markets Served</div>
                                </div>
                                <div className="p-8 bg-white/5 border border-white/10 rounded-sm hover:bg-globe-red transition-all duration-500 group">
                                    <div className="text-5xl font-black mb-2 italic group-hover:scale-110 transition-transform origin-left">2.5K+</div>
                                    <div className="text-[10px] font-black text-gray-500 group-hover:text-white uppercase tracking-widest">Enterprise Deployments</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="aspect-square bg-white shadow-2xl rounded-sm relative overflow-hidden flex items-center justify-center p-20 transform group-hover:scale-[1.02] transition-all duration-700">
                                <div className="absolute inset-0 bg-gradient-to-br from-globe-red/10 to-transparent"></div>
                                <div className="text-[300px] font-black text-black/5 absolute inset-0 flex items-center justify-center rotate-12">GT</div>
                                
                                <div className="relative z-10 space-y-8 text-center">
                                    <div className="flex justify-center">
                                        <div className="w-24 h-24 bg-globe-black rounded-full flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-black text-globe-black uppercase tracking-tighter italic">CERTIFIED EXCELLENCE</h3>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.3em]">Precision Engineering Standard</p>
                                </div>
                                
                                <div className="absolute top-10 left-10 w-40 h-40 border border-black/5 rounded-full animate-[spin_20s_linear_infinite]"></div>
                                <div className="absolute bottom-10 right-10 w-60 h-60 border border-black/5 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>
                            </div>
                            {/* Accent Elements */}
                            <div className="absolute -top-12 -left-12 w-32 h-32 bg-globe-red -z-10 group-hover:-translate-x-4 group-hover:-translate-y-4 transition-transform duration-700"></div>
                            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-globe-black -z-10 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-700"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section (Reusing existing component) */}
            <TestimonialsSection />

            <Footer />
            <FloatingActions />
        </main>
    );
}

function ClientShowcaseGrid() {
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('/api/developers');
                if (response.ok) {
                    const data = await response.json();
                    setClients(data);
                }
            } catch (error) {
                console.error('Error fetching clients:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchClients();
    }, []);

    if (loading) return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="aspect-video bg-gray-50 animate-pulse rounded-sm border border-gray-100"></div>
            ))}
        </div>
    );

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {clients.length > 0 ? clients.map((client, index) => (
                <div 
                    key={client._id || index}
                    className="group aspect-video bg-white hover:bg-globe-red border border-gray-100 p-8 flex items-center justify-center transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-2 rounded-sm grayscale hover:grayscale-0 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    {typeof client.logo === 'string' ? (
                        <img 
                            src={client.logo} 
                            alt={client.name} 
                            className="max-h-full max-w-full object-contain filter group-hover:brightness-0 group-hover:invert transition-all"
                        />
                    ) : (
                        <div className="text-xl font-bold text-gray-300 group-hover:text-white transition-colors">{client.name}</div>
                    )}
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <span className="text-[8px] font-black text-white uppercase tracking-widest">Partner</span>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                </div>
            )) : (
                <div className="col-span-full py-20 bg-gray-50 border border-dashed border-gray-200 rounded-sm flex flex-col items-center justify-center text-center">
                    <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Network Database Empty</p>
                </div>
            )}
        </div>
    );
}

import { useState, useEffect } from 'react';
