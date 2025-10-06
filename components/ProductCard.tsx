'use client';

import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { Button, Card } from '@mui/material';
import { useCart } from '@/app/context/CartContext';
import { Product } from '@/app/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Added to cart!');
  };

  return (
    <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3>{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>
          <span className="shrink-0">${product.price}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>
        <Button onClick={handleAddToCart} className="w-full" variant="contained">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}
