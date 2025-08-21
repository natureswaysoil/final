
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Leaf } from 'lucide-react'
import { useCart } from '@/components/cart-context'
import type { Product } from '@/lib/types'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-green-100 flex items-center justify-center">
              <Leaf className="h-16 w-16 text-green-600" />
            </div>
          )}
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {product.category.name}
            </Badge>
          </div>
          {product.inventory <= 10 && product.inventory > 0 && (
            <div className="absolute top-4 right-4">
              <Badge variant="destructive">
                Low Stock
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-green-600">
                ${Number(product.price).toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${Number(product.compareAtPrice).toFixed(2)}
                </span>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">{product.size}</p>
              {product.npkRatio && (
                <p className="text-xs text-green-600 font-medium">
                  NPK: {product.npkRatio}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Button
              onClick={handleAddToCart}
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={product.inventory === 0}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.inventory === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
