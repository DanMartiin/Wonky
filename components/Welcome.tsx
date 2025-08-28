export default function Welcome() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Images */}
          {/* Mobile/tablet stacked images */}
          <div className="order-2 lg:order-1 block lg:hidden space-y-4">
            <div 
              className="w-full h-48 sm:h-64 rounded-md overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: "url('/images/Rectangle 11.png')" }}
            />
            <div 
              className="w-full h-40 sm:h-56 rounded-md overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: "url('/images/Rectangle 10.png')" }}
            />
          </div>
          {/* Desktop collage */}
          <div className="relative order-2 lg:order-1 h-[531px] hidden lg:block">
            {/* First image - kitchen image */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-1/2 pr-2">
              <div 
                className="w-full h-[315px] rounded-md overflow-hidden bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/Rectangle 10.png')"
                }}
              ></div>
            </div>
            {/* Second image - cafe interior image */}
            <div className="absolute top-0 right-0 w-1/2 pl-2">
              <div 
                className="w-full h-[531px] rounded-md overflow-hidden bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/Rectangle 11.png')"
                }}
              ></div>
            </div>
          </div>

          {/* Copy */}
          <div className="order-1 lg:order-2 lg:pl-8 flex flex-col justify-center h-auto lg:h-[531px]">
            <div className="text-start">
              <div className="uppercase tracking-wider text-xs text-gray-600 mb-2">Welcome to</div>
              <h2 className="text-2xl md:text-4xl font-semibold text-[#1f2e1a] mb-4 border-b border-gray-300 pb-2">Wonky Walden Book Nook</h2>
              <p className="text-sm text-gray-600 mb-3">Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit.</p>
              <p className="text-sm text-gray-600 mb-6">Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est, a mattis tellus.</p>

              <a href="#booking" className="inline-block text-[12px] tracking-wider border border-black text-black px-5 py-2 rounded hover:bg-gray-100">RESERVE NOW</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
