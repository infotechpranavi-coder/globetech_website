'use client';

import React from 'react';

const VALUES = [
    {
        title: "Innovation",
        description: "Stay ahead with our forward-thinking automation solutions. Quality: Experience doors built to stand the test of time.",
        icon: (
            <svg className="w-12 h-12 text-globe-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    },
    {
        title: "24/7 Communication",
        description: "We are here for you round the Clock Throughout the day. Dedicated support for all your automation needs.",
        icon: (
            <svg className="w-12 h-12 text-globe-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        )
    },
    {
        title: "Customization",
        description: "Tailor-made solutions for your unique preferences. We adapt our systems to fit your specific architectural requirements.",
        icon: (
            <svg className="w-12 h-12 text-globe-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
        )
    },
    {
        title: "Security",
        description: "Your safety is our priority, and our doors reflect that commitment. Advanced locking and monitoring systems.",
        icon: (
            <svg className="w-12 h-12 text-globe-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.003 12.003 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        )
    },
    {
        title: "Advance Technology",
        description: "We Provide Automation Products that are incorporated with advance technology and smart integration.",
        icon: (
            <svg className="w-12 h-12 text-globe-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-1.75-3M3 13V6a2 2 0 012-2h14a2 2 0 012 2v7m-4 0v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5" />
            </svg>
        )
    },
    {
        title: "Accessibility",
        description: "Doors that welcome everyone, regardless of mobility. Compliant with international accessibility standards.",
        icon: (
            <svg className="w-12 h-12 text-globe-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        )
    }
];

export default function WhyChooseUs() {
    return (
        <section className="relative py-24 overflow-hidden min-h-[800px] flex items-center">
            {/* Background with Overlay */}
            <div className="absolute inset-0 z-0">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 blur-[2px]"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070&auto=format&fit=crop")' }}
                ></div>
                <div className="absolute inset-0 bg-globe-black/85 backdrop-blur-sm"></div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="text-center mb-20 space-y-4">
                    <span className="text-globe-red font-black uppercase tracking-[0.4em] text-xs">Why Choose Us</span>
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">
                        What Sets Us Apart
                    </h2>
                    <div className="w-24 h-1 bg-globe-red mx-auto mt-6"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-white/10">
                    {VALUES.map((value, index) => (
                        <div 
                            key={index} 
                            className="p-12 border border-white/10 hover:bg-white/5 transition-all group relative overflow-hidden"
                        >
                            {/* Hover Accent */}
                            <div className="absolute top-0 left-0 w-1 h-0 bg-globe-red group-hover:h-full transition-all duration-500"></div>
                            
                            <div className="flex flex-col items-center text-center space-y-6">
                                <div className="p-4 rounded-full bg-white/5 group-hover:bg-globe-red/10 transition-colors">
                                    {value.icon}
                                </div>
                                
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight italic group-hover:text-globe-red transition-colors">
                                    {value.title}
                                </h3>
                                
                                <p className="text-gray-400 group-hover:text-white transition-colors leading-relaxed font-medium">
                                    {value.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
