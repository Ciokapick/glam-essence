
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-beauty-magenta/20 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-beauty-coral/20 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-beauty-hotpink/20 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
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
              <Link to="/parfumuri">
                <Button size="lg" variant="outline" className="border-beauty-hotpink/50 hover:border-beauty-hotpink hover:bg-beauty-hotpink/5">
                  Oferte speciale
                </Button>
              </Link>
              <Link to="/admin" className="text-sm text-gray-500 hover:text-beauty-magenta transition-colors duration-300 flex items-center ml-4">
                Admin
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="relative flex justify-center">
              <div className="w-60 h-60 md:w-80 md:h-80 bg-beauty-hotpink/30 rounded-full absolute top-10 -left-5 animate-float"></div>
              <div className="w-60 h-60 md:w-80 md:h-80 bg-beauty-magenta/40 rounded-full absolute -top-10 -right-5 animate-float" style={{ animationDelay: '1.5s' }}></div>
              <img 
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Luxury perfume bottles" 
                className="relative z-10 max-w-full h-auto rounded-2xl shadow-xl animate-fade-in"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
            <div className="absolute -bottom-10 right-0 md:right-10 bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg max-w-xs animate-fade-in glass-morphism" style={{ animationDelay: "0.8s" }}>
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
