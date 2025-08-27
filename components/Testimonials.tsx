export default function Testimonials() {
  return (
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
  );
}
