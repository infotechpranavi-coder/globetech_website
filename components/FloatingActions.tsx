'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FloatingActions() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="fixed bottom-6 left-6 right-6 z-50 pointer-events-none flex items-end justify-between">
            {/* WhatsApp Button - Bottom Left */}
            <div className="pointer-events-auto">
                <Link
                    href="https://wa.me/918287116904"
                    target="_blank"
                    className="w-12 h-12 sm:w-16 sm:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.223-.272-.297-.57-.446z" />
                    </svg>
                </Link>
            </div>

            {/* Scroll-To-Top Button - Bottom Right */}
            <div className={`pointer-events-auto transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <button
                    onClick={scrollToTop}
                    className="w-14 h-14 bg-globe-red text-white rounded-sm shadow-2xl flex items-center justify-center hover:bg-black transition-all transform hover:scale-110 active:scale-95 group"
                    aria-label="Scroll to top"
                >
                    <svg
                        className="w-8 h-8 group-hover:-translate-y-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
