import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#112921] text-white">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-md">
          <div className="text-sm font-semibold tracking-wider mb-3">LOGO HERE</div>
          <p className="text-[10px] leading-relaxed text-white/80">
            Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
            molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
            accumsan.
          </p>
        </div>

        <div className="flex items-center gap-5 ml-auto md:ml-0">
          <span className="text-xs text-white/90">(123) 4563 6245</span>
          <Link href="#" aria-label="Facebook" className="inline-flex w-8 h-8 items-center justify-center rounded bg-white/10 hover:bg-white/20 transition">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M22 12a10 10 0 1 0-11.563 9.874v-6.987H7.898V12h2.539V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562V12h2.773l-.443 2.887h-2.33v6.987A10.002 10.002 0 0 0 22 12Z" />
            </svg>
          </Link>
          <Link href="#" aria-label="Instagram" className="inline-flex w-8 h-8 items-center justify-center rounded bg-white/10 hover:bg-white/20 transition">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="3.5" />
              <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}




