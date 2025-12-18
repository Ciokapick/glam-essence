
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShoppingBag, Package, BarChart } from 'lucide-react';
import { getAllOrders, getAllProducts } from '@/utils/jsonDb';

// Component for showing recent orders
const RecentOrders = () => {
  const { t } = useLanguage();
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadOrders = () => {
      const orders = getAllOrders();
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
      <div className="space-y-4">
        {recentOrders.map(order => (
          <div key={order.id} className="flex justify-between items-center border-b pb-4">
            <div>
              <p className="font-medium">{t('admin.orders.order_id')} #{order.id}</p>
              <p className="text-sm text-muted-foreground">
                {order.customer.name} • {order.date}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-2 py-1 text-xs rounded-full ${
                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {order.status === 'pending' ? t('admin.orders.pending') :
                 order.status === 'processing' ? t('admin.orders.processing') :
                 order.status === 'completed' ? t('admin.orders.completed') : t('admin.orders.canceled')}
              </span>
              <span className="font-semibold">{order.total.toFixed(2)} lei</span>
            </div>
          </div>
        ))}
      </div>
      
      {recentOrders.length > 0 && (
        <Button
          variant="outline"
          className="w-full mt-4"
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
      const orders = getAllOrders();
      const products = await getAllProducts();
      
      // Calculate stats
      setOrderCount(orders.length);
      setProductCount(Object.keys(products).length);
      
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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('admin.dashboard.title')}</h1>
          <p className="text-gray-500 mt-1">{t('admin.dashboard.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-md mr-4">
                  <ShoppingBag className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{t('admin.dashboard.orders')}</p>
                  <h3 className="text-2xl font-bold">{orderCount}</h3>
                </div>
              </div>
              <Button 
                variant="link" 
                className="w-full mt-4 justify-start p-0 text-blue-600"
                onClick={() => navigate('/admin/orders')}
              >
                {t('admin.dashboard.view_orders')}
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-md mr-4">
                  <Package className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{t('admin.dashboard.products')}</p>
                  <h3 className="text-2xl font-bold">{productCount}</h3>
                </div>
              </div>
              <Button 
                variant="link" 
                className="w-full mt-4 justify-start p-0 text-green-600"
                onClick={() => navigate('/admin/products')}
              >
                {t('admin.dashboard.view_products')}
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-md mr-4">
                  <BarChart className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{t('admin.dashboard.revenue')}</p>
                  <h3 className="text-2xl font-bold">{revenue.toFixed(2)} lei</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.dashboard.recent_orders')}</CardTitle>
            <CardDescription>{t('admin.dashboard.recent_orders_subtitle')}</CardDescription>
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
  const { toast } = useToast();
  
  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuth') === 'true';
    setIsAuthenticated(authStatus);

    // If not authenticated, redirect to login
    if (!authStatus) {
      navigate('/admin');
    }
  }, [navigate]);
  
  // Return the Dashboard only if authenticated
  return isAuthenticated ? <Dashboard /> : null;
};

export default AdminDashboard;
