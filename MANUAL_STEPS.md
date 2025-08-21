
# 🚀 Manual Steps You Need to Complete

I've prepared everything I can for you! Here's what you need to do:

## ✅ Already Done For You:
- ✅ Vercel CLI installed
- ✅ Project configured for deployment  
- ✅ All files prepared
- ✅ Build verified successful

## 👤 Steps You Need to Do (5 minutes):

### Step 1: Login to Vercel
```bash
cd /home/ubuntu/natures_way_soil_website/app
vercel login
```
- This will open a browser window
- Login with your email or GitHub account
- Come back to terminal when done

### Step 2: Deploy Your Website
```bash
vercel --prod
```
- Follow the prompts:
  - Project name: **natures-way-soil** (or whatever you prefer)
  - Directory: **.** (current directory)
  - Override settings? **No**

### Step 3: Copy Your New URL
After deployment, you'll get a URL like:
```
https://natures-way-soil-abc123.vercel.app
```
**Save this URL - you'll need it!**

### Step 4: Add Environment Variables in Vercel
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your project
3. Go to "Settings" → "Environment Variables"
4. Add each of these (I'll provide the exact values):

```
DATABASE_URL = postgresql://role_10aec7c73f:wkh6ZqPl5rMDx2HKiDwwerCZD71qAGop@db-10aec7c73f.db001.hosteddb.reai.io:5432/10aec7c73f?connect_timeout=15

NEXTAUTH_URL = [YOUR VERCEL URL FROM STEP 3]
NEXTAUTH_SECRET = HLMqreZcz0hRXSbI6MsvHwVDkhEnbLqu
ABACUSAI_API_KEY = bb0aeb3883d448049932173c7f3a8890

SQUARE_APPLICATION_ID = sq0idp-ZI5oA8nkkuXxNkSKwq13IQ
SQUARE_LOCATION_ID = L2Q46XSB7BACQ
SQUARE_ACCESS_TOKEN = EAAAl0kTlFI5ol6LDpzUU46v3jJN54zmf5tJZ-ICoJ6BOPROf7uqAgXO1HIHZTJC
SQUARE_ENVIRONMENT = production

NEXT_PUBLIC_SQUARE_APPLICATION_ID = sq0idp-ZI5oA8nkkuXxNkSKwq13IQ
NEXT_PUBLIC_SQUARE_LOCATION_ID = L2Q46XSB7BACQ
```

5. Click "Save" after adding all variables
6. Click "Redeploy" to apply the changes

### Step 5: Update Square Domain Forwarding
1. Go to your Square Dashboard
2. Find "Edit site destination" (like in your screenshot)
3. Select "Forward to a URL"
4. Enter your Vercel URL from Step 3
5. Click "Save"

## 🎉 That's It!

Your website will be live with:
- ✅ Full e-commerce functionality
- ✅ Square payments working
- ✅ AI gardening chatbot
- ✅ Free shipping on all orders
- ✅ Mobile responsive design

Let me know if you need help with any of these steps!
