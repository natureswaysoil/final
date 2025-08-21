
'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface ProductSearchProps {
  onSearchChange: (query: string) => void
  initialValue?: string
}

export function ProductSearch({ onSearchChange, initialValue = '' }: ProductSearchProps) {
  const [searchQuery, setSearchQuery] = useState(initialValue)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearchChange(searchQuery)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, onSearchChange])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearchChange(searchQuery)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto lg:mx-0">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button type="submit" className="bg-green-600 hover:bg-green-700">
        Search
      </Button>
    </form>
  )
}
