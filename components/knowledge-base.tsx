'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, BookOpen, Leaf, Droplets, Sprout, Bug, TreeDeciduous } from 'lucide-react'
import Link from 'next/link'

interface Article {
  id: string
  title: string
  category: string
  excerpt: string
  content: string
  tags: string[]
  icon: React.ElementType
  readTime: string
}

const knowledgeArticles: Article[] = [
  {
    id: '1',
    title: 'Understanding Soil pH and Plant Nutrition',
    category: 'Soil Health',
    excerpt: 'Learn how soil pH affects nutrient availability and how to optimize it for your plants.',
    content: `Soil pH is one of the most critical factors affecting plant health and nutrient uptake. Most plants prefer a slightly acidic to neutral pH between 6.0-7.0.

**Why pH Matters:**
- Controls nutrient availability
- Affects beneficial microorganism activity
- Influences soil structure
- Determines fertilizer effectiveness

**Testing Your Soil:**
Use a digital pH meter or test strips to measure soil pH. Test multiple areas of your garden as pH can vary.

**Adjusting pH:**
- Lower pH (more acidic): Use sulfur, pine needles, or organic compost
- Raise pH (less acidic): Use agricultural lime or wood ash

**Our Recommendation:**
Our humic acid concentrate helps buffer soil pH naturally while improving overall soil structure and nutrient uptake.`,
    tags: ['soil pH', 'plant nutrition', 'soil testing', 'humic acid'],
    icon: Droplets,
    readTime: '5 min'
  },
  {
    id: '2',
    title: 'The Benefits of Liquid vs. Granular Fertilizers',
    category: 'Plant Nutrition',
    excerpt: 'Discover when to use liquid fertilizers and why they can be more effective than granular options.',
    content: `Liquid fertilizers offer several advantages over granular fertilizers, especially for quick nutrient delivery and precise application.

**Advantages of Liquid Fertilizers:**
- Immediate nutrient availability
- Even distribution
- Easy absorption by roots and leaves
- Better control over application rates
- No risk of fertilizer burn when properly diluted

**When to Use Liquid Fertilizers:**
- During active growing season (spring/summer)
- For quick nutrient correction
- Container gardening
- Hydroponic systems
- When plants show nutrient deficiencies

**Application Tips:**
- Apply in early morning or late evening
- Dilute according to instructions
- Water plants before and after application
- Apply every 2-3 weeks during growing season

**Nature's Way Soil Products:**
Our liquid fertilizers are made fresh weekly and provide immediate nutrition that plants can use right away.`,
    tags: ['liquid fertilizer', 'plant feeding', 'fertilizer comparison', 'application'],
    icon: Leaf,
    readTime: '4 min'
  },
  {
    id: '3',
    title: 'Building Healthy Soil with Organic Amendments',
    category: 'Soil Health',
    excerpt: 'Transform your soil naturally with organic amendments that improve structure and fertility.',
    content: `Healthy soil is the foundation of successful gardening. Organic amendments improve soil structure, water retention, and nutrient content naturally.

**Key Organic Amendments:**

**Compost:**
- Improves soil structure
- Adds beneficial microorganisms
- Provides slow-release nutrients
- Increases water retention

**Humic Substances:**
- Enhance nutrient uptake
- Improve soil structure
- Increase water retention
- Stimulate root growth

**Biochar:**
- Long-term carbon storage
- Improves soil porosity
- Increases nutrient retention
- Supports beneficial microbes

**Seaweed Extracts:**
- Provide trace minerals
- Contain natural growth hormones
- Improve plant stress tolerance
- Enhance root development

**Application Schedule:**
- Spring: Add compost and humic amendments
- Growing season: Apply liquid amendments bi-weekly
- Fall: Incorporate organic matter for winter breakdown

**Building Soil Biology:**
Healthy soil contains billions of beneficial microorganisms that help plants absorb nutrients and fight diseases.`,
    tags: ['soil amendments', 'organic matter', 'soil biology', 'compost'],
    icon: TreeDeciduous,
    readTime: '6 min'
  },
  {
    id: '4',
    title: 'Organic Pest Control and Plant Health',
    category: 'Plant Care',
    excerpt: 'Manage pests naturally while maintaining plant health using integrated pest management.',
    content: `Healthy plants are naturally more resistant to pests and diseases. Focus on building plant health first, then address specific pest issues organically.

**Prevention First:**
- Strong, well-fed plants resist pests better
- Proper spacing improves air circulation
- Correct watering reduces fungal issues
- Healthy soil supports natural pest predators

**Beneficial Insects:**
Encourage beneficial insects by:
- Planting diverse flowers
- Avoiding broad-spectrum pesticides
- Providing habitat (beetle banks, native plants)
- Using companion planting

**Organic Control Methods:**
- Neem oil for soft-bodied insects
- Diatomaceous earth for crawling pests
- Bacillus thuringiensis for caterpillars
- Soap sprays for aphids and mites

**Plant Health Boosters:**
- Regular feeding with balanced organic fertilizers
- Kelp meal for trace minerals and plant hormones
- Compost tea for beneficial microorganisms
- Proper mulching to retain moisture

**Monitoring:**
Check plants regularly for early pest detection. Small problems are easier to manage than established infestations.`,
    tags: ['pest control', 'organic gardening', 'beneficial insects', 'plant health'],
    icon: Bug,
    readTime: '7 min'
  },
  {
    id: '5',
    title: 'Seasonal Garden Care and Fertilization Schedule',
    category: 'Garden Planning',
    excerpt: 'Plan your garden care throughout the year for optimal plant health and productivity.',
    content: `Success in gardening comes from following natural seasonal rhythms and providing plants with what they need when they need it.

**Spring (March-May):**
- Soil preparation with compost and amendments
- Begin liquid fertilizer applications as growth starts
- Plant cool-season crops
- Start regular watering schedule
- Apply pre-emergent weed control

**Summer (June-August):**
- Peak growing season requires regular feeding
- Apply liquid fertilizers every 2-3 weeks
- Deep, infrequent watering
- Mulch to retain moisture
- Monitor for pests and diseases

**Fall (September-November):**
- Reduce nitrogen, increase phosphorus and potassium
- Plant cool-season crops for fall harvest
- Collect and compost fallen leaves
- Apply slow-release organic amendments
- Prepare beds for winter

**Winter (December-February):**
- Plan next year's garden
- Order seeds and plan rotations
- Maintain tools and equipment
- Study and learn new techniques
- Indoor seed starting for early crops

**Year-Round Indoor Plants:**
- Reduce feeding in winter months
- Increase feeding during active growth
- Monitor humidity and light levels
- Rotate plants for even growth`,
    tags: ['seasonal care', 'garden planning', 'fertilization schedule', 'plant care'],
    icon: Sprout,
    readTime: '8 min'
  }
]

