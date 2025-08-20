
'use client'

import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart-context'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export function CartSidebar() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, getTotal } = useCart()
  const { data: session } = useSession()

  if (!isOpen) return null

  const total = getTotal()

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-lg">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center py-8">
                <ShoppingBag className="h-16 w-16 text-gray-300" />
                <p className="text-gray-500 mt-4">Your cart is empty</p>
                <Button
                  onClick={() => setIsOpen(false)}
                  className="mt-4"
                  asChild
                >
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-4 border rounded-lg">
                    <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                      {item.product.image ? (
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-green-100 flex items-center justify-center">
                          <ShoppingBag className="h-8 w-8 text-green-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm leading-tight">
                        {item.product.name}
                      </h3>
                      <p className="text-green-600 font-semibold mt-1">
                        ${Number(item.product.price).toFixed(2)}
                      </p>
                      <div className="flex items-center mt-2 space-x-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-2 py-1 bg-gray-100 rounded text-sm min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-1 hover:bg-red-100 rounded text-red-600 ml-auto"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-lg font-semibold text-green-600">
                  ${total.toFixed(2)}
                </span>
              </div>
              <div className="space-y-2">
                <Button className="w-full" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                {!session && (
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/auth/signin?callbackUrl=/checkout">
                      Sign In for Faster Checkout
                    </Link>
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                  asChild
                >
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
