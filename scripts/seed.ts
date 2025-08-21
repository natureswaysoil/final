
import { PrismaClient, Prisma } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create test user with admin privileges
  const hashedPassword = await bcrypt.hash('johndoe123', 12)
  
  const testUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      name: 'John Doe',
      role: 'ADMIN'
    }
  })

  console.log('👤 Created test user:', testUser.email)

  // Create categories
  const categories = [
    {
      name: 'Liquid Fertilizers',
      slug: 'liquid-fertilizers',
      description: 'Premium organic liquid fertilizers for all plant types'
    },
    {
      name: 'Soil Amendments',
      slug: 'soil-amendments',
      description: 'Organic soil conditioners and amendments for better soil health'
    },
    {
      name: 'Potting Mixes',
      slug: 'potting-mixes',
      description: 'Specialty potting mixes for indoor and container gardening'
    },
    {
      name: 'Hydroponic Nutrients',
      slug: 'hydroponic-nutrients',
      description: 'Complete nutrition solutions for hydroponic growing systems'
    },
    {
      name: 'Soil Conditioners',
      slug: 'soil-conditioners',
      description: 'Natural soil conditioners to improve soil structure and health'
    },
    {
      name: 'Specialty Products',
      slug: 'specialty-products',
      description: 'Specialized solutions for unique gardening challenges'
    }
  ]

  for (const category of categories) {
    const createdCategory = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    })
    console.log(`📦 Created category: ${createdCategory.name}`)
  }

  // Create products
  const liquidFertilizersCategory = await prisma.category.findUnique({ where: { slug: 'liquid-fertilizers' } })
  const soilAmendmentsCategory = await prisma.category.findUnique({ where: { slug: 'soil-amendments' } })
  const pottingMixesCategory = await prisma.category.findUnique({ where: { slug: 'potting-mixes' } })
  const hydroponicNutrientsCategory = await prisma.category.findUnique({ where: { slug: 'hydroponic-nutrients' } })
  const soilConditionersCategory = await prisma.category.findUnique({ where: { slug: 'soil-conditioners' } })
  const specialtyProductsCategory = await prisma.category.findUnique({ where: { slug: 'specialty-products' } })

  const products = [
    {
      name: "Nature's Way Soil Dog Urine Neutralizer & Lawn Revitalizer – 32 oz",
      slug: "dog-urine-neutralizer",
      description: "Pet-Safe Grass Repair Spray for Yellow Spots | Odor Eliminator & Soil Reviver for Healthy Green Lawns. This natural-based formula neutralizes dog urine pH and revives grass from unsightly burn spots.",
      price: 29.99,
      categoryId: specialtyProductsCategory?.id || '',
      type: "Pet Safe Treatment",
      benefits: ["Neutralizes urine pH", "Revives grass from burn spots", "Removes odor", "Safe for pets, kids & pollinators"],
      usage: ["Mix 2 oz concentrate with 1 gallon water", "Saturate affected area thoroughly", "Water again after 24 hours for best results", "Use as preventive treatment"],
      ingredients: "Purified Water, Hydrogen Peroxide (3%), Enzyme Blend (Protease, Amylase), Natural Odor Neutralizer, Humic & Fulvic Acids, Citric Acid",
      applicationRate: "Mix 2 oz concentrate with 1 gallon of water in pump sprayer",
      size: "32 fl oz (946 mL)",
      seoKeywords: ["dog urine neutralizer", "pet lawn damage", "brown spot repair", "pet safe lawn treatment"],
      image: "/images/products/dog 32 front.jpg",
      inventory: 50
    },
    {
      name: "Nature's Way Soil Dog Urine Neutralizer & Lawn Revitalizer – 1 Gallon",
      slug: "dog-urine-neutralizer-gallon",
      description: "Pet-Safe Grass Repair for Yellow Spots | Odor Eliminator & Soil Reviver for Healthy Green Lawns. Large 1-gallon size for treating larger areas and multiple applications.",
      price: 59.99,
      categoryId: specialtyProductsCategory?.id || '',
      type: "Pet Safe Treatment",
      benefits: ["Neutralizes Urine pH", "Revives Grass & Soil Microbes", "Removes Odor", "Safe for Pets, Kids & Pollinators"],
      usage: ["Attach garden hose tightly to sprayer nozzle", "Turn on water and rotate nozzle to 'ON' position", "Apply evenly across grass areas affected by dog urine", "Turn nozzle to 'OFF' position, then turn off water"],
      ingredients: "Water, bio-based acids, soil organisms, aloe vera",
      applicationRate: "Ready to use - attach to garden hose and spray directly",
      size: "1 GALLON",
      seoKeywords: ["dog urine neutralizer", "1 gallon", "pet lawn damage", "large area treatment"],
      image: "/images/products/dog 1 gallon front.jpg",
      inventory: 30
    },
    {
      name: "Nature's Way Soil Enhanced Living Compost",
      slug: "enhanced-living-compost",
      description: "with Fermented Duckweed Extract, 20% Worm Castings, 20% Activated BioChar, 60% Weed-Free Compost – Organic Garden Soil Amendment for Root & Plant Growth",
      price: 29.99,
      categoryId: soilAmendmentsCategory?.id || '',
      type: "Living Compost",
      benefits: ["Contains 20% Worm Castings", "20% Activated BioChar", "60% Weed-Free Compost", "Fermented Duckweed Extract"],
      usage: ["Use as organic garden soil amendment", "Promotes root & plant growth", "Mix into garden beds", "Ideal for container gardening"],
      ingredients: "Fermented Duckweed Extract, 20% Worm Castings, 20% Activated BioChar, 60% Weed-Free Compost",
      applicationRate: "Follow package directions for application rates",
      size: "Bag",
      seoKeywords: ["living compost", "worm castings", "biochar", "organic soil amendment"],
      inventory: 40
    },
    {
      name: "Nature's Way Soil Liquid Bone Meal Fertilizer – 32 Ounce",
      slug: "liquid-bone-meal-fertilizer",
      description: "Organic Phosphorus & Calcium for Healthy Roots, Flowers & Fruits – Fast-Absorbing Liquid Plant Food for Vegetables, Flowers, Trees, and Shrubs. Made fresh weekly for maximum potency.",
      price: 24.99,
      categoryId: liquidFertilizersCategory?.id || '',
      type: "Organic Liquid",
      benefits: ["Promotes strong root development", "Enhances flowering and fruiting", "Provides readily available phosphorus", "Adds essential calcium"],
      usage: ["Apply during planting and early growth", "Use before flowering period", "Excellent for bulbs and perennials", "Ideal for root vegetables"],
      ingredients: "Bone Meal (Hydrolyzed): 25%, Calcium: 5%, Phosphorus (P2O5): 10%, Water: Balance",
      applicationRate: "Mix 1-2 tablespoons per gallon of water, apply every 2-3 weeks",
      npkRatio: "25-5-1",
      size: "32 fl oz",
      seoKeywords: ["liquid bone meal", "phosphorus fertilizer", "root development", "flowering fertilizer"],
      image: "/images/products/32 ounce liquid bone meal front.jpg",
      inventory: 60
    },
    {
      name: "Nature's Way Soil Liquid Bone Meal Fertilizer – 1 Gallon",
      slug: "liquid-bone-meal-fertilizer-gallon",
      description: "Organic Phosphorus & Calcium for Healthy Roots, Flowers & Fruits – Fast-Absorbing Liquid Plant Food for Vegetables, Flowers, Trees, and Shrubs. Large 1-gallon size for gardens and landscaping.",
      price: 39.99,
      categoryId: liquidFertilizersCategory?.id || '',
      type: "Organic Liquid",
      benefits: ["Promotes strong root development", "Enhances flowering and fruiting", "Provides readily available phosphorus", "Adds essential calcium"],
      usage: ["Apply during planting and early growth", "Use before flowering period", "Excellent for bulbs and perennials", "Ideal for root vegetables"],
      ingredients: "Bone Meal (Hydrolyzed): 25%, Calcium: 5%, Phosphorus (P2O5): 10%, Water: Balance",
      applicationRate: "Mix 1-2 tablespoons per gallon of water, apply every 2-3 weeks",
      npkRatio: "25-5-1",
      size: "1 Gallon",
      seoKeywords: ["liquid bone meal", "1 gallon", "phosphorus fertilizer", "root development"],
      image: "/images/products/bone meal 1 gaallon front.jpg",
      inventory: 25
    },
    {
      name: "Nature's Way Soil® Liquid Biochar with Kelp, Humic & Fulvic Acid – 1 Gallon",
      slug: "liquid-biochar-humates",
      description: "Organic Soil Conditioner for Plants, Gardens & Lawns – Boost Microbes & Nutrient Retention. Contains Kelp, Humic & Fulvic Acid with Activated Biochar for superior soil health.",
      price: 89.99,
      categoryId: soilConditionersCategory?.id || '',
      type: "Biochar Conditioner",
      benefits: ["Organic Ingredients", "Contains Kelp, Humic & Fulvic Acid", "Activated Biochar", "Made Fresh Weekly • Shelf Life: One Year"],
      usage: ["Shake well before use", "Apply at rate f 2-4 oz per gallon of water every 4-6 weeks", "Mix solution thoroughly before application", "Suitable for gardens, lawns, composting, and landscape plantings"],
      ingredients: "Water, Activated Biochar, Cold-Processed Kelp Extract, Liquid Humic Acid, Liquid Fulvic Acid, Organic Aloe Vera, Organic Molasses, Calcium Sorbate, Citric Acid",
      applicationRate: "Shake well before use. Apply at a rate f 2-4 oz per gallon of water every 4-6 weeks, or as needed",
      size: "1 GALLON",
      seoKeywords: ["liquid biochar", "soil conditioner", "humic acid", "kelp extract"],
      image: "/images/products/liquid biochar 1 gallon front.jpg",
      inventory: 20
    },
    {
      name: "Nature's Way Soil® Liquid Humic & Fulvic Acid – 32 oz",
      slug: "liquid-humic-fulvic-acid",
      description: "Soil Conditioner with Organic Kelp – Boosts Root Growth, Water Retention & Microbial Activity – Natural Lawn & Garden Supplement – Pet-Safe. Improves nutrient uptake and revitalizes soil biology.",
      price: 19.99,
      categoryId: soilConditionersCategory?.id || '',
      type: "Liquid Conditioner",
      benefits: ["Improves nutrient uptake", "Revitalizes soil biology", "Builds stronger root systems", "Organic & pet-safe"],
      usage: ["Mix with water and apply to lawns, plants & gardens", "Use rates: Gardens 2 fl oz per gallon of water", "Lawns: 1/2 fl oz per gallon of water", "Indoor plants: 0.5-1 oz per gallon"],
      ingredients: "Humic Acids 6.0%. Derived from Leonardite.",
      applicationRate: "Mix 2 fl oz per gallon of water; Lawn 1/2 fl oz per gallon of water",
      size: "32 oz (946 mL)",
      seoKeywords: ["humic acid", "fulvic acid", "nutrient uptake", "soil conditioner"],
      image: "/images/products/humic 32 ounce front.jpg",
      inventory: 45
    },
    {
      name: "Nature's Way Soil Liquid Humic & Fulvic Acid with Organic Kelp – 1 Gallon",
      slug: "liquid-humic-fulvic-acid-gallon",
      description: "Concentrate, Natural Soil Conditioner, Plant Growth Stimulator. Liquid humic and fulvic acids with organic kelp for enhanced plant nutrition and soil health.",
      price: 39.99,
      categoryId: soilConditionersCategory?.id || '',
      type: "Liquid Conditioner",
      benefits: ["Natural Soil Conditioner", "Stimulates Plant Growth & Nutrient Uptake", "Improves Root Development", "Contains organic kelp"],
      usage: ["Mix with water and apply to lawns, plants & gardens", "Suitable for gardens, lawns, composting, and landscape plantings", "Feed lawn or garden monthly during growing season", "Use mixed solution to water indoor plants"],
      ingredients: "Concentrated Humic and Fulvic Acids with Organic Kelp Extract",
      applicationRate: "Mix 2 fl oz per gallon of water; Lawn 1/2 fl oz per gallon of water",
      size: "1 Gallon",
      seoKeywords: ["humic acid", "fulvic acid", "1 gallon", "soil conditioner", "plant growth stimulator"],
      image: "/images/products/humic 2.5 gallon front.jpg",
      inventory: 30
    },
    {
      name: "Nature's Way Soil® Seaweed & Humic Acid Lawn Treatment – 32 oz",
      slug: "seaweed-humic-acid-lawn-treatment",
      description: "Organic Super Seaweed Humic Acid Blend - Liquid Sea Kelp for Grass and Plants. Natural Lawn & Garden Concentrate with Soil Hume for Simple Grow Solutions. Made Fresh Weekly with Organic Ingredients Safe for Pets.",
      price: 22.99,
      categoryId: liquidFertilizersCategory?.id || '',
      type: "Organic Seaweed",
      benefits: ["Soil Hume - Simple Grow Solutions", "Natural Lawn & Garden Concentrate", "Use with Fertilizer Program", "Made Fresh Weekly - Organic Ingredients Safe for Pets"],
      usage: ["Shake Well Before Use", "Plants: Mix 2-4 Tbs in gallon sprayer, apply every 1-2 weeks", "Lawns: Mix 6-8 oz/gal water, cover 1,000 sq ft", "Soil: Mix 6 oz in 1-2 gal water, drench soil before planting"],
      ingredients: "Kelp Extract (Ascophyllum nodosum), Humic Acid derived from Leonardite, Total Nitrogen (N), Soluble Potash (K2O): 0.2%, Soluble organic nitrogen: 0.2%, Water-soluble potassium: 7.0%",
      applicationRate: "Plants: 2-4 Tbs per gallon; Lawns: 6-8 oz per gallon; Soil: 6 oz in 1-2 gal water",
      size: "32 ounces",
      seoKeywords: ["seaweed fertilizer", "humic acid", "kelp fertilizer", "lawn treatment"],
      image: "/images/products/seaweed front.jpg",
      inventory: 35
    },
    {
      name: "Nature's Way Soil® Orchid & African Violet Potting Mix",
      slug: "orchid-african-violet-potting-mix",
      description: "Premium Coco Coir, Worm Castings, Activated Biochar & Perlite | Lightweight, Nutrient-Rich Indoor Plant Blend",
      price: 29.99,
      categoryId: pottingMixesCategory?.id || '',
      type: "Specialty Mix",
      benefits: ["Premium Coco Coir base", "Contains Worm Castings", "Activated Biochar included", "Lightweight & Nutrient-Rich"],
      usage: ["Ideal for orchids and African violets", "Perfect for indoor plants", "Use for repotting specialty plants", "Excellent for container gardening"],
      ingredients: "Premium Coco Coir, Worm Castings, Activated Biochar, Perlite",
      applicationRate: "Use as primary potting medium, refresh as needed",
      size: "Bag",
      seoKeywords: ["orchid potting mix", "african violet soil", "coco coir", "specialty potting mix"],
      image: "/images/products/orchid-potting-mix.jpg",
      inventory: 25
    },
    {
      name: "Nature's Way Soil® Liquid Kelp Fertilizer – 1 Gallon",
      slug: "liquid-kelp-fertilizer-gallon",
      description: "Makes 1890 Gallons | Organic Seaweed Plant Food for Lawn, Garden, Flowers & Vegetables | Cold-Processed | Natural Growth Booster & Soil Revitalizer",
      price: 34.99,
      categoryId: liquidFertilizersCategory?.id || '',
      type: "Organic Seaweed",
      benefits: ["Makes 1890 Gallons of solution", "Cold-Processed for maximum potency", "Natural Growth Booster", "Soil Revitalizer"],
      usage: ["Use on lawn, garden, flowers & vegetables", "Apply throughout growing season", "Mix according to directions", "Perfect for organic gardening"],
      ingredients: "Cold-Processed Organic Seaweed Extract (Kelp)",
      applicationRate: "Follow package directions for dilution rates",
      size: "1 Gallon",
      seoKeywords: ["liquid kelp fertilizer", "seaweed fertilizer", "organic plant food", "cold processed kelp"],
      image: "/images/products/1 gallon kelp front.jpg",
      inventory: 40
    },
    {
      name: "Nature's Way Soil® Liquid Kelp Fertilizer – 32 Ounce",
      slug: "liquid-kelp-fertilizer-32oz",
      description: "Organic Seaweed Plant Food for Lawn, Garden, Flowers & Vegetables | Cold-Processed | Natural Growth Booster & Soil Revitalizer",
      price: 24.99,
      categoryId: liquidFertilizersCategory?.id || '',
      type: "Organic Seaweed",
      benefits: ["Cold-Processed for maximum potency", "Natural Growth Booster", "Soil Revitalizer", "Organic Seaweed Plant Food"],
      usage: ["Use on lawn, garden, flowers & vegetables", "Apply throughout growing season", "Mix according to directions", "Perfect for organic gardening"],
      ingredients: "Cold-Processed Organic Seaweed Extract (Kelp)",
      applicationRate: "Follow package directions for dilution rates",
      size: "32 Ounce",
      seoKeywords: ["liquid kelp fertilizer", "seaweed fertilizer", "32 ounce", "cold processed kelp"],
      image: "/images/products/liquid kelp 32 front.jpg",
      inventory: 50
    },
    {
      name: "Nature's Way Soil Organic Hydroponic Fertilizer Concentrate",
      slug: "organic-hydroponic-fertilizer-concentrate",
      description: "Made Fresh Weekly-32 oz – Makes 512 Gallons of Nutrient Solution – Organic Plant Food for Hydroponic Systems, Aquaponics",
      price: 25.99,
      categoryId: hydroponicNutrientsCategory?.id || '',
      type: "Concentrate",
      benefits: ["Makes 512 Gallons of nutrient solution", "Made Fresh Weekly", "Organic Plant Food", "For Hydroponic Systems & Aquaponics"],
      usage: ["Perfect for hydroponic systems", "Use in aquaponics setups", "Dilute according to directions", "Apply throughout growing cycle"],
      ingredients: "Organic hydroponic nutrient concentrate",
      applicationRate: "Follow package directions for dilution rates",
      size: "32 fl oz concentrate",
      seoKeywords: ["hydroponic fertilizer", "aquaponics nutrients", "organic concentrate", "hydroponic plant food"],
      image: "/images/products/hydroponic-fertilizer-32oz.jpg",
      inventory: 30
    },
    {
      name: "Nature's Way Soil All-Natural Wood Compost",
      slug: "all-natural-wood-compost",
      description: "Organic Mulch and Soil Amendment, No Manure, 25 lb Bag",
      price: 39.99,
      categoryId: soilAmendmentsCategory?.id || '',
      type: "Wood Compost",
      benefits: ["All-Natural Wood Compost", "Organic Mulch and Soil Amendment", "No Manure", "25 lb Bag"],
      usage: ["Use as organic mulch", "Apply as soil amendment", "Perfect for garden beds", "Ideal for landscaping"],
      ingredients: "All-Natural Wood Compost (No Manure)",
      applicationRate: "Apply 2-4 inches thick for mulching",
      size: "25 lb Bag",
      seoKeywords: ["wood compost", "organic mulch", "soil amendment", "no manure compost"],
      image: "/images/products/wood compost frony.jpg",
      inventory: 20
    }
  ]

  for (const product of products) {
    const createdProduct = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        ...product,
        price: new Prisma.Decimal(product.price)
      }
    })
    console.log(`🌿 Created product: ${createdProduct.name}`)
  }

  console.log('✅ Seeding completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
