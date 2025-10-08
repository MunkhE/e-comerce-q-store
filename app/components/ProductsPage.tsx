'use client';

import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { Button, TextField, InputAdornment } from '@mui/material';
import { Search } from 'lucide-react';
import { Product } from '@/app/types';

interface ProductsPageProps {
  products: Product[];
}

export function ProductsPage({ products }: ProductsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Барааны нэрээр хайх..."
                className="
                  w-full
                  px-12
                  py-3
                  rounded-full
                  text-gray-800
                  placeholder-gray-400
                  bg-white
                  border
                  border-gray-200
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-400
                  outline-none
                  shadow-md
                  hover:shadow-lg
                  transition-all
                  duration-200
                "
              />
              <Search
                className="
                  absolute left-4 top-1/2 transform -translate-y-1/2
                  text-gray-400
                  h-5 w-5
                  transition-colors
                  duration-200
                  group-hover:text-gray-500
                "
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'outlined' : 'contained'}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>Таны хайсан бараа олдсонгүй.</p>
          </div>
        )}
      </div>
    </div>
  );
}
