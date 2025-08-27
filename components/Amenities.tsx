import { 
  Home, 
  Snowflake, 
  CigaretteOff, 
  Square, 
  Car, 
  Building2, 
  Wifi, 
  ChefHat, 
  WashingMachine, 
  Bath 
} from 'lucide-react';

export default function Amenities() {
  const amenities = [
    {
      label: 'The entire place is yours',
      icon: Home
    },
    {
      label: 'Air conditioning',
      icon: Snowflake
    },
    {
      label: 'Non-smoking rooms',
      icon: CigaretteOff
    },
    {
      label: '40 m2 size',
      icon: Square
    },
    {
      label: 'Free on-site parking',
      icon: Car
    },
    {
      label: 'Balcony',
      icon: Building2
    },
    {
      label: 'Free WiFi',
      icon: Wifi
    },
    {
      label: 'Fully equipped kitchen',
      icon: ChefHat
    },
    {
      label: 'Washing machine & dryer',
      icon: WashingMachine
    },
    {
      label: 'Private bathroom',
      icon: Bath
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {amenities.map((amenity) => {
            const IconComponent = amenity.icon;
            return (
              <div 
                key={amenity.label} 
                className="flex items-center gap-[22px] bg-[#F3EEE7] px-3 py-3"
              >
                <div className="w-9 h-9 rounded-full bg-[#4D6443] flex items-center justify-center">
                  <IconComponent size={22} className="text-white" />
                </div>
                <span className="text-base text-gray-700">
                  {amenity.label}
                </span>
              </div>
            );
          })}
        </div>
        
        <div className="text-center">
          <a href="#booking" className="inline-block text-[12px] tracking-wider border border-gray-600 px-5 py-2 rounded text-gray-700 hover:bg-gray-50 transition-colors">
            RESERVE NOW
          </a>
        </div>
      </div>
    </section>
  );
}
