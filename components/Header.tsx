'use client';

import Link from 'next/link';
import { ShoppingCart, User, Menu, Badge } from 'lucide-react';
import { Button } from '@mui/material';
import { useCart } from '@/app/context/CartContext';
import { useAuth } from '@/app/context/AuthContext';

interface HeaderProps {
  onCartOpen: () => void;
  onLoginOpen: () => void;
  onMenuClick: (section: string) => void;
}

export function Header({ onCartOpen, onLoginOpen, onMenuClick }: HeaderProps) {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="tracking-tight">QStore</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/"
              className="hover:opacity-70 transition-opacity"
            >
              Home
            </Link>
            <Link 
              href="/products"
              className="hover:opacity-70 transition-opacity"
            >
              Products
            </Link>
            <Link 
              href="/about"
              className="hover:opacity-70 transition-opacity"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm hidden sm:inline">Hi, {user.name}</span>
                <Button variant="outlined" size="medium" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button variant="outlined" size="medium" onClick={onLoginOpen}>
                <User className="h-5 w-5" />
              </Button>
            )}
            
            <Button variant="outlined" size="medium" onClick={onCartOpen} className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
