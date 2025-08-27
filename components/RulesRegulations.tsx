import { 
  CigaretteOff, 
  Snowflake, 
  Clock, 
  Key, 
  Sofa, 
  UserX, 
  VolumeX, 
  Trash2, 
  Hand, 
  Wine, 
  Flower, 
  Shield 
} from 'lucide-react';

export default function RulesRegulations() {
  const rules = [
    {
      text: 'No smoking in the premise',
      icon: CigaretteOff,
      color: '#112921'
    },
    {
      text: 'Please turn off the AC when you go out',
      icon: Snowflake,
      color: '#4D6443'
    },
    {
      text: 'Please respect check in & check out times',
      icon: Clock,
      color: '#112921'
    },
    {
      text: 'Please take care of your keys. Lost keys incur a replacement fee.',
      icon: Key,
      color: '#4D6443'
    },
    {
      text: "Please don't rearrange the furniture",
      icon: Sofa,
      color: '#4D6443'
    },
    {
      text: 'No unregistered guests allowed',
      icon: UserX,
      color: '#112921'
    },
    {
      text: 'Please respect the noise curfew',
      icon: VolumeX,
      color: '#4D6443'
    },
    {
      text: 'Please do not litter and use trash can',
      icon: Trash2,
      color: '#112921'
    },
    {
      text: 'Handle furnishings with care. Damages will be charged.',
      icon: Hand,
      color: '#112921'
    },
    {
      text: 'Alcohol and illegal drugs strictly prohibited.',
      icon: Wine,
      color: '#4D6443'
    },
    {
      text: 'Please admire the trees— no picking or climbing.',
      icon: Flower,
      color: '#112921'
    },
    {
      text: 'Please secure valuables; retreat house is not responsible for loss',
      icon: Shield,
      color: '#4D6443'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-[960px]">
        <h3 className="text-2xl font-semibold text-center mb-8">Rules and Regulations</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-2">
          {rules.map((rule, i) => {
            const IconComponent = rule.icon;
            return (
              <div 
                key={i} 
                className="p-5 text-white flex flex-col items-center justify-center text-center md:max-h-[234px] md:max-w-[234px] md:min-h-[234px] md:min-w-[234px]:"
                style={{ backgroundColor: rule.color }}
              >
                <div className="w-10 h-10 mb-3 flex items-center justify-center">
                  <IconComponent className="text-white md:w-[141.83px] md:h-[141.83px]" />
                </div>
                <div className="text-[11px] leading-snug opacity-95">{rule.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}