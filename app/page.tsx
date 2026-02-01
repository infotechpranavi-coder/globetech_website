'use client';

import { useEffect } from 'react';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import MediaStories from "@/components/MediaStories";
import VideoSection from "@/components/VideoSection";
import TopSellingProjects from "@/components/TopSellingProjects";
import PartnerSection from "@/components/PartnerSection";
import GlobeTechDifference from "@/components/GlobeTechDifference";
import ProductGrid from "@/components/ProductGrid";
import TeamSection from "@/components/TeamSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div id="hero">
        <Hero />
      </div>

      <AboutSection />

      <MediaStories />

      <VideoSection />

      <div id="latest-projects">
        <TopSellingProjects />
      </div>

      <PartnerSection />

      <GlobeTechDifference />

      <ProductGrid />

      <TeamSection />

      <TestimonialsSection />

      <FloatingActions />

      <div id="footer">
        <Footer />
      </div>
    </main>
  );
}

