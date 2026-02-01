'use client';

import Image from 'next/image';

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
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const displayTitle = property.name || property.title || 'Property';
  const displayId = property._id || String(property.id);
  const displayImage = (property.images && property.images.length > 0)
    ? property.images[0]
    : property.image || "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop";
  const displayType = property.subCategory || property.type || 'Property';

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="premium-card overflow-hidden group border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-sm bg-white">
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          src={displayImage}
          alt={displayTitle}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-5 right-5">
          <span className="bg-globe-red text-white px-4 py-2 rounded-sm text-xs font-black shadow-lg uppercase tracking-widest">
            {displayType}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-globe-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      <div className="p-8">
        <div className="mb-4">
          <h3 className="text-2xl font-black text-globe-black group-hover:text-globe-red transition-colors uppercase tracking-tight leading-tight">{displayTitle}</h3>
        </div>

        <p className="text-gray-400 mb-6 flex items-center text-sm font-bold uppercase tracking-wider">
          <svg className="w-5 h-5 mr-3 text-globe-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {property.location}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-gray-100">
          <div className="flex items-center text-gray-400 group-hover:text-globe-black transition-colors">
            <div className="w-8 h-8 rounded-sm bg-gray-50 flex items-center justify-center mr-3 group-hover:bg-globe-red/10 transition-colors">
              <svg className="w-4 h-4 text-globe-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xs font-black uppercase tracking-widest">High Speed</span>
          </div>
          <div className="flex items-center text-gray-400 group-hover:text-globe-black transition-colors">
            <div className="w-8 h-8 rounded-sm bg-gray-50 flex items-center justify-center mr-3 group-hover:bg-globe-red/10 transition-colors">
              <svg className="w-4 h-4 text-globe-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-xs font-black uppercase tracking-widest">Heavy Duty</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Starting Price</span>
            <div className="text-xl font-black text-globe-black">
              {formatPrice(property.price)}
            </div>
          </div>
          <button
            onClick={() => window.location.href = `/view-project/${displayId}`}
            className="flex-grow max-w-[140px] bg-globe-black text-white px-4 py-3 rounded-sm font-black hover:bg-globe-red transition-all shadow-lg text-xs uppercase tracking-widest text-center"
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}

