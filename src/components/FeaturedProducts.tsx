
import React from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const products = [
    {
      id: "1",
      name: "Parfum Floral Extravagance",
      price: 349.99,
      image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Parfum",
      isNew: true,
      rating: 5,
      reviewCount: 12,
      description: "Un parfum floral extraordinar cu note de trandafir, iasomie și lăcrămioară. Perfect pentru ocazii speciale și pentru a face o impresie memorabilă.",
      features: [
        "Note de vârf: bergamotă, lămâie",
        "Note de mijloc: trandafir, iasomie, lăcrămioară",
        "Note de bază: mosc, ambră",
        "Concentrație: Eau de Parfum",
        "Persistență: 8-10 ore"
      ]
    },
    {
      id: "2",
      name: "Cremă hidratantă Luxury",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Cremă",
      isSale: true,
      discount: 15,
      rating: 4,
      reviewCount: 28,
      description: "Cremă de lux cu o formulă intens hidratantă, îmbogățită cu acid hialuronic și ceramide. Ideală pentru toate tipurile de piele, inclusiv cea sensibilă.",
      features: [
        "Hidratare intensă de lungă durată",
        "Formulă non-grasă, ușor absorbabilă",
        "Conține acid hialuronic și ceramide",
        "Protejează bariera naturală a pielii",
        "Testată dermatologic"
      ]
    },
    {
      id: "3",
      name: "Ser facial Radiance",
      price: 189.99,
      image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&auto=format&fit=crop&q=80",
      category: "Îngrijire",
      rating: 5,
      reviewCount: 19,
      description: "Ser facial inovator care iluminează tenul, uniformizează tonul pielii și reduce vizibil petele pigmentare. Rezultate vizibile după doar câteva utilizări.",
      features: [
        "Conține vitamina C stabilizată",
        "Reduce petele pigmentare și uniformizează tonul pielii",
        "Oferă luminozitate și strălucire tenului",
        "Formulă antioxidantă, combate radicalii liberi",
        "Textură ușoară, potrivită pentru utilizare zilnică"
      ]
    },
    {
      id: "4",
      name: "Cremă de corp Intense",
      price: 399.99,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
      category: "Cremă",
      isSale: true,
      discount: 10,
      rating: 4,
      reviewCount: 16,
      description: "Cremă de corp luxuriantă cu o textură bogată ce hrănește intens pielea. Formulă cu unt de shea și ulei de argan pentru o hidratare profundă.",
      features: [
        "Hidratare intensivă pentru piele uscată",
        "Conține unt de shea și ulei de argan",
        "Parfum delicat, de lungă durată",
        "Absorbție rapidă, nu lasă reziduuri grase",
        "Ambalaj premium, reutilizabil"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-beauty-rose/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Produse populare</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descoperă selecția noastră de produse premium, create pentru a-ți îmbunătăți rutina zilnică de frumusețe.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${parseInt(product.id) * 0.1}s` }}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/parfumuri">
            <Button className="bg-beauty-magenta hover:bg-beauty-magenta/90 text-white">
              Vezi toate produsele
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
