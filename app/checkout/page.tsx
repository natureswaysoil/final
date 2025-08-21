
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useCart } from '@/components/cart-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { ShoppingBag, CreditCard, User, MapPin, Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import PaymentWrapper from '@/components/payment-wrapper'

interface ShippingInfo {
  email: string
  firstName: string
  lastName: string
  address: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  phone: string
}

interface BillingInfo extends ShippingInfo {
  sameAsShipping: boolean
}

export default function CheckoutPage() {
  const { data: session } = useSession()
  const { items, getTotal, clearCart } = useCart()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState<'info' | 'payment' | 'confirmation'>('info')
  
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    email: session?.user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  })

  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    email: session?.user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    sameAsShipping: true
  })

  const [isGuestCheckout, setIsGuestCheckout] = useState(!session)

  useEffect(() => {
    if (items.length === 0) {
      router.push('/products')
    }
  }, [items, router])

  useEffect(() => {
    if (session?.user?.email) {
      setShippingInfo(prev => ({ ...prev, email: session.user.email! }))
      setBillingInfo(prev => ({ ...prev, email: session.user.email! }))
      setIsGuestCheckout(false)
    }
  }, [session])

  const subtotal = getTotal()
  const shipping = 0 // Free shipping on all orders
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  const handleShippingChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }))
  }

  const handleBillingChange = (field: keyof BillingInfo, value: string | boolean) => {
    setBillingInfo(prev => ({ ...prev, [field]: value }))
  }

  const validateShippingInfo = () => {
    const required = ['email', 'firstName', 'lastName', 'address', 'city', 'state', 'zipCode', 'phone']
    return required.every(field => shippingInfo[field as keyof ShippingInfo]?.toString().trim())
  }

  const handleProceedToPayment = () => {
    if (!validateShippingInfo()) {
      toast.error('Please fill in all required shipping information')
      return
    }
    setCheckoutStep('payment')
  }

  const handlePaymentSuccess = async (paymentResult: any) => {
    setIsLoading(true)
    try {
      // Create order data with payment information
      const orderData = {
        items: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price
        })),
        shippingInfo,
        billingInfo: billingInfo.sameAsShipping ? shippingInfo : billingInfo,
        subtotal,
        shipping,
        tax,
        total,
        isGuestOrder: isGuestCheckout,
        userId: session?.user?.id || null,
        paymentInfo: {
          provider: 'square',
          paymentId: paymentResult.payment.id,
          status: paymentResult.payment.status,
          receiptUrl: paymentResult.payment.receiptUrl
        }
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        const order = await response.json()
        clearCart()
        setCheckoutStep('confirmation')
        toast.success('Payment successful! Order placed.')
      } else {
        throw new Error('Failed to create order')
      }
    } catch (error) {
      console.error('Order creation error:', error)
      toast.error('Payment successful but failed to create order. Please contact support.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePaymentError = (error: string) => {
    toast.error(`Payment failed: ${error}`)
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <div className="flex items-center mt-4 space-x-4">
            <Badge variant={checkoutStep === 'info' ? 'default' : 'secondary'}>
              1. Information
            </Badge>
            <Badge variant={checkoutStep === 'payment' ? 'default' : 'secondary'}>
              2. Payment
            </Badge>
            <Badge variant={checkoutStep === 'confirmation' ? 'default' : 'secondary'}>
              3. Confirmation
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-6">
            {checkoutStep === 'info' && (
              <>
                {/* Guest Checkout Option */}
                {!session && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Checkout Options
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="guest" 
                            checked={isGuestCheckout}
                            onCheckedChange={(checked) => setIsGuestCheckout(checked as boolean)}
                          />
                          <Label htmlFor="guest">Continue as guest</Label>
                        </div>
                        <p className="text-sm text-gray-600">
                          You can create an account after your purchase to track your order.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Shipping Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => handleShippingChange('email', e.target.value)}
                        placeholder="your@email.com"
                        disabled={!!session}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={shippingInfo.firstName}
                          onChange={(e) => handleShippingChange('firstName', e.target.value)}
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={shippingInfo.lastName}
                          onChange={(e) => handleShippingChange('lastName', e.target.value)}
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        value={shippingInfo.address}
                        onChange={(e) => handleShippingChange('address', e.target.value)}
                        placeholder="123 Main St"
                      />
                    </div>
                    <div>
                      <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                      <Input
                        id="apartment"
                        value={shippingInfo.apartment}
                        onChange={(e) => handleShippingChange('apartment', e.target.value)}
                        placeholder="Apt 2B"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={shippingInfo.city}
                          onChange={(e) => handleShippingChange('city', e.target.value)}
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          value={shippingInfo.state}
                          onChange={(e) => handleShippingChange('state', e.target.value)}
                          placeholder="NY"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={(e) => handleShippingChange('zipCode', e.target.value)}
                          placeholder="10001"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) => handleShippingChange('phone', e.target.value)}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  onClick={handleProceedToPayment}
                  className="w-full"
                  size="lg"
                >
                  Continue to Payment
                </Button>
              </>
            )}

            {checkoutStep === 'payment' && (
              <>
                <PaymentWrapper
                  total={total}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                  isLoading={isLoading}
                />

                <div className="flex gap-4">
                  <Button 
                    variant="outline"
                    onClick={() => setCheckoutStep('info')}
                    className="flex-1"
                    disabled={isLoading}
                  >
                    Back
                  </Button>
                </div>
              </>
            )}

            {checkoutStep === 'confirmation' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">Order Confirmed!</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Thank you for your order!</h3>
                    <p className="text-gray-600 mb-6">
                      Your order has been successfully placed and you will receive a confirmation email shortly.
                    </p>
                    <Button onClick={() => router.push('/products')}>
                      Continue Shopping
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                        {item.product.image ? (
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-green-100 flex items-center justify-center">
                            <ShoppingBag className="h-8 w-8 text-green-600" />
                          </div>
                        )}
                        <div className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.product.name}</h4>
                        <p className="text-green-600 font-semibold">
                          ${(Number(item.product.price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Order Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  <p className="text-sm text-green-600">
                    🎉 Free shipping on all orders!
                  </p>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-green-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
