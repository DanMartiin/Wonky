import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-3 items-center">
          {/* Logo */}
          <div className="text-white font-thin tracking-[.24em] text-xl">
            wonky walden
          </div>
          
          {/* Contact Info */}
          <div className="hidden md:flex items-center justify-center space-x-6 text-white text-sm">
            <a href="mailto:business@wonkymalden.com" className="hover:text-green-300 transition-colors">
              business@wonkymalden.com
            </a>
            <a href="tel:1300456789" className="hover:text-green-300 transition-colors">
              1300 456 789
            </a>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center justify-end space-x-4">
            <Link 
              href="/signup" 
              className="text-white hover:text-green-300 transition-colors text-sm"
            >
              Sign Up
            </Link>
            <Link 
              href="/login" 
              className="text-white hover:text-green-300 transition-colors text-sm"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
