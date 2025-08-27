export default function CTA() {
  return (
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
        <h3 className="text-2xl md:text-3xl font-semibold mb-3">
          Looking for a peaceful place to stay for the upcoming religious gathering?
        </h3>
        <p className="text-sm md:text-base text-white/85 max-w-3xl mx-auto mb-6">
          Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
          Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit.
        </p>
        <a href="#booking" className="inline-block border px-5 py-2 rounded text-sm">
          BOOK NOW
        </a>
      </div>
    </section>
  );
}
