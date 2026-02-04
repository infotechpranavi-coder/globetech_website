'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Property {
  id?: string | number;
  _id?: string;
  title?: string;
  name?: string;
  location: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  image?: string;
  images?: string[];
  type?: string;
  subCategory?: string;
  description?: string;
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const displayTitle = property.name || property.title || 'Automation Solution';
  const displayId = property._id || String(property.id);
  const displayImage = (property.images && property.images.length > 0)
    ? property.images[0]
    : property.image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop";
  const displayType = property.subCategory || property.type || 'Industrial';

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className="relative group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with info overlay */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={displayImage}
          alt={displayTitle}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />

        {/* Type Badge - Glassmorphism */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-white/90 backdrop-blur-md text-globe-black px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border border-white/20">
            {displayType}
          </span>
        </div>

        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-globe-black/90 via-globe-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
          <p className="text-white/80 text-xs font-medium line-clamp-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            {property.description || "Precision engineered automation solution designed for high-performance industrial environments."}
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-[2px] bg-globe-red"></div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Solution</span>
          </div>
          <h3 className="text-xl font-black text-globe-black group-hover:text-globe-red transition-colors uppercase tracking-tight leading-none min-h-[40px]">
            {displayTitle}
          </h3>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2 text-gray-500 bg-gray-50 p-2 rounded-lg border border-gray-100/50">
            <svg className="w-3.5 h-3.5 text-globe-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-wider">Fast-Sync</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 bg-gray-50 p-2 rounded-lg border border-gray-100/50">
            <svg className="w-3.5 h-3.5 text-globe-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-wider">Secure</span>
          </div>
        </div>

        {/* Footer Area */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">EST. VALUE</span>
            <span className="text-lg font-black text-globe-black">{formatPrice(property.price)}</span>
          </div>

          <button
            onClick={() => window.location.href = `/view-project/${displayId}`}
            className="px-5 py-2.5 bg-globe-black text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-globe-red transition-all duration-300 transform group-hover:translate-x-1"
          >
            Explore →
          </button>
        </div>
      </div>

      {/* Decorative Corner Element */}
      <div className="absolute bottom-0 right-0 w-8 h-8 bg-globe-red/5 -rotate-45 translate-x-4 translate-y-4 group-hover:bg-globe-red/10 transition-colors"></div>
    </div>
  );
}

