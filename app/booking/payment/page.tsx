import Header from '@/components/Header';
import Link from 'next/link';

export default function PaymentPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const checkIn = typeof searchParams.checkIn === 'string' ? searchParams.checkIn : undefined;
  const checkOut = typeof searchParams.checkOut === 'string' ? searchParams.checkOut : undefined;
  const guests = typeof searchParams.guests === 'string' ? Number(searchParams.guests) : undefined;
  const time = typeof searchParams.time === 'string' ? searchParams.time : undefined;

  return (
    <main className="min-h-screen bg-[#F8F6F3]">
      <Header />
      <div className="container mx-auto px-4 py-10">
        <div className="mb-6 flex items-center gap-2 text-xs text-gray-600">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200">1</span>
          <span>Booking details</span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-700 text-white">2</span>
          <span>Confirm and Pay</span>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white border rounded-md p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment</h2>
            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-gray-700 mb-1">Pay with</label>
                <select className="w-full border rounded px-3 py-2">
                  <option>VISA</option>
                  <option>Mastercard</option>
                  <option>AMEX</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input className="border rounded px-3 py-2" placeholder="Card number" />
                <input className="border rounded px-3 py-2" placeholder="Name on card" />
                <input className="border rounded px-3 py-2" placeholder="MM/YY" />
                <input className="border rounded px-3 py-2" placeholder="CVC" />
              </div>
              <div className="pt-2">
                <Link href={{ pathname: '/booking/confirmation', query: { checkIn, checkOut, guests, time } }} className="inline-block px-4 py-2 rounded border bg-gray-900 text-white text-sm">
                  CONFIRM AND PAY
                </Link>
              </div>
            </div>
          </div>

          <aside className="bg-white border rounded-md p-6 shadow-sm h-fit">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Booking details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-600">Check In</span><span>{checkIn || '—'}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Check Out</span><span>{checkOut || '—'}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Time</span><span>{time || '—'}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Guests</span><span>{guests ?? '—'}</span></div>
              <div className="pt-4 border-t">
                <div className="flex justify-between py-1"><span className="text-gray-600">Stay</span><span>$200</span></div>
                <div className="flex justify-between py-1"><span className="text-gray-600">Cleaning fee</span><span>$20</span></div>
                <div className="flex justify-between py-1"><span className="text-gray-600">Service fee</span><span>$10</span></div>
                <div className="flex justify-between py-2 font-semibold border-t mt-2"><span>Total</span><span>$230</span></div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}