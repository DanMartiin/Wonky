import Header from '@/components/Header';
import BookingInterface from '@/components/BookingInterface';
import BookingFlow from '@/components/BookingFlow';

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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-wide">
              MONKY WALDEN
            </h1>
            <h2 className="text-5xl md:text-7xl font-script text-white mb-8">
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
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-script text-green-800 mb-4">
              Why Choose Our Book Nook?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of comfort, nature, and literary inspiration
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Curated Library</h3>
              <p className="text-gray-600">
                Handpicked collection of books across all genres for every reader
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cozy Atmosphere</h3>
              <p className="text-gray-600">
                Warm, inviting spaces designed for ultimate reading comfort
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nature's Embrace</h3>
              <p className="text-gray-600">
                Surrounded by lush greenery and peaceful natural surroundings
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-script mb-4">Wonky Malden Book Nook</h3>
          <p className="text-green-100 mb-4">
            Your perfect escape for reading and relaxation
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="mailto:business@wonkymalden.com" className="hover:text-green-300 transition-colors">
              business@wonkymalden.com
            </a>
            <a href="tel:1300456789" className="hover:text-green-300 transition-colors">
              1300 456 789
            </a>
          </div>
        </div>
      </footer>
      {/* Booking Flow appended below existing content */}
      <BookingFlow />
    </main>
  );
}
