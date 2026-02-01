'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MediaStories from "@/components/MediaStories";
import VideoSection from "@/components/VideoSection";
import FloatingActions from "@/components/FloatingActions";
import Link from "next/link";

const NEWS_ARTICLES = [
    {
        title: "Globe-Tech Automation Leads India's Industrial Growth",
        date: "January 15, 2026",
        category: "Corporate",
        excerpt: "Recognized as a most valuable brand, Globe-Tech expands its reach into new global markets with specialized entrance automation solutions.",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Future of Logistics: Automated Loading Bay Solutions",
        date: "December 10, 2025",
        category: "Innovation",
        excerpt: "Exploring how integrated loading dock systems are reducing turnaround times for major warehouse facilities by 30%.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Ensuring High-End Security in Modern Manufacturing",
        date: "October 22, 2025",
        category: "Security",
        excerpt: "A deep dive into how biometric turnstiles and advanced boom barriers are securing critical infrastructure.",
        image: "https://images.unsplash.com/photo-1517420704173-9a3d7350ec4a?q=80&w=2069&auto=format&fit=crop"
    }
];

export default function MediaPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop')",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-globe-black/80 via-globe-black/60 to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-1 bg-globe-red"></div>
                            <span className="text-white font-black tracking-widest text-sm uppercase">Insights & Press</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
                            Globe-Tech in the <span className="text-globe-red">Media</span>
                        </h1>
                        <p className="text-gray-300 text-lg font-medium max-w-xl uppercase tracking-wide">
                            Documenting our journey of industrial transformation and the latest breakthroughs in automation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Media Stories Section (Reusing existing component) */}
            <div className="py-12 bg-gray-50">
                <MediaStories />
            </div>

            {/* News Grid */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-1 h-8 bg-globe-red"></div>
                                <span className="text-gray-400 font-black tracking-widest text-[10px] uppercase">Press Releases</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-globe-black leading-tight uppercase tracking-tighter">
                                Latest From Our<br />Newsroom
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {NEWS_ARTICLES.map((article, index) => (
                            <div key={index} className="group cursor-pointer">
                                <div className="relative aspect-video overflow-hidden rounded-sm bg-gray-100 mb-6 border border-gray-100 shadow-xl">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-globe-red text-white text-[10px] font-black uppercase tracking-widest rounded-sm">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest mb-2 italic">
                                    {article.date}
                                </p>
                                <h3 className="text-xl font-black text-globe-black mb-3 group-hover:text-globe-red transition-colors uppercase tracking-tight leading-snug">
                                    {article.title}
                                </h3>
                                <p className="text-gray-500 text-sm font-medium leading-relaxed line-clamp-2">
                                    {article.excerpt}
                                </p>
                                <div className="mt-6 flex items-center gap-2 text-globe-red font-black text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                                    Read Full Story
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7M3 12h18" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Highlights Section */}
            <div className="bg-globe-black">
                <VideoSection />
            </div>

            {/* Newsletter / Stay Updated */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="bg-gray-50 border-l-8 border-globe-red p-12 shadow-2xl rounded-sm text-center">
                        <h2 className="text-3xl md:text-4xl font-black text-globe-black mb-6 uppercase tracking-tight">Stay Updated on the Industrial Revolution</h2>
                        <p className="text-gray-500 mb-10 font-bold uppercase tracking-widest text-sm">Join our network for the latest news in technical automation.</p>
                        <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                            <input
                                type="email"
                                placeholder="Work Email Address"
                                className="flex-grow px-6 py-4 bg-white border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-globe-red font-bold uppercase tracking-wider text-xs"
                            />
                            <button className="bg-globe-black text-white px-10 py-4 font-black rounded-sm hover:bg-globe-red transition-all uppercase tracking-widest">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
            <FloatingActions />
        </main>
    );
}
