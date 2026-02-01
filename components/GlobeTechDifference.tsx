'use client';

import Image from 'next/image';

const STATS = [
    {
        label: "Expert Team Member",
        value: "85+",
        icon: (
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        )
    },
    {
        label: "Satisfied Users",
        value: "3.0M+",
        icon: (
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        label: "Years of Industry Experience",
        value: "30+",
        icon: (
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        label: "Running Projects",
        value: "100+",
        icon: (
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01m-.01 4h.01" />
            </svg>
        )
    }
];

export default function GlobeTechDifference() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Left Content */}
                    <div className="lg:w-1/2">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-1 h-8 bg-globe-red"></div>
                            <span className="text-gray-400 font-bold tracking-widest text-sm uppercase">Our Core Features</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black text-globe-black mb-8 uppercase tracking-tighter">
                            The Globe-Tech Difference
                        </h2>

                        <p className="text-gray-500 text-lg leading-relaxed mb-12 max-w-xl">
                            We prioritize client-specific solutions, ensuring maximum efficiency and seamless integration. Our expert team combines technical excellence with dedicated support, making automation smarter and simpler.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-8">
                            {STATS.map((stat, index) => (
                                <div key={index} className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        {stat.icon}
                                        <span className="font-bold text-globe-black">{stat.label}</span>
                                    </div>
                                    <div className="text-4xl font-black text-globe-black tracking-tight">
                                        {stat.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Image with Badge */}
                    <div className="lg:w-1/2 relative">
                        <div className="relative rounded-sm overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
                                alt="Globe-Tech Automation Facility"
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* Experience Badge */}
                        <div className="absolute -top-10 left-0 sm:-left-10 bg-globe-black border-l-8 border-globe-red p-8 sm:p-12 shadow-2xl flex flex-col items-center justify-center text-center max-w-[200px] sm:max-w-[240px]">
                            <div className="text-4xl sm:text-5xl font-black text-white mb-2">15+</div>
                            <div className="text-xl sm:text-2xl font-bold text-globe-red leading-tight uppercase tracking-tighter">Years</div>
                            <div className="text-[10px] font-black text-white opacity-80 uppercase tracking-widest">Experience</div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
