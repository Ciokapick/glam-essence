
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Newsletter = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/20 to-beauty-mint/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Abonează-te la newsletter</h2>
          <p className="text-muted-foreground mb-8">
            Fii prima persoană care află despre noile colecții, oferte exclusive și sfaturi de frumusețe.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Adresa ta de email" 
              className="flex-grow bg-white/80 backdrop-blur-sm focus-visible:ring-primary"
            />
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap">
              Abonează-te
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            Prin abonare, ești de acord cu <a href="#" className="underline">Termenii și Condițiile</a> noastre.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
