
'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CreditCard, Shield } from 'lucide-react'
import { toast } from 'sonner'

declare global {
  interface Window {
    Square: any
  }
}

interface SquarePaymentFormProps {
  total: number
  onPaymentSuccess: (paymentResult: any) => void
  onPaymentError: (error: any) => void
  isLoading: boolean
}

export default function SquarePaymentForm({ 
  total, 
  onPaymentSuccess, 
  onPaymentError,
  isLoading 
}: SquarePaymentFormProps) {
  const [payments, setPayments] = useState<any>(null)
  const [card, setCard] = useState<any>(null)
  const [isSquareReady, setIsSquareReady] = useState(false)
  const cardContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    const initSquare = async () => {
      try {
        // Load Square Web SDK if not already loaded
        if (!window.Square) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script')
            script.src = 'https://web.squarecdn.com/v1/square.js'
            script.async = true
            script.onload = () => resolve()
            script.onerror = () => reject(new Error('Failed to load Square SDK'))
            document.head.appendChild(script)
          })
        }

        // Wait a bit for Square to be available
        await new Promise(resolve => setTimeout(resolve, 100))

        if (window.Square && cardContainerRef.current) {
          const appId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID
          const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
          
          if (!appId || !locationId) {
            throw new Error('Square credentials not configured')
          }

          const paymentsInstance = window.Square.payments(appId, locationId)
          setPayments(paymentsInstance)
          
          const cardInstance = await paymentsInstance.card({
            style: {
              '.input-container': {
                borderColor: '#d1d5db',
                borderRadius: '6px',
                padding: '12px',
              },
              '.input-container.is-focus': {
                borderColor: '#10b981',
              },
              '.input-container.is-error': {
                borderColor: '#ef4444',
              },
              '.message-text': {
                color: '#ef4444',
              },
            }
          })

          await cardInstance.attach(cardContainerRef.current)
          setCard(cardInstance)
          setIsSquareReady(true)
        }
      } catch (error) {
        console.error('Error initializing Square:', error)
        // Don't show error toast immediately, just log it
        setIsSquareReady(false)
      }
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initSquare, 500)

    return () => {
      clearTimeout(timer)
      if (card) {
        try {
          card.destroy()
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    }
  }, [])

  const handlePayment = async () => {
    if (!card || !payments) {
      toast.error('Payment form not loaded')
      return
    }

    try {
      const result = await card.tokenize()
      
      if (result.status === 'OK') {
        // Process payment with your backend
        const paymentResponse = await fetch('/api/payments/square', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sourceId: result.token,
            amount: Math.round(total * 100), // Convert to cents
            currency: 'USD'
          }),
        })

        const paymentResult = await paymentResponse.json()

        if (paymentResult.success) {
          // Map Square payment status to our system
          const mappedResult = {
            ...paymentResult,
            payment: {
              ...paymentResult.payment,
              status: paymentResult.payment.status === 'COMPLETED' ? 'COMPLETED' : 'PENDING'
            }
          }
          onPaymentSuccess(mappedResult)
        } else {
          onPaymentError(paymentResult.error)
        }
      } else {
        let errorMessage = 'Payment failed'
        if (result.errors) {
          errorMessage = result.errors.map((error: any) => error.message).join(', ')
        }
        onPaymentError(errorMessage)
      }
    } catch (error) {
      console.error('Payment error:', error)
      onPaymentError('Payment processing failed')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-green-600 mb-4">
          <Shield className="h-4 w-4" />
          <span>Secured by Square - Your payment information is encrypted and secure</span>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Information
            </label>
            <div 
              ref={cardContainerRef} 
              className="min-h-[60px] border border-gray-300 rounded-md p-3"
            />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span className="text-green-600">${total.toFixed(2)}</span>
          </div>
        </div>

        <Button 
          onClick={handlePayment}
          disabled={!isSquareReady || !card || isLoading}
          className="w-full"
          size="lg"
        >
          {!isSquareReady ? 'Loading Payment Form...' : 
           isLoading ? 'Processing Payment...' : 
           `Pay $${total.toFixed(2)}`}
        </Button>

        <div className="text-xs text-gray-500 text-center">
          By placing your order, you agree to our Terms of Service and Privacy Policy.
        </div>
      </CardContent>
    </Card>
  )
}
