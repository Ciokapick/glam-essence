import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingBag, Package, BarChart } from 'lucide-react';
import { getAllOrders, getAllProducts } from '@/utils/jsonDb';

const LoginForm = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded authentication
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('adminAuth', 'true');
      toast({
        title: "Autentificare reușită",
        description: "Bine ai venit în panoul de administrare.",
      });
      onLogin();
    } else {
      toast({
        title: "Autentificare eșuată",
        description: "Credențiale incorecte. Încearcă din nou.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Autentificare Admin</CardTitle>
          <CardDescription>
            Conectează-te pentru a accesa panoul de administrare
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Utilizator</Label>
              <Input 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="admin"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Parolă</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="******"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Conectare
            </Button>
          </form>
          <div className="mt-4 text-sm text-gray-500 text-center">
            <p>Pentru demo: utilizator "admin" parolă "admin"</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
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
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Privire generală asupra magazinului tău</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-md mr-4">
                  <ShoppingBag className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Comenzi</p>
                  <h3 className="text-2xl font-bold">{orderCount}</h3>
                </div>
              </div>
              <Button 
                variant="link" 
                className="w-full mt-4 justify-start p-0 text-blue-600"
                onClick={() => navigate('/admin/orders')}
              >
                Vezi comenzile →
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
                  <p className="text-sm font-medium text-gray-500">Produse</p>
                  <h3 className="text-2xl font-bold">{productCount}</h3>
                </div>
              </div>
              <Button 
                variant="link" 
                className="w-full mt-4 justify-start p-0 text-green-600"
                onClick={() => navigate('/admin/products')}
              >
                Vezi produsele →
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
                  <p className="text-sm font-medium text-gray-500">Venituri</p>
                  <h3 className="text-2xl font-bold">{revenue.toFixed(2)} lei</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent orders preview */}
        <Card>
          <CardHeader>
            <CardTitle>Comenzi recente</CardTitle>
            <CardDescription>Ultimele 5 comenzi plasate</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentOrders />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

// Component for showing recent orders
const RecentOrders = () => {
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
        Nu există comenzi recente.
      </p>
    );
  }
  
  return (
    <>
      <div className="space-y-4">
        {recentOrders.map(order => (
          <div key={order.id} className="flex justify-between items-center border-b pb-4">
            <div>
              <p className="font-medium">Comanda #{order.id}</p>
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
                {order.status === 'pending' ? 'În așteptare' : 
                 order.status === 'processing' ? 'În procesare' :
                 order.status === 'completed' ? 'Finalizată' : 'Anulată'}
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
          Vezi toate comenzile
        </Button>
      )}
    </>
  );
};

// Main component that conditionally renders login or dashboard
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuth') === 'true';
    setIsAuthenticated(authStatus);
  }, []);
  
  return isAuthenticated ? (
    <Dashboard />
  ) : (
    <LoginForm onLogin={() => setIsAuthenticated(true)} />
  );
};

export default AdminDashboard;
