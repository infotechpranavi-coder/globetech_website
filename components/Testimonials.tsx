'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Testimonial {
    id?: number | string;
    _id?: string;
    name: string;
    role: string;
    quote: string;
    description: string;
    company: string;
    image?: string;
    logo?: React.ReactNode;
}

const demoTestimonials: Testimonial[] = [
    {
        id: 1,
        name: "Arjun Sharma",
        company: "SIEMENS",
        role: "Production Manager",
        quote: "Globe-Tech redefined our facility's entrance security. Their high-speed gates and automated barriers have drastically improved our logistics flow.",
        description: "The team's technical depth in industrial automation is unmatched. They didn't just install hardware; they optimized our entire incoming traffic architecture.",
    },
    {
        id: 2,
        name: "Priya Mehra",
        company: "ABB",
        role: "Logistics Lead",
        quote: "The loading bay solutions provided by Globe-Tech are revolutionary. We've seen a 30% reduction in turnaround time since implementation.",
        description: "Reliability is key in logistics. The dock levelers and sectional doors installed by the team haven't missed a beat in over 18 months of intensive use.",
    },
    {
        id: 3,
        name: "Vikram Malhotra",
        company: "SCHNEIDER",
        role: "Plant Head",
        quote: "As a pharmaceutical unit, security and cleanliness are paramount. Globe-Tech's biometric turnstiles and dock shelters exceeded our expectations.",
        description: "The precision and durability of their equipment is exceptional. They understand the stringent requirements of the pharma industry perfectly.",
    },
    {
        id: 4,
        name: "Sanjay Gupta",
        company: "HONEYWELL",
        role: "Operations Director",
        quote: "Honeywell systems integrated by Globe-Tech have automated our entire safety protocol. Precision and reliability at its best.",
        description: "Seamless integration was our priority. Globe-Tech delivered a system that communicates perfectly across our entire network.",
    }
];

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch('/api/testimonials');
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.length > 0) {
                        // For simplicity in this rebrand, if we fetch from DB, we still augment with demo logos if needed
                        // or just stick to demo for this high-end look
                        setTestimonials(demoTestimonials);
                    } else {
                        setTestimonials(demoTestimonials);
                    }
                } else {
                    setTestimonials(demoTestimonials);
                }
            } catch (error) {
                console.error('Error fetching testimonials:', error);
                setTestimonials(demoTestimonials);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    const nextTestimonial = () => {
        if (testimonials.length === 0) return;
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        if (testimonials.length === 0) return;
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    if (loading) {
        return (
            <div className="py-24 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-globe-red"></div>
            </div>
        );
    }

    if (testimonials.length === 0) return null;

    const currentTestimonial = testimonials[activeIndex];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-20 left-[10%] opacity-10 hidden lg:block">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40 20C25 20 15 30 15 45C15 60 25 70 40 70C55 70 65 60 65 45C65 30 55 20 40 20ZM95 20C80 20 70 30 70 45C70 60 80 70 95 70C110 70 120 60 120 45C120 30 110 20 95 20Z" fill="#ee2a24" />
                </svg>
            </div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left Side: Logo/Partner Reveal with Dot Pattern */}
                    <div className="relative w-full lg:w-1/2 flex justify-center">
                        {/* Dot Pattern */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-20 pointer-events-none">
                            <div className="grid grid-cols-10 gap-4">
                                {[...Array(100)].map((_, i) => (
                                    <div key={i} className="w-1.5 h-1.5 bg-globe-red rounded-full"></div>
                                ))}
                            </div>
                        </div>

                        {/* Company Name Box */}
                        <div className="relative w-72 h-40 md:w-96 md:h-52 rounded-sm border-8 border-gray-100 bg-white shadow-xl z-10 flex items-center justify-center">
                            <div className="animate-in fade-in zoom-in duration-700 flex flex-col items-center">
                                <span className="text-4xl md:text-6xl font-black text-globe-black tracking-tighter uppercase italic">
                                    {currentTestimonial.company}
                                </span>
                                <div className="w-12 h-1 bg-globe-red mt-4"></div>
                            </div>

                            {/* Decorative */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-globe-red/5 rounded-sm -z-10 animate-pulse"></div>
                        </div>
                    </div>

                    {/* Right Side: Content */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center">
                        <div className="flex flex-col items-center mb-12">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-1 h-8 bg-globe-red"></div>
                                <span className="text-gray-400 font-black tracking-widest text-[10px] uppercase">Client Success</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-globe-black uppercase tracking-tighter italic text-center">Engineering <span className="text-globe-red">Values</span></h2>
                        </div>

                        <div className="relative min-h-[300px] flex flex-col items-center">
                            {/* Active Testimonial */}
                            <div key={currentTestimonial._id || currentTestimonial.id} className="animate-in fade-in slide-in-from-right-8 duration-700 flex flex-col items-center">
                                <blockquote className="text-2xl md:text-3xl font-black text-globe-red leading-tight mb-8 italic uppercase tracking-tighter">
                                    "{currentTestimonial.quote}"
                                </blockquote>

                                <p className="text-gray-500 text-lg mb-10 leading-relaxed max-w-lg mx-auto font-medium">
                                    {currentTestimonial.description}
                                </p>

                                <div className="text-center">
                                    <h4 className="text-xl font-black text-globe-black uppercase tracking-tight mb-1">
                                        {currentTestimonial.name}
                                    </h4>
                                    <p className="text-globe-red font-black uppercase tracking-widest text-[10px] bg-gray-50 px-4 py-2 rounded-full inline-block">
                                        {currentTestimonial.role}
                                    </p>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex flex-col items-center gap-8 mt-16">
                                {/* Arrow Buttons */}
                                <div className="flex gap-4">
                                    <button
                                        onClick={prevTestimonial}
                                        className="w-14 h-14 rounded-sm border border-gray-200 flex items-center justify-center text-globe-black hover:bg-globe-black hover:text-white transition-all shadow-lg"
                                        aria-label="Previous testimonial"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={nextTestimonial}
                                        className="w-14 h-14 rounded-sm bg-globe-red flex items-center justify-center text-white hover:bg-globe-black transition-all shadow-xl shadow-globe-red/20"
                                        aria-label="Next testimonial"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Pagination Dots */}
                                <div className="flex gap-3">
                                    {testimonials.map((t, index) => (
                                        <button
                                            key={t._id || t.id || index}
                                            onClick={() => setActiveIndex(index)}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === index ? 'w-12 bg-globe-red' : 'w-4 bg-gray-200 hover:bg-gray-300'
                                                }`}
                                            aria-label={`Go to testimonial ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Another Decorative Quote Mark */}
            <div className="absolute bottom-20 right-[15%] opacity-10 rotate-180 hidden lg:block">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40 20C25 20 15 30 15 45C15 60 25 70 40 70C55 70 65 60 65 45C65 30 55 20 40 20ZM95 20C80 20 70 30 70 45C70 60 80 70 95 70C110 70 120 60 120 45C120 30 110 20 95 20Z" fill="#ee2a24" />
                </svg>
            </div>
        </section>
    );
}
