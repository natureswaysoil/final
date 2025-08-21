
'use client'

import { useState, useEffect, Suspense } from 'react'
import { ProductCard } from '@/components/product-card'
import { ProductFilters } from '@/components/product-filters'
import { ProductSearch } from '@/components/product-search'
import { Breadcrumbs } from '@/components/breadcrumbs'
import type { Product } from '@/lib/types'
import { useSearchParams } from 'next/navigation'

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' }
]

function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all-products')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  
  const searchParams = useSearchParams()

  useEffect(() => {
    const category = searchParams?.get('category')
    const search = searchParams?.get('search')
    
    if (category) {
      setSelectedCategory(category)
    }
    if (search) {
      setSearchQuery(search)
    }
  }, [searchParams])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (selectedCategory && selectedCategory !== 'all-products') {
          params.append('category', selectedCategory)
        }
        if (searchQuery) {
          params.append('search', searchQuery)
        }
        params.append('minPrice', priceRange[0].toString())
        params.append('maxPrice', priceRange[1].toString())

        const response = await fetch(`/api/products?${params.toString()}`)
        const data = await response.json()
        setProducts(data?.products || [])
      } catch (error) {
        console.error('Error fetching products:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [selectedCategory, searchQuery, priceRange])

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Premium Organic Fertilizers & Soil Amendments
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Discover our complete collection of premium organic liquid fertilizers and soil amendments. 
          Each product is made fresh weekly with the finest organic ingredients for superior plant nutrition and soil health.
        </p>
      </div>

      <div className="mb-8">
        <ProductSearch onSearchChange={setSearchQuery} initialValue={searchQuery} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ProductFilters 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
          />
        </div>
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-96 animate-pulse" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No products found matching your criteria.</p>
              <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 bg-green-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Nature's Way Soil Products?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Made Fresh Weekly</h3>
            <p className="text-gray-600">Our products are manufactured fresh every week to ensure maximum potency and effectiveness.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Professional Grade</h3>
            <p className="text-gray-600">Trusted by commercial growers and gardening professionals nationwide for consistent results.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Sustainable & Organic</h3>
            <p className="text-gray-600">Environmentally responsible formulations that improve soil health while boosting plant growth.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  )
}
