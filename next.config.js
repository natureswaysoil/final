
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SQUARE_APPLICATION_ID: process.env.SQUARE_APPLICATION_ID,
    NEXT_PUBLIC_SQUARE_LOCATION_ID: process.env.SQUARE_LOCATION_ID,
  },
  images: {
    domains: ['localhost'],
  },
  experimental: {
    outputFileTracingRoot: process.cwd(),
  },
}

module.exports = nextConfig
