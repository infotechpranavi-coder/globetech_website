import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section with Background Image */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&h=600&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tighter">About Us</h1>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
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
                  Globe-Tech Automation Systems Pvt Ltd has been a leading name in the industrial automation industry, dedicated to helping
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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

            <div className="mb-20">
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

            <div className="flex justify-center mb-12">
              <div className="bg-globe-black text-white p-12 rounded-sm text-center shadow-2xl relative overflow-hidden group w-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-globe-red/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                <p className="text-3xl font-black mb-4 relative z-10 uppercase">Ready to automate your workspace?</p>
                <p className="text-lg mb-10 opacity-80 relative z-10 max-w-2xl mx-auto font-medium">Let's build a more efficient and future-ready industrial facility together!</p>
                <Link
                  href="/contact"
                  className="inline-block bg-globe-red text-white px-12 py-5 rounded-sm font-black hover:bg-white hover:text-globe-black transition-all shadow-lg hover:shadow-xl relative z-10 uppercase tracking-widest"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
