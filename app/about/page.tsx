'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamSection from "@/components/TeamSection";
import MediaStories from "@/components/MediaStories";
import FloatingActions from "@/components/FloatingActions";
import PremiumHero from "@/components/PremiumHero";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <PremiumHero
        titlePrefix="WHO WE"
        titleSuffix="ARE"
        description="Leading the industrial revolution with precision engineering and automated brilliance."
        backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600"
      />

      {/* About Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Label */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-1 h-8 bg-globe-red"></div>
                <span className="text-gray-400 font-bold tracking-widest text-[10px] uppercase">Industrial Heritage</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-globe-black mb-8 leading-tight uppercase tracking-tight">15 Years of Excellence in Industrial Automation</h2>
            </div>

            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <p className="text-lg text-gray-500 leading-relaxed font-bold uppercase tracking-wide">
                  Globetech Innovations has been a leading name in the industrial automation industry, dedicated to helping
                  factories and warehouses optimize their operations with future-ready solutions.
                  With over 15 years of experience and a commitment to excellence, we have built a reputation
                  for integrity, professionalism, and outstanding technical support.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed font-bold uppercase tracking-wide">
                  Our mission is to provide exceptional automation services
                  that exceed expectations. We understand that enhancing workforce efficiency and factory productivity is one of
                  your most significant business goals, and we're here to guide you through every step
                  of the automation process.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              <div className="text-center p-8 bg-white rounded-sm shadow-xl border-t-4 border-globe-red hover:shadow-2xl transition-all">
                <div className="text-5xl font-black text-globe-black mb-3 italic">2.5K+</div>
                <div className="text-gray-400 font-black text-[10px] uppercase tracking-widest">Active Solutions</div>
              </div>
              <div className="text-center p-8 bg-white rounded-sm shadow-xl border-t-4 border-globe-black hover:shadow-2xl transition-all">
                <div className="text-5xl font-black text-globe-red mb-3 italic">15+</div>
                <div className="text-gray-400 font-black text-[10px] uppercase tracking-widest">Global Support Hubs</div>
              </div>
              <div className="text-center p-8 bg-white rounded-sm shadow-xl border-t-4 border-globe-red hover:shadow-2xl transition-all">
                <div className="text-5xl font-black text-globe-black mb-3 italic">15+</div>
                <div className="text-gray-400 font-black text-[10px] uppercase tracking-widest">Years Industry Experience</div>
              </div>
            </div>

            <div className="mb-24">
              <div className="flex items-center gap-4 mb-6 text-center justify-center">
                <span className="text-gray-400 font-bold text-sm uppercase tracking-widest">Our Foundation</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-globe-black mb-12 text-center uppercase tracking-tight">Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-medium">
                <div className="p-10 border-l-4 border-globe-red bg-gray-50 rounded-r-sm shadow-lg hover:shadow-xl transition-all group">
                  <h3 className="text-2xl font-black text-globe-black mb-4 group-hover:text-globe-red transition-colors uppercase tracking-tight">Integrity</h3>
                  <p className="text-gray-500 leading-relaxed">
                    We conduct all our business with the highest ethical standards and transparency, building lasting trust with our industrial partners.
                  </p>
                </div>
                <div className="p-10 border-l-4 border-globe-black bg-gray-50 rounded-r-sm shadow-lg hover:shadow-xl transition-all group">
                  <h3 className="text-2xl font-black text-globe-black mb-4 group-hover:text-globe-red transition-colors uppercase tracking-tight">Excellence</h3>
                  <p className="text-gray-500 leading-relaxed">
                    We strive for technical excellence in every transaction and interaction, ensuring our automation solutions are top-tier.
                  </p>
                </div>
                <div className="p-10 border-l-4 border-globe-black bg-gray-50 rounded-r-sm shadow-lg hover:shadow-xl transition-all group">
                  <h3 className="text-2xl font-black text-globe-black mb-4 group-hover:text-globe-red transition-colors uppercase tracking-tight">Customer Focus</h3>
                  <p className="text-gray-500 leading-relaxed">
                    Your factory's efficiency is our top priority. We listen, understand your specific needs, and deliver tailored solutions.
                  </p>
                </div>
                <div className="p-10 border-l-4 border-globe-red bg-gray-50 rounded-r-sm shadow-lg hover:shadow-xl transition-all group">
                  <h3 className="text-2xl font-black text-globe-black mb-4 group-hover:text-globe-red transition-colors uppercase tracking-tight">Innovation</h3>
                  <p className="text-gray-500 leading-relaxed">
                    We leverage the latest technology and industrial insights to serve you better, making automation smarter and simpler.
                  </p>
                </div>
              </div>
            </div>

            {/* Team Values Section (Merged from Team Page) */}
            <div className="mb-24">
              <div className="flex items-center gap-4 mb-6 text-center justify-center">
                <span className="text-gray-400 font-bold text-sm uppercase tracking-widest">Our Culture</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-globe-black mb-12 text-center uppercase tracking-tight">Why We Lead</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="relative p-10 bg-white shadow-xl rounded-sm border-t-4 border-globe-red group hover:-translate-y-2 transition-transform duration-300">
                  <h3 className="text-xl font-black text-globe-black mb-4 uppercase tracking-tight">Engineering Mindset</h3>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed">
                    We approach every challenge with technical precision and a commitment to durable, scalable solutions.
                  </p>
                </div>
                <div className="relative p-10 bg-globe-black shadow-xl rounded-sm border-t-4 border-globe-red group hover:-translate-y-2 transition-transform duration-300">
                  <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">Client First</h3>
                  <p className="text-gray-400 text-sm font-medium leading-relaxed">
                    Our directors and engineers work side-by-side with clients to ensure seamless implementation and support.
                  </p>
                </div>
                <div className="relative p-10 bg-white shadow-xl rounded-sm border-t-4 border-globe-red group hover:-translate-y-2 transition-transform duration-300">
                  <h3 className="text-xl font-black text-globe-black mb-4 uppercase tracking-tight">Innovation Driven</h3>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed">
                    From R&D to final testing, we leverage the latest technologies to keep your facility future-ready.
                  </p>
                </div>
              </div>
            </div>

            {/* Team Section Component */}
            <div className="mb-24 bg-gray-50 -mx-4 sm:-mx-8 md:-mx-12 lg:-mx-20 px-4 sm:px-8 md:px-12 lg:px-20 py-20">
              <TeamSection />
            </div>

            {/* Awards & Recognition */}
            <div className="mb-24">
              <div className="flex items-center gap-4 mb-6 text-center justify-center">
                <span className="text-gray-400 font-bold text-sm uppercase tracking-widest">Global Recognition</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-globe-black mb-12 text-center uppercase tracking-tight">Awards & Media</h2>
              <MediaStories />
            </div>

            {/* Leadership Quote (Merged from Team Page) */}
            <div className="mb-24">
              <div className="bg-globe-black text-white p-12 rounded-sm text-center shadow-2xl relative overflow-hidden group w-full border-l-8 border-globe-red">
                <svg className="w-16 h-16 text-globe-red mx-auto mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 8.89543 14.017 10V12H11.017V10C11.017 7.23858 13.2556 5 16.017 5H19.017C21.7784 5 24.017 7.23858 24.017 10V15C24.017 18.866 20.883 22 17.017 22H14.017V21ZM0 15V10C0 7.23858 2.23858 5 5 5H8C10.7614 5 13 7.23858 13 10V15C13 18.866 9.86599 22 6 22H3V21L3 18C3 16.8954 3.89543 16 5 16H8C8.55228 16 9 15.5523 9 15V9C9 8.44772 8.55228 8 8 8H5.00001C3.89544 8 3.00001 8.89543 3.00001 10V12H0.00001V10Z" />
                </svg>
                <h2 className="text-2xl md:text-4xl font-black text-white mb-10 leading-tight uppercase tracking-tighter italic">
                  "Our strength lies not just in our technology, but in the expert minds that deploy it."
                </h2>
                <div className="flex flex-col items-center">
                  <p className="text-globe-red font-black uppercase tracking-widest text-lg">Kapil Sachdev</p>
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1">Founder & Chief Solution Provider</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center mb-12">
              <div className="bg-white border-2 border-globe-black text-globe-black p-12 rounded-sm text-center shadow-xl relative overflow-hidden group w-full">
                <p className="text-3xl font-black mb-4 relative z-10 uppercase">Ready to automate your workspace?</p>
                <p className="text-lg mb-10 text-gray-500 relative z-10 max-w-2xl mx-auto font-medium">Let's build a more efficient and future-ready industrial facility together!</p>
                <Link
                  href="/contact"
                  className="inline-block bg-globe-red text-white px-12 py-5 rounded-sm font-black hover:bg-black hover:text-white transition-all shadow-lg hover:shadow-xl relative z-10 uppercase tracking-widest"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}
