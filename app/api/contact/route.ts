
export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save to existing Prisma database
    const contactForm = await prisma.contactForm.create({
      data: {
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
        formType: 'CONTACT'
      }
    })

    // Also save to Supabase
    try {
      const { error: supabaseError } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name,
            email,
            subject: subject || 'General Inquiry',
            message,
            form_type: 'contact',
            status: 'new'
          }
        ])

      if (supabaseError) {
        console.error('Supabase contact form submission failed:', supabaseError)
      }
    } catch (supabaseError) {
      console.error('Supabase contact form submission failed:', supabaseError)
      // Don't fail the request if Supabase fails
    }

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
