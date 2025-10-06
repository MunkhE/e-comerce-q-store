'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@mui/material';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { useCart } from '@/app/context/CartContext';
import { Product } from '@/app/types';

interface FeaturedSliderProps {
  products: Product[];
}

export function FeaturedSlider({ products }: FeaturedSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success('Added to cart!');
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [products.length]);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="relative h-full bg-muted">
              <img
                src={products[currentIndex].image}
                alt={products[currentIndex].name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                <div className="container mx-auto max-w-6xl">
                  <h2 className="text-white mb-2">{products[currentIndex].name}</h2>
                  <p className="text-white/90 mb-4 max-w-2xl">
                    {products[currentIndex].description}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-white">${products[currentIndex].price}</span>
                    <Button 
                      onClick={() => handleAddToCart(products[currentIndex])}
                      className="bg-white text-black hover:bg-white/90"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Button
        variant="outlined"
        size="medium"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white z-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="outlined"
        size="medium"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white z-10"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
