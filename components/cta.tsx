
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, MessageSquare } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-green-600 to-green-700">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Garden?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Nature's Way Soil for their gardening success. 
            Start with our premium organic fertilizers today!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100" asChild>
              <Link href="/products">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600" asChild>
              <Link href="/gardening-advice">
                <MessageSquare className="mr-2 h-5 w-5" />
                Get AI Gardening Advice
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
