'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MediaStories from "@/components/MediaStories";
import VideoSection from "@/components/VideoSection";
import FloatingActions from "@/components/FloatingActions";
import PremiumHero from "@/components/PremiumHero";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Blog {
    _id: string;
    title: string;
    excerpt: string;
    date: string;
    image: string;
    category?: string;
}

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
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('/api/blogs');
                if (response.ok) {
                    const data = await response.json();
                    setBlogs(data);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <main className="min-h-screen bg-white relative">
            <Header />

            {/* Floating Media Sidebar */}
            <div className="fixed right-2 top-1/2 -translate-y-1/2 z-[100] flex flex-col bg-black/90 backdrop-blur-md rounded-full overflow-hidden border-2 border-globe-red shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                <button onClick={scrollToTop} className="p-4 hover:bg-globe-red transition-all group border-b border-white/5">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" /></svg>
                </button>
                <a href="/api/download-brochure" target="_blank" className="p-4 hover:bg-globe-red transition-all group border-b border-white/5">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </a>
                <a href="mailto:pr@toshiautomation.com" className="p-4 hover:bg-globe-red transition-all group border-b border-white/5">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </a>
                <a href="https://linkedin.com/company/globe-tech-innovations" target="_blank" className="p-4 hover:bg-globe-red transition-all group border-b border-white/5">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="https://wa.me/919323151641?text=I%20would%20like%20to%20enquire%20about%20your%20automation%20solutions." target="_blank" className="p-4 hover:bg-globe-red transition-all group">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </a>
            </div>

            <PremiumHero
                titlePrefix="NEWS &"
                titleSuffix="BLOGS"
                description="Latest updates, technical deep-dives, and industrial insights from our experts."
                backgroundImage="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600"
            />


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

            {/* Dynamic Blog Grid */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-1 h-8 bg-globe-black"></div>
                                <span className="text-gray-400 font-black tracking-widest text-[10px] uppercase">Technical Insights</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-globe-black leading-tight uppercase tracking-tighter">
                                Engineering &<br />Automation Feed
                            </h2>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-globe-red"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog) => (
                                <div key={blog._id} className="bg-white p-8 border border-gray-100 shadow-xl hover:shadow-2xl transition-all group">
                                    <div className="text-[10px] font-black text-globe-red uppercase tracking-widest mb-4">
                                        {blog.category || "Technical"} — {new Date(blog.date).toLocaleDateString()}
                                    </div>
                                    <h3 className="text-xl font-black text-globe-black mb-4 group-hover:text-globe-red transition-colors uppercase tracking-tight leading-tight">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6 line-clamp-3">
                                        {blog.excerpt}
                                    </p>
                                    <Link href={`/blogs/${blog._id}`} className="inline-flex items-center gap-2 text-globe-black font-black text-[10px] uppercase tracking-widest hover:text-globe-red transition-colors">
                                        Read Technical Brief
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                    {blogs.length === 0 && !loading && (
                        <div className="text-center py-20 bg-white border-2 border-dashed border-gray-200">
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No technical articles published yet.</p>
                        </div>
                    )}
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
