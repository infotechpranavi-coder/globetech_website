'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Preloader() {
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Start exit animation after 4 seconds
        const exitTimer = setTimeout(() => {
            setIsExiting(true);
        }, 4000);

        // Fully unmount after 5 seconds (animation takes 1s)
        const unmountTimer = setTimeout(() => {
            setIsVisible(false);
        }, 5000);

        return () => {
            clearTimeout(exitTimer);
            clearTimeout(unmountTimer);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden transition-transform ${isExiting ? 'animate-slide-out-right' : ''
                }`}
        >
            {/* Decorative background grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]"></div>
            </div>

            <div className="relative flex flex-col items-center">
                {/* Anti-clockwise Rotating Rim */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 mb-12">
                    <Image
                        src="/_Vossen_Wheels_CG-205T-removebg-preview.png"
                        alt="Globe-Tech Industrial Rim"
                        fill
                        className="object-contain animate-spin-reverse-slow"
                        priority
                    />
                    {/* Inner Light Effect */}
                    <div className="absolute inset-0 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
                </div>

                {/* Brand Text */}
                <div className="text-center">
                    <div className="flex flex-col items-center">
                        <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-2 animate-fade-in-up">
                            Globe-Tech
                        </h2>
                        <div className="flex items-center gap-4 animate-fade-in-up [animation-delay:200ms]">
                            <div className="h-[2px] w-8 bg-globe-red"></div>
                            <span className="text-globe-red font-black uppercase tracking-[0.3em] text-xs md:text-sm">Automation</span>
                            <div className="h-[2px] w-8 bg-globe-red"></div>
                        </div>
                    </div>

                    {/* Progress Line */}
                    <div className="w-48 h-1 bg-white/10 rounded-full mt-12 overflow-hidden mx-auto">
                        <div className="h-full bg-globe-red transition-all duration-[4000ms] ease-linear w-full"></div>
                    </div>
                </div>
            </div>

            {/* Corporate Slogan (Hidden on Mobile) */}
            <div className="absolute bottom-12 text-white/20 font-black uppercase tracking-[0.5em] text-[10px] hidden md:block animate-fade-in [animation-delay:500ms]">
                Engineering Excellence • Global Solutions
            </div>
        </div>
    );
}
