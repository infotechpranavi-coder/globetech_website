import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeroSlide {
  _id?: string;
  title: string;
  subtitle?: string;
  image: string;
  order: number;
}

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    title: "SLIDING GATES",
    subtitle: "Premium automation solutions",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    order: 0
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<HeroSlide[]>(DEFAULT_SLIDES);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch('/api/hero');
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setSlides(data);
        }
      }
    } catch (error) {
      console.error('Error fetching hero slides:', error);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] min-h-[400px] overflow-hidden group">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        <div
          className="relative w-full h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          <div className="absolute inset-0 flex">
            {slides.map((slide, index) => (
              <div key={slide._id || index} className="min-w-full h-full relative">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Dark Circles */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 sm:w-14 sm:h-14 bg-black/40 rounded-full flex items-center justify-center hover:bg-black/60 transition-all text-white"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 sm:w-14 sm:h-14 bg-black/40 rounded-full flex items-center justify-center hover:bg-black/60 transition-all text-white"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Bottom Overlays */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-10 flex items-end justify-end z-40 pointer-events-none">
        {/* Right: Text Label */}
        <div className="text-right">
          <h3 className="text-white text-xl sm:text-3xl font-bold uppercase tracking-wider drop-shadow-lg">
            {slides[currentSlide]?.title || "SLIDING GATES"}
          </h3>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-40 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all ${currentSlide === index ? 'bg-globe-red w-6 sm:w-10' : 'bg-white/50 w-1.5 sm:w-2'
              }`}
          />
        ))}
      </div>
    </section>
  );
}
