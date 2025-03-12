
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-beauty-lavender/30 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-beauty-mint/30 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-beauty-rose/30 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Descoperă esența
              <span className="block gold-gradient">frumuseții tale</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
              Colecția noastră exclusivă de parfumuri și produse de îngrijire te ajută să strălucești în fiecare zi.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group">
                Explorează colecția
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="border-beauty-gold/50 hover:border-beauty-gold hover:bg-beauty-gold/5">
                Oferte speciale
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="relative flex justify-center">
              <div className="w-60 h-60 md:w-80 md:h-80 bg-beauty-rose/30 rounded-full absolute top-10 -left-5 animate-float"></div>
              <div className="w-60 h-60 md:w-80 md:h-80 bg-beauty-lavender/40 rounded-full absolute -top-10 -right-5 animate-float" style={{ animationDelay: '1.5s' }}></div>
              <img 
                src="https://images.unsplash.com/photo-1611293388250-580b08c4a145?q=80&w=1440&auto=format&fit=crop"
                alt="Luxury perfume bottles" 
                className="relative z-10 max-w-full h-auto rounded-2xl shadow-xl animate-fade-in"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
            <div className="absolute -bottom-10 right-0 md:right-10 bg-white rounded-xl p-4 shadow-lg max-w-xs animate-fade-in" style={{ animationDelay: "0.8s" }}>
              <p className="font-medium text-sm">
                "Esențe care îți transformă întreaga zi într-o experiență senzorială deosebită."
              </p>
              <p className="text-right text-sm mt-2 text-gray-500">— Cosmopolitan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
