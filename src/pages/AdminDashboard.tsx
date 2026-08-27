
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShoppingBag, Package, BarChart } from 'lucide-react';
import { api, type Order } from '@/services/api';

// Component for showing recent orders
const RecentOrders = () => {
  const { t } = useLanguage();
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadOrders = async () => {
      const orders = await api.orders();
      // Take only the first 5 orders (they're already sorted by date)
      setRecentOrders(orders.slice(0, 5));
    };
    
    loadOrders();
    
    // Refresh orders every 15 seconds
    const intervalId = setInterval(loadOrders, 15000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  if (recentOrders.length === 0) {
    return (
      <p className="text-center py-4 text-muted-foreground">
        {t('admin.dashboard.no_recent_orders')}
      </p>
    );
  }
  
  return (
    <>
      <div className="space-y-3">
        {recentOrders.map(order => (
          <div key={order.id} className="flex flex-col gap-3 border-b border-[#281922]/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <p className="font-medium text-[#281922]">{t('admin.orders.order_id')} #{order.id}</p>
              <p className="text-xs text-[#9c7d87]">
                {order.customer.name} • {order.date}
              </p>
            </div>
            <div className="flex items-center gap-4">
                <span className={`rounded-full px-3 py-1 text-[10px] font-medium ${
                order.status === 'pending' ? 'bg-[#f4e6d5] text-[#8c5a2d]' :
                order.status === 'processing' ? 'bg-[#e5edf1] text-[#456776]' :
                order.status === 'completed' ? 'bg-[#e3eee8] text-[#4f7562]' :
                'bg-[#f3e0e3] text-[#944b5b]'
              }`}>
                {order.status === 'pending' ? t('admin.orders.pending') :
                 order.status === 'processing' ? t('admin.orders.processing') :
                 order.status === 'completed' ? t('admin.orders.completed') : t('admin.orders.canceled')}
              </span>
              <span className="text-sm font-semibold text-[#281922]">{order.total.toFixed(2)} lei</span>
            </div>
          </div>
        ))}
      </div>
      
      {recentOrders.length > 0 && (
        <Button
          variant="outline"
          className="mt-4 h-11 w-full rounded-full border-[#281922]/15 text-xs hover:bg-[#f7ece9]"
          onClick={() => navigate('/admin/orders')}
        >
          {t('admin.dashboard.view_all_orders')}
        </Button>
      )}
    </>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  
  useEffect(() => {
    const loadStats = async () => {
      const [orders, products] = await Promise.all([api.orders(), api.products()]);
      
      // Calculate stats
      setOrderCount(orders.length);
      setProductCount(products.length);
      
      // Calculate total revenue
      const totalRevenue = orders.reduce((total, order) => total + order.total, 0);
      setRevenue(totalRevenue);
    };
    
    loadStats();
    
    // Refresh stats every 30 seconds
    const intervalId = setInterval(loadStats, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.22em] text-[#a04e62]">Glam Essence · Admin studio</p><h1 className="font-serif text-4xl tracking-[-.03em] text-[#281922] sm:text-5xl">{t('admin.dashboard.title')}</h1>
          <p className="mt-2 text-sm text-[#806d74]">{t('admin.dashboard.subtitle')}</p></div>
          <div className="rounded-full border border-[#281922]/10 bg-[#fffaf8] px-4 py-2 text-[10px] font-medium uppercase tracking-[.14em] text-[#9c7d87]">Live workspace</div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="rounded-[1.25rem] border-[#281922]/10 bg-[#fffaf8] shadow-[0_12px_35px_rgba(40,25,34,.06)]">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="mr-4 grid h-12 w-12 place-items-center rounded-full bg-[#f3dce0]">
                  <ShoppingBag className="h-5 w-5 text-[#a04e62]" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#9c7d87]">{t('admin.dashboard.orders')}</p>
                  <h3 className="mt-1 text-3xl font-semibold text-[#281922]">{orderCount}</h3>
                </div>
              </div>
              <Button 
                variant="link" 
                className="mt-5 h-auto w-full justify-start p-0 text-xs text-[#a04e62] hover:text-[#7e3d50]"
                onClick={() => navigate('/admin/orders')}
              >
                {t('admin.dashboard.view_orders')}
              </Button>
            </CardContent>
          </Card>
          
          <Card className="rounded-[1.25rem] border-[#281922]/10 bg-[#fffaf8] shadow-[0_12px_35px_rgba(40,25,34,.06)]">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="mr-4 grid h-12 w-12 place-items-center rounded-full bg-[#e4eee9]">
                  <Package className="h-5 w-5 text-[#56816f]" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#9c7d87]">{t('admin.dashboard.products')}</p>
                  <h3 className="mt-1 text-3xl font-semibold text-[#281922]">{productCount}</h3>
                </div>
              </div>
              <Button 
                variant="link" 
                className="mt-5 h-auto w-full justify-start p-0 text-xs text-[#56816f] hover:text-[#3d6555]"
                onClick={() => navigate('/admin/products')}
              >
                {t('admin.dashboard.view_products')}
              </Button>
            </CardContent>
          </Card>
          
          <Card className="rounded-[1.25rem] border-[#281922]/10 bg-[#fffaf8] shadow-[0_12px_35px_rgba(40,25,34,.06)]">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="mr-4 grid h-12 w-12 place-items-center rounded-full bg-[#eee6f0]">
                  <BarChart className="h-5 w-5 text-[#8b5b93]" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#9c7d87]">{t('admin.dashboard.revenue')}</p>
                  <h3 className="mt-1 text-3xl font-semibold text-[#281922]">{revenue.toFixed(2)} lei</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="rounded-[1.25rem] border-[#281922]/10 bg-[#fffaf8] shadow-[0_12px_35px_rgba(40,25,34,.06)]">
          <CardHeader className="border-b border-[#281922]/10 px-6 py-5">
            <CardTitle className="font-serif text-2xl font-medium">{t('admin.dashboard.recent_orders')}</CardTitle>
            <CardDescription className="text-xs text-[#9c7d87]">{t('admin.dashboard.recent_orders_subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentOrders />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

// Main component that renders the dashboard directly
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    api.session()
      .then(() => setIsAuthenticated(true))
      .catch(() => navigate('/admin', { replace: true }));
  }, [navigate]);
  
  // Return the Dashboard only if authenticated
  return isAuthenticated ? <Dashboard /> : null;
};

export default AdminDashboard;
