'use client';

import React from 'react';

interface PremiumHeroProps {
    titlePrefix: string;
    titleSuffix: string;
    subtitle?: string;
    description?: string;
    backgroundImage: string;
}

const PremiumHero: React.FC<PremiumHeroProps> = ({
    titlePrefix,
    titleSuffix,
    subtitle = "Industrial Excellence",
    description,
    backgroundImage
}) => {
    return (
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
            {/* Background with subtle zoom effect */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[10s] ease-linear hover:scale-110"
                style={{
                    backgroundImage: `url('${backgroundImage}')`,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#FDFDFD]"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 max-w-7xl">
                <div className="max-w-3xl">
                    {/* Label with red line */}
                    <div className="flex items-center gap-4 mb-4 animate-fade-in-up">
                        <div className="w-12 h-[3px] bg-globe-red"></div>
                        <span className="text-white font-black tracking-[0.3em] text-xs uppercase">{subtitle}</span>
                    </div>

                    {/* Title with solid and outline text */}
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.9] animate-fade-in-up delay-100">
                        {titlePrefix} <span className="text-transparent border-t-2 border-b-2 border-globe-red" style={{ WebkitTextStroke: '1px white' }}>{titleSuffix}</span>
                    </h1>

                    {/* Description */}
                    {description && (
                        <p className="text-gray-300 text-lg font-medium max-w-xl uppercase tracking-widest animate-fade-in-up delay-200">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {/* Fade transition to page content */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#FDFDFD] to-transparent"></div>

            <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .delay-100 {
          animation-delay: 100ms;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
        </section>
    );
};

export default PremiumHero;
