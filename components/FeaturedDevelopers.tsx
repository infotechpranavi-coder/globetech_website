'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Partner {
  _id?: string;
  id?: string | number;
  name: string;
  logo: React.ReactNode;
  isDatabase?: boolean;
}

export default function FeaturedPartners() {
  const router = useRouter();
  const [databasePartners, setDatabasePartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  // Industrial Demo data
  const demoPartners = [
    {
      id: 1,
      name: "Siemens",
      logo: (
        <div className="w-full h-24 flex items-center justify-center p-4">
          <div className="text-[#009999] font-black text-3xl italic tracking-tighter">SIEMENS</div>
        </div>
      )
    },
    {
      id: 2,
      name: "ABB",
      logo: (
        <div className="w-full h-24 flex items-center justify-center p-4">
          <div className="text-[#FF0000] font-black text-4xl">ABB</div>
        </div>
      )
    },
    {
      id: 3,
      name: "Schneider Electric",
      logo: (
        <div className="w-full h-24 flex items-center justify-center p-4">
          <div className="text-[#3dcd58] font-black text-xl italic uppercase">Schneider</div>
        </div>
      )
    },
    {
      id: 4,
      name: "Honeywell",
      logo: (
        <div className="w-full h-24 flex items-center justify-center p-4">
          <div className="text-[#e22d25] font-black text-2xl uppercase tracking-widest">Honeywell</div>
        </div>
      )
    },
    {
      id: 5,
      name: "Rockwell Automation",
      logo: (
        <div className="w-full h-24 flex items-center justify-center p-4 text-center">
          <div className="text-gray-800 font-black text-lg leading-none uppercase italic">Rockwell<br />Automation</div>
        </div>
      )
    },
    {
      id: 6,
      name: "Fanuc",
      logo: (
        <div className="w-full h-24 flex items-center justify-center p-4">
          <div className="text-[#f7e018] font-black text-3xl uppercase tracking-tighter drop-shadow-sm">FANUC</div>
        </div>
      )
    }
  ];

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await fetch('/api/developers'); // Keep API endpoint but rename logic
      if (response.ok) {
        const data = await response.json();
        const formatted: Partner[] = data.map((dev: any) => ({
          id: dev._id,
          _id: dev._id,
          name: dev.name,
          isDatabase: true,
          logo: (
            <div className="w-full h-24 flex items-center justify-center p-4">
              <div className="text-globe-black font-black text-2xl md:text-3xl uppercase tracking-tighter italic">
                {dev.name}
              </div>
            </div>
          )
        }));
        setDatabasePartners(formatted);
      }
    } catch (error) {
      console.error('Error fetching partners:', error);
    } finally {
      setLoading(false);
    }
  };

  const basePartners = [
    ...databasePartners,
    ...demoPartners.slice(databasePartners.length).map(p => ({ ...p, isDatabase: false }))
  ];

  const partners = [...basePartners, ...basePartners];
  const [zoomedLogo, setZoomedLogo] = useState<React.ReactNode | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Heading */}
        <div className="mb-12 flex flex-col items-center lg:items-start">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1 h-8 bg-globe-red"></div>
            <span className="text-gray-400 font-black tracking-widest text-[10px] uppercase font-sans">Strategic Alliances</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-globe-black uppercase tracking-tighter italic">
            Partners with <span className="text-globe-red">Globe-Tech</span>
          </h2>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden group/slider border-y border-gray-100 py-10">
          <div className="flex animate-scroll-left hover:pause-animation">
            {partners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="flex-shrink-0 px-6"
                style={{ width: '380px' }}
              >
                <div
                  className="bg-white rounded-sm p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group relative flex items-center justify-center h-40 filter grayscale hover:grayscale-0"
                >
                  <div className="w-full h-full flex items-center justify-center transition-all duration-700 group-hover:scale-110">
                    {partner.logo}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
