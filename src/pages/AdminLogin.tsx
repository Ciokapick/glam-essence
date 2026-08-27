import React, { useState, useEffect } from 'react';
import { ArrowLeft, LockKeyhole, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/services/api';

const AdminLogin = () => {
  const demoCredentials = {
    email: 'admin@glam-essence.local',
    password: 'glam-demo-2026',
  };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => { api.session().then(() => navigate('/admin/dashboard')).catch(() => undefined); }, [navigate]);

  const authenticate = async (email: string, secret: string) => {
    setIsLoading(true);
    try {
      await api.login(email, secret);
      toast({ title: t('admin.login.success'), description: t('admin.login.welcome') });
      navigate('/admin/dashboard');
    } catch (error) {
      toast({ title: t('admin.login.failed'), description: error instanceof Error ? error.message : t('admin.login.invalid_credentials'), variant: 'destructive' });
    } finally { setIsLoading(false); }
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    void authenticate(username, password);
  };

  const handleDemoLogin = () => {
    setUsername(demoCredentials.email);
    setPassword(demoCredentials.password);
    void authenticate(demoCredentials.email, demoCredentials.password);
  };

  return (
    <main className="relative grid min-h-screen overflow-hidden bg-[#281922] lg:grid-cols-[1.05fr_.95fr]">
      <section className="relative hidden overflow-hidden bg-[#351f2a] p-10 text-white lg:flex lg:flex-col lg:justify-between lg:p-16">
        <div className="absolute -left-24 -top-24 h-[30rem] w-[30rem] rounded-full border border-white/10" /><div className="absolute -bottom-40 -right-32 h-[34rem] w-[34rem] rounded-full border border-white/10" />
        <div className="relative"><span className="font-serif text-3xl font-semibold tracking-[-.04em]">Glam Essence</span><span className="mt-1 block text-[8px] uppercase tracking-[.44em] text-white/55">Beauty atelier</span></div>
        <div className="relative max-w-lg"><p className="mb-5 text-[10px] font-semibold uppercase tracking-[.22em] text-[#e9b9c2]">Admin studio</p><h1 className="font-serif text-6xl leading-[.94] tracking-[-.05em]">{language === 'ro' ? 'Frumusețea stă în detalii.' : 'Beauty lives in the details.'}</h1><p className="mt-7 max-w-sm text-sm leading-7 text-white/60">{language === 'ro' ? 'Un spațiu calm pentru colecții, comenzi și gesturile mici care țin atelierul în mișcare.' : 'A quiet space for collections, orders and the small gestures that keep the atelier moving.'}</p></div>
        <div className="relative flex items-center gap-3 text-[10px] uppercase tracking-[.16em] text-white/50"><Sparkles className="h-4 w-4 text-[#e9b9c2]" /> Curated with care</div>
      </section>

      <section className="relative flex min-h-screen items-center justify-center bg-[#f8f2ef] px-5 py-24 sm:px-10">
        <Button variant="ghost" className="absolute left-5 top-6 gap-2 rounded-full text-xs text-[#67545c] hover:bg-[#fffaf8] sm:left-10" onClick={() => navigate('/')}><ArrowLeft className="h-4 w-4" />{t('admin.login.back_to_store')}</Button>
        <div className="w-full max-w-md rounded-[1.6rem] border border-[#281922]/10 bg-[#fffdfb] p-7 shadow-[0_24px_70px_rgba(40,25,34,.1)] sm:p-10">
          <div className="mb-8 lg:hidden"><span className="font-serif text-2xl font-semibold">Glam Essence</span><span className="mt-1 block text-[8px] uppercase tracking-[.4em] text-[#9c7d87]">Beauty atelier</span></div>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.2em] text-[#a04e62]">Admin studio</p>
          <h2 className="font-serif text-4xl tracking-[-.04em] text-[#281922]">{t('admin.login.title')}</h2>
          <p className="mt-2 text-sm leading-6 text-[#806d74]">{t('admin.login.subtitle')}</p>
          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div className="space-y-2"><Label htmlFor="username" className="text-xs text-[#67545c]">{t('admin.login.username')}</Label><div className="relative"><User className="absolute left-3.5 top-3.5 h-4 w-4 text-[#a88f96]" /><Input id="username" type="email" autoComplete="email" placeholder="admin@glam-essence.local" className="h-12 rounded-[.8rem] border-[#281922]/12 bg-[#fffaf8] pl-11" value={username} onChange={(event) => setUsername(event.target.value)} required /></div></div>
            <div className="space-y-2"><Label htmlFor="password" className="text-xs text-[#67545c]">{t('admin.login.password')}</Label><div className="relative"><LockKeyhole className="absolute left-3.5 top-3.5 h-4 w-4 text-[#a88f96]" /><Input id="password" type="password" autoComplete="current-password" placeholder="••••" className="h-12 rounded-[.8rem] border-[#281922]/12 bg-[#fffaf8] pl-11" value={password} onChange={(event) => setPassword(event.target.value)} required /></div></div>
            <Button type="submit" className="h-12 w-full rounded-full bg-[#281922] text-[10px] font-semibold uppercase tracking-[.16em] text-white hover:bg-[#593044]" disabled={isLoading}>{isLoading ? t('admin.login.logging_in') : t('admin.login.login')}</Button>
          </form>
          <div className="my-6 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[.18em] text-[#b29da1]"><span className="h-px flex-1 bg-[#281922]/10" /><span>{language === 'ro' ? 'sau' : 'or'}</span><span className="h-px flex-1 bg-[#281922]/10" /></div>
          <button type="button" onClick={handleDemoLogin} disabled={isLoading} className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[#a04e62]/35 bg-[#f8e7e9] px-5 text-[10px] font-semibold uppercase tracking-[.16em] text-[#7e3d50] transition hover:border-[#a04e62] hover:bg-[#f3dce0] disabled:cursor-not-allowed disabled:opacity-50">
            <Sparkles className="h-4 w-4" strokeWidth={1.5} />
            {language === 'ro' ? 'Intră în demo' : 'Enter demo'}
          </button>
          <p className="mt-3 text-center text-[10px] leading-5 text-[#9c7d87]">{language === 'ro' ? 'Deschide dashboard-ul cu date demo pentru prezentarea portofoliului.' : 'Open the dashboard with demo data for portfolio presentations.'}</p>
        </div>
      </section>
    </main>
  );
};

export default AdminLogin;
