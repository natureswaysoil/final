
#!/bin/bash

echo "🚀 Nature's Way Soil - Vercel Deployment Script"
echo "================================================"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "🔑 Please make sure you're logged into Vercel..."
vercel login

echo "🏗️ Building and deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to your Vercel dashboard to get your deployment URL"
echo "2. Update your Square domain forwarding to point to the new URL"
echo "3. Update NEXTAUTH_URL environment variable if needed"
echo ""
echo "🌐 Your Nature's Way Soil website is now live!"
