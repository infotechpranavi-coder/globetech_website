import Image from 'next/image';

export default function AboutSection() {
  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

          {/* Left Side: Founder Image with Overlay */}
          <div className="relative w-full lg:w-1/2 group">
            <div className="relative aspect-[4/5] sm:aspect-[3/2] lg:aspect-square overflow-hidden rounded-sm shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                alt="Kapil Sachdev - Founder & CEO"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Overlay Box */}
            <div className="absolute -top-10 -left-12 sm:-left-24 bg-globe-black border-l-4 sm:border-l-8 border-globe-red p-4 sm:p-6 shadow-2xl z-10 animate-fade-in pointer-events-none max-w-[180px] sm:max-w-[280px]">
              <div className="text-white">
                <h3 className="text-lg sm:text-2xl font-black leading-tight uppercase tracking-tighter">Globetech<br />Innovations</h3>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-1 h-8 bg-globe-red"></div>
              <span className="text-gray-400 font-bold tracking-widest text-sm uppercase">About Us</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-globe-black mb-8 uppercase tracking-tighter">
              WELCOME TO GLOBETECH<br />INNOVATIONS
            </h2>

            <div className="space-y-6 text-gray-500 text-sm sm:text-base leading-relaxed font-medium uppercase tracking-wide">
              <p>
                Globetech Innovations is a leading brand in industrial and smart automation solutions, delivering sophisticated, energy-efficient, user-friendly, and reliable products. Our wide range includes sliding and swing gate motors, boom barriers, automated safety grills, automated roof systems, glass doors, and many more innovative solutions designed to enhance convenience and security.
              </p>
              <p>
                We specialize in providing customized automation solutions tailored to client requirements and budgets, ensuring maximum performance, reliability, and value.
              </p>
              <p className="text-xs opacity-70">
                A glowing testimony to our capabilities and reputation is the list of our esteemed clients, which include <strong>Maruti Suzuki, Adani Group, JSW Group, Amazon, Hero Motors, Asian Paints, Panasonic, Honda, Uflex, Merino, Daiichi, Shimizu, ITC, Nestle, Halidram's, Patanjali, Mccain, Anmol Industries, Dabur, Mother Dairy, Aurobindo, Glenmark, Mankind, Bharat Biotech, Intas Pharma, ACG, Zydus, Lupin, Abbott, Cipla, NTPC, Airport Authority of India</strong>, and many other <strong>PSUs</strong> and <strong>CPSEs</strong> among others.
              </p>
            </div>

            <div className="mt-10 sm:mt-16 flex flex-wrap gap-6 sm:gap-12 pt-8 border-t border-gray-100">
              {['Distinct', 'Dependable', 'Durable'].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="text-globe-red text-xl sm:text-2xl">✔</div>
                  <span className="text-sm sm:text-lg font-black text-globe-black tracking-tight uppercase">{feature}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
