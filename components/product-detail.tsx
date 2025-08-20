
'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ShoppingCart, Leaf, CheckCircle, Info, Package, Beaker } from 'lucide-react'
import { useCart } from '@/components/cart-context'
import type { Product } from '@/lib/types'
import { motion } from 'framer-motion'

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: product.name, href: `/products/${product.slug}` }
  ]

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-green-100 flex items-center justify-center">
                <Leaf className="h-32 w-32 text-green-600" />
              </div>
            )}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          <div>
            <Badge variant="secondary" className="mb-4 bg-green-100 text-green-800">
              {product.category.name}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-xl text-gray-600">
              {product.description}
            </p>
          </div>

          {/* Price and Stock */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-green-600">
                ${product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="text-lg text-gray-500 line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>
            <div className="text-right">
              <p className="text-lg font-medium text-gray-900">{product.size}</p>
              {product.npkRatio && (
                <p className="text-sm text-green-600 font-medium">
                  NPK Ratio: {product.npkRatio}
                </p>
              )}
              <p className={`text-sm ${product.inventory > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                {product.inventory > 10 ? 'In Stock' : `Only ${product.inventory} left`}
              </p>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
                className="px-3 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={product.inventory === 0}
              size="lg"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {product.inventory === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>

          {/* Product Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                Key Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Detailed Information */}
      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="h-5 w-5 mr-2 text-blue-600" />
              Usage Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {product.usage.map((instruction, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span className="text-gray-700">{instruction}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Beaker className="h-5 w-5 mr-2 text-purple-600" />
              Ingredients & Application
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Ingredients:</h4>
                <p className="text-gray-700 text-sm">{product.ingredients}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Application Rate:</h4>
                <p className="text-gray-700 text-sm">{product.applicationRate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2 text-orange-600" />
              Product Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Size:</span>
                <span className="font-medium">{product.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium">{product.type}</span>
              </div>
              {product.npkRatio && (
                <div className="flex justify-between">
                  <span className="text-gray-600">NPK Ratio:</span>
                  <span className="font-medium">{product.npkRatio}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{product.category.name}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