const categories = [...new Set(knowledgeArticles.map(article => article.category))]

export function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const filteredArticles = knowledgeArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-sage-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setSelectedArticle(null)}
              className="border-forest-600 text-forest-600 hover:bg-forest-50"
            >
              ← Back to Knowledge Base
            </Button>
          </div>
          
          <article className="bg-white rounded-lg shadow-sm border border-sage-200 p-8">
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <selectedArticle.icon className="h-5 w-5 text-forest-600" />
                <Badge variant="secondary" className="bg-sage-100 text-earth-700">
                  {selectedArticle.category}
                </Badge>
                <span className="text-sm text-earth-500">• {selectedArticle.readTime} read</span>
              </div>
              <h1 className="text-3xl font-bold text-earth-900 mb-4">{selectedArticle.title}</h1>
              <div className="flex flex-wrap gap-2">
                {selectedArticle.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="border-sage-300 text-earth-600">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="prose max-w-none">
              <div className="text-earth-700 leading-relaxed whitespace-pre-line">
                {selectedArticle.content}
              </div>
            </div>
          </article>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sage-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="h-8 w-8 text-forest-600" />
            <h1 className="text-4xl font-bold text-earth-900">Knowledge Base</h1>
          </div>
          <p className="text-xl text-earth-600 max-w-2xl mx-auto">
            Learn natural gardening techniques, soil health principles, and sustainable growing practices
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-earth-400" />
              <Input
                placeholder="Search articles, topics, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-sage-300 focus:border-forest-500"
              />
            </div>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'All' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('All')}
              className={selectedCategory === 'All' 
                ? 'bg-forest-600 hover:bg-forest-700' 
                : 'border-sage-300 text-earth-700 hover:bg-sage-50'
              }
            >
              All Articles
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? 'bg-forest-600 hover:bg-forest-700' 
                  : 'border-sage-300 text-earth-700 hover:bg-sage-50'
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="max-w-6xl mx-auto">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-earth-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-earth-600 mb-2">No articles found</h3>
              <p className="text-earth-500">Try adjusting your search terms or category filter.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Card 
                  key={article.id} 
                  className="cursor-pointer transition-all hover:shadow-md hover:scale-105 border-sage-200 bg-white"
                  onClick={() => setSelectedArticle(article)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <article.icon className="h-5 w-5 text-forest-600" />
                      <Badge variant="secondary" className="bg-sage-100 text-earth-700 text-xs">
                        {article.category}
                      </Badge>
                      <span className="text-xs text-earth-500">• {article.readTime} read</span>
                    </div>
                    <CardTitle className="text-lg leading-tight text-earth-900 line-clamp-2">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-earth-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {article.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs border-sage-300 text-earth-500">
                          {tag}
                        </Badge>
                      ))}
                      {article.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs border-sage-300 text-earth-500">
                          +{article.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <Card className="border-forest-200 bg-gradient-to-r from-forest-50 to-sage-50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-earth-900 mb-4">
                Need Personalized Advice?
              </h3>
              <p className="text-earth-600 mb-6">
                Our AI gardening assistant can provide tailored recommendations based on your specific gardening situation.
              </p>
              <Button asChild className="bg-forest-600 hover:bg-forest-700">
                <Link href="/gardening-advice">
                  Get AI Gardening Advice
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}