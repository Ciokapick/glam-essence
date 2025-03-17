
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const SeturiPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Seturi cadou</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descoperă colecția noastră de seturi cadou, create pentru a oferi o experiență completă de îngrijire și parfumare.
            </p>
          </div>
          
          <Separator className="mb-12" />
          
          <div className="grid grid-cols-1 gap-8">
            <div className="bg-beauty-rose/5 rounded-xl p-8 flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&auto=format&fit=crop&q=80" 
                  alt="Set cadou premium" 
                  className="w-full h-64 md:h-full object-cover rounded-lg"
                />
              </div>
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-2">Set cadou Luxury Experience</h2>
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold mr-3">899,99 lei</span>
                  <span className="text-lg text-muted-foreground line-through">999,99 lei</span>
                </div>
                <p className="text-muted-foreground mb-6">
                  Un set exclusivist care conține parfumul Floral Extravagance (100ml), crema hidratantă Luxury (50ml) și serul facial Radiance (30ml). Cadoul perfect pentru a răsfăța pe cineva drag sau pentru a-ți oferi o experiență completă de frumusețe și îngrijire.
                </p>
                <div className="space-y-2 mb-6">
                  <p className="font-medium">Setul include:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Parfum Floral Extravagance 100ml</li>
                    <li>Cremă hidratantă Luxury 50ml</li>
                    <li>Ser facial Radiance 30ml</li>
                    <li>Cutie cadou exclusivistă</li>
                  </ul>
                </div>
                <Button className="bg-beauty-magenta hover:bg-beauty-magenta/90 text-white">
                  Adaugă în coș
                </Button>
              </div>
            </div>
            
            <div className="bg-beauty-mint/5 rounded-xl p-8 flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1617897903246-719242758050?w=800&auto=format&fit=crop&q=80" 
                  alt="Set cadou îngrijire" 
                  className="w-full h-64 md:h-full object-cover rounded-lg"
                />
              </div>
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-2">Set îngrijire completă</h2>
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold mr-3">599,99 lei</span>
                  <span className="text-lg text-muted-foreground line-through">699,99 lei</span>
                </div>
                <p className="text-muted-foreground mb-6">
                  Acest set conține tot ce ai nevoie pentru o rutină completă de îngrijire: crema hidratantă Luxury, serul facial Radiance și crema de corp Intense. Produsele se completează perfect pentru a oferi pielii tale strălucire și hidratare.
                </p>
                <div className="space-y-2 mb-6">
                  <p className="font-medium">Setul include:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Cremă hidratantă Luxury 50ml</li>
                    <li>Ser facial Radiance 30ml</li>
                    <li>Cremă de corp Intense 200ml</li>
                    <li>Geantă cosmetică elegantă</li>
                  </ul>
                </div>
                <Button className="bg-beauty-magenta hover:bg-beauty-magenta/90 text-white">
                  Adaugă în coș
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SeturiPage;
