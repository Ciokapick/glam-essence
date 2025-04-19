
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { getFromDb, saveToDb, updateProductStock, saveOrder } from '@/utils/jsonDb';

interface CustomerInfo {
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface Order {
  id: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    category: string;
    discount?: number;
  }>;
  total: number;
  customer: CustomerInfo;
  status: 'pending' | 'processing' | 'completed' | 'canceled';
  date: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create order object
      const order: Order = {
        id: generateOrderId(),
        items: items,
        total: subtotal + 15, // Including shipping
        customer: {
          name: formData.name,
          email: formData.email,
          address: formData.address,
          phone: formData.phone
        },
        status: 'pending',
        date: new Date().toLocaleDateString('ro-RO')
      };
  
      // Save the order using our utility function
      saveOrder(order);
      
      // Clear cart and show success message
      clearCart();
      toast({
        title: "Comandă plasată cu succes!",
        description: "Vă mulțumim pentru comandă. Veți primi un email de confirmare în curând.",
      });
      
      // Redirect to home
      navigate('/');
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: "Eroare",
        description: "A apărut o eroare la plasarea comenzii. Vă rugăm să încercați din nou.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateOrderId = (): string => {
    // Generate a 4 digit order ID
    return String(1000 + Math.floor(Math.random() * 9000));
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
              <Label htmlFor="name">Nume complet</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
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
            <Button 
              type="submit" 
              className="w-full bg-beauty-magenta hover:bg-beauty-magenta/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Se procesează...' : 'Plasează comanda'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
