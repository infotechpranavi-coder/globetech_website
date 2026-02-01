'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PartnerSection from "@/components/PartnerSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FloatingActions from "@/components/FloatingActions";

export default function ClientsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop')",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-globe-black/80 via-globe-black/60 to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-1 bg-globe-red"></div>
                            <span className="text-white font-black tracking-widest text-sm uppercase">Trust & Partnership</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
                            Engineering <span className="text-globe-red">Success</span> Together
                        </h1>
                        <p className="text-gray-300 text-lg font-medium max-w-xl uppercase tracking-wide">
                            Empowering global industrial leaders with cutting-edge automation solutions and unmatched reliability.
                        </p>
                    </div>
                </div>
            </section>

            {/* Partners Section (Reusing existing component) */}
            <PartnerSection />

            {/* Industry Focus Section */}
            <section className="py-24 bg-globe-black text-white overflow-hidden">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-1 h-8 bg-globe-red"></div>
                                <span className="text-gray-400 font-bold tracking-widest text-sm uppercase">Global Presence</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tighter leading-tight">
                                Preferred Partner for<br />
                                <span className="text-globe-red text-6xl md:text-7xl">Fortune 500</span> Enterprises
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-10 font-medium">
                                Our legacy is built on the trust of industry titans. From complex automobile assembly lines
                                to sensitive pharmaceutical storage, Globe-Tech Automation delivers precision that scales.
                            </p>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="p-6 bg-white/5 border-l-4 border-globe-red rounded-sm hover:bg-white/10 transition-colors">
                                    <div className="text-3xl font-black mb-2 italic">15+</div>
                                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Global Markets</div>
                                </div>
                                <div className="p-6 bg-white/5 border-l-4 border-globe-red rounded-sm hover:bg-white/10 transition-colors">
                                    <div className="text-3xl font-black mb-2 italic">2.5K+</div>
                                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Installs</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-square bg-globe-red/10 rounded-sm relative overflow-hidden border border-white/10">
                                <div className="absolute inset-0 bg-gradient-to-br from-globe-red/20 to-transparent"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-[200px] font-black text-white/5 uppercase tracking-tighter select-none rotate-12">
                                        Globe
                                    </div>
                                </div>
                                <div className="absolute inset-8 border border-white/20 rounded-sm flex flex-col justify-end p-8">
                                    <p className="text-2xl font-black uppercase tracking-tighter mb-2 italic">Uncompromising Quality</p>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Certified Industrial Standards</p>
                                </div>
                            </div>
                            {/* Decorative Red Square */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-globe-red -z-10 animate-pulse"></div>
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
