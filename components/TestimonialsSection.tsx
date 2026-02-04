'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const STATIC_TESTIMONIALS = [
    {
        company: "Aurobindo",
        quote: "We Aurobindo Pharma Ltd Unit XV would like to express to you our warmest admiration for your service to us as one of our suppliers. We appreciate your efficiency in providing us the best product and services High speed clean room roll-up doors. Globe-Tech Automation Limited deliver as per their commitment and before the committed time of delivery with excellent quality and safe products.",
    },
    {
        company: "Glenmark",
        quote: "Globe-Tech Automation has been instrumental in upgrading our warehouse security and automation. Their team's professionalism and the quality of their High Speed Doors have exceeded our expectations. Truly a dependable partner.",
    },
    {
        company: "ITC Limited",
        quote: "Exceptional service and top-notch automation solutions. The Globe-Tech team delivered on time and ensured that our specific requirements were met with technical excellence. Highly recommended for industrial automation.",
    }
];

export default function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [testimonials, setTestimonials] = useState(STATIC_TESTIMONIALS);
    const [partnerLogos, setPartnerLogos] = useState<any[]>([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch('/api/testimonials');
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.length > 0) {
                        setTestimonials(data);
                    }
                }
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            }
        };

        const fetchPartners = async () => {
            try {
                const response = await fetch('/api/developers');
                if (response.ok) {
                    const data = await response.json();
                    setPartnerLogos(data);
                }
            } catch (error) {
                console.error('Error fetching partner logos:', error);
            }
        };

        fetchTestimonials();
        fetchPartners();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const STATIC_LOGOS = [
        { name: "Anmol", src: "https://www.toshiautomation.com/wp-content/uploads/2020/01/anmol-logo.png" },
        { name: "Aurobindo", src: "https://www.toshiautomation.com/wp-content/uploads/2020/01/aurobindo-logo.png" },
        { name: "DJK", src: "https://www.toshiautomation.com/wp-content/uploads/2020/01/djk-logo.png" },
        { name: "Glenmark", src: "https://www.toshiautomation.com/wp-content/uploads/2020/01/glenmark-logo.png" },
        { name: "ITC", src: "https://www.toshiautomation.com/wp-content/uploads/2020/01/itc-logo.png" },
    ];

    const displayLogos = partnerLogos.length > 0 ? partnerLogos : STATIC_LOGOS;

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-16 mb-20">

                    {/* Left Side: Header & Stats */}
                    <div className="lg:w-1/2">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-1 h-8 bg-globe-red"></div>
                            <span className="text-gray-400 font-bold tracking-widest text-sm uppercase">Testimonial</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black text-globe-black mb-8 leading-tight">
                            What Our Happy<br />Clients Say!
                        </h2>

                        <p className="text-gray-500 text-lg leading-relaxed mb-12 max-w-lg">
                            Globe-Tech's innovative solutions and exceptional service consistently exceed client expectations. Our clients trust us for reliable, tailored automation solutions that enhance efficiency and safety.
                        </p>

                        <div className="flex flex-wrap gap-x-12 gap-y-8">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-globe-red/10 rounded-sm">
                                        <svg className="w-8 h-8 text-globe-red" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                        </svg>
                                    </div>
                                    <span className="text-3xl font-black text-globe-black">2.5K+</span>
                                </div>
                                <p className="text-globe-black font-bold uppercase text-[10px] tracking-widest">Active Solutions</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-globe-red/10 rounded-sm">
                                        <svg className="w-8 h-8 text-globe-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-3xl font-black text-globe-black">15+</span>
                                </div>
                                <p className="text-globe-black font-bold uppercase text-[10px] tracking-widest">Global Support Hubs</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Quote Carousel */}
                    <div className="lg:w-1/2 flex flex-col justify-center">
                        <div className="relative min-h-[300px]">
                            {testimonials.length > 0 && (
                                <div key={currentIndex} className="animate-fade-in transition-all duration-500">
                                    <p className="text-gray-500 text-xl leading-relaxed italic mb-8">
                                        "{testimonials[currentIndex].quote}"
                                    </p>
                                    <div className="w-16 h-1 bg-globe-red mb-4"></div>
                                    <h3 className="text-2xl font-black text-globe-black mb-8 uppercase tracking-tight">
                                        {testimonials[currentIndex].company}
                                    </h3>
                                </div>
                            )}
                        </div>

                        {/* Navigation */}
                        <div className="flex gap-4">
                            <button
                                onClick={handlePrev}
                                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-globe-red hover:border-globe-red transition-all group"
                            >
                                <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={handleNext}
                                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-globe-red hover:border-globe-red transition-all group"
                            >
                                <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Logo Cloud */}
                <div className="border-t border-gray-100 pt-16">
                    <div className="flex flex-wrap justify-between items-center gap-8 opacity-60 hover:opacity-100 transition-opacity">
                        {displayLogos.map((logo: any, index: number) => (
                            <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300 h-12 flex items-center">
                                {logo.logo || logo.src ? (
                                    <img
                                        src={logo.logo || logo.src}
                                        alt={logo.name}
                                        className="max-h-full object-contain"
                                        onError={(e) => {
                                            (e.target as any).parentNode.innerHTML = `<span class="text-gray-400 font-bold text-xl uppercase italic">${logo.name}</span>`;
                                        }}
                                    />
                                ) : (
                                    <span className="text-gray-400 font-bold text-xl uppercase italic">{logo.name}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
