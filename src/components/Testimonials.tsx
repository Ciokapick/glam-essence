
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Testimonials = () => {
  const { t } = useLanguage();
  
  const testimonials = [
    {
      id: 1,
      text: t('testimonials.maria_text'),
      author: "Maria Ionescu",
      role: t('testimonials.maria_role'),
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      text: t('testimonials.alex_text'),
      author: "Alexandru Popa",
      role: t('testimonials.alex_role'),
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      text: t('testimonials.cristina_text'),
      author: "Cristina Dumitrescu",
      role: t('testimonials.cristina_role'),
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  return (
    <section className="py-20 bg-beauty-lavender/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('testimonials.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('testimonials.subtitle_extended')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-xl p-8 shadow-md relative animate-fade-in"
              style={{ animationDelay: `${testimonial.id * 0.2}s` }}
            >
              {/* Quote mark */}
              <div className="absolute top-4 right-6 text-beauty-lavender/20 text-7xl font-serif">
                "
              </div>
              
              <p className="text-gray-700 mb-6 relative z-10">{testimonial.text}</p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full mr-4 object-cover" 
                />
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
