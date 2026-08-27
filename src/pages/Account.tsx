
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { ArrowRight, Heart, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AccountPage = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const { toast } = useToast();
  const { language } = useLanguage();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Autentificare reușită",
      description: "Bine ai revenit!",
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Eroare",
        description: "Parolele nu coincid",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Înregistrare reușită",
      description: "Contul tău a fost creat cu succes!",
    });
  };

  return (
    <div className="min-h-screen bg-[#f7f3ef] text-[#281922]">
      <Navbar />
      <main className="pt-[104px] pb-20 md:pb-28">
        <div className="container mx-auto grid max-w-6xl gap-8 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-12">
          <section className="relative isolate overflow-hidden rounded-[1.75rem] bg-[#281922] px-7 py-10 text-white sm:px-10 sm:py-14 lg:min-h-[620px]">
            <div className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full bg-[#a04e62]/35 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#d9aebb]/15 blur-3xl" />
            <div className="relative flex h-full flex-col">
              <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-[#d9aebb]">{language === 'ro' ? 'Glam Essence · atelier' : 'Glam Essence · atelier'}</p>
              <h1 className="mt-6 max-w-md font-serif text-5xl leading-[.94] tracking-[-.045em] sm:text-6xl">{language === 'ro' ? 'Un loc pentru ritualul tău.' : 'A place for your ritual.'}</h1>
              <p className="mt-7 max-w-sm text-sm leading-7 text-white/65">{language === 'ro' ? 'Păstrează-ți preferințele, comenzile și descoperirile aproape. Frumusețea devine mai personală când este aleasă cu intenție.' : 'Keep your preferences, orders and discoveries close. Beauty becomes more personal when it is chosen with intention.'}</p>
              <div className="mt-auto space-y-4 pt-16">
                <div className="flex items-center gap-3 border-t border-white/15 pt-4 text-sm text-white/75"><Heart className="h-4 w-4 text-[#d9aebb]" strokeWidth={1.5} />{language === 'ro' ? 'Favoritele tale, într-un singur loc' : 'Your favorites, in one place'}</div>
                <div className="flex items-center gap-3 border-t border-white/15 pt-4 text-sm text-white/75"><ShieldCheck className="h-4 w-4 text-[#d9aebb]" strokeWidth={1.5} />{language === 'ro' ? 'Checkout mai rapid la următoarea comandă' : 'Faster checkout next time'}</div>
                <div className="flex items-center gap-3 border-t border-white/15 pt-4 text-sm text-white/75"><Sparkles className="h-4 w-4 text-[#d9aebb]" strokeWidth={1.5} />{language === 'ro' ? 'Recomandări construite pentru tine' : 'Recommendations made for you'}</div>
              </div>
            </div>
          </section>

          <section className="flex items-center rounded-[1.75rem] border border-[#281922]/10 bg-[#fffdfb] px-6 py-10 shadow-[0_18px_50px_rgba(40,25,34,.05)] sm:px-10 sm:py-14">
            <div className="w-full max-w-xl">
              <p className="text-[10px] font-semibold uppercase tracking-[.25em] text-[#9c7d87]">{language === 'ro' ? 'Bine ai revenit' : 'Welcome back'}</p>
              <h2 className="mt-4 font-serif text-4xl leading-none tracking-[-.04em] sm:text-5xl">Contul meu</h2>
              <p className="mt-4 text-sm leading-7 text-[#75656d]">{language === 'ro' ? 'Intră în spațiul tău personal sau creează unul nou.' : 'Enter your personal space or create a new one.'}</p>

          <Tabs defaultValue="login" className="mt-9 w-full">
            <TabsList className="grid h-auto w-full grid-cols-2 rounded-full border border-[#281922]/10 bg-[#eee5e2] p-1">
              <TabsTrigger value="login" className="rounded-full py-3 text-xs data-[state=active]:bg-white data-[state=active]:text-[#281922] data-[state=active]:shadow-sm">Autentificare</TabsTrigger>
              <TabsTrigger value="register" className="rounded-full py-3 text-xs data-[state=active]:bg-white data-[state=active]:text-[#281922] data-[state=active]:shadow-sm">Înregistrare</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-5 pt-7">
                <div>
                  <Input 
                    type="email" 
                    placeholder="Email" 
                    className="h-12 rounded-xl border-[#281922]/15 bg-[#fbf8f5] px-4"
                    required
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  />
                </div>
                
                <div>
                  <Input 
                    type="password" 
                    placeholder="Parolă" 
                    className="h-12 rounded-xl border-[#281922]/15 bg-[#fbf8f5] px-4"
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  />
                </div>
                
                <div className="text-right">
                  <a href="#" className="text-xs font-medium text-[#a04e62] hover:underline">
                    Ai uitat parola?
                  </a>
                </div>
                
                <Button type="submit" className="h-12 w-full rounded-full bg-[#281922] text-[10px] font-semibold uppercase tracking-[.16em] text-white hover:bg-[#a04e62]">
                  Autentificare <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-5 pt-7">
                <div>
                  <Input 
                    placeholder="Nume complet" 
                    className="h-12 rounded-xl border-[#281922]/15 bg-[#fbf8f5] px-4"
                    required
                    value={registerData.name}
                    onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <Input 
                    type="email" 
                    placeholder="Email" 
                    className="h-12 rounded-xl border-[#281922]/15 bg-[#fbf8f5] px-4"
                    required
                    value={registerData.email}
                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  />
                </div>
                
                <div>
                  <Input 
                    type="password" 
                    placeholder="Parolă" 
                    className="h-12 rounded-xl border-[#281922]/15 bg-[#fbf8f5] px-4"
                    required
                    value={registerData.password}
                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  />
                </div>
                
                <div>
                  <Input 
                    type="password" 
                    placeholder="Confirmă parola" 
                    className="h-12 rounded-xl border-[#281922]/15 bg-[#fbf8f5] px-4"
                    required
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                  />
                </div>
                
                <Button type="submit" className="h-12 w-full rounded-full bg-[#281922] text-[10px] font-semibold uppercase tracking-[.16em] text-white hover:bg-[#a04e62]">
                  Înregistrare <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </TabsContent>
          </Tabs>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AccountPage;
