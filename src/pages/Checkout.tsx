
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';

interface OrderData {
  id: string;
  items: any[];
  total: number;
  customerName: string;
  email: string;
  address: string;
  phone: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  date: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    address: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create order object
    const order: OrderData = {
      id: `ORD-${Date.now()}`,
      items: items,
      total: subtotal + 15, // Including shipping
      customerName: formData.customerName,
      email: formData.email,
      address: formData.address,
      phone: formData.phone,
      status: 'pending',
      date: new Date().toISOString()
    };

    // Get existing orders from localStorage or initialize empty array
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    // Add new order
    localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));
    
    // Clear cart and show success message
    clearCart();
    toast({
      title: "Comandă plasată cu succes!",
      description: "Vă mulțumim pentru comandă. Veți primi un email de confirmare în curând.",
    });
    
    // Redirect to home
    navigate('/');
  };

  if (items.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Finalizare comandă</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Produse comandate</h2>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between py-2 border-b">
              <span>{item.name} x {item.quantity}</span>
              <span>{(item.price * item.quantity).toFixed(2)} lei</span>
            </div>
          ))}
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>{subtotal.toFixed(2)} lei</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Transport:</span>
              <span>15.00 lei</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>{(subtotal + 15).toFixed(2)} lei</span>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Informații livrare</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="customerName">Nume complet</Label>
              <Input
                id="customerName"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({...formData, customerName: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="address">Adresa de livrare</Label>
              <Input
                id="address"
                required
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="phone">Telefon</Label>
              <Input
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <Button type="submit" className="w-full bg-beauty-magenta hover:bg-beauty-magenta/90">
              Plasează comanda
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
