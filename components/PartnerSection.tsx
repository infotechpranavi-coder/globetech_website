'use client';

import { useState, useEffect } from 'react';

interface Partner {
    _id?: string | number;
    id?: string | number;
    name: string;
    logo: string | React.ReactNode;
}

const STATIC_PARTNERS: Partner[] = [
    { id: 1, name: "Maruti Suzuki", logo: <div className="text-blue-900 font-black text-xl italic uppercase tracking-tighter">Maruti Suzuki</div> },
    { id: 2, name: "Adani", logo: <div className="text-blue-600 font-black text-2xl uppercase tracking-tighter">ADANI</div> },
    { id: 3, name: "ITC", logo: <div className="text-globe-black font-black text-3xl uppercase tracking-tighter">ITC</div> },
    { id: 4, name: "Hero Motors", logo: <div className="text-red-600 font-black text-2xl uppercase tracking-tighter">HERO</div> },
    { id: 5, name: "Amazon", logo: <div className="text-black font-black text-2xl tracking-tighter">amazon</div> },
    { id: 6, name: "JSW", logo: <div className="text-blue-800 font-black text-3xl uppercase tracking-tighter">JSW</div> },
    { id: 7, name: "Nestle", logo: <div className="text-gray-800 font-black text-2xl tracking-tighter">Nestle</div> },
    { id: 8, name: "Panasonic", logo: <div className="text-blue-600 font-black text-2xl uppercase tracking-tighter">Panasonic</div> },
];

export default function PartnerSection() {
    const [partners, setPartners] = useState<Partner[]>([]);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const response = await fetch('/api/developers');
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.length > 0) {
                        setPartners(data);
                    } else {
                        setPartners(STATIC_PARTNERS);
                    }
                } else {
                    setPartners(STATIC_PARTNERS);
                }
            } catch (error) {
                console.error('Error fetching partners:', error);
                setPartners(STATIC_PARTNERS);
            }
        };
        fetchPartners();
    }, []);

    // Helper to render logo
    const renderLogo = (partner: Partner) => {
        if (typeof partner.logo === 'string') {
            return (
                <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-500"
                />
            );
        }
        return partner.logo;
    };

    // Triple the list for seamless loop
    const row1 = [...partners, ...partners, ...partners];
    const row2 = [...partners, ...partners, ...partners].reverse();

    if (partners.length === 0) return null;

    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl mb-12">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-1 h-8 bg-globe-red"></div>
                    <span className="text-gray-400 font-bold tracking-widest text-sm uppercase">Our Partners</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-globe-black mb-8">
                    Trusted by Industry Leaders
                </h2>
            </div>

            <div className="space-y-8">
                {/* Row 1: Leftward Scroll */}
                <div className="flex overflow-hidden">
                    <div className="flex animate-scroll-left gap-6 px-3">
                        {row1.map((partner, index) => (
                            <div
                                key={`r1-${partner._id || partner.id}-${index}`}
                                className="flex-shrink-0 w-64 h-32 bg-white rounded-sm shadow-xl border border-gray-100 flex items-center justify-center p-8 hover:shadow-2xl transition-all duration-300 group"
                            >
                                {renderLogo(partner)}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 2: Rightward Scroll */}
                <div className="flex overflow-hidden">
                    <div className="flex animate-scroll-right gap-6 px-3">
                        {row2.map((partner, index) => (
                            <div
                                key={`r2-${partner._id || partner.id}-${index}`}
                                className="flex-shrink-0 w-64 h-32 bg-white rounded-sm shadow-xl border border-gray-100 flex items-center justify-center p-8 hover:shadow-2xl transition-all duration-300 group"
                            >
                                {renderLogo(partner)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
