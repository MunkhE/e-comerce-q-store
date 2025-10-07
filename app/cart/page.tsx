'use client';

import { Button } from '@mui/material';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      {/* 🏷️ Title */}
      <div className="w-full max-w-4xl mb-10">
        <h1 className="text-2xl font-semibold flex items-center gap-3">
          <span className="text-gray-400 text-3xl font-bold">Q</span>
          <span className="text-gray-800">Your Shopping Cart</span>
        </h1>
      </div>

      {/* 🛍️ Items list */}
      <div className="w-full max-w-4xl space-y-4">
        {items.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            Таны сагс хоосон байна.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center justify-between bg-white rounded-xl shadow-sm hover:shadow-md transition px-6 py-4"
            >
              {/* Image + Info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-gray-800 font-medium">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Ref. {item.product.id}
                  </p>
                </div>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-3">
                <Button
                  variant="outlined"
                  size="small"
                  className="rounded-full min-w-8 h-8"
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-6 text-center font-medium">
                  {item.quantity}
                </span>
                <Button
                  variant="outlined"
                  size="small"
                  className="rounded-full min-w-8 h-8"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              {/* Price */}
              <div className="text-right w-28">
                <p className="font-semibold text-gray-800">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* Remove */}
              <button
                className="text-gray-400 hover:text-red-500 transition"
                onClick={() => removeFromCart(item.product.id)}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* 🧾 Footer total */}
      {items.length > 0 && (
        <div className="w-full max-w-4xl flex justify-between items-center mt-10">
          <button
            onClick={() => router.push('/products')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Shop</span>
          </button>

          <div className="text-right font-semibold text-gray-800">
            Subtotal: ${totalPrice.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}
