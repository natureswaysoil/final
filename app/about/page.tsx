
export const metadata = {
  title: 'About Us - Nature\'s Way Soil',
  description: 'Learn about Nature\'s Way Soil and our commitment to producing premium organic fertilizers and soil amendments made fresh weekly.',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
          About Nature's Way Soil
        </h1>
        
        <div className="prose prose-lg mx-auto">
          <p className="text-xl text-gray-600 mb-8 text-center">
            Premium organic fertilizers and soil amendments made fresh weekly for superior plant nutrition and soil health.
          </p>

          <div className="bg-green-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700">
              At Nature's Way Soil, we're dedicated to providing gardeners and farmers with the highest quality organic fertilizers and soil amendments. 
              Unlike mass-produced products that sit on shelves for months, we manufacture our products fresh weekly to ensure maximum potency and effectiveness.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Made Fresh Weekly</h3>
              <p className="text-gray-600">
                Every batch of our liquid fertilizers and soil conditioners is manufactured fresh each week. 
                This ensures you receive products at their peak potency, unlike competitors who produce in bulk and store for extended periods.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Grade</h3>
              <p className="text-gray-600">
                Our products are trusted by commercial growers, landscapers, and gardening professionals nationwide. 
                We maintain the same high standards for home gardeners as we do for our professional customers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">100% Organic</h3>
              <p className="text-gray-600">
                All our fertilizers and soil amendments are made from premium organic ingredients. 
                They're safe for pets, children, and beneficial insects while providing superior nutrition for your plants.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Support</h3>
              <p className="text-gray-600">
                Get personalized gardening advice from our AI assistant and experienced horticulture team. 
                We're here to help you achieve gardening success with our products.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Products manufactured fresh weekly for maximum potency</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Trusted by commercial growers and gardening professionals</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>100% organic ingredients safe for pets and children</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Comprehensive product line for all gardening needs</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Expert customer support and gardening advice</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Nationwide shipping with careful packaging</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
