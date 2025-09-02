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
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/BG_image.png')"
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-8 sm:mb-12">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl xl:text-[56px] font-normal text-white tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.44em] font-figtree leading-tight"
            >
              WONKY WALDEN
            </h1>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-[120px] font-normal text-white tracking-[0em] font-birthstone leading-tight mt-2 sm:mt-4"
            >
              Book Nook
            </h2>
          </div>
          
          {/* Booking Interface */}
          <div className="w-full max-w-4xl mx-auto">
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
