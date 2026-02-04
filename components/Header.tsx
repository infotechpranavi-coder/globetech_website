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
            Globetech Innovations — <span className="text-globe-red">MOST RELIABLE</span> Industrial Automation Partner
          </div>

          {/* Contact & Socials */}
          <div className="flex items-center divide-x divide-gray-200">
            <div className="flex items-center px-3 sm:px-4 text-xs sm:text-sm font-bold text-gray-700">
              <span className="mr-1 sm:mr-2">
                <svg className="w-4 h-4 text-globe-red" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
                </svg>
              </span>
              <span>08047641503</span>
            </div>
            <div className="flex items-center px-2 sm:px-4 gap-3 sm:gap-4">
              <Link href="#" className="text-gray-400 hover:text-[#1877F2] transition-colors" title="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-globe-black transition-colors" title="X (Twitter)">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#0A66C2] transition-colors" title="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#E4405F] transition-colors" title="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.057-1.274-.07-1.649-.07-4.844 0-3.196.016-3.586.074-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0-2.163c-3.259 0-3.667.014-4.947.072-1.277.06-2.148.261-2.913.558-.788.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.846a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#FF0000] transition-colors" title="YouTube">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <nav className="w-full pl-2 sm:pl-4 pr-4 py-1 sm:py-2">
        <div className="flex items-center justify-between h-10 sm:h-16">
          {/* Logo & Branding */}
          <Link href="/" className="flex items-center gap-4 group">
            {/* Circular Logo */}
            <div className="relative h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0">
              <Image
                src="/WhatsApp_Image_2026-01-30_at_11.21.42_PM-removebg-preview.png"
                alt="Globetech Innovations"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Branding Text & Details */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-4">
              <div className="flex flex-col lg:flex-row lg:items-baseline lg:gap-3">
                <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-black text-[#2D2D2D] leading-none tracking-tighter">
                  Globetech Innovations
                </h1>
                <div className="flex items-center gap-2">
                  <span className="hidden lg:block w-px h-3 bg-gray-300"></span>
                  <p className="text-[9px] sm:text-[10px] md:text-xs font-bold text-gray-500 uppercase">
                    Chembur Extension, Mumbai, Maharashtra
                  </p>
                </div>
              </div>

            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            <NavLink href="/" pathname={pathname}>Home</NavLink>
            <NavLink href="/about" pathname={pathname}>About</NavLink>
            <NavLink href="/clients" pathname={pathname}>Clients</NavLink>
            <NavLink href="/properties" pathname={pathname}>Products</NavLink>
            <NavLink href="/media" pathname={pathname}>News & Blogs</NavLink>
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
            <Link href="/media" className="block py-3 text-sm font-bold uppercase text-gray-700 hover:text-globe-red border-t border-gray-50">News & Blogs</Link>
            <Link href="/contact" className="block py-3 text-sm font-bold uppercase text-gray-700 hover:text-globe-red border-t border-gray-50 uppercase">Contact Us</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
