
import { CheckCircle, Award, Leaf, Users, Clock, Shield } from 'lucide-react'

export function Benefits() {
  const benefits = [
    {
      icon: <CheckCircle className="h-8 w-8 text-green-600" />,
      title: "Premium Quality Guaranteed",
      description: "Every product is manufactured with the finest organic ingredients to ensure superior plant nutrition and soil health."
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "Made Fresh Weekly",
      description: "Unlike competitors who store products for months, we manufacture fresh batches weekly for maximum potency."
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: "Professional Grade",
      description: "Trusted by commercial growers, landscapers, and gardening professionals nationwide for consistent results."
    },
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: "100% Organic & Safe",
      description: "Environmentally responsible formulations that are safe for pets, children, and beneficial insects."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Expert Support",
      description: "Get personalized gardening advice from our AI assistant and experienced horticulture team."
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: "Satisfaction Guaranteed",
      description: "We stand behind our products with our satisfaction guarantee and responsive customer service."
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Nature's Way Soil?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to providing the highest quality organic fertilizers and soil amendments 
            with unmatched customer service and gardening expertise.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                {benefit.icon}
                <h3 className="text-xl font-semibold text-gray-900 ml-3">
                  {benefit.title}
                </h3>
              </div>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
