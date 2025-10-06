'use client';

import { ReactNode } from "react";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext"; // ← шинэ provider

interface Props {
  children: ReactNode;
}

export default function ClientCartWrapper({ children }: Props) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  );
}
