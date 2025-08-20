
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ShoppingCart, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart-context'
import { useSession, signOut } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { getItemCount, setIsOpen: setCartOpen } = useCart()
  const { data: session } = useSession()

  const toggleMenu = () => setIsOpen(!isOpen)

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-with-tagline.png"
              alt="Nature's Way Soil - From Our Farm To Your Garden"
              width={200}
              height={80}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/gardening-advice">
                AI Gardening Assistant
              </Link>
            </Button>

            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </button>

            {/* User Menu */}
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {session.user?.name || 'Account'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  {session.user?.role === 'ADMIN' && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Panel</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="outline">
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-green-600 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link href="/gardening-advice">
                  AI Gardening Assistant
                </Link>
              </Button>
              
              <button
                onClick={() => {
                  setCartOpen(true)
                  setIsOpen(false)
                }}
                className="flex items-center justify-between w-full p-2 text-gray-700 hover:text-green-600 transition-colors"
              >
                <span className="flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart
                </span>
                {getItemCount() > 0 && (
                  <span className="bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getItemCount()}
                  </span>
                )}
              </button>

              {session ? (
                <div>
                  <Link
                    href="/orders"
                    className="block text-gray-700 hover:text-green-600 font-medium py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    My Orders
                  </Link>
                  {session.user?.role === 'ADMIN' && (
                    <Link
                      href="/admin"
                      className="block text-gray-700 hover:text-green-600 font-medium py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut()
                      setIsOpen(false)
                    }}
                    className="block text-gray-700 hover:text-green-600 font-medium py-2"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Button asChild variant="outline" className="w-full">
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
