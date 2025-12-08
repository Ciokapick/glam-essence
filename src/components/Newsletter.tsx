
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

const Newsletter = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-gradient-to-r from-beauty-rose/20 to-beauty-hotpink/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('newsletter.title')}</h2>
          <p className="text-muted-foreground mb-8">
            {t('newsletter.subtitle_extended')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder={t('newsletter.email_placeholder')} 
              className="flex-grow bg-white/80 backdrop-blur-sm focus-visible:ring-beauty-magenta"
            />
            <Button className="bg-beauty-magenta hover:bg-beauty-magenta/90 text-white whitespace-nowrap">
              {t('newsletter.button')}
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            {t('newsletter.terms_text')} <a href="#" className="underline">{t('newsletter.terms_link')}</a> {t('newsletter.subtitle').includes('noastre') ? '' : 'noastre'}.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
