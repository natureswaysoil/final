
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

interface Category {
  id: string
  name: string
  slug: string
}

interface ProductFiltersProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
}

export function ProductFilters({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange
}: ProductFiltersProps) {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        const allCategories = [
          { id: 'all', name: 'All Products', slug: 'all-products' },
          ...(data?.categories || [])
        ]
        setCategories(allCategories)
      })
      .catch(error => {
        console.error('Error fetching categories:', error)
      })
  }, [])

  const handlePriceChange = (value: number[]) => {
    onPriceRangeChange([value[0] || 0, value[1] || 100])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.slug ? 'default' : 'ghost'}
                className={`w-full justify-start ${
                  selectedCategory === category.slug 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => onCategoryChange(category.slug)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={[priceRange[0], priceRange[1]]}
              onValueChange={handlePriceChange}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}+</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
