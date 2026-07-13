import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { language } = useLanguage();
  const copy = language === 'ro' ? {
    line: 'Parfumuri și ritualuri de îngrijire alese pentru momentele tale.',
    shop: 'Colecții', info: 'Descoperă', account: 'Contul tău', country: 'Magazin online · România',
  } : {
    line: 'Fragrances and care rituals chosen for the moments that matter.',
    shop: 'Collections', info: 'Discover', account: 'Your account', country: 'Online boutique · Romania',
  };

  return (
    <footer className="bg-[#1c1217] pb-8 pt-20 text-white md:pt-28">
      <div className="container mx-auto px-5 md:px-8">
        <div className="grid gap-14 border-b border-white/12 pb-16 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link to="/" className="font-serif text-3xl font-medium">Glam Essence</Link>
            <p className="mt-5 text-sm leading-7 text-white/55">{copy.line}</p>
            <Link to="/contact" className="mt-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.17em] text-[#d7a5ae]">
              Contact <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <FooterColumn title={copy.shop} links={[
            ['/parfumuri', language === 'ro' ? 'Parfumuri' : 'Perfumes'],
            ['/creme', language === 'ro' ? 'Creme' : 'Creams'],
            ['/ingrijire', language === 'ro' ? 'Îngrijire' : 'Skincare'],
            ['/seturi', language === 'ro' ? 'Seturi cadou' : 'Gift sets'],
          ]} />
          <FooterColumn title={copy.info} links={[
            ['/about', language === 'ro' ? 'Povestea noastră' : 'Our story'],
            ['/contact', 'Contact'],
            ['/parfumuri', language === 'ro' ? 'Ghid de parfum' : 'Fragrance guide'],
          ]} />
          <FooterColumn title={copy.account} links={[
            ['/account', language === 'ro' ? 'Cont' : 'Account'],
            ['/wishlist', language === 'ro' ? 'Favorite' : 'Wishlist'],
            ['/checkout', 'Checkout'],
          ]} />
        </div>

        <div className="flex flex-col gap-3 pt-7 text-[9px] uppercase tracking-[.18em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Glam Essence</p>
          <p>{copy.country}</p>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, links }: { title: string; links: string[][] }) => (
  <div>
    <h3 className="mb-5 text-[9px] font-semibold uppercase tracking-[.22em] text-white/40">{title}</h3>
    <ul className="space-y-3">
      {links.map(([to, label]) => <li key={`${to}-${label}`}><Link to={to} className="text-sm text-white/70 transition hover:text-white">{label}</Link></li>)}
    </ul>
  </div>
);

export default Footer;
