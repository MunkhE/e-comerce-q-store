'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Button } from '@mui/material';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Separator } from './ui/separator';
import { useCart } from '@/app/context/CartContext';

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            {items.length === 0 ? 'Your cart is empty' : `${items.length} item(s) in cart`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-full py-6">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <p>Add some products to get started</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md bg-muted"
                    />
                    <div className="flex-1">
                      <h4 className="mb-1">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        ${item.product.price}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outlined"
                          size="medium"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outlined"
                          size="medium"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="outlined"
                        size="medium"
                        className="h-8 w-8"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4">
                <Separator />
                <div className="flex justify-between items-center">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <Button className="w-full">
                  Checkout
                </Button>
                <Button 
                  variant="outlined" 
                  className="w-full"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
