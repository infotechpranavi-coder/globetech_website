import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const services = [
  {
    title: "Entrance Automation",
    description: "Specialized automated gate systems, boom barriers, and turnover gates for industrial facilities.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    color: "globe-black"
  },
  {
    title: "Loading Bay Solutions",
    description: "Premium dock levelers, sectional doors, and dock shelters for efficient warehouse logistics.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: "globe-red"
  },
  {
    title: "High-End Security",
    description: "Advanced turnstiles, biometric access controls, and perimeter security for critical assets.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: "globe-black"
  },
  {
    title: "System Integration",
    description: "Seamlessly connecting hardware and software for a unified, automated industrial workflow.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "globe-red"
  },
  {
    title: "Maintenance Services",
    description: "Annual maintenance contracts and 24/7 technical support for zero-downtime operations.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    color: "globe-black"
  },
  {
    title: "Project Consultation",
    description: "Expert analysis and design for scaling automation in your manufacturing or warehouse units.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: "globe-red"
  }
];

export default function PagesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-globe-black/80 via-globe-black/60 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-1 bg-globe-red"></div>
              <span className="text-white font-black tracking-widest text-sm uppercase">Our Expertise</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
              High-Perfomance <span className="text-globe-red">Solutions</span>
            </h1>
            <p className="text-gray-300 text-lg font-medium max-w-xl uppercase tracking-wide">
              Engineering durable and dependable automation systems tailored for the world's most demanding industries.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-10 rounded-sm shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group flex flex-col items-center text-center"
                style={{ borderTopColor: service.color === 'globe-black' ? '#1a1a1a' : '#ee2a24', borderTopWidth: '4px' }}
              >
                <div className={`mb-8 ${service.color === 'globe-black' ? 'text-globe-black' : 'text-globe-red'}`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black text-globe-black mb-4 group-hover:text-globe-red transition-colors uppercase tracking-tight">
                  {service.title}
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>
                <Link
                  href="/contact"
                  className={`inline-flex items-center font-black uppercase tracking-widest text-[10px] transition ${service.color === 'globe-black'
                    ? 'text-globe-black hover:text-globe-red'
                    : 'text-globe-red hover:text-globe-black'
                    }`}
                >
                  Request Quotation
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-1 h-8 bg-globe-red"></div>
              <span className="text-gray-400 font-black tracking-widest text-[10px] uppercase">The Globe-Tech Advantage</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-globe-black uppercase tracking-tighter italic">Why Engineering Leaders <span className="text-globe-red font-black">Choose Us</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-6 p-10 bg-white rounded-sm shadow-xl border-l-4 border-globe-red group">
              <div className="flex-shrink-0 w-16 h-16 bg-globe-black rounded-sm flex items-center justify-center shadow-lg group-hover:bg-globe-red transition-colors">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-black text-globe-black mb-3 uppercase tracking-tight">Technical Mastery</h3>
                <p className="text-gray-500 font-medium leading-relaxed text-sm">
                  Our engineers are trained in global industrial standards, ensuring precision in every install.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-6 p-10 bg-white rounded-sm shadow-xl border-l-4 border-globe-black group">
              <div className="flex-shrink-0 w-16 h-16 bg-globe-red rounded-sm flex items-center justify-center shadow-lg group-hover:bg-globe-black transition-colors">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-black text-globe-black mb-3 uppercase tracking-tight">Zero-Downtime Focus</h3>
                <p className="text-gray-500 font-medium leading-relaxed text-sm">
                  We design for reliability, because we know your industrial workflow depends on seamless motion.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-6 p-10 bg-white rounded-sm shadow-xl border-l-4 border-globe-black group">
              <div className="flex-shrink-0 w-16 h-16 bg-globe-red rounded-sm flex items-center justify-center shadow-lg group-hover:bg-globe-black transition-colors">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-black text-globe-black mb-3 uppercase tracking-tight">Direct Support</h3>
                <p className="text-gray-500 font-medium leading-relaxed text-sm">
                  No middlemen. Our direct support network ensures quick resolutions for any technical challenge.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-6 p-10 bg-white rounded-sm shadow-xl border-l-4 border-globe-red group">
              <div className="flex-shrink-0 w-16 h-16 bg-globe-black rounded-sm flex items-center justify-center shadow-lg group-hover:bg-globe-red transition-colors">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-black text-globe-black mb-3 uppercase tracking-tight">End-to-End Solutions</h3>
                <p className="text-gray-500 font-medium leading-relaxed text-sm">
                  From site analysis to project handover and maintenance, we manage the entire lifecycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
