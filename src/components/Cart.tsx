
import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart, CartItem } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";

const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const finalPrice = item.discount 
    ? item.price * (1 - item.discount / 100) 
    : item.price;

  return (
    <div className="flex py-4 border-b">
      {/* Product image */}
      <div className="w-20 h-20 rounded-md overflow-hidden mr-4">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
      
      {/* Product details */}
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="font-medium">{item.name}</h4>
          <button 
            onClick={() => removeFromCart(item.id)}
            className="text-gray-400 hover:text-beauty-rose transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="text-sm text-muted-foreground">{item.category}</div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center border rounded-md">
            <button 
              onClick={handleDecrement}
              className="px-2 py-1 hover:bg-gray-100"
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="px-3">{item.quantity}</span>
            <button 
              onClick={handleIncrement}
              className="px-2 py-1 hover:bg-gray-100"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <div className="font-semibold">
            {finalPrice.toFixed(2)} lei
          </div>
        </div>
      </div>
    </div>
  );
};

const Cart: React.FC = () => {
  const { items, isOpen, closeCart, clearCart, totalItems, subtotal } = useCart();

  const handleCheckout = () => {
    toast({
      title: "Comandă finalizată",
      description: "Mulțumim pentru comanda ta!",
      variant: "default",
    });
    clearCart();
    closeCart();
  };

  if (!isOpen) return null;

  return (
    <div>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 z-40"
        onClick={closeCart}
      ></div>
      
      {/* Cart drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl transform transition-transform duration-300 overflow-auto">
        <div className="p-4 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center">
            <ShoppingBag className="h-5 w-5 mr-2" />
            Coșul tău ({totalItems})
          </h2>
          <button 
            onClick={closeCart}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4">
          {items.length === 0 ? (
            <div className="text-center py-10">
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Coșul tău este gol</h3>
              <p className="text-muted-foreground mb-6">Adaugă produse pentru a începe cumpărăturile</p>
              <Button onClick={closeCart} className="bg-beauty-magenta hover:bg-beauty-magenta/90">
                Continuă cumpărăturile
              </Button>
            </div>
          ) : (
            <>
              <div className="max-h-[calc(100vh-250px)] overflow-y-auto">
                {items.map(item => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </div>
              
              <div className="pt-4 border-t mt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span className="font-semibold">{subtotal.toFixed(2)} lei</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span>Transport</span>
                  <span className="font-semibold">15.00 lei</span>
                </div>
                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>Total</span>
                  <span>{(subtotal + 15).toFixed(2)} lei</span>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={clearCart}
                    variant="outline"
                    className="flex-1"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Golește coșul
                  </Button>
                  <Button 
                    onClick={handleCheckout}
                    className="flex-1 bg-beauty-magenta hover:bg-beauty-magenta/90"
                  >
                    Finalizează comanda
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
