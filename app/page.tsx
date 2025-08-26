'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import BookingInterface from '@/components/BookingInterface';
import BookingFlow from '@/components/BookingFlow';
import Footer from '../components/Footer';

export default function Home() {
  const [expandedItem, setExpandedItem] = useState(0);

  const toggleItem = (index: number) => {
    setExpandedItem(expandedItem === index ? -1 : index);
  };
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
              className="text-[56px] font-normal text-white tracking-[0.44em] font-figtree"
              style={{ fontFamily: 'Figtree, sans-serif' }}
            >
              WONKY WALDEN
            </h1>
            <h2
              className="text-[120px] font-normal text-white tracking-[0em] font-birthstone"
              style={{ fontFamily: 'Birthstone, cursive' }}
            >
              Book Nook
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Escape to our cozy reading sanctuary nestled in nature's embrace
            </p>
          </div>
          
          {/* Booking Interface */}
          <div className="w-full">
            <BookingInterface />
          </div>
        </div>
      </section>
      
      {/* Welcome / Amenities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-start">
            {/* Images */}
            <div className="grid grid-cols-2 gap-4 order-2 lg:order-1">
              <div className="col-span-1">
                <div className="w-full h-56 md:h-72 rounded-md overflow-hidden bg-gray-200"></div>
              </div>
              <div className="col-span-1 row-span-2">
                <div className="w-full h-72 md:h-[420px] rounded-md overflow-hidden bg-[url('/images/BG_image.png')] bg-cover bg-center"></div>
              </div>
              <div className="col-span-1">
                <div className="w-full h-56 md:h-72 rounded-md overflow-hidden bg-gray-300"></div>
              </div>
            </div>

            {/* Copy */}
            <div className="order-1 lg:order-2">
              <div className="uppercase tracking-wider text-xs text-gray-500 mb-2">Welcome to</div>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#1f2e1a] mb-4">Wonky Walden Book Nook</h2>
              <p className="text-sm text-gray-600 mb-3">Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit.</p>
              <p className="text-sm text-gray-600 mb-6">Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est, a mattis tellus.</p>

              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  'The entire place is yours',
                  'Air conditioning',
                  'Non-smoking rooms',
                  '40 m2 size',
                  'Free on-site parking',
                  'Balcony',
                  'Free WiFi',
                  'Fully equipped kitchen',
                  'Washing machine & dryer',
                  'Private bathroom',
                ].map((label) => (
                  <span key={label} className="inline-flex items-center gap-2 rounded-full bg-[#F3EEE7] px-3 py-1.5 text-[11px] text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-[#4D6443]"></span>
                    {label}
                  </span>
                ))}
              </div>

              <a href="#booking" className="inline-block text-[12px] tracking-wider border px-5 py-2 rounded">RESERVE NOW</a>
            </div>
          </div>
        </div>
      </section>

      {/* Rules and Regulations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-semibold text-center mb-8">Rules and Regulations</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              'No smoking in the premise',
              'Please turn off the AC when you go out',
              'Please respect check in & check out times',
              'Take care of your keys',
              "Please don't rearrange the furniture",
              'No unregistered guests allowed',
              'Please respect the noise curfew',
              'Please do not litter and use trash can',
              'Handle furnishings with care',
              'No alcohol and illegal drugs',
              'Admire the trees — no picking or climbing',
              'Secure valuables; host not responsible',
            ].map((text, i) => (
              <div key={i} className="rounded-md p-5 bg-[#112921] text-white flex flex-col items-center justify-center text-center min-h-[140px]">
                <div className="w-10 h-10 mb-3 rounded-full bg-white/10 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-white/30"></div>
                </div>
                <div className="text-[11px] leading-snug opacity-95">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Maps */}
      <section className="bg-[#F3EEE7] py-14 mt-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <div className="bg-white rounded-md p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Location & Maps</h3>
                <p className="text-xs text-gray-600 mb-4">No 2201 Lorem Ipsum Dolor Sit Amet</p>
                <button className="px-4 py-2 rounded border text-xs text-black">VIEW LOCATION</button>
              </div>
              <div className="mt-6 text-xs text-gray-600 space-y-1">
                <div>(1300) 123 456 789</div>
                <div>email@email.com</div>
              </div>
            </div>
            <div className="md:col-span-2">
              <div 
                className="w-full h-64 md:h-72 bg-white rounded-md bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/🌎 Map Maker_ Monty Court, Norfolk, Virginia 23518, United States (WY).png')"
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-semibold text-center mb-10 text-black">Guests who stayed here loved</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <article key={i} className="border rounded-md p-5 bg-white shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Jennifer</div>
                    <div className="flex items-center gap-1 text-[#4D6443]">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <svg key={s} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                          <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.402 8.169L12 18.896l-7.336 3.869 1.402-8.169L.132 9.21l8.2-1.192z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-2">Corem ipsum dolor sit amet, consectetur adipiscing elit, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit.</p>
                <button className="text-xs underline">Read more..</button>
              </article>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="px-6 py-3 border-2 border-gray-300 rounded-md text-xs tracking-wider font-semibold bg-white hover:bg-gray-50 transition-colors text-black">VIEW ALL</button>
          </div>
        </div>
      </section>

      {/* Everything You Need */}
      <section className="bg-[#F3EEE7] py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#1f2e1a] mb-4 leading-tight">Everything You Need for a Comfortable Stay</h3>
          </div>
          <div className="bg-white rounded-md p-6">
            {/* Accordion items */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={`border-b ${i === 7 ? 'border-b-0' : ''} ${expandedItem === i ? 'pb-4 mb-4' : 'py-3'}`}>
                <div 
                  className="flex items-center gap-3 font-semibold text-sm text-[#1f2e1a] cursor-pointer"
                  onClick={() => toggleItem(i)}
                >
                  <span className="w-5 h-5 rounded-full border flex items-center justify-center text-xs">
                    {expandedItem === i ? '−' : '+'}
                  </span>
                  LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT.
                </div>
                {expandedItem === i && (
                  <p className="mt-3 text-xs text-gray-600">Worem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit, sed est risus. Maecenas eget condimentum velit, sit amet feugiat lectus.</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/Rectangle 55.png')"
            }}
          />
          <div className="absolute inset-0 bg-[#112921]/80" />
        </div>
        <div className="relative container mx-auto px-4 py-24 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-semibold mb-3">Looking for a peaceful place to stay for the upcoming religious gathering?</h3>
          <p className="text-sm md:text-base text-white/85 max-w-3xl mx-auto mb-6">Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit.</p>
          <a href="#booking" className="inline-block border px-5 py-2 rounded text-sm">BOOK NOW</a>
        </div>
      </section>
      
      <Footer />
      {/* Booking Flow appended below existing content */}
      <BookingFlow />
    </main>
  );
}
