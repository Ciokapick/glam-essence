
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('contact.message_sent_title'),
      description: t('contact.message_sent_desc'),
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">{t('contact.title')}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-xl font-semibold mb-4">{t('contact.info_title')}</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="font-medium">{t('contact.address')}</p>
                  <p className="text-muted-foreground">{t('contact.address_value')}</p>
                </div>
                
                <div>
                  <p className="font-medium">{t('contact.phone')}</p>
                  <p className="text-muted-foreground">+40 123 456 789</p>
                </div>
                
                <div>
                  <p className="font-medium">{t('contact.email')}</p>
                  <p className="text-muted-foreground">contact@example.com</p>
                </div>
                
                <div>
                  <p className="font-medium">{t('contact.schedule')}</p>
                  <p className="text-muted-foreground">{t('contact.weekdays')}</p>
                  <p className="text-muted-foreground">{t('contact.saturday')}</p>
                  <p className="text-muted-foreground">{t('contact.sunday')}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">{t('contact.form_title')}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input 
                    placeholder={t('contact.name_placeholder')} 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Input 
                    type="email" 
                    placeholder={t('contact.email_placeholder')} 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Input 
                    placeholder={t('contact.subject_placeholder')} 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Textarea 
                    placeholder={t('contact.message_placeholder')} 
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-beauty-magenta hover:bg-beauty-magenta/90">
                  {t('contact.send_button')}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
