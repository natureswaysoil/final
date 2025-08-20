
export const metadata = {
  title: 'AI Gardening Assistant - Expert Advice for Natural Gardening',
  description: 'Get personalized gardening advice from our AI assistant. Expert help for organic gardening, plant care, soil health, and using Nature\'s Way Soil products.',
}

export default function GardeningAdvicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-green-600 to-green-700 text-white py-12">
        <div className="container px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Gardening Assistant
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
            Get instant, expert gardening advice tailored to your specific needs. 
            Ask about plant care, soil health, organic fertilizers, and using our products effectively.
          </p>
        </div>
      </div>

      <div className="py-8">
        <div className="text-center mb-6">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Chat with our AI assistant below for personalized gardening advice, product recommendations, 
            and solutions to your specific gardening challenges.
          </p>
        </div>
        
        <div className="flex justify-center px-4">
          <div className="w-full">
            <iframe
              src="https://apps.abacus.ai/chatllm/?appId=173be12da8&hideTopBar=2"
              className="w-full rounded-lg shadow-lg border"
              style={{ minHeight: '800px' }}
              frameBorder="0"
              title="AI Gardening Assistant"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
