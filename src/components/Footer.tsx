
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-white pt-16 pb-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand and description */}
          <div>
            <Link to="/" className="text-2xl font-bold">
              <span className="gold-gradient">Glam</span>
              <span className="font-light">Essence</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              {t('footer.about_text')}
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('common.categories')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/parfumuri" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('nav.perfumes')}
                </Link>
              </li>
              <li>
                <Link to="/creme" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('nav.creams')}
                </Link>
              </li>
              <li>
                <Link to="/ingrijire" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('nav.skincare')}
                </Link>
              </li>
              <li>
                <Link to="/seturi" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.gift_sets')}
                </Link>
              </li>
              <li>
                <Link to="/bestsellers" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.bestsellers')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.information')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/despre-noi" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.about_us')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link to="/termeni" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to="/politica-confidentialitate" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.faq')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 mr-3 text-primary" />
                <span className="text-muted-foreground">
                  {t('footer.address')}
                </span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <span className="text-muted-foreground">
                  {t('footer.phone')}
                </span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <span className="text-muted-foreground">
                  {t('footer.email')}
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} GlamEssence. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
