'use client';

import { useEffect, useRef, useState } from 'react';
import BookingDetailsPanel from '@/components/BookingDetailsPanel';

/**
 * This wrapper listens for clicks on the existing CHECK AVAILABILITY button
 * inside `BookingInterface`. Without altering existing code, we attach a
 * delegated event listener and toggle our panel below the current content.
 */
export default function BookingFlow() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const path = (event.composedPath ? event.composedPath() : []) as Array<EventTarget>;
      const elements: HTMLElement[] = [];
      if (path && path.length > 0) {
        for (const n of path) {
          if (n && (n as HTMLElement).nodeType === 1) {
            elements.push(n as HTMLElement);
          }
        }
      } else {
        const target = event.target as HTMLElement | null;
        if (target) elements.push(target);
      }

      const button = elements.find((el) => el.tagName === 'BUTTON');
      const text = (button?.innerText || elements[0]?.innerText || '').trim().toLowerCase();
      if (text.includes('check availability')) {
        setOpen(true);
      }
    };
    document.addEventListener('click', handleClick);
    const openFromHash = () => {
      if (window.location.hash === '#booking') setOpen(true);
    };
    const openFromEvent = () => setOpen(true);
    window.addEventListener('hashchange', openFromHash);
    window.addEventListener('load', openFromHash);
    window.addEventListener('open-booking', openFromEvent as EventListener);
    // Initialize if hash already present
    openFromHash();
    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('hashchange', openFromHash);
      window.removeEventListener('load', openFromHash);
      window.removeEventListener('open-booking', openFromEvent as EventListener);
    };
  }, []);

  useEffect(() => {
    if (open && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [open]);

  if (!open) return null;

  return (
    <div id="booking" ref={panelRef} className="bg-[#F8F6F3]">
      <BookingDetailsPanel
        summary={{}}
        onBookNow={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Location & Maps</h3>
            <p className="text-sm text-gray-600">No 2201 Lorem Ipsum Dolor Sit Amet</p>
            <button className="px-4 py-2 border rounded text-sm">VIEW LOCATION</button>
            <div className="text-xs text-gray-600 space-y-1">
              <div>(1300) 123 456 789</div>
              <div>email@email.com</div>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="w-full h-64 bg-gray-200 rounded-md flex items-center justify-center text-gray-600">
              Map Placeholder
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-green-900 text-white py-10">
        <div className="container mx-auto px-4 flex items-center justify-between text-xs">
          <div>
            <div className="font-semibold mb-2">LOGO HERE</div>
            <p className="text-green-100 max-w-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.</p>
          </div>
          <div className="opacity-90">(201) 4563 8245</div>
        </div>
      </footer>
    </div>
  );
}