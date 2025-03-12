
import React from 'react';
import { Leaf, TruckIcon, Shield, Gift } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: <Leaf className="h-12 w-12 text-beauty-mint" />,
      title: "Ingrediente naturale",
      description: "Produse create cu ingrediente organice, pentru pielea ta."
    },
    {
      icon: <TruckIcon className="h-12 w-12 text-beauty-lavender" />,
      title: "Livrare gratuită",
      description: "Pentru comenzi de peste 200 lei în toată România."
    },
    {
      icon: <Shield className="h-12 w-12 text-beauty-rose" />,
      title: "Calitate garantată",
      description: "Toate produsele noastre sunt testate și certificate."
    },
    {
      icon: <Gift className="h-12 w-12 text-beauty-gold" />,
      title: "Cadouri speciale",
      description: "La fiecare comandă primești mostre și surprize."
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
