
import React, { useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import { useNavigate, useLocation } from 'react-router-dom';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Initialize products database on admin page load
    const initDatabase = async () => {
      const { initializeProductsDb } = await import('@/utils/jsonDb');
      await initializeProductsDb();
    };
    
    initDatabase();
    
    // Check if admin is authenticated
    const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
    
    // If not authenticated and not on login page, redirect to login
    if (!isAuthenticated && location.pathname !== '/admin') {
      navigate('/admin');
    }
  }, [navigate, location.pathname]);

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
