
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Image
              src="/logo-with-tagline.png"
              alt="Nature's Way Soil"
              width={250}
              height={100}
              className="h-16 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-300 mb-4 max-w-md">
              Premium organic fertilizers and soil amendments made fresh weekly. 
              Trusted by gardeners nationwide for exceptional plant nutrition and sustainable growing.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-green-400" />
                <span className="text-gray-300">Serving Nationwide</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-green-400" />
                <span className="text-gray-300">Contact via our forms</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-green-400" />
                <span className="text-gray-300">Professional Support</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-300 hover:text-green-400 transition-colors">
                  Shop Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-green-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-green-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/gardening-advice" className="text-gray-300 hover:text-green-400 transition-colors">
                  AI Gardening Assistant
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=liquid-fertilizers" className="text-gray-300 hover:text-green-400 transition-colors">
                  Liquid Fertilizers
                </Link>
              </li>
              <li>
                <Link href="/products?category=soil-amendments" className="text-gray-300 hover:text-green-400 transition-colors">
                  Soil Amendments
                </Link>
              </li>
              <li>
                <Link href="/products?category=soil-conditioners" className="text-gray-300 hover:text-green-400 transition-colors">
                  Soil Conditioners
                </Link>
              </li>
              <li>
                <Link href="/products?category=specialty-products" className="text-gray-300 hover:text-green-400 transition-colors">
                  Specialty Products
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Nature's Way Soil. All rights reserved. Premium organic fertilizers made fresh weekly.
          </p>
        </div>
      </div>
    </footer>
  )
}
