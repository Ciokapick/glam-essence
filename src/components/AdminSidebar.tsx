
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  LogOut,
  Menu
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to, active }) => {
  return (
    <Link to={to} className="w-full">
      <div className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${
        active 
          ? 'bg-beauty-magenta/10 text-beauty-magenta font-medium' 
          : 'hover:bg-beauty-magenta/5 text-gray-700 hover:text-beauty-magenta'
      }`}>
        {icon}
        <span>{label}</span>
      </div>
    </Link>
  );
};

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  React.useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast({
      title: "Deconectare reușită",
      description: "Ai fost deconectat din panoul de administrare.",
    });
    navigate('/');
  };

  // On small devices, show a menu icon to toggle sidebar
  if (isMobile && !sidebarOpen) {
    return (
      <button
        className="fixed top-4 right-4 z-[60] bg-white p-2 rounded-md shadow-md border border-gray-200"
        onClick={() => setSidebarOpen(true)}
        aria-label="Deschide meniul admin"
      >
        <Menu size={24} />
      </button>
    );
  }

  return (
    <>
      {isMobile && (
        <button
          className="fixed top-4 right-4 z-[60] bg-white p-2 rounded-md shadow-md border border-gray-200"
          onClick={() => setSidebarOpen(false)}
          aria-label="Ascunde meniul admin"
          style={{ display: !sidebarOpen ? 'none' : 'block' }}
        >
          {/* Use Menu as "close" for simplicity: flips for effect */}
          <Menu size={24} style={{ transform: 'rotate(180deg)' }} />
        </button>
      )}
      <div
        className={`fixed md:static top-0 left-0 h-full z-[50] ${sidebarOpen ? 'block' : 'hidden'} w-64 bg-white border-r border-gray-200 flex flex-col`}
      >
        <div className="p-4 border-b">
          <h2 className="font-bold text-xl text-beauty-magenta">Admin Panel</h2>
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            <SidebarItem 
              icon={<LayoutDashboard size={18} />} 
              label="Dashboard" 
              to="/admin/dashboard" 
              active={isActive('/admin/dashboard')} 
            />
            <SidebarItem 
              icon={<ShoppingBag size={18} />} 
              label="Comenzi" 
              to="/admin/orders" 
              active={isActive('/admin/orders')} 
            />
            <SidebarItem 
              icon={<Package size={18} />} 
              label="Produse" 
              to="/admin/products" 
              active={isActive('/admin/products')} 
            />
          </div>
        </div>
        <div className="p-4 border-t">
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2 text-gray-700 hover:text-beauty-magenta border-gray-200"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Deconectare</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
