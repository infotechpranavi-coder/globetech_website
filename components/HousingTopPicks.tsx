'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  id: string | number;
  developerName: string;
  developerLogo: React.ReactNode;
  projectName: string;
  location: string;
  price: string;
  category: string;
  specialOffer: string | null;
  image: string;
}

export default function IndustrialTopPicks() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopPicks();
  }, []);

  const fetchTopPicks = async () => {
    try {
      setLoading(true);
      // In a real scenario, we might fetch from /api/projects
      // For now, we use our repurposed demo data
      setProjects(DEMO_INDUSTRIAL_PICKS);
    } catch (error) {
      console.error('Error fetching top picks:', error);
      setProjects(DEMO_INDUSTRIAL_PICKS);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    if (projects.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    if (projects.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  if (loading) {
    return (
      <div className="py-24 bg-white flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-sm h-12 w-12 border-t-2 border-b-2 border-globe-red"></div>
      </div>
    );
  }

  if (projects.length === 0) return null;

  const currentProject = projects[currentIndex];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Heading */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1 h-8 bg-globe-red"></div>
            <span className="text-gray-400 font-black tracking-widest text-[10px] uppercase">Curated Excellence</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-globe-black mb-3 uppercase tracking-tighter italic">
            Globe-Tech's <span className="text-globe-red">Top Picks</span>
          </h2>
          <p className="text-gray-500 text-lg font-medium uppercase tracking-wide">
            Explore our most high-performance automation solutions.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Project Card */}
            <div className="lg:col-span-3 relative">
              <div className="bg-gray-50 rounded-sm p-8 shadow-xl h-full relative border-t-4 border-globe-red">
                {/* Navigation Arrow - Left */}
                <button
                  onClick={prevSlide}
                  className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-sm shadow-xl flex items-center justify-center hover:bg-globe-black hover:text-white transition-all z-10 border border-gray-100"
                  aria-label="Previous"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Developer Logo */}
                <div className="mb-6">
                  <div className="w-16 h-16">
                    {projects[(currentIndex - 1 + projects.length) % projects.length].developerLogo}
                  </div>
                </div>

                {/* Details */}
                <div className="mb-4">
                  <h3 className="font-black text-globe-black text-xl leading-tight uppercase tracking-tight mb-2">
                    {projects[(currentIndex - 1 + projects.length) % projects.length].projectName}
                  </h3>
                  <Link href="/properties" className="text-globe-red text-[10px] font-black uppercase tracking-widest hover:underline">
                    Technical Specs
                  </Link>
                </div>

                <div className="space-y-3 mt-6">
                  <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest">
                    {projects[(currentIndex - 1 + projects.length) % projects.length].location}
                  </p>
                  <p className="text-globe-black font-black text-lg italic">
                    {projects[(currentIndex - 1 + projects.length) % projects.length].category}
                  </p>
                  {projects[(currentIndex - 1 + projects.length) % projects.length].specialOffer && (
                    <div className="bg-globe-red text-white px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest inline-flex items-center mt-2">
                      {projects[(currentIndex - 1 + projects.length) % projects.length].specialOffer}
                    </div>
                  )}
                  <Link href="/contact" className="block w-full bg-globe-black text-white py-4 px-6 rounded-sm font-black hover:bg-globe-red transition-all mt-8 text-center uppercase tracking-widest text-[10px]">
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>

            {/* Central Large Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative h-[450px] rounded-sm overflow-hidden shadow-2xl group">
                <Image
                  src={currentProject.image}
                  alt={currentProject.projectName}
                  fill
                  className="object-cover group-hover:scale-105 transition-all duration-1000"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-globe-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10">
                  <h4 className="text-white text-3xl font-black uppercase tracking-tighter italic">{currentProject.projectName}</h4>
                  <p className="text-globe-red font-black uppercase tracking-widest text-xs mt-2">Certified Industrial Solution</p>
                </div>
              </div>

              {/* Top Right Thumbnail */}
              <div className="absolute top-6 right-6 bg-white rounded-sm shadow-2xl p-3 z-10 max-w-[140px] border border-gray-100">
                <div className="w-full h-20 rounded-sm overflow-hidden mb-2 relative">
                  <Image
                    src={currentProject.image}
                    alt={currentProject.projectName}
                    fill
                    className="object-cover"
                    sizes="140px"
                  />
                </div>
                <p className="text-[10px] font-black text-globe-black text-center leading-tight uppercase tracking-widest">
                  Featured Case
                </p>
              </div>
            </div>

            {/* Right Project Card */}
            <div className="lg:col-span-3 relative">
              <div className="bg-gray-50 rounded-sm p-8 shadow-xl h-full relative border-t-4 border-globe-black">
                {/* Navigation Arrow - Right */}
                <button
                  onClick={nextSlide}
                  className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-sm shadow-xl flex items-center justify-center hover:bg-globe-black hover:text-white transition-all z-10 border border-gray-100"
                  aria-label="Next"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Developer Logo */}
                <div className="mb-6">
                  <div className="w-16 h-16">
                    {projects[(currentIndex + 1) % projects.length].developerLogo}
                  </div>
                </div>

                {/* Details */}
                <div className="mb-4">
                  <h3 className="font-black text-globe-black text-xl leading-tight uppercase tracking-tight mb-2">
                    {projects[(currentIndex + 1) % projects.length].projectName}
                  </h3>
                  <Link href="/properties" className="text-globe-red text-[10px] font-black uppercase tracking-widest hover:underline">
                    Technical Specs
                  </Link>
                </div>

                <div className="space-y-3 mt-6">
                  <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest">
                    {projects[(currentIndex + 1) % projects.length].location}
                  </p>
                  <p className="text-globe-black font-black text-lg italic">
                    {projects[(currentIndex + 1) % projects.length].category}
                  </p>
                  {projects[(currentIndex + 1) % projects.length].specialOffer && (
                    <div className="bg-globe-red text-white px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest inline-flex items-center mt-2">
                      {projects[(currentIndex + 1) % projects.length].specialOffer}
                    </div>
                  )}
                  <Link href="/contact" className="block w-full bg-globe-black text-white py-4 px-6 rounded-sm font-black hover:bg-globe-red transition-all mt-8 text-center uppercase tracking-widest text-[10px]">
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const DEMO_INDUSTRIAL_PICKS = [
  {
    id: 1,
    developerName: "Falcon Logistics",
    developerLogo: (
      <div className="w-full h-full bg-globe-black rounded-sm flex items-center justify-center shadow-md">
        <span className="text-white font-black text-[10px] text-center italic">FALCON HUB</span>
      </div>
    ),
    projectName: "Hyper-Speed Gate S10",
    location: "Industrial Corridor, Pune",
    price: "Custom Pricing",
    category: "Entrance Automation",
    specialOffer: "5 Year Warranty",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    developerName: "Titan Pharma",
    developerLogo: (
      <div className="w-full h-full bg-globe-red rounded-sm flex items-center justify-center">
        <span className="text-white font-black text-[10px] text-center italic">TITAN MFG</span>
      </div>
    ),
    projectName: "Biometric Turnstile X-1",
    location: "Pharma City, Hyderabad",
    price: "Tiered Pricing",
    category: "Security Systems",
    specialOffer: "Cloud Integrated",
    image: "https://images.unsplash.com/photo-1517420704173-9a3d7350ec4a?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: 3,
    developerName: "Global Warehousing",
    developerLogo: (
      <div className="w-full h-full bg-gray-200 rounded-sm flex items-center justify-center shadow-md">
        <span className="text-globe-black font-black text-[10px] text-center italic">GLOBAL WAREHOUSE</span>
      </div>
    ),
    projectName: "Hydraulic Dock Leveler HD",
    location: "Logistics Park, Navi Mumbai",
    price: "Heavy Duty",
    category: "Loading Bay Solutions",
    specialOffer: "Best Seller",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
  }
];
