
# Nature's Way Soil - Vercel Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Prerequisites
- GitHub account
- Vercel account (free)
- Your project is ready (✅ Build successful!)

### 2. Deploy to Vercel

#### Option A: Deploy via Vercel CLI (Recommended)
1. Install Vercel CLI globally:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. From your project directory, run:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - Link to existing project? **N**
   - Project name: **natures-way-soil**
   - Directory: **.**
   - Want to override settings? **N**

#### Option B: Deploy via GitHub + Vercel Dashboard
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Configure environment variables
6. Deploy!

### 3. Environment Variables Setup

Add these environment variables in Vercel dashboard:

```env
DATABASE_URL=postgresql://role_10aec7c73f:wkh6ZqPl5rMDx2HKiDwwerCZD71qAGop@db-10aec7c73f.db001.hosteddb.reai.io:5432/10aec7c73f?connect_timeout=15

NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=HLMqreZcz0hRXSbI6MsvHwVDkhEnbLqu

ABACUSAI_API_KEY=bb0aeb3883d448049932173c7f3a8890

# Square Production Configuration
SQUARE_APPLICATION_ID=sq0idp-ZI5oA8nkkuXxNkSKwq13IQ
SQUARE_LOCATION_ID=L2Q46XSB7BACQ
SQUARE_ACCESS_TOKEN=EAAAl0kTlFI5ol6LDpzUU46v3jJN54zmf5tJZ-ICoJ6BOPROf7uqAgXO1HIHZTJC
SQUARE_ENVIRONMENT=production

NEXT_PUBLIC_SQUARE_APPLICATION_ID=sq0idp-ZI5oA8nkkuXxNkSKwq13IQ
NEXT_PUBLIC_SQUARE_LOCATION_ID=L2Q46XSB7BACQ
```

### 4. Configure Square Domain Redirect

After deployment:
1. Go to your Square Dashboard
2. Navigate to "Edit site destination"
3. Select "Forward to a URL"
4. Enter your Vercel URL: `https://your-app-name.vercel.app`
5. Save changes

### 5. Custom Domain (Optional)

To use your own domain:
1. In Vercel dashboard, go to your project
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update `NEXTAUTH_URL` environment variable

## ✅ What's Included

Your website has all these features ready:
- 🛒 **E-commerce functionality** with product catalog
- 💳 **Square payment integration** (production ready)
- 🚚 **Free shipping** on all orders
- 👤 **Guest checkout** + user accounts
- 🤖 **AI gardening advisor chatbot**
- 📱 **Responsive design**
- 🔒 **Secure authentication**
- 💾 **Database integration**

## 🔧 Technical Details

- **Framework:** Next.js 14.2.28 
- **Database:** PostgreSQL (configured)
- **Payments:** Square (production credentials configured)
- **Styling:** Tailwind CSS
- **Build Status:** ✅ Builds successfully

## 🚨 Important Notes

1. **NEXTAUTH_URL**: Must be updated to your actual domain after deployment
2. **Database**: Already configured and ready
3. **Square Payments**: Production credentials are set up
4. **AI Chatbot**: Integrated and ready to provide gardening advice

## 📞 Support

If you encounter any issues during deployment, the build is confirmed working, so most issues will be configuration-related (environment variables or domain setup).
