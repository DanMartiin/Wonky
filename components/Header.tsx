"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 md:top-[64px] md:left-[250px] md:right-auto md:w-[1411px] md:h-[32px] z-50 bg-transparent font-poppins text-[16px] font-normal">
      <div className="container mx-auto px-4 py-4 md:px-0 md:py-0 md:h-[32px]">
        <div className="flex items-center justify-between md:grid md:grid-cols-3 md:h-[32px]">
          {/* Logo */}
          <div className="text-white tracking-[.24em] md:w-[164px] md:h-[32px] flex items-center">
            <Link href="/" className="w-full h-full flex items-center">wonky walden</Link>
          </div>

          {/* Contact Info (desktop) */}
          <div className="hidden md:flex items-center justify-center space-x-6 text-white">
            <a
              href="mailto:business@wonkymalden.com"
              className="hover:text-green-300 transition-colors md:w-[177px] md:h-[32px] flex items-center justify-center"
            >
              business@wonkymalden.com
            </a>
            <a
              href="tel:1300456789"
              className="hover:text-green-300 transition-colors md:w-[118px] md:h-[32px] flex items-center justify-center"
            >
              1300 456 789
            </a>
          </div>
          
          {/* Right area: desktop nav on md+, hamburger on mobile */}
          <div className="flex items-center justify-end">
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                href="/signup" 
                className="text-white hover:text-green-300 transition-colors md:w-[164px] md:h-[32px] flex items-center justify-center"
              >
                Sign Up
              </Link>
              <Link 
                href="/login" 
                className="text-white hover:text-green-300 transition-colors md:w-[89px] md:h-[32px] flex items-center justify-center"
              >
                Login
              </Link>
            </div>
            <button
              aria-label="Toggle menu"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 text-white"
              onClick={() => setIsOpen((v) => !v)}
            >
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
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

      {/* Mobile menu panel */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-transparent font-poppins text-[16px] font-normal">
          <div className="container mx-auto px-4 py-4 space-y-4 text-white">
            <div className="flex flex-col gap-3">
              <Link href="/signup" className="py-2">Sign Up</Link>
              <Link href="/login" className="py-2">Login</Link>
              <a href="mailto:business@wonkymalden.com" className="py-2">business@wonkymalden.com</a>
              <a href="tel:1300456789" className="py-2">1300 456 789</a>
              <a href="#booking" className="py-2">Book Now</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
