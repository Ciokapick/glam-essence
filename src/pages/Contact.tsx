
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mesaj trimis",
      description: "Vă mulțumim pentru mesaj. Vom reveni cu un răspuns în cel mai scurt timp.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Contactează-ne</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-xl font-semibold mb-4">Informații de contact</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Adresa:</p>
                  <p className="text-muted-foreground">Strada Exemplu, Nr. 123, București</p>
                </div>
                
                <div>
                  <p className="font-medium">Telefon:</p>
                  <p className="text-muted-foreground">+40 123 456 789</p>
                </div>
                
                <div>
                  <p className="font-medium">Email:</p>
                  <p className="text-muted-foreground">contact@example.com</p>
                </div>
                
                <div>
                  <p className="font-medium">Program:</p>
                  <p className="text-muted-foreground">Luni - Vineri: 9:00 - 18:00</p>
                  <p className="text-muted-foreground">Sâmbătă: 10:00 - 14:00</p>
                  <p className="text-muted-foreground">Duminică: Închis</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Trimite-ne un mesaj</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input 
                    placeholder="Numele tău" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Input 
                    type="email" 
                    placeholder="Email-ul tău" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Input 
                    placeholder="Subiect" 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Textarea 
                    placeholder="Mesajul tău" 
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-beauty-magenta hover:bg-beauty-magenta/90">
                  Trimite mesaj
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
