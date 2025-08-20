
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamic import to avoid SSR issues - only load when needed
const SquarePaymentForm = dynamic(() => import('./square-payment-form'), {
  ssr: false,
  loading: () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading secure payment form...</p>
        </div>
      </CardContent>
    </Card>
  )
})

interface PaymentWrapperProps {
  total: number
  onPaymentSuccess: (paymentResult: any) => void
  onPaymentError: (error: any) => void
  isLoading: boolean
}

export default function PaymentWrapper({ 
  total, 
  onPaymentSuccess, 
  onPaymentError,
  isLoading 
}: PaymentWrapperProps) {
  const [showPaymentForm, setShowPaymentForm] = useState(false)

  if (!showPaymentForm) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span className="text-green-600">${total.toFixed(2)}</span>
            </div>
          </div>

          <Button 
            onClick={() => setShowPaymentForm(true)}
            className="w-full"
            size="lg"
          >
            Continue to Payment
          </Button>

          <div className="text-xs text-gray-500 text-center">
            Secure payment processing powered by Square
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <SquarePaymentForm
      total={total}
      onPaymentSuccess={onPaymentSuccess}
      onPaymentError={onPaymentError}
      isLoading={isLoading}
    />
  )
}
