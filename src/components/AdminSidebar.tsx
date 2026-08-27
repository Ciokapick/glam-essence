import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BarChart3, ChevronRight, LayoutDashboard, LogOut, Menu, Package, ShoppingBag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { api } from '@/services/api';

interface SidebarItemProps { icon: React.ReactNode; label: string; to: string; active: boolean; }

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to, active }) => (
  <Link to={to} className={`group flex items-center gap-3 rounded-[.9rem] px-3.5 py-3 text-sm transition ${active ? 'bg-[#f3dce0] font-medium text-[#7e3d50]' : 'text-[#75656a] hover:bg-[#fbf1ef] hover:text-[#7e3d50]'}`}>
    <span className={`grid h-8 w-8 place-items-center rounded-lg transition ${active ? 'bg-[#fffaf8] text-[#a04e62] shadow-sm' : 'bg-transparent text-[#9d898f] group-hover:bg-white group-hover:text-[#a04e62]'}`}>{icon}</span>
    <span className="flex-1">{label}</span>
    <ChevronRight className={`h-4 w-4 transition ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
  </Link>
);

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  React.useEffect(() => { setSidebarOpen(!isMobile); }, [isMobile]);

  const handleLogout = async () => {
    await api.logout().catch(() => undefined);
    toast({ title: t('admin.sidebar.logout_success'), description: t('admin.sidebar.logout_message') });
    navigate('/');
  };

  const content = (
    <aside className="flex h-full w-[18rem] flex-col bg-[#fffaf8] text-[#281922]">
      <div className="border-b border-[#281922]/10 px-6 pb-6 pt-7">
        <Link to="/" className="block" aria-label="Glam Essence">
          <span className="font-serif text-2xl font-semibold tracking-[-.04em]">Glam Essence</span>
          <span className="mt-1 block text-[8px] font-medium uppercase tracking-[.42em] text-[#9c7d87]">Beauty atelier</span>
        </Link>
        <div className="mt-7 flex items-center gap-3 rounded-[1rem] bg-[#f7ece9] p-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-[#281922] text-xs font-semibold text-white">GE</div>
          <div className="min-w-0"><p className="text-xs font-semibold">Admin studio</p><p className="truncate text-[10px] text-[#9c7d87]">{language === 'ro' ? 'Spațiul tău de lucru' : 'Your workspace'}</p></div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-4 py-7" aria-label="Admin navigation">
        <p className="mb-3 px-3 text-[9px] font-semibold uppercase tracking-[.2em] text-[#b29da1]">{language === 'ro' ? 'Panou de control' : 'Workspace'}</p>
        <div className="space-y-1">
          <SidebarItem icon={<LayoutDashboard className="h-4 w-4" />} label={t('admin.sidebar.dashboard')} to="/admin/dashboard" active={location.pathname === '/admin/dashboard'} />
          <SidebarItem icon={<ShoppingBag className="h-4 w-4" />} label={t('admin.sidebar.orders')} to="/admin/orders" active={location.pathname === '/admin/orders'} />
          <SidebarItem icon={<Package className="h-4 w-4" />} label={t('admin.sidebar.products')} to="/admin/products" active={location.pathname === '/admin/products'} />
        </div>
        <div className="mt-8 rounded-[1.1rem] border border-[#281922]/10 bg-[#281922] p-4 text-white">
          <BarChart3 className="mb-5 h-5 w-5 text-[#e9b9c2]" strokeWidth={1.5} />
          <p className="font-serif text-lg">{language === 'ro' ? 'În ritmul tău.' : 'At your own pace.'}</p>
          <p className="mt-1 text-[10px] leading-5 text-white/60">{language === 'ro' ? 'Gestionează colecția cu atenție.' : 'Curate the collection with care.'}</p>
        </div>
      </nav>
      <div className="border-t border-[#281922]/10 p-4">
        <Button variant="outline" className="h-11 w-full justify-start gap-3 rounded-[.8rem] border-[#281922]/12 text-xs text-[#75656a] hover:bg-[#f7ece9] hover:text-[#7e3d50]" onClick={handleLogout}>
          <LogOut className="h-4 w-4" /> <span>{t('admin.sidebar.logout')}</span>
        </Button>
      </div>
    </aside>
  );

  if (!isMobile) return <div className="sticky top-0 h-screen shrink-0 border-r border-[#281922]/10">{content}</div>;
  return (
    <>
      <button type="button" className="fixed right-4 top-4 z-[70] grid h-11 w-11 place-items-center rounded-full border border-[#281922]/10 bg-[#fffaf8] text-[#281922] shadow-lg" onClick={() => setSidebarOpen((open) => !open)} aria-label={sidebarOpen ? t('admin.sidebar.hide_menu') : t('admin.sidebar.open_menu')} aria-expanded={sidebarOpen}>
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {sidebarOpen && <button type="button" className="fixed inset-0 z-[50] bg-[#281922]/35 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} aria-label={t('admin.sidebar.hide_menu')} />}
      <div className={`fixed inset-y-0 left-0 z-[60] transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>{content}</div>
    </>
  );
};

export default AdminSidebar;
