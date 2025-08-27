'use client';

import { useState } from 'react';

export default function FAQs() {
  const [expandedItem, setExpandedItem] = useState<number>(0);
  const toggleItem = (index: number) => {
    setExpandedItem(expandedItem === index ? -1 : index);
  };

  return (
    <section className="bg-[#F3EEE7] py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-[#1f2e1a] mb-4 leading-tight">
            Everything You Need for a Comfortable Stay
          </h3>
        </div>

        <div className="bg-white rounded-md p-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`border-b ${i === 7 ? 'border-b-0' : ''} ${expandedItem === i ? 'pb-4 mb-4' : 'py-3'}`}
            >
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
                <p className="mt-3 text-xs text-gray-600">
                  Worem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a,
                  mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                  interdum tellus elit, sed est risus. Maecenas eget condimentum velit, sit amet feugiat lectus.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

