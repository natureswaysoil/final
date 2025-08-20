export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import { join } from 'path'
import { parse } from 'csv-parse/sync'

interface ProductCSV {
  Title: string
  Description: string
  Price: string
  SKU: string
  Active: string
}

interface ProductImage {
  name: string
  url: string
}

// Parse the CSV file to get products
async function getProductsFromCSV() {
  try {
    const csvPath = join(process.cwd(), 'Products (10).csv')
    const csvContent = await fs.readFile(csvPath, 'utf-8')
    
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    }) as ProductCSV[]

    return records
  } catch (error) {
    console.error('Error reading CSV file:', error)
    return []
  }
}

// Parse the image mapping file
async function getProductImages() {
  try {
    const imagePath = join(process.cwd(), 'product images for website.txt')
    const imageContent = await fs.readFile(imagePath, 'utf-8')
    
    const lines = imageContent.split('\n').filter(line => line.trim())
    const images: ProductImage[] = []
    
    lines.forEach(line => {
      const match = line.match(/^\d+\.\s*([^:]+):\s*(.+)$/)
      if (match) {
        images.push({
          name: match[1].trim(),
          url: match[2].trim()
        })
      }
    })
    
    return images
  } catch (error) {
    console.error('Error reading image mapping file:', error)
    return []
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const limit = searchParams.get('limit')

    // Get products from CSV
    const csvProducts = await getProductsFromCSV()
    const productImages = await getProductImages()

    // Filter only active products
    let filteredProducts = csvProducts.filter(product => product.Active === 'TRUE')

    // Apply search filter if provided
    if (search) {
      const searchTerm = search.toLowerCase()
      filteredProducts = filteredProducts.filter(product =>
        product.Title.toLowerCase().includes(searchTerm) ||
        product.Description.toLowerCase().includes(searchTerm) ||
        product.SKU.toLowerCase().includes(searchTerm)
      )
    }

    // Apply limit if provided
    if (limit) {
      filteredProducts = filteredProducts.slice(0, parseInt(limit))
    }

    // Transform products to match the expected format
    const formattedProducts = filteredProducts.map((product, index) => {
      const imageInfo = productImages[index] || productImages[0] // Fallback to first image
      
      return {
        id: product.SKU, // Use SKU as ID
        name: product.Title,
        description: product.Description,
        price: parseFloat(product.Price),
        compareAtPrice: null,
        sku: product.SKU,
        isActive: product.Active === 'TRUE',
        stock: 100, // Default stock level
        images: [imageInfo?.url || '/images/products/1.jpg'], // Fallback image
        category: {
          id: 'organic-fertilizers',
          name: 'Organic Fertilizers',
          slug: 'organic-fertilizers'
        },
        variants: [],
        tags: product.Title.toLowerCase().split(' ').slice(0, 3), // Generate tags from title
        seoTitle: product.Title,
        seoDescription: product.Description.substring(0, 160),
        seoKeywords: [product.Title.toLowerCase(), 'organic', 'fertilizer'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    })

    return NextResponse.json({
      products: formattedProducts,
      total: formattedProducts.length
    })

  } catch (error) {
    console.error('Error fetching CSV products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}