import React, { useState } from 'react';
import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const isRo = language === 'ro';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toast({ title: t('contact.message_sent_title'), description: t('contact.message_sent_desc') });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const updateField = (field: keyof typeof formData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((current) => ({ ...current, [field]: event.target.value }));
  };

  const info = [
    { icon: MapPin, label: t('contact.address'), value: t('contact.address_value') },
    { icon: Phone, label: t('contact.phone'), value: '+40 123 456 789' },
    { icon: Mail, label: t('contact.email'), value: 'contact@example.com' },
  ];

  return (
    <div className="min-h-screen bg-[#f5f1ee] text-[#281922]">
      <Navbar />
      <main className="mx-auto max-w-[1440px] px-5 pb-24 pt-36 md:px-10 lg:px-16">
        <section className="grid overflow-hidden rounded-[1.75rem] bg-[#281922] text-white shadow-[0_22px_70px_rgba(40,25,34,.16)] lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative overflow-hidden p-7 sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute -left-28 -top-36 h-[28rem] w-[28rem] rounded-full border border-[#d9aebb]/20" />
            <div className="pointer-events-none absolute -bottom-48 -right-24 h-[32rem] w-[32rem] rounded-full border border-[#d9aebb]/15" />
            <p className="relative text-[10px] font-semibold uppercase tracking-[.28em] text-[#d9aebb]">Glam Essence · atelier</p>
            <h1 className="relative mt-6 max-w-xl font-serif text-5xl leading-[.96] tracking-[-.045em] sm:text-7xl">{isRo ? 'Spune-ne ce ai pe suflet.' : 'Tell us what is on your mind.'}</h1>
            <p className="relative mt-7 max-w-md text-sm leading-7 text-white/65">{isRo ? 'Întrebări despre produse, comenzi sau ritualul potrivit? Scrie-ne. Îți răspundem cu aceeași grijă cu care alegem fiecare formulă.' : 'Questions about a product, an order, or the right ritual? Write to us. We reply with the same care we bring to every formula.'}</p>
            <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {info.map(({ icon: Icon, label, value }) => <div key={label} className="flex gap-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-[#d9aebb]"><Icon className="h-4 w-4" /></span><div><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-white/45">{label}</p><p className="mt-1 text-sm text-white/80">{value}</p></div></div>)}
            </div>
            <div className="relative mt-10 flex items-start gap-4 border-t border-white/15 pt-6"><Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[#d9aebb]" /><div><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-white/45">{t('contact.schedule')}</p><p className="mt-2 text-sm leading-6 text-white/70">{t('contact.weekdays')}<br />{t('contact.saturday')} · {t('contact.sunday')}</p></div></div>
          </div>
          <div className="bg-[#fffdfb] p-7 text-[#281922] sm:p-12 lg:p-16">
            <p className="text-[10px] font-semibold uppercase tracking-[.25em] text-[#a35b6e]">{isRo ? 'Scrie-ne' : 'Send a note'}</p>
            <h2 className="mt-4 font-serif text-4xl tracking-[-.035em]">{t('contact.form_title')}</h2>
            <p className="mt-3 text-sm leading-6 text-[#75656d]">{isRo ? 'De obicei revenim în aceeași zi lucrătoare.' : 'We usually reply within the same business day.'}</p>
            <form onSubmit={handleSubmit} className="mt-9 space-y-5">
              <div><Label htmlFor="contact-name" className="mb-2 block text-xs font-medium">{t('contact.name_placeholder')}</Label><Input id="contact-name" autoComplete="name" placeholder={isRo ? 'Numele tău' : 'Your name'} value={formData.name} onChange={updateField('name')} required className="h-12 rounded-xl border-[#281922]/12 bg-[#fffdfb] placeholder:text-[#ac9ca2]" /></div>
              <div><Label htmlFor="contact-email" className="mb-2 block text-xs font-medium">{t('contact.email_placeholder')}</Label><Input id="contact-email" type="email" autoComplete="email" placeholder={isRo ? 'Adresa ta de email' : 'Your email address'} value={formData.email} onChange={updateField('email')} required className="h-12 rounded-xl border-[#281922]/12 bg-[#fffdfb] placeholder:text-[#ac9ca2]" /></div>
              <div><Label htmlFor="contact-subject" className="mb-2 block text-xs font-medium">{t('contact.subject_placeholder')}</Label><Input id="contact-subject" placeholder={isRo ? 'Despre ce vrei să ne scrii?' : 'What can we help with?'} value={formData.subject} onChange={updateField('subject')} required className="h-12 rounded-xl border-[#281922]/12 bg-[#fffdfb] placeholder:text-[#ac9ca2]" /></div>
              <div><Label htmlFor="contact-message" className="mb-2 block text-xs font-medium">{t('contact.message_placeholder')}</Label><Textarea id="contact-message" rows={5} placeholder={isRo ? 'Mesajul tău...' : 'Your message...'} value={formData.message} onChange={updateField('message')} required className="resize-none rounded-xl border-[#281922]/12 bg-[#fffdfb] px-4 py-3 text-sm placeholder:text-[#ac9ca2]" /></div>
              <Button type="submit" className="h-13 w-full rounded-xl bg-[#281922] text-xs font-semibold uppercase tracking-[.16em] text-white transition hover:bg-[#432d37]">{t('contact.send_button')}<ArrowUpRight className="h-4 w-4" /></Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
