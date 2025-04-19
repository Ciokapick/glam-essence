
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Eye, Trash2, RefreshCw } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Order } from '@/pages/Checkout';
import { getFromDb, saveToDb, getAllOrders } from '@/utils/jsonDb';

type OrderStatus = 'pending' | 'processing' | 'completed' | 'canceled';

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load orders from database on component mount and set up a polling interval
  useEffect(() => {
    // Initial load
    loadOrders();
    
    // Set up polling to check for new orders every 15 seconds
    const intervalId = setInterval(() => {
      loadOrders();
    }, 15000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  
  // Function to load orders from the database
  const loadOrders = () => {
    setIsLoading(true);
    
    try {
      const savedOrders = getAllOrders();
      console.log('Loaded orders:', savedOrders);
      setOrders(savedOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca comenzile. Încearcă din nou.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
    
    saveToDb('orders', updatedOrders);
    
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
      
      saveToDb('orders', updatedOrders);
      
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

  // Format date to display more user-friendly
  const formatDate = (dateString: string) => {
    return dateString;
  };

  // Sort orders by date (newest first)
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Comenzi</h1>
            <p className="text-gray-500 mt-1">Gestionează comenzile clienților ({orders.length} comenzi)</p>
          </div>
          
          <Button 
            variant="outline" 
            onClick={loadOrders}
            disabled={isLoading}
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Reîmprospătează
          </Button>
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
                  {sortedOrders.length > 0 ? (
                    sortedOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">#{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.customer.name}</p>
                            <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{order.total.toFixed(2)} lei</TableCell>
                        <TableCell>{formatDate(order.date)}</TableCell>
                        <TableCell>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(order.status as OrderStatus)}`}>
                            {getStatusLabel(order.status as OrderStatus)}
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
                                <OrderDetails 
                                  order={selectedOrder}
                                  onStatusChange={handleStatusChange}
                                />
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="ml-2 text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteOrder(order.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        {isLoading ? 'Se încarcă comenzile...' : 'Nu există comenzi de afișat.'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

// Component for showing order details in the modal
const OrderDetails = ({ 
  order, 
  onStatusChange 
}: { 
  order: Order; 
  onStatusChange: (orderId: string, status: OrderStatus) => void;
}) => {
  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <h4 className="font-medium">Informații client</h4>
        <div className="rounded-md bg-muted p-4 text-sm">
          <p><strong>Nume:</strong> {order.customer.name}</p>
          <p><strong>Email:</strong> {order.customer.email}</p>
          <p><strong>Telefon:</strong> {order.customer.phone}</p>
          <p><strong>Adresă:</strong> {order.customer.address}</p>
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
              {order.items.map((item) => (
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
                <TableCell className="text-right font-bold">{order.total.toFixed(2)} lei</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">Actualizează status</h4>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={order.status === 'pending' ? 'default' : 'outline'}
            size="sm"
            className={order.status === 'pending' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
            onClick={() => onStatusChange(order.id, 'pending')}
          >
            În așteptare
          </Button>
          <Button 
            variant={order.status === 'processing' ? 'default' : 'outline'}
            size="sm"
            className={order.status === 'processing' ? 'bg-blue-500 hover:bg-blue-600' : ''}
            onClick={() => onStatusChange(order.id, 'processing')}
          >
            În procesare
          </Button>
          <Button 
            variant={order.status === 'completed' ? 'default' : 'outline'}
            size="sm"
            className={order.status === 'completed' ? 'bg-green-500 hover:bg-green-600' : ''}
            onClick={() => onStatusChange(order.id, 'completed')}
          >
            Finalizată
          </Button>
          <Button 
            variant={order.status === 'canceled' ? 'default' : 'outline'}
            size="sm"
            className={order.status === 'canceled' ? 'bg-red-500 hover:bg-red-600' : ''}
            onClick={() => onStatusChange(order.id, 'canceled')}
          >
            Anulată
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
