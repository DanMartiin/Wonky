'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import BookingInterface from '@/components/BookingInterface';
import Welcome from '@/components/Welcome';
import Amenities from '@/components/Amenities';
import RulesRegulations from '@/components/RulesRegulations';
import MapLocation from '@/components/MapLocation';
import Testimonials from '@/components/Testimonials';
import FAQs from '@/components/FAQs';
import Footer from '../components/Footer';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/BG_image.png')"
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-12">
            <h1
              className="text-[56px] md:text-[56px] sm:text-4xl font-normal text-white tracking-[0.44em] font-figtree"
              style={{ fontFamily: 'Figtree, sans-serif' }}
            >
              WONKY WALDEN
            </h1>
            <h2
              className="text-[64px] sm:text-[80px] md:text-[120px] font-normal text-white tracking-[0em] font-birthstone"
              style={{ fontFamily: 'Birthstone, cursive' }}
            >
              Book Nook
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Escape to our cozy reading sanctuary nestled in nature's embrace
            </p>
          </div>
          
          {/* Booking Interface */}
          <div className="w-full">
            <BookingInterface />
          </div>
        </div>
      </section>
      
      {/* Welcome Section */}
      <Welcome />

      {/* Amenities Section */}
      <Amenities />

      {/* Rules and Regulations */}
      <RulesRegulations />

      {/* Location & Maps */}
      <MapLocation />

      {/* Testimonials */}
      <Testimonials />

      {/* Everything You Need */}
      <FAQs />

      {/* CTA Banner */}
      <CTA />
      
      <Footer />
    </main>
  );
}
