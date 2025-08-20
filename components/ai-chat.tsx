'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MessageCircle, X, Send, Leaf, Sprout } from 'lucide-react'

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI gardening assistant. I can help you with gardening questions and product recommendations. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Simple AI responses for demo - in production, this would connect to an actual AI service
  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('fertilizer') || message.includes('nutrients')) {
      return "For most plants, I recommend using liquid fertilizers every 2-3 weeks during the growing season. Our liquid kelp fertilizer is excellent for providing trace minerals and growth hormones. What type of plants are you growing?"
    }
    
    if (message.includes('soil') || message.includes('amendments')) {
      return "Healthy soil is the foundation of great gardens! Our humic acid concentrate can improve soil structure and nutrient uptake. Are you dealing with clay soil, sandy soil, or looking to improve existing garden beds?"
    }
    
    if (message.includes('organic') || message.includes('natural')) {
      return "All of our products are 100% organic and safe for the environment. We focus on building soil biology naturally. Our compost tea is particularly good for establishing beneficial microorganisms."
    }
    
    if (message.includes('plants') || message.includes('growing') || message.includes('garden')) {
      return "What type of plants or crops are you growing? Different plants have different nutritional needs. I can recommend specific products based on whether you're growing vegetables, flowers, herbs, or houseplants."
    }
    
    if (message.includes('help') || message.includes('problem')) {
      return "I'm here to help! You can ask me about plant nutrition, soil health, organic fertilizers, application rates, or any gardening challenges you're facing. What specific issue are you dealing with?"
    }
    
    return "That's a great question! While I can provide general gardening guidance, for specific product recommendations tailored to your exact situation, I'd suggest consulting with our gardening experts. You can also browse our product catalog to find the right solutions for your garden."
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    
    // Simulate AI thinking time
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputMessage),
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="rounded-full h-14 w-14 bg-forest-600 hover:bg-forest-700 shadow-lg"
            size="sm"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 h-96 shadow-xl">
          <Card className="h-full border-forest-200">
            <CardHeader className="bg-forest-600 text-white rounded-t-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-forest-500 rounded-full">
                    <Leaf className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-medium">AI Gardening Assistant</CardTitle>
                    <p className="text-xs text-forest-100">Ask me about plants & products</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-forest-500 h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="flex flex-col h-full p-0">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-sage-50">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.isUser 
                        ? 'bg-forest-600 text-white' 
                        : 'bg-white border border-sage-200 text-earth-800'
                    }`}>
                      {!message.isUser && (
                        <div className="flex items-center space-x-1 mb-1">
                          <Sprout className="h-3 w-3 text-forest-600" />
                          <span className="text-xs font-medium text-forest-600">AI Assistant</span>
                        </div>
                      )}
                      <p>{message.content}</p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-sage-200 text-earth-800 max-w-xs px-3 py-2 rounded-lg text-sm">
                      <div className="flex items-center space-x-1 mb-1">
                        <Sprout className="h-3 w-3 text-forest-600" />
                        <span className="text-xs font-medium text-forest-600">AI Assistant</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-forest-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-forest-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-forest-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Input Area */}
              <div className="border-t border-sage-200 p-3 bg-white">
                <div className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about gardening..."
                    className="flex-1 border-sage-300 focus:border-forest-500"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-forest-600 hover:bg-forest-700"
                    size="sm"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}