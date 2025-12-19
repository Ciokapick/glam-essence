
import React from 'react';
import { Leaf, TruckIcon, Shield, Gift } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Benefits = () => {
  const { t } = useLanguage();
  
  const benefits = [
    {
      icon: <Leaf className="h-12 w-12 text-green-600" />,
      title: t('benefits.natural_ingredients'),
      description: t('benefits.natural_ingredients_desc')
    },
    {
      icon: <TruckIcon className="h-12 w-12 text-beauty-coral" />,
      title: t('benefits.free_delivery'),
      description: t('benefits.free_delivery_desc')
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-500" />,
      title: t('benefits.guaranteed_quality'),
      description: t('benefits.guaranteed_quality_desc')
    },
    {
      icon: <Gift className="h-12 w-12 text-beauty-gold" />,
      title: t('benefits.special_gifts'),
      description: t('benefits.special_gifts_desc')
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
