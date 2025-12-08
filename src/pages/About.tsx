
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold mb-6">{t('about.title')}</h1>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            {t('about.welcome')}
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">{t('about.mission_title')}</h2>
          <p className="mb-4">
            {t('about.mission')}
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">{t('about.values_title')}</h2>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">{t('about.values.quality')}</li>
            <li className="mb-2">{t('about.values.transparency')}</li>
            <li className="mb-2">{t('about.values.nature')}</li>
            <li className="mb-2">{t('about.values.innovation')}</li>
            <li className="mb-2">{t('about.values.responsibility')}</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">{t('about.story_title')}</h2>
          <p className="mb-4">
            {t('about.story_part1')}
          </p>
          
          <p className="mb-4">
            {t('about.story_part2')}
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
