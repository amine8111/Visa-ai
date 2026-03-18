# VisaAI - Deployment Guide

## Prerequisites
- Node.js 18+
- npm or yarn
- GitHub account (for Vercel deployment)

---

## Part 1: Supabase Setup

### Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Click "New Project"
3. Enter project details:
   - **Name**: visa-ai
   - **Database Password**: [create a strong password]
   - **Region**: Choose closest to your users
4. Click "Create new project" (wait 2-3 minutes for setup)

### Step 2: Get Credentials
1. In Supabase dashboard, go to **Settings** (⚙️) → **API**
2. Copy:
   - **Project URL** (e.g., https://xyzabc.supabase.co)
   - **anon public** key (under "Project API keys")

### Step 3: Run Database Schema
1. In Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `supabase/schema.sql`
3. Paste and click **Run**

### Step 4: Add Environment Variables
Create `.env` file in project root:
```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

---

## Part 2: Web Deployment (Vercel)

### Option A: Deploy from CLI
```bash
npm i -g vercel
vercel login
vercel
```

### Option B: Deploy from GitHub
1. Push code to GitHub
2. Go to https://vercel.com
3. Import repository
4. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy

---

## Part 3: Mobile App (Expo)

### Step 1: Install Expo
```bash
npm install -g expo-cli
```

### Step 2: Create Expo Project
```bash
cd visa-ai
npx create-expo-app@latest VisaAIMobile
cd VisaAIMobile
```

### Step 3: Copy Web Code
Copy the `src` folder from web project to mobile project and adapt components for React Native.

### Step 4: Run on Device
```bash
npx expo start
```

### Step 5: Build Native Apps
```bash
# Android
npx expo run:android

# iOS (macOS only)
npx expo run:ios
```

---

## Part 4: Production Builds

### Web (Vercel)
- Automatic deployments on git push
- Free tier: 100GB bandwidth/month

### Android (Google Play)
```bash
npx expo prebuild
cd android
./gradlew assembleRelease
```

### iOS (App Store)
```bash
npx expo prebuild
cd ios
xcodebuild -workspace VisaAI.xcworkspace -scheme VisaAI -configuration Release archive
```

---

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| VITE_SUPABASE_URL | Supabase project URL | Yes |
| VITE_SUPABASE_ANON_KEY | Supabase anon key | Yes |

---

## Troubleshooting

### Supabase Connection Issues
- Verify URL and key are correct
- Check RLS policies in Supabase dashboard
- Ensure database tables were created

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Update dependencies: `npm update`

### Mobile Build Issues
- Run `npx expo install --fix` to fix native dependencies
- Ensure Java JDK 17+ is installed for Android

---

## Support
- Supabase Docs: https://supabase.com/docs
- Vercel Docs: https://vercel.com/docs
- Expo Docs: https://docs.expo.dev
