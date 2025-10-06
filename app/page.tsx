'use client';

import { useRouter } from 'next/navigation';
import { products } from './data/products';
import { useState } from 'react';
import { HomePage } from '@/components/HomePage';

export default function Home() {
  const router = useRouter();
  const featuredProducts = products.filter(p => p.featured);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleMenuClick = (section: string) => {
    console.log('Menu clicked:', section);
  };

  return (
      <HomePage
        featuredProducts={featuredProducts}
        allProducts={products}
        onViewAllProducts={() => router.push('/products')}
      />
  );
}
