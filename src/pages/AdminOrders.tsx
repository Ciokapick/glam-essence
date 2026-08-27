
import React, { useCallback, useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Eye, Trash2, RefreshCw, ClipboardList } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { api, type Order, type OrderStatus } from '@/services/api';

const AdminOrders = () => {
  const { t } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Function to load orders from the database
  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const savedOrders = await api.orders();
      setOrders(savedOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
      toast({
        title: t('common.error'),
        description: t('admin.orders.load_error'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [t, toast]);

  // Load orders from database on component mount and set up a polling interval
  useEffect(() => {
    loadOrders();
    const intervalId = setInterval(loadOrders, 15000);
    return () => clearInterval(intervalId);
  }, [loadOrders]);

  const filteredOrders = orders.filter(
    order => 
      order.id.includes(searchTerm) || 
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const updated = await api.updateOrderStatus(orderId, newStatus);
      setOrders(current => current.map(order => order.id === orderId ? updated : order));
      if (selectedOrder?.id === orderId) setSelectedOrder(updated);
      toast({
        title: t('admin.orders.status_updated'),
        description: t('admin.orders.status_update_message').replace('{orderId}', orderId).replace('{status}', getStatusLabel(newStatus)),
      });
    } catch (error) {
      toast({ title: t('common.error'), description: error instanceof Error ? error.message : t('common.error'), variant: 'destructive' });
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (window.confirm(t('admin.orders.confirm_delete'))) {
      await api.deleteOrder(orderId);
      setOrders(current => current.filter(order => order.id !== orderId));
      
      toast({
        title: t('admin.orders.deleted'),
        description: t('admin.orders.delete_message').replace('{orderId}', orderId),
      });
    }
  };

  const getStatusLabel = (status: OrderStatus): string => {
    const statusLabels = {
      pending: t('admin.orders.pending'),
      processing: t('admin.orders.processing'),
      completed: t('admin.orders.completed'),
      canceled: t('admin.orders.canceled')
    };
    return statusLabels[status];
  };

  const getStatusClass = (status: OrderStatus): string => {
    const statusClasses = {
      pending: 'bg-[#f4e6d5] text-[#8c5a2d]',
      processing: 'bg-[#e5edf1] text-[#456776]',
      completed: 'bg-[#e3eee8] text-[#4f7562]',
      canceled: 'bg-[#f3e0e3] text-[#944b5b]'
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
      <div className="space-y-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[.22em] text-[#a04e62]">Atelier operations</p>
            <h1 className="font-serif text-4xl tracking-[-.03em] text-[#281922] sm:text-5xl">{t('admin.orders.title')}</h1>
            <p className="mt-2 text-sm text-[#806d74]">{t('admin.orders.subtitle').replace('{count}', orders.length.toString())}</p>
          </div>
          
          <Button 
            variant="outline" 
            className="h-11 rounded-full border-[#281922]/15 bg-[#fffaf8] px-5 text-[10px] font-semibold uppercase tracking-[.14em] text-[#67545c] hover:bg-white"
            onClick={loadOrders}
            disabled={isLoading}
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            {t('admin.orders.refresh')}
          </Button>
        </div>

        <Card className="rounded-[1.25rem] border-[#281922]/10 bg-[#fffaf8] shadow-[0_12px_35px_rgba(40,25,34,.06)]">
          <CardContent className="p-5 sm:p-7">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-sm"><Search className="absolute left-3.5 top-3.5 h-4 w-4 text-[#a88f96]" />
              <Input 
                placeholder={t('admin.orders.search_orders')} 
                className="h-11 rounded-full border-[#281922]/12 bg-white pl-11"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              /></div><div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[.14em] text-[#9c7d87]"><ClipboardList className="h-4 w-4 text-[#a04e62]" /> {filteredOrders.length} matching</div>
            </div>

            <div className="overflow-x-auto rounded-[1rem] border border-[#281922]/10">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-[#f8eeec] text-[10px] uppercase tracking-[.14em]">{t('admin.orders.order_id')}</TableHead>
                    <TableHead className="bg-[#f8eeec] text-[10px] uppercase tracking-[.14em]">{t('admin.orders.customer')}</TableHead>
                    <TableHead className="bg-[#f8eeec] text-right text-[10px] uppercase tracking-[.14em]">{t('admin.orders.total')}</TableHead>
                    <TableHead className="bg-[#f8eeec] text-[10px] uppercase tracking-[.14em]">{t('admin.orders.date')}</TableHead>
                    <TableHead className="bg-[#f8eeec] text-[10px] uppercase tracking-[.14em]">{t('admin.orders.status')}</TableHead>
                    <TableHead className="bg-[#f8eeec] text-right text-[10px] uppercase tracking-[.14em]">{t('admin.orders.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedOrders.length > 0 ? (
                    sortedOrders.map((order) => (
                      <TableRow key={order.id} className="border-[#281922]/10 hover:bg-[#fffaf8]">
                        <TableCell className="font-medium text-[#a04e62]">#{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-[#281922]">{order.customer.name}</p>
                            <p className="text-xs text-[#9c7d87]">{order.customer.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">{order.total.toFixed(2)} lei</TableCell>
                        <TableCell className="text-sm text-[#806d74]">{formatDate(order.date)}</TableCell>
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
                                <Eye size={16} className="mr-1" /> {t('admin.orders.details')}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-h-[88vh] overflow-y-auto rounded-[1.25rem] bg-[#fffaf8] sm:max-w-[680px]">
                              <DialogHeader>
                                <DialogTitle>{t('admin.orders.details_title').replace('{orderId}', selectedOrder?.id || '')}</DialogTitle>
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
                        {isLoading ? t('admin.orders.loading_orders') : t('admin.orders.no_orders')}
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
  const { t } = useLanguage();
  
  return (
    <div className="space-y-7 py-4">
      <div className="space-y-2">
        <h4 className="font-medium">{t('admin.orders.customer_info')}</h4>
        <div className="rounded-[1rem] border border-[#281922]/10 bg-[#f8eeec] p-4 text-sm leading-7">
          <p><strong>{t('admin.orders.name')}</strong> {order.customer.name}</p>
          <p><strong>{t('admin.orders.email')}</strong> {order.customer.email}</p>
          <p><strong>{t('admin.orders.phone')}</strong> {order.customer.phone}</p>
          <p><strong>{t('admin.orders.address')}</strong> {order.customer.address}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">{t('admin.orders.ordered_products')}</h4>
        <div className="overflow-x-auto rounded-[1rem] border border-[#281922]/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('common.product')}</TableHead>
                <TableHead className="text-right">{t('common.price')}</TableHead>
                <TableHead className="text-right">{t('admin.orders.quantity')}</TableHead>
                <TableHead className="text-right">{t('common.total')}</TableHead>
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
                <TableCell colSpan={3} className="text-right font-medium">{t('admin.orders.order_total')}</TableCell>
                <TableCell className="text-right font-bold">{order.total.toFixed(2)} lei</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">{t('admin.orders.update_status')}</h4>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={order.status === 'pending' ? 'default' : 'outline'}
            size="sm"
            className={order.status === 'pending' ? 'bg-[#a8753c] text-white hover:bg-[#8c5a2d]' : 'border-[#281922]/15 hover:bg-[#f8eeec]'}
            onClick={() => onStatusChange(order.id, 'pending')}
          >
            {t('admin.orders.pending')}
          </Button>
          <Button 
            variant={order.status === 'processing' ? 'default' : 'outline'}
            size="sm"
            className={order.status === 'processing' ? 'bg-[#527887] text-white hover:bg-[#456776]' : 'border-[#281922]/15 hover:bg-[#f8eeec]'}
            onClick={() => onStatusChange(order.id, 'processing')}
          >
            {t('admin.orders.processing')}
          </Button>
          <Button 
            variant={order.status === 'completed' ? 'default' : 'outline'}
            size="sm"
            className={order.status === 'completed' ? 'bg-[#5c846e] text-white hover:bg-[#4f7562]' : 'border-[#281922]/15 hover:bg-[#f8eeec]'}
            onClick={() => onStatusChange(order.id, 'completed')}
          >
            {t('admin.orders.completed')}
          </Button>
          <Button 
            variant={order.status === 'canceled' ? 'default' : 'outline'}
            size="sm"
            className={order.status === 'canceled' ? 'bg-[#a04e62] text-white hover:bg-[#944b5b]' : 'border-[#281922]/15 hover:bg-[#f8eeec]'}
            onClick={() => onStatusChange(order.id, 'canceled')}
          >
            {t('admin.orders.canceled')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
