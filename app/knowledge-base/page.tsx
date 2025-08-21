import { Metadata } from 'next'
import { KnowledgeBase } from '@/components/knowledge-base'

export const metadata: Metadata = {
  title: 'Knowledge Base - Natural Gardening Guide',
  description: 'Comprehensive guide to natural gardening techniques, organic fertilizers, soil health, and sustainable growing practices.',
  keywords: 'natural gardening, organic fertilizer guide, soil health, sustainable gardening, plant nutrition, composting, garden tips'
}

export default function KnowledgeBasePage() {
  return <KnowledgeBase />
}