export default function Amenities() {
  const amenities = [
    'The entire place is yours',
    'Air conditioning',
    'Non-smoking rooms',
    '40 m2 size',
    'Free on-site parking',
    'Balcony',
    'Free WiFi',
    'Fully equipped kitchen',
    'Washing machine & dryer',
    'Private bathroom',
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-3 justify-center">
          {amenities.map((label) => (
            <span key={label} className="inline-flex items-center gap-2 rounded-full bg-[#F3EEE7] px-3 py-1.5 text-[11px] text-gray-700">
              <span className="w-2 h-2 rounded-full bg-[#4D6443]"></span>
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
