'use client';

import Link from 'next/link';
import { ShoppingCart, User, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '@/app/context/CartContext';
import { useAuth } from '@/app/context/AuthContext';
import { Badge } from '@mui/material';
import { useTheme } from '@/app/context/ThemeContext';
import { Poppins } from "next/font/google";
import { useRouter } from 'next/navigation';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["800"],
  style: ["italic"],
});

interface HeaderProps {
  onCartOpen: () => void;
  onLoginOpen: () => void;
  onMenuClick: (section: string) => void;
}

export function Header({ onCartOpen, onLoginOpen, onMenuClick }: HeaderProps) {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className={`flex items-center gap-3 ${poppins.className} hover:opacity-80 transition-opacity`}
          >
            <div className="text-4xl font-extrabold italic leading-none select-none">
              <span className="text-gray-400">Q</span>
              <span className="text-[#C6FF00] ml-1">STORE</span>
            </div>
          </Link>


          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/"
              className="hover:opacity-70 transition-opacity"
            >
              Нүүр
            </Link>
            <Link 
              href="/products"
              className="hover:opacity-70 transition-opacity"
            >
              Бараа
            </Link>
            <Link 
              href="/about"
              className="hover:opacity-70 transition-opacity"
            >
              Тухай
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm hidden sm:inline">Hi, {user.name}</span>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={onLoginOpen}>
                <User className="h-5 w-5" />
              </Button>
            )}
            
            {/* <Button variant="ghost" size="icon" onClick={onCartOpen} className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground">
                  {totalItems}
                </Badge>
              )}
            </Button> */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/cart')}
              className="relative"
            >
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
