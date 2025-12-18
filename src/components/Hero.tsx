import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <img 
          src="/hero.jpg" 
          alt="Beauty Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute left-0 top-0 bottom-0 w-3/4 bg-gradient-to-r from-[#9E8EA8]/90 to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-pink-200/30 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-rose-200/20 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-5xl lg:text-7xl font-serif font-bold mb-6 leading-tight text-white">
              Beauty,
              <span className="block text-white">Grown by</span>
              <span className="block text-white">the Earth.</span>
            </h1>
            <p className="text-lg text-white mb-10 max-w-md leading-relaxed">
              Formulated from rare minerals, precious clays, and crystal infusions. Each formula honors the slow power of time, touch, and transformation.
            </p>
          </div>

          {/* Right Content - Perfume Bottle Image */}
          <div className="relative flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="relative">
              {/* Decorative flowers/elements behind */}
              <div className="absolute -top-10 -left-10 w-40 h-40 opacity-60">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-300 to-rose-400 blur-2xl"></div>
              </div>
              
              {/* Main perfume bottle placeholder */}
              <div className="relative z-10 w-80 h-96 lg:w-96 lg:h-[500px]">
              </div>

              {/* Decorative flower elements */}
              <div className="absolute -bottom-5 -right-5 w-32 h-32 opacity-70">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-rose-300 to-pink-400 blur-xl"></div>
              </div>

              {/* Sparkle effect */}
              <div className="absolute top-1/4 right-0 w-8 h-8 text-white/80 animate-pulse" style={{ animationDelay: "1s" }}>
                ✨
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;