
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
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
              Descoperă cele mai fine parfumuri și produse de îngrijire, create pentru a evidenția frumusețea ta naturală.
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
            <h3 className="font-semibold text-lg mb-4">Categorii</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/parfumuri" className="text-muted-foreground hover:text-foreground transition-colors">
                  Parfumuri
                </Link>
              </li>
              <li>
                <Link to="/creme" className="text-muted-foreground hover:text-foreground transition-colors">
                  Creme
                </Link>
              </li>
              <li>
                <Link to="/ingrijire" className="text-muted-foreground hover:text-foreground transition-colors">
                  Îngrijire
                </Link>
              </li>
              <li>
                <Link to="/seturi" className="text-muted-foreground hover:text-foreground transition-colors">
                  Seturi cadou
                </Link>
              </li>
              <li>
                <Link to="/bestsellers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Bestsellers
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Informații</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/despre-noi" className="text-muted-foreground hover:text-foreground transition-colors">
                  Despre noi
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/termeni" className="text-muted-foreground hover:text-foreground transition-colors">
                  Termeni și condiții
                </Link>
              </li>
              <li>
                <Link to="/politica-confidentialitate" className="text-muted-foreground hover:text-foreground transition-colors">
                  Politica de confidențialitate
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  Întrebări frecvente
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 mr-3 text-primary" />
                <span className="text-muted-foreground">
                  Strada Frumuseții nr. 23, București
                </span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <span className="text-muted-foreground">
                  +40 755 123 456
                </span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <span className="text-muted-foreground">
                  contact@glamessence.ro
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} GlamEssence. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
