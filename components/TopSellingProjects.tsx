'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Property {
  id: string | number;
  name: string;
  image: string;
  number: string;
}

const INDUSTRIAL_DATA: Property[] = [
  {
    id: 1,
    name: "Automobile Industry",
    number: "01",
    image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Pharmaceutical Industry",
    number: "02",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Food & Beverage Industry",
    number: "03",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Warehouse Industry",
    number: "04",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function TopSellingProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [industryData, setIndustryData] = useState<Property[]>(INDUSTRIAL_DATA);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await fetch('/api/industries');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            const formattedData = data.map((item: any, index: number) => ({
              id: item._id,
              name: item.name,
              number: (item.order || index + 1).toString().padStart(2, '0'),
              image: item.image
            }));
            setIndustryData(formattedData);
          }
        }
      } catch (error) {
        console.error('Error fetching industries:', error);
      }
    };
    fetchIndustries();
  }, []);

  // Clone items for infinite loop: Original + first 4
  const projects = [...industryData, ...industryData.slice(0, 4)];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(industryData.length);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(industryData.length - 1);
      }, 50);
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= industryData.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold flex items-center mb-2 justify-center md:justify-start">
            <span className="text-gray-400 relative inline-block">
              Discover
              <span className="absolute bottom-0 left-0 w-full h-1 bg-globe-red"></span>
            </span>
            <span className="text-black ml-4">Industries We Serve</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Complete Automation Solutions for Every Sector
          </p>
        </div>

        {/* Projects Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`flex gap-6 ${isTransitioning ? 'transition-transform duration-1000 ease-in-out' : ''}`}
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(calc(-${currentIndex * (100 / (typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 4))}% - ${currentIndex * (typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : 1.5)}rem))`
            }}
          >
            {projects.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-0.75rem)] md:flex-[0_0_calc(25%-1.125rem)] relative aspect-[3/4.2] bg-globe-black rounded-sm overflow-hidden shadow-xl group cursor-pointer border border-white/10"
              >
                {/* Background Image */}
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                {/* Number Overlay */}
                <div className="absolute top-8 left-8">
                  <span className="text-7xl sm:text-8xl font-black text-transparent stroke-white"
                    style={{ WebkitTextStroke: '2px rgba(255,255,255,0.3)' }}
                  >
                    {project.number}
                  </span>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                    {project.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-12 space-x-6">
            {/* Progress Indicator */}
            <div className="relative w-32 md:w-64 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`absolute top-0 bottom-0 bg-globe-red rounded-full ${isTransitioning ? 'transition-all duration-700 ease-in-out' : ''}`}
                style={{
                  width: `${(1 / industryData.length) * 100}%`,
                  left: `${((currentIndex % industryData.length) / industryData.length) * 100}%`
                }}
              />
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:bg-globe-red hover:border-globe-red transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:bg-globe-red hover:border-globe-red transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

