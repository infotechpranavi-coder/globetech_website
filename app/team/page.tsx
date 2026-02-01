'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamSection from "@/components/TeamSection";
import FloatingActions from "@/components/FloatingActions";
import Image from "next/image";

export default function TeamPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-globe-black/80 via-globe-black/60 to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-1 bg-globe-red"></div>
                            <span className="text-white font-black tracking-widest text-sm uppercase">Leadership & Innovation</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
                            Meet the <span className="text-globe-red">Experts</span> Behind Globe-Tech
                        </h1>
                        <p className="text-gray-300 text-lg font-medium max-w-xl uppercase tracking-wide">
                            A multidisciplinary team of engineers, innovators, and problem-solvers dedicated to your operational excellence.
                        </p>
                    </div>
                </div>
            </section>

            {/* Team Values / Culture Section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="relative p-10 bg-white shadow-xl rounded-sm border-t-4 border-globe-red group hover:-translate-y-2 transition-transform duration-300">
                            <div className="text-globe-red mb-6">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.364-5.636l-.707-.707m1.414 14.142l-.707-.707M4.422 4.422l.707.707m4.347 4.347L11 11m0 0l2.232 2.232M11 11v1m0-1c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-black text-globe-black mb-4 uppercase tracking-tight">Engineering Mindset</h3>
                            <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                We approach every challenge with technical precision and a commitment to durable, scalable solutions.
                            </p>
                        </div>

                        <div className="relative p-10 bg-globe-black shadow-xl rounded-sm border-t-4 border-globe-red group hover:-translate-y-2 transition-transform duration-300">
                            <div className="text-globe-red mb-6">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">Client First</h3>
                            <p className="text-gray-400 text-sm font-medium leading-relaxed">
                                Our directors and engineers work side-by-side with clients to ensure seamless implementation and support.
                            </p>
                        </div>

                        <div className="relative p-10 bg-white shadow-xl rounded-sm border-t-4 border-globe-red group hover:-translate-y-2 transition-transform duration-300">
                            <div className="text-globe-red mb-6">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-black text-globe-black mb-4 uppercase tracking-tight">Innovation Driven</h3>
                            <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                From R&D to final testing, we leverage the latest technologies to keep your facility future-ready.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Team Section (Reusing existing component) */}
            <TeamSection />

            {/* Quote Section */}
            <section className="py-24 bg-globe-black relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-globe-red/5 skew-x-12 translate-x-20"></div>
                <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
                    <svg className="w-16 h-16 text-globe-red mx-auto mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 8.89543 14.017 10V12H11.017V10C11.017 7.23858 13.2556 5 16.017 5H19.017C21.7784 5 24.017 7.23858 24.017 10V15C24.017 18.866 20.883 22 17.017 22H14.017V21ZM0 15V10C0 7.23858 2.23858 5 5 5H8C10.7614 5 13 7.23858 13 10V15C13 18.866 9.86599 22 6 22H3V21L3 18C3 16.8954 3.89543 16 5 16H8C8.55228 16 9 15.5523 9 15V9C9 8.44772 8.55228 8 8 8H5.00001C3.89544 8 3.00001 8.89543 3.00001 10V12H0.00001V10Z" />
                    </svg>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-10 leading-tight uppercase tracking-tighter italic">
                        "Our strength lies not just in our technology, but in the expert minds that deploy it."
                    </h2>
                    <div className="flex flex-col items-center">
                        <p className="text-globe-red font-black uppercase tracking-widest text-lg">Kapil Sachdev</p>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1">Founder & Chief Solution Provider</p>
                    </div>
                </div>
            </section>

            <Footer />
            <FloatingActions />
        </main>
    );
}
