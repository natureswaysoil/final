
import { User } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      role?: string
    }
  }

  interface User {
    role?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string
  }
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  compareAtPrice?: number
  categoryId: string
  category: {
    id: string
    name: string
    slug: string
  }
  type: string
  benefits: string[]
  usage: string[]
  ingredients: string
  applicationRate: string
  npkRatio?: string
  size: string
  seoKeywords: string[]
  image?: string
  isActive: boolean
  inventory: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface ShippingInfo {
  name: string
  email: string
  phone?: string
  address1: string
  address2?: string
  city: string
  state: string
  zip: string
  country: string
}
