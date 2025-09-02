"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#4D6443] backdrop-blur-sm transition-colors duration-300">
      <div className="container mx-auto px-3 md:px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo - responsive sizing */}
          <div className="text-white font-thin tracking-[.24em] text-lg md:text-xl">
            <Link href="/">wonky walden</Link>
          </div>

          {/* Contact Info - hidden on mobile, centered on larger screens */}
          <div className="hidden lg:flex items-center justify-center space-x-4 xl:space-x-6 text-white text-xs md:text-base">
            <Link href="mailto:business@wonkymalden.com" className="hover:text-green-300 transition-colors">
              business@wonkymalden.com
            </Link>
            <Link href="tel:1300456789" className="hover:text-green-300 transition-colors">
              1300 456 789
            </Link>
          </div>
          
          {/* Navigation - responsive with mobile menu */}
          <div className="flex items-center space-x-4 md:space-x-2">
            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
              <Link 
                href="/booking" 
                className="text-white hover:text-green-300 transition-colors text-sm md:text-base"
              >
                Book Now
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <button
              aria-label="Toggle menu"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              className="md:hidden inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 text-white"
              onClick={() => setIsOpen((v) => !v)}
            >
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 md:w-6 md:h-6"
              >
                {isOpen ? (
                  <path fillRule="evenodd" d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.361a1 1 0 1 1 1.414 1.414L13.414 10.586l4.361 4.361a1 1 0 0 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 0 1-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel - full width overlay */}
      <div 
        id="mobile-menu" 
        className={`md:hidden absolute top-full left-0 right-0 bg-[#4D6443] backdrop-blur-sm rounded-b-lg transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen 
            ? 'max-h-96 opacity-100 translate-y-0' 
            : 'max-h-0 opacity-0 -translate-y-2'
        }`}
      >
        <div className="container mx-auto px-4 py-6 space-y-4 text-white">
          <div className="flex flex-col gap-4">
            <Link href="mailto:business@wonkymalden.com" className="text-base py-3 border-b border-white/20">business@wonkymalden.com</Link>
            <Link href="tel:1300456789" className="text-base py-3 border-b border-white/20">1300 456 789</Link>
            <Link href="/booking" className="text-base py-3">Book Now</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
