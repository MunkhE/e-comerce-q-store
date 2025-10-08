'use client';

import { Button } from '@mui/material';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-6xl">
        <h1 className="text-2xl font-semibold mb-8">Миний сагс</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-gray-500 py-20 space-y-4">
                <div className="bg-gray-100 p-6 rounded-full">
                  <ShoppingCart className="h-12 w-12 text-gray-400" />
                </div>
                <p className="text-lg font-medium">Таны сагс хоосон байна.</p>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => router.push('/products')}
                  className="mt-2"
                >
                  Дэлгүүр үзэх
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between bg-white rounded-xl shadow-sm hover:shadow-md transition px-6 py-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-md object-cover"
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
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outlined"
                      size="small"
                      className="rounded-full min-w-8 h-8"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
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
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="text-right w-28">
                    <p className="font-semibold text-gray-800">
                      ₮{(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
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

          {/* RIGHT: Summary */}
          {items.length > 0 && (
            <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-md p-6 h-fit">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Захиалгын мэдээлэл
              </h2>

              <div className="border-b border-gray-200 pb-4 mb-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between text-sm text-gray-700 mb-1"
                  >
                    <span>
                      {item.product.name} × {item.quantity}
                    </span>
                    <span>
                      ₮{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-base font-semibold mb-4">
                <span>Нийт:</span>
                <span>₮{totalPrice.toLocaleString()}</span>
              </div>

              <div className="mb-4">
                <Button
                  variant="outlined"
                  fullWidth
                  className="text-gray-700 border-gray-300 hover:border-gray-400"
                >
                  Купон хөнгөлөлт ашиглах
                </Button>
              </div>

              <Button
                variant="contained"
                color="error"
                fullWidth
                className="text-white font-semibold py-2"
              >
                ХУДАЛДАН АВАХ
              </Button>
            </div>
          )}
        </div>
        {items.length > 0 && (
          <div className="w-full max-w-6xl flex justify-between items-center mt-10">
            <button
              onClick={() => router.push('/products')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Буцах</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
