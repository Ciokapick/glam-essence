
import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    {
      id: "parfumuri",
      name: "Parfumuri",
      description: "Esențe care spun povestea ta",
      image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      color: "from-beauty-magenta/80 to-beauty-magenta/40"
    },
    {
      id: "creme",
      name: "Creme",
      description: "Hidratare profundă pentru pielea ta",
      image: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      color: "from-beauty-coral/80 to-beauty-coral/40"
    },
    {
      id: "ingrijire",
      name: "Îngrijire",
      description: "Rutina completă pentru strălucire",
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      color: "from-beauty-hotpink/80 to-beauty-hotpink/40"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Categorii de produse</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explorează gama noastră variată de produse premium pentru toate nevoile tale de frumusețe.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link 
              to={`/${category.id}`} 
              key={category.id}
              className="relative group overflow-hidden rounded-xl h-96 flex items-end card-hover animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Image */}
              <img 
                src={category.image} 
                alt={category.name} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80`}></div>
              
              {/* Content */}
              <div className="relative p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-white/90 mb-4">{category.description}</p>
                <span className="inline-flex items-center text-white font-medium rounded-full pl-4 pr-3 py-1.5 bg-white/20 backdrop-blur-sm">
                  Explorează
                  <svg className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
