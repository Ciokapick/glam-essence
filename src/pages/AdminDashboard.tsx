
import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Package, Users, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) => (
  <Card>
    <CardContent className="p-6 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>
    </CardContent>
  </Card>
);

const RecentOrderCard = ({ 
  id, 
  customer, 
  date, 
  amount, 
  status 
}: { 
  id: string, 
  customer: string, 
  date: string, 
  amount: string, 
  status: 'pending' | 'processing' | 'completed' | 'canceled' 
}) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    canceled: 'bg-red-100 text-red-800'
  };

  const statusLabels = {
    pending: 'În așteptare',
    processing: 'În procesare',
    completed: 'Finalizată',
    canceled: 'Anulată'
  };

  return (
    <div className="flex items-center justify-between p-4 border-b last:border-0">
      <div>
        <p className="font-medium">#{id}</p>
        <p className="text-sm text-muted-foreground">{customer}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-muted-foreground">{date}</p>
        <p className="font-medium">{amount} lei</p>
      </div>
      <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
        {statusLabels[status]}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const recentOrders = [
    { id: '1081', customer: 'Ana Popescu', date: '20 Apr 2025', amount: '329.99', status: 'completed' as const },
    { id: '1080', customer: 'Mihai Ionescu', date: '19 Apr 2025', amount: '199.95', status: 'processing' as const },
    { id: '1079', customer: 'Elena Dumitrescu', date: '18 Apr 2025', amount: '145.50', status: 'pending' as const },
    { id: '1078', customer: 'George Vasile', date: '17 Apr 2025', amount: '89.99', status: 'completed' as const },
    { id: '1077', customer: 'Maria Constantin', date: '16 Apr 2025', amount: '229.99', status: 'canceled' as const },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">O privire de ansamblu asupra activității magazinului tău</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Comenzi"
            value="145"
            icon={<ShoppingBag className="h-6 w-6 text-white" />}
            color="bg-beauty-magenta"
          />
          <StatCard
            title="Total Produse"
            value="68"
            icon={<Package className="h-6 w-6 text-white" />}
            color="bg-beauty-hotpink"
          />
          <StatCard
            title="Total Clienți"
            value="1,253"
            icon={<Users className="h-6 w-6 text-white" />}
            color="bg-beauty-coral"
          />
          <StatCard
            title="Venituri"
            value="23,456 lei"
            icon={<TrendingUp className="h-6 w-6 text-white" />}
            color="bg-green-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Comenzi Recente</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              {recentOrders.map((order) => (
                <RecentOrderCard key={order.id} {...order} />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stoc Produse</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Parfum Oriental Mystique</span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">În stoc (23)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Cremă hidratantă Luxury</span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Stoc limitat (5)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Ser facial Radiance</span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">În stoc (17)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Parfum Woody Elegance</span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Stoc epuizat (0)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Spumă de curățare</span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">În stoc (32)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
