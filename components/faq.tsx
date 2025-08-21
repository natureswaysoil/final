
'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(0)

  const faqs = [
    {
      question: "How often should I apply liquid fertilizers?",
      answer: "Most of our liquid fertilizers should be applied every 2-3 weeks during the growing season. However, application frequency can vary based on the specific product and your plants' needs. Always follow the instructions on the product label and adjust based on your plants' response."
    },
    {
      question: "Are your products safe for pets and children?",
      answer: "Yes! All our organic fertilizers and soil amendments are made from natural, organic ingredients and are safe for pets, children, and beneficial insects when used as directed. Our Dog Urine Neutralizer is specifically formulated to be pet-safe."
    },
    {
      question: "What makes your products different from store-bought fertilizers?",
      answer: "Our products are made fresh weekly with premium organic ingredients, ensuring maximum potency and effectiveness. Unlike mass-produced fertilizers that may sit on shelves for months, our fresh formulations provide superior nutrition for your plants."
    },
    {
      question: "Can I use your products for both indoor and outdoor plants?",
      answer: "Absolutely! Our liquid fertilizers and soil conditioners work excellent for both indoor houseplants and outdoor gardens. We also offer specialized products like our Orchid & African Violet Potting Mix for specific indoor plant needs."
    },
    {
      question: "Do you ship nationwide?",
      answer: "Yes, we ship our products nationwide with FREE shipping on all orders! Delivery times vary by location and product size. Liquid products are carefully packaged to prevent leaks during transit."
    },
    {
      question: "How long do your products last once opened?",
      answer: "Our liquid fertilizers typically have a shelf life of one year when stored properly in a cool, dry place. Because we make them fresh weekly, you're getting products with maximum remaining shelf life and potency."
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get answers to common questions about our organic fertilizers and soil amendments
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 last:border-b-0">
              <button
                className="w-full py-4 text-left flex justify-between items-center hover:bg-gray-50 px-4 rounded-lg"
                onClick={() => setOpenItem(openItem === index ? null : index)}
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {openItem === index ? (
                  <ChevronUp className="h-5 w-5 text-green-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openItem === index && (
                <div className="px-4 pb-4">
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
