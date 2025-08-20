
import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

// Dynamic import for Square SDK to avoid build-time issues
let Client: any, Environment: any, ApiError: any

async function loadSquareSDK() {
  if (!Client) {
    // @ts-ignore - squareup types are not perfectly maintained
    const squareup = await import('squareup')
    Client = squareup.Client
    Environment = squareup.Environment
    ApiError = squareup.ApiError
  }
}

// Function to initialize Square client
async function getSquareClient() {
  await loadSquareSDK()
  
  const accessToken = process.env.SQUARE_ACCESS_TOKEN
  const environment = process.env.SQUARE_ENVIRONMENT
  
  if (!accessToken) {
    throw new Error('SQUARE_ACCESS_TOKEN environment variable is required')
  }
  
  return new Client({
    accessToken,
    environment: environment === 'production' ? Environment.Production : Environment.Sandbox,
  })
}

export async function POST(request: NextRequest) {
  try {
    const { sourceId, amount, currency = 'USD' } = await request.json()

    if (!sourceId || !amount) {
      return NextResponse.json(
        { success: false, error: 'Missing required payment parameters' },
        { status: 400 }
      )
    }

    if (!process.env.SQUARE_LOCATION_ID) {
      return NextResponse.json(
        { success: false, error: 'Square configuration is incomplete' },
        { status: 500 }
      )
    }

    const client = await getSquareClient()
    const { paymentsApi } = client

    const requestBody = {
      sourceId,
      amountMoney: {
        amount: BigInt(amount), // Amount in cents
        currency,
      },
      locationId: process.env.SQUARE_LOCATION_ID,
      idempotencyKey: randomUUID(),
    }

    const response = await paymentsApi.createPayment(requestBody)

    if (response.result.payment) {
      return NextResponse.json({
        success: true,
        payment: {
          id: response.result.payment.id,
          status: response.result.payment.status,
          totalMoney: response.result.payment.totalMoney,
          receiptUrl: response.result.payment.receiptUrl,
        }
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Payment processing failed' },
        { status: 400 }
      )
    }
  } catch (error: unknown) {
    console.error('Square payment error:', error)
    
    // Load SDK for error handling if not already loaded
    try {
      await loadSquareSDK()
    } catch {}
    
    // Check if it's an ApiError from Square
    if (ApiError && error instanceof ApiError) {
      const apiError = error as any
      const errors = apiError.result?.errors || []
      const errorMessage = errors.map((e: any) => e.detail).join(', ') || 'Payment failed'
      
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 400 }
      )
    }

    // Fallback error check for Square API errors
    if (error && typeof error === 'object' && 'result' in error) {
      const apiError = error as any
      const errors = apiError.result?.errors || []
      const errorMessage = errors.map((e: any) => e.detail).join(', ') || 'Payment failed'
      
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 400 }
      )
    }

    const errorMessage = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}
