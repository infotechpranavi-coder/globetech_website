'use client';

import React from 'react';

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            title: 'Evaluate Property',
            description: 'Browse through our curated list of premium properties and evaluate them based on location, amenities, and your specific lifestyle needs.',
            icon: (
                <svg className="w-12 h-12 text-brand-secondary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
            ),
        },
        {
            id: 2,
            title: 'Meet Your Agent',
            description: 'Connect with our expert consultants who provide personalized guidance, detailed site visits, and transparent market insights.',
            icon: (
                <svg className="w-12 h-12 text-brand-secondary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
            ),
        },
        {
            id: 3,
            title: 'Close The Deal',
            description: 'Experience a seamless transition as we handle all documentation and legal formalities to help you secure your dream property.',
            icon: (
                <svg className="w-12 h-12 text-brand-secondary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
            ),
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6 tracking-tight">How It Works?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {steps.map((step, index) => (
                            <div key={step.id} className="relative group">
                                <div className="bg-brand-primary p-10 pt-16 rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-xl rounded-bl-xl shadow-2xl transition-all duration-500 relative overflow-hidden h-full border-b-4 border-brand-secondary">
                                    {/* Step Number Decorative Badge */}
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-secondary rounded-bl-[4rem] flex items-center justify-center pl-4 pb-4 shadow-inner">
                                        <span className="text-3xl font-black text-white mb-2 mr-2">{step.id}</span>
                                    </div>

                                    {/* Icon */}
                                    <div className="mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                        {step.icon}
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{step.title}</h3>
                                    <p className="text-blue-100 leading-relaxed text-lg">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Connecting Arrows (Desktop only) */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-[60%] -right-10 transform -translate-y-1/2 z-10">
                                        <svg width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 15C15 25 30 5 59 12" stroke="#C5A028" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
                                            <path d="M53 7L59 12L53 17" stroke="#C5A028" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
