'use client';

import { useRouter } from 'next/navigation';
import { products } from './data/products';
import { HomePage } from '@/app/components/HomePage';

export default function Home() {
  const router = useRouter();
  const featuredProducts = products.filter(p => p.featured);

  return (
      <HomePage
        featuredProducts={featuredProducts}
        allProducts={products}
        onViewAllProducts={() => router.push('/products')}
      />
  );
}
