
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

  if (!verified) return <div className="grid min-h-screen place-items-center bg-gray-50 text-sm text-gray-500">Se verifică sesiunea…</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
