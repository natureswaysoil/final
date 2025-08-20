
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-config'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await request.json()

    const {
      items,
      shippingInfo,
      billingInfo,
      subtotal,
      shipping,
      tax,
      total,
      isGuestOrder,
      userId,
      paymentInfo
    } = body

    // Validate required fields
    if (!items || !shippingInfo || !billingInfo) {
      return NextResponse.json(
        { error: 'Missing required order information' },
        { status: 400 }
      )
    }

    // For authenticated users, use their ID, otherwise null for guest orders
    const finalUserId = session?.user?.id || userId || null

    // Create the order
    const order = await prisma.order.create({
      data: {
        userId: finalUserId,
        status: paymentInfo?.status === 'COMPLETED' ? 'CONFIRMED' : 'PENDING',
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        total: total,
        isGuestOrder: isGuestOrder || !finalUserId,
        
        // Payment Information
        paymentId: paymentInfo?.paymentId || null,
        paymentMethod: paymentInfo?.provider || null,
        paymentStatus: paymentInfo?.status === 'COMPLETED' ? 'COMPLETED' : 'PENDING',
        
        // Shipping Information
        shippingEmail: shippingInfo.email,
        shippingFirstName: shippingInfo.firstName,
        shippingLastName: shippingInfo.lastName,
        shippingAddress: shippingInfo.address,
        shippingApartment: shippingInfo.apartment || null,
        shippingCity: shippingInfo.city,
        shippingState: shippingInfo.state,
        shippingZipCode: shippingInfo.zipCode,
        shippingPhone: shippingInfo.phone,

        // Billing Information
        billingEmail: billingInfo.email,
        billingFirstName: billingInfo.firstName,
        billingLastName: billingInfo.lastName,
        billingAddress: billingInfo.address,
        billingApartment: billingInfo.apartment || null,
        billingCity: billingInfo.city,
        billingState: billingInfo.state,
        billingZipCode: billingInfo.zipCode,
        billingPhone: billingInfo.phone,

        // Order Items
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        },
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    })

    // Send confirmation email (implement email service)
    // await sendOrderConfirmationEmail(order)

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt
      }
    })

  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('id')

    if (orderId) {
      // Get specific order
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          items: {
            include: {
              product: true
            }
          },
          user: {
            select: {
              id: true,
              email: true,
              name: true
            }
          }
        }
      })

      if (!order) {
        return NextResponse.json(
          { error: 'Order not found' },
          { status: 404 }
        )
      }

      // Check if user has access to this order
      if (order.userId && order.userId !== session?.user?.id) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 403 }
        )
      }

      return NextResponse.json({ order })
    }

    // Get user's orders (only for authenticated users)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ orders })

  } catch (error) {
    console.error('Order retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve orders' },
      { status: 500 }
    )
  }
}
