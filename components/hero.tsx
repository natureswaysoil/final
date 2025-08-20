
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Droplets, Award, Leaf } from 'lucide-react'

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-green-50 via-green-100 to-blue-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="mb-8">
              <Image
                src="/logo-with-tagline.png"
                alt="Nature's Way Soil - From Our Farm To Your Garden"
                width={500}
                height={200}
                className="mx-auto h-32 md:h-40 lg:h-48 w-auto"
                priority
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Premium Organic Fertilizers
              <span className="block text-green-600">Made Fresh Weekly</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Professional-grade liquid fertilizers and soil amendments crafted from the finest organic ingredients. 
              Trusted by gardeners nationwide for exceptional plant nutrition and sustainable growing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-3 bg-green-600 hover:bg-green-700" asChild>
              <Link href="/products">Shop Premium Products</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3" asChild>
              <Link href="/gardening-advice">
                Get AI Gardening Advice
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Droplets className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Made Fresh Weekly</h3>
              <p className="text-gray-600">
                Every batch is manufactured fresh to ensure maximum potency and effectiveness for your plants.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Grade</h3>
              <p className="text-gray-600">
                Trusted by commercial growers and gardening professionals for consistent, reliable results.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Leaf className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainably Crafted</h3>
              <p className="text-gray-600">
                Environmentally responsible formulations that improve soil health while boosting plant growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
