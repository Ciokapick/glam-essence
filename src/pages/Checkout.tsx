import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/services/api';

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
  const [cardPayments, setCardPayments] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');

  useEffect(() => {
    api.checkoutConfig().then((config) => setCardPayments(config.cardPayments)).catch(() => setCardPayments(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const orderInput = {
        items: items,
        customer: {
          name: formData.name,
          email: formData.email,
          address: formData.address,
          phone: formData.phone
        }
      };

      if (paymentMethod === 'card') {
        const session = await api.createCheckoutSession(orderInput);
        window.location.assign(session.url);
        return;
      }

      const order = await api.placeOrder(orderInput);
      
      // Clear cart and show success message
      clearCart();
      toast({
        title: "Comandă plasată cu succes!",
        description: `Referință ${order.id}. Plata se face la livrare.`,
      });
      
      // Redirect to home
      navigate('/');
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: "Eroare",
        description: error instanceof Error ? error.message : "A apărut o eroare la plasarea comenzii.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <button
          type="button"
          className="inline-flex items-center gap-2 text-beauty-magenta hover:underline mb-6 font-medium"
          onClick={() => navigate('/')}
        >
          <svg width={18} height={18} viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth={2}><path d="M19 12H5m0 0l7-7m-7 7l7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Înapoi la magazin
        </button>
        
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
            <fieldset className="space-y-3 border-t pt-5">
              <legend className="mb-3 font-medium">Metodă de plată</legend>
              <label className="flex cursor-pointer items-center gap-3 rounded-md border p-4">
                <input type="radio" name="payment" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} />
                <span><strong>Plată la livrare</strong><small className="block text-gray-500">Comanda este înregistrată imediat.</small></span>
              </label>
              {cardPayments && (
                <label className="flex cursor-pointer items-center gap-3 rounded-md border p-4">
                  <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                  <span><strong>Card prin Stripe</strong><small className="block text-gray-500">Vei continua într-o pagină de plată securizată.</small></span>
                </label>
              )}
            </fieldset>
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
              {isSubmitting ? 'Se procesează...' : paymentMethod === 'card' ? 'Continuă către plata securizată' : 'Plasează comanda'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
