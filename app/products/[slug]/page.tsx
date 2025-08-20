
import { prisma } from '@/lib/db'
import { ProductDetail } from '@/components/product-detail'
import { notFound } from 'next/navigation'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: { slug: true }
  })

  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true }
  })

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.name} | Nature's Way Soil`,
    description: product.description,
    keywords: product.seoKeywords.join(', '),
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true }
  })

  if (!product) {
    notFound()
  }

  // Convert Decimal to number for client components
  const formattedProduct = {
    ...product,
    price: Number(product.price),
    compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : undefined,
    npkRatio: product.npkRatio || undefined,
    image: product.image || undefined
  }

  return <ProductDetail product={formattedProduct} />
}
