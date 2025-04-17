import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Eye, Trash2 } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

type OrderStatus = 'pending' | 'processing' | 'completed' | 'canceled';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  date: string;
}

const mockOrders: Order[] = [
  {
    id: '1081',
    customer: {
      name: 'Ana Popescu',
      email: 'ana.popescu@example.com',
      phone: '0722 123 456',
      address: 'Str. Primăverii 15, București'
    },
    items: [
      { id: '1', name: 'Parfum Oriental Mystique', price: 249.99, quantity: 1 },
      { id: '2', name: 'Cremă hidratantă Luxury', price: 79.99, quantity: 1 }
    ],
    total: 329.98,
    status: 'completed',
    date: '20 Apr 2025'
  },
  {
    id: '1080',
    customer: {
      name: 'Mihai Ionescu',
      email: 'mihai.ionescu@example.com',
      phone: '0733 456 789',
      address: 'Str. Florilor 7, Cluj-Napoca'
    },
    items: [
      { id: '3', name: 'Ser facial Radiance', price: 199.95, quantity: 1 }
    ],
    total: 199.95,
    status: 'processing',
    date: '19 Apr 2025'
  },
  {
    id: '1079',
    customer: {
      name: 'Elena Dumitrescu',
      email: 'elena.dumitrescu@example.com',
      phone: '0744 789 123',
      address: 'Str. Teilor 22, Iași'
    },
    items: [
      { id: '4', name: 'Parfum Woody Elegance', price: 145.50, quantity: 1 }
    ],
    total: 145.50,
    status: 'pending',
    date: '18 Apr 2025'
  },
  {
    id: '1078',
    customer: {
      name: 'George Vasile',
      email: 'george.vasile@example.com',
      phone: '0755 321 654',
      address: 'Bvd. Unirii 10, Timișoara'
    },
    items: [
      { id: '5', name: 'Tonic Purificator', price: 45.99, quantity: 1 },
      { id: '6', name: 'Spumă de curățare', price: 43.99, quantity: 1 }
    ],
    total: 89.98,
    status: 'completed',
    date: '17 Apr 2025'
  },
  {
    id: '1077',
    customer: {
      name: 'Maria Constantin',
      email: 'maria.constantin@example.com',
      phone: '0766 987 654',
      address: 'Str. Crinilor 5, Brașov'
    },
    items: [
      { id: '7', name: 'Cremă de corp Intense', price: 229.99, quantity: 1 }
    ],
    total: 229.99,
    status: 'canceled',
    date: '16 Apr 2025'
  }
];

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const savedOrders = localStorage.getItem('adminOrders');
    return savedOrders ? JSON.parse(savedOrders) : mockOrders;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('adminOrders', JSON.stringify(orders));
  }, [orders]);

  const filteredOrders = orders.filter(
    order => 
      order.id.includes(searchTerm) || 
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    
    setOrders(updatedOrders);
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    
    toast({
      title: "Status actualizat",
      description: `Comanda #${orderId} a fost marcată ca ${getStatusLabel(newStatus)}.`,
    });
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm('Ești sigur că vrei să ștergi această comandă?')) {
      const updatedOrders = orders.filter(order => order.id !== orderId);
      setOrders(updatedOrders);
      
      toast({
        title: "Comandă ștearsă",
        description: `Comanda #${orderId} a fost ștearsă cu succes.`,
      });
    }
  };

  const getStatusLabel = (status: OrderStatus): string => {
    const statusLabels = {
      pending: 'În așteptare',
      processing: 'În procesare',
      completed: 'Finalizată',
      canceled: 'Anulată'
    };
    return statusLabels[status];
  };

  const getStatusClass = (status: OrderStatus): string => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      canceled: 'bg-red-100 text-red-800'
    };
    return statusClasses[status];
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Comenzi</h1>
          <p className="text-gray-500 mt-1">Gestionează comenzile clienților</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Caută după ID, nume sau email..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Comandă</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Acțiuni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customer.name}</p>
                          <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{order.total.toFixed(2)} lei</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <Eye size={16} className="mr-1" /> Detalii
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[525px]">
                            <DialogHeader>
                              <DialogTitle>Detalii comandă #{selectedOrder?.id}</DialogTitle>
                            </DialogHeader>
                            {selectedOrder && (
                              <div className="space-y-6 py-4">
                                <div className="space-y-2">
                                  <h4 className="font-medium">Informații client</h4>
                                  <div className="rounded-md bg-muted p-4 text-sm">
                                    <p><strong>Nume:</strong> {selectedOrder.customer.name}</p>
                                    <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
                                    <p><strong>Telefon:</strong> {selectedOrder.customer.phone}</p>
                                    <p><strong>Adresă:</strong> {selectedOrder.customer.address}</p>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <h4 className="font-medium">Produse comandate</h4>
                                  <div className="rounded-md border">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Produs</TableHead>
                                          <TableHead className="text-right">Preț</TableHead>
                                          <TableHead className="text-right">Cant.</TableHead>
                                          <TableHead className="text-right">Total</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {selectedOrder.items.map((item) => (
                                          <TableRow key={item.id}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell className="text-right">{item.price.toFixed(2)} lei</TableCell>
                                            <TableCell className="text-right">{item.quantity}</TableCell>
                                            <TableCell className="text-right">
                                              {(item.price * item.quantity).toFixed(2)} lei
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                        <TableRow>
                                          <TableCell colSpan={3} className="text-right font-medium">Total comandă:</TableCell>
                                          <TableCell className="text-right font-bold">{selectedOrder.total.toFixed(2)} lei</TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <h4 className="font-medium">Actualizează status</h4>
                                  <div className="flex flex-wrap gap-2">
                                    <Button 
                                      variant={selectedOrder.status === 'pending' ? 'default' : 'outline'}
                                      size="sm"
                                      className={selectedOrder.status === 'pending' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
                                      onClick={() => handleStatusChange(selectedOrder.id, 'pending')}
                                    >
                                      În așteptare
                                    </Button>
                                    <Button 
                                      variant={selectedOrder.status === 'processing' ? 'default' : 'outline'}
                                      size="sm"
                                      className={selectedOrder.status === 'processing' ? 'bg-blue-500 hover:bg-blue-600' : ''}
                                      onClick={() => handleStatusChange(selectedOrder.id, 'processing')}
                                    >
                                      În procesare
                                    </Button>
                                    <Button 
                                      variant={selectedOrder.status === 'completed' ? 'default' : 'outline'}
                                      size="sm"
                                      className={selectedOrder.status === 'completed' ? 'bg-green-500 hover:bg-green-600' : ''}
                                      onClick={() => handleStatusChange(selectedOrder.id, 'completed')}
                                    >
                                      Finalizată
                                    </Button>
                                    <Button 
                                      variant={selectedOrder.status === 'canceled' ? 'default' : 'outline'}
                                      size="sm"
                                      className={selectedOrder.status === 'canceled' ? 'bg-red-500 hover:bg-red-600' : ''}
                                      onClick={() => handleStatusChange(selectedOrder.id, 'canceled')}
                                    >
                                      Anulată
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
