'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import Link from "next/link";

const BENEFITS = [
    {
        title: "Technical Growth",
        description: "Work with the latest industrial automation technologies and specialized engineering tools.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.364-5.636l-.707-.707m1.414 14.142l-.707-.707M4.422 4.422l.707.707m4.347 4.347L11 11m0 0l2.232 2.232M11 11v1m0-1c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4z" />
            </svg>
        )
    },
    {
        title: "Global Impact",
        description: "Contribute to large-scale projects for Fortune 500 enterprises across 15+ global markets.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
        )
    },
    {
        title: "Innovation Culture",
        description: "Be part of a team that values R&D and innovative problem-solving in manufacturing and logistics.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    }
];

export default function CareersPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop')",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-globe-black/80 via-globe-black/60 to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-1 bg-globe-red"></div>
                            <span className="text-white font-black tracking-widest text-sm uppercase">Join the Revolution</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
                            Build the <span className="text-globe-red">Future</span> of Automation
                        </h1>
                        <p className="text-gray-300 text-lg font-medium max-w-xl uppercase tracking-wide">
                            We are looking for passionate engineers and visionaries to help us automate the world's most complex facilities.
                        </p>
                    </div>
                </div>
            </section>

            {/* Why Globe-Tech Section */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="aspect-[4/5] bg-gray-100 rounded-sm overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1541888946425-d81bb19480f5?q=80&w=2070&auto=format&fit=crop"
                                    alt="Industrial Facility"
                                    className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                            {/* Floating Experience Badge */}
                            <div className="absolute -bottom-8 -right-8 bg-globe-black p-10 shadow-2xl border-l-8 border-globe-red z-10 animate-fade-in">
                                <div className="text-white">
                                    <h3 className="text-4xl font-black leading-tight uppercase tracking-tighter italic">Grow<br />With Us</h3>
                                    <p className="text-[10px] font-black mt-4 opacity-80 uppercase tracking-widest text-globe-red">Apply Today</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-1 h-8 bg-globe-red"></div>
                                <span className="text-gray-400 font-black tracking-widest text-[10px] uppercase">Work Culture</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-globe-black mb-8 uppercase tracking-tighter leading-tight">
                                Powering Progress<br />
                                <span className="text-globe-red">Inside & Out</span>
                            </h2>
                            <p className="text-gray-500 text-lg leading-relaxed mb-10 font-medium">
                                At Globe-Tech Automation, we believe that innovation happens at the intersection of technical excellence
                                and human ingenuity. We foster an environment where engineers are empowered to solve real-world problems
                                at scale.
                            </p>

                            <div className="space-y-8">
                                {BENEFITS.map((benefit, index) => (
                                    <div key={index} className="flex gap-6 group">
                                        <div className="flex-shrink-0 w-16 h-16 bg-gray-50 rounded-sm flex items-center justify-center text-globe-red group-hover:bg-globe-black group-hover:text-white transition-all shadow-lg border border-gray-100">
                                            {benefit.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black text-globe-black mb-2 uppercase tracking-tight">{benefit.title}</h4>
                                            <p className="text-gray-400 text-sm font-medium leading-relaxed">{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vacancies / Call to Action */}
            <section className="py-24 bg-globe-black relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-6 h-full">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="border-r border-white/20 h-full"></div>
                        ))}
                    </div>
                </div>

                <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter leading-none italic">
                        Ready to Join the <span className="text-globe-red">Elite?</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-12 font-bold uppercase tracking-widest max-w-2xl mx-auto">
                        We are currently expanding our Engineering, Sales, and Support teams across India and Dubai.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link
                            href="mailto:careers@toshiautomation.com"
                            className="bg-globe-red text-white px-12 py-5 font-black rounded-sm hover:bg-white hover:text-globe-black transition-all shadow-xl uppercase tracking-widest text-sm"
                        >
                            Email Your Resume
                        </Link>
                        <Link
                            href="/contact"
                            className="bg-transparent border-2 border-white/20 text-white px-12 py-5 font-black rounded-sm hover:bg-white/10 transition-all uppercase tracking-widest text-sm"
                        >
                            General Inquiry
                        </Link>
                    </div>

                    <p className="mt-12 text-gray-600 text-[10px] font-black uppercase tracking-widest">
                        Globe-Tech Automation is an equal opportunity employer. Engineering Excellence is our only criterion.
                    </p>
                </div>
            </section>

            <Footer />
            <FloatingActions />
        </main>
    );
}
