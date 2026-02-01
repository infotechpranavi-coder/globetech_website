'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// NavLink Component matching Toshi style
function NavLink({ href, pathname, children }: { href: string; pathname: string; children: React.ReactNode }) {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        relative flex items-center transition-all duration-300 text-sm font-bold uppercase tracking-tight
        ${isActive
          ? 'text-globe-red'
          : 'text-gray-700 hover:text-globe-red font-semibold'
        }
      `}
    >
      {children}
    </Link>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full z-50 transition-all duration-300 sticky top-0 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white'}`}>
      {/* Top Bar */}
      <div className="border-b border-gray-100 py-1 sm:py-2">
        <div className="container mx-auto px-4 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Tagline */}
          <div className="text-[10px] sm:text-xs md:text-sm font-bold text-gray-800 uppercase tracking-tight">
            India's <span className="text-globe-red">MOST RELIABLE</span> Entrance Automation Company
          </div>

          {/* Contact & Socials */}
          <div className="flex items-center divide-x divide-gray-200">
            <div className="flex items-center px-3 sm:px-4 text-xs sm:text-sm font-bold text-gray-700">
              <span className="mr-1 sm:mr-2">📞</span>
              <span>+91 8287116904</span>
            </div>
            <div className="flex items-center px-2 sm:px-4 gap-2 sm:gap-4">
              <Link href="#" className="text-gray-400 hover:text-blue-600 transition">
                <span className="text-sm sm:text-lg">f</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition">
                <span className="text-sm sm:text-lg">t</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-700 transition">
                <span className="text-sm sm:text-lg">in</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-pink-600 transition">
                <span className="text-sm sm:text-lg">ig</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-red-600 transition">
                <span className="text-sm sm:text-lg">yt</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <nav className="container mx-auto px-4 py-2 sm:py-4 max-w-7xl">
        <div className="flex items-center justify-between h-12 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-32 sm:h-16 sm:w-48">
              <Image
                src="/WhatsApp_Image_2026-01-30_at_11.21.42_PM-removebg-preview.png"
                alt="Globe-Tech Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            <NavLink href="/" pathname={pathname}>Home</NavLink>
            <NavLink href="/about" pathname={pathname}>About</NavLink>
            <NavLink href="/clients" pathname={pathname}>Clients</NavLink>
            <NavLink href="/properties" pathname={pathname}>Products</NavLink>
            <NavLink href="/team" pathname={pathname}>Team</NavLink>
            <NavLink href="/media" pathname={pathname}>Media & Awards</NavLink>
            <NavLink href="/careers" pathname={pathname}>Careers</NavLink>
            <NavLink href="/contact" pathname={pathname}>Contact Us</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-800 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 space-y-1 bg-white border-t border-gray-100 p-4 shadow-xl rounded-b-lg absolute left-0 right-0 z-50">
            <Link href="/" className="block py-3 text-sm font-bold uppercase text-globe-red">Home</Link>
            <Link href="/about" className="block py-3 text-sm font-bold uppercase text-gray-700 hover:text-globe-red border-t border-gray-50">About</Link>
            <Link href="/clients" className="block py-3 text-sm font-bold uppercase text-gray-700 hover:text-globe-red border-t border-gray-50">Clients</Link>
            <Link href="/properties" className="block py-3 text-sm font-bold uppercase text-gray-700 hover:text-globe-red border-t border-gray-50">Products</Link>
            <Link href="/team" className="block py-3 text-sm font-bold uppercase text-gray-700 hover:text-globe-red border-t border-gray-50">Team</Link>
            <Link href="/media" className="block py-3 text-sm font-bold uppercase text-gray-700 hover:text-globe-red border-t border-gray-50">Media & Awards</Link>
            <Link href="/careers" className="block py-3 text-sm font-bold uppercase text-gray-700 hover:text-globe-red border-t border-gray-50">Careers</Link>
            <Link href="/contact" className="block py-3 text-sm font-bold uppercase text-gray-700 hover:text-globe-red border-t border-gray-50 uppercase">Contact Us</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
