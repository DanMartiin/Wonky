import Header from '@/components/Header';
import BookingDetailsPanel from '@/components/BookingDetailsPanel';
import Link from 'next/link';

export default function BookingPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const checkIn = typeof searchParams.checkIn === 'string' ? searchParams.checkIn : undefined;
  const checkOut = typeof searchParams.checkOut === 'string' ? searchParams.checkOut : undefined;
  const guests = typeof searchParams.guests === 'string' ? Number(searchParams.guests) : undefined;
  const time = typeof searchParams.time === 'string' ? searchParams.time : undefined;

  return (
    <main className="min-h-screen bg-[#F8F6F3]">
      <Header />
      <div className="container mx-auto px-4 py-10">
        <div className="mb-6 flex items-center gap-2 text-xs text-gray-600">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-700 text-white">1</span>
          <span>Booking details</span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200">2</span>
          <span>Confirm and Pay</span>
        </div>

        <BookingDetailsPanel
          summary={{ checkIn, checkOut, guests, time }}
        />
      </div>

      {/* Location & Maps */}
      <section className="bg-[#F3EEE7] py-14 mt-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Location & Maps</h3>
              <p className="text-xs text-gray-600 mb-3">No 2201 Lorem Ipsum Dolor Sit Amet</p>
              <button className="px-4 py-2 rounded border text-sm">VIEW LOCATION</button>
              <div className="mt-6 text-xs text-gray-600 space-y-1">
                <div>(1300) 123 456 789</div>
                <div>email@email.com</div>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="w-full h-64 bg-white rounded-md flex items-center justify-center text-gray-500">
                Map Placeholder
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}