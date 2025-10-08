'use client';

import { Product } from '@/app/types';
import { FeaturedSlider } from './FeaturedSlider';
import { ProductCard } from './ProductCard';
import Button from '@mui/material/Button';

interface HomePageProps {
  featuredProducts: Product[];
  allProducts: Product[];
  onViewAllProducts: () => void;
}

export function HomePage({ featuredProducts, allProducts, onViewAllProducts }: HomePageProps) {
  return (
    <div className="min-h-screen">
      <FeaturedSlider products={featuredProducts} />

      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="mb-4">Онцлох бүтээгдэхүүн</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Button onClick={onViewAllProducts} size="large" variant="contained">
            Бүх бүтээгдэхүүнийг үзэх
          </Button>
        </div>
      </section>

      {/* <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">On orders over $100</p>
            </div>
            <div>
              <h3 className="mb-2">30-Day Returns</h3>
              <p className="text-muted-foreground">Hassle-free return policy</p>
            </div>
            <div>
              <h3 className="mb-2">Secure Checkout</h3>
              <p className="text-muted-foreground">Safe and encrypted payment</p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
 