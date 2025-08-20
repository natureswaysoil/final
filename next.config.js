
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_SQUARE_APPLICATION_ID: process.env.SQUARE_APPLICATION_ID,
    NEXT_PUBLIC_SQUARE_LOCATION_ID: process.env.SQUARE_LOCATION_ID,
  },
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  experimental: {
    outputFileTracingRoot: process.cwd(),
  },
}

module.exports = nextConfig
