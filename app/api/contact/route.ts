
export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const contactForm = await prisma.contactForm.create({
      data: {
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
        formType: 'CONTACT'
      }
    })

    return NextResponse.json({
      message: 'Contact form submitted successfully',
      id: contactForm.id
    })
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}
