
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const AccountPage = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const { toast } = useToast();

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
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Contul meu</h1>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Autentificare</TabsTrigger>
              <TabsTrigger value="register">Înregistrare</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Input 
                    type="email" 
                    placeholder="Email" 
                    required
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  />
                </div>
                
                <div>
                  <Input 
                    type="password" 
                    placeholder="Parolă" 
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  />
                </div>
                
                <div className="text-right">
                  <a href="#" className="text-sm text-beauty-magenta hover:underline">
                    Ai uitat parola?
                  </a>
                </div>
                
                <Button type="submit" className="w-full bg-beauty-magenta hover:bg-beauty-magenta/90">
                  Autentificare
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <Input 
                    placeholder="Nume complet" 
                    required
                    value={registerData.name}
                    onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <Input 
                    type="email" 
                    placeholder="Email" 
                    required
                    value={registerData.email}
                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  />
                </div>
                
                <div>
                  <Input 
                    type="password" 
                    placeholder="Parolă" 
                    required
                    value={registerData.password}
                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  />
                </div>
                
                <div>
                  <Input 
                    type="password" 
                    placeholder="Confirmă parola" 
                    required
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                  />
                </div>
                
                <Button type="submit" className="w-full bg-beauty-magenta hover:bg-beauty-magenta/90">
                  Înregistrare
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AccountPage;
