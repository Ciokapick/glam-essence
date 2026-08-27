
import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '@/services/api';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (location.pathname !== '/admin') {
      setVerified(false);
      api.session().then(() => setVerified(true)).catch(() => navigate('/admin', { replace: true }));
    }
  }, [navigate, location.pathname]);

  if (!verified) return (
    <div className="grid min-h-screen place-items-center bg-[#f6efec] text-[#806d74]">
      <div className="text-center"><div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-[#281922] font-serif text-lg text-white">GE</div><p className="text-[10px] font-semibold uppercase tracking-[.2em]">Se verifică sesiunea…</p></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f6efec] text-[#281922] md:flex">
      <AdminSidebar />
      <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
        <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 sm:py-10 lg:px-12">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
