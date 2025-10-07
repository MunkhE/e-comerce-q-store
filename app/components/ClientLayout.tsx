'use client';

import { useState, ReactNode } from 'react';
import { Header } from './Header';
import { Toaster } from 'sonner';
import { LoginDialog } from './LoginDialog';
import { CartSheet } from './CartSheet';

interface ClientLayoutProps {
  children: ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <Header
        onCartOpen={() => setIsCartOpen(true)}
        onLoginOpen={() => setIsLoginOpen(true)}
        onMenuClick={() => {}}
      />
      {children}
      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
      <LoginDialog open={isLoginOpen} onOpenChange={setIsLoginOpen} />
      <Toaster />
    </>
  );
}
