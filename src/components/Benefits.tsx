import { Gift, Leaf, ShieldCheck, Truck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Benefits = () => {
  const { language } = useLanguage();
  const items = language === 'ro' ? [
    { icon: Leaf, title: 'Selecție atentă', description: 'Colecții curate pentru ritualuri simple și plăcute.' },
    { icon: Truck, title: 'Livrare în România', description: 'Gratuită pentru comenzile care depășesc 200 lei.' },
    { icon: ShieldCheck, title: 'Plată și comandă clare', description: 'Vezi stocul, totalul și detaliile înainte de confirmare.' },
    { icon: Gift, title: 'Pregătit pentru cadou', description: 'Alege esențe și seturi potrivite pentru momente speciale.' },
  ] : [
    { icon: Leaf, title: 'Considered selection', description: 'Curated collections for simple, enjoyable rituals.' },
    { icon: Truck, title: 'Delivery in Romania', description: 'Complimentary on orders over 200 lei.' },
    { icon: ShieldCheck, title: 'Clear checkout', description: 'Review stock, totals, and details before confirming.' },
    { icon: Gift, title: 'Ready for gifting', description: 'Choose scents and sets for meaningful occasions.' },
  ];

  return (
    <section className="bg-[#281922] py-20 text-white md:py-24">
      <div className="container mx-auto px-5 md:px-8">
        <div className="grid gap-px overflow-hidden border border-white/12 bg-white/12 md:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-[#281922] p-7 md:p-8">
              <Icon className="mb-8 h-5 w-5 text-[#d7a5ae]" strokeWidth={1.5} />
              <h3 className="font-serif text-2xl font-medium">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/60">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
