# ☁️ Cloud Sharing Platform

A modern, full-stack cloud file-sharing platform with OAuth authentication, real-time analytics, and seamless file management. Built with Next.js 16, NextAuth.js, MongoDB, and UploadThing.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🔐 Authentication

- **OAuth Integration** - Sign in with Google or GitHub
- **Session Management** - Secure authentication with NextAuth.js
- **Protected Routes** - Auth-required dashboard and file management

### 📤 File Management

- **Drag & Drop Upload** - Intuitive file upload with UploadThing (16MB limit)
- **Public by Default** - Files are public by default, toggle to private
- **Image Previews** - Automatic thumbnails for image files
- **Inline Renaming** - Edit file names with smooth animations
- **One-Click Download** - Force download through server proxy

### 🔗 Sharing & Access

- **Unique Slug URLs** - Every file gets a shareable `/file/[slug]` URL
- **Clipboard Sharing** - Copy public links with one click
- **Public File Pages** - Beautiful landing pages for shared files
- **Privacy Toggle** - Switch between public/private with eye icon

### 📊 Analytics Dashboard

- **Real-time Stats** - Total downloads, unique visitors, public file count
- **Visual Charts** - Colorful gradient bar charts with Recharts
- **File Leaderboard** - Top 5 most downloaded files
- **Sortable Table** - Click headers to sort by name, downloads, visitors, date
- **Download Tracking** - Automatic increment on every download

### 🎨 Modern UI/UX

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Framer Motion** - Smooth page transitions and animations
- **ShadCN Components** - Beautiful, accessible UI components
- **Custom Animations** - fade-in-up, bounce-slow, pulse-scale effects
- **Toast Notifications** - Real-time feedback for all actions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (free tier works)
- UploadThing account
- Google/GitHub OAuth credentials (optional)

### 1️⃣ Clone & Install

```bash
git clone https://github.com/Pratham-Prog861/cloud-sharing-platform.git
cd cloud-sharing-platform
npm install
```

### 2️⃣ Environment Setup

Create `.env.local` file:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority

# UploadThing (SDK v7+ uses UPLOADTHING_TOKEN only)
UPLOADTHING_TOKEN=your_uploadthing_token_here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here  # Generate: openssl rand -base64 32

# Google OAuth (Get from https://console.cloud.google.com/)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth (Get from https://github.com/settings/developers)
GITHUB_ID=your_github_oauth_app_id
GITHUB_SECRET=your_github_oauth_app_secret

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3️⃣ Run Development Server

```bash
npm run dev
```

Visit **http://localhost:3000** 🎉

### 4️⃣ OAuth Setup (Required)

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project → Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
5. Copy Client ID and Secret to `.env.local`

#### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create new OAuth App
3. Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Secret to `.env.local`

## 🛠️ Tech Stack

| Category           | Technology                             |
| ------------------ | -------------------------------------- |
| **Framework**      | Next.js 16.0.3 (App Router, Turbopack) |
| **Language**       | TypeScript 5                           |
| **Authentication** | NextAuth.js 4.24.13                    |
| **Database**       | MongoDB Atlas + Mongoose 8.20.0        |
| **File Storage**   | UploadThing SDK v7.7.4                 |
| **Styling**        | TailwindCSS 4 + ShadCN UI              |
| **Animations**     | Motion (Framer Motion) 12.23.24        |
| **Charts**         | Recharts 3.4.1                         |
| **Forms**          | React Hot Toast, React Dropzone        |
| **State**          | React Query (TanStack Query)           |

## 📁 Project Structure

```bash
cloud-sharing-platform/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/    # NextAuth configuration
│   │   │   ├── files/                  # File CRUD operations
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── route.ts       # GET, PATCH, DELETE file
│   │   │   │   │   └── download/      # GET download with proxy
│   │   │   │   ├── slug/[slug]/       # GET public file by slug
│   │   │   │   └── route.ts           # GET all files, POST create
│   │   │   └── uploadthing/
│   │   │       ├── core.ts            # UploadThing file router
│   │   │       └── route.ts           # UploadThing handlers
│   │   ├── auth/
│   │   │   └── signin/                # OAuth sign-in page
│   │   ├── dashboard/                  # Main dashboard (auth required)
│   │   ├── analytics/                  # Analytics page (auth required)
│   │   ├── file/[slug]/               # Public file view page
│   │   ├── layout.tsx                 # Root layout with SessionProvider
│   │   ├── page.tsx                   # Landing page with features
│   │   └── globals.css                # Global styles + animations
│   ├── components/
│   │   ├── ui/                        # ShadCN components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   └── table.tsx
│   │   ├── FileCard.tsx               # File card with actions
│   │   ├── FileUpload.tsx             # Upload component with dropzone
│   │   └── SessionProvider.tsx        # NextAuth client provider
│   ├── lib/
│   │   ├── db.ts                      # MongoDB connection
│   │   ├── file-model.ts              # Mongoose File schema
│   │   ├── helpers.ts                 # Utility functions
│   │   ├── uploadthing.ts             # UploadThing utilities
│   │   └── utils.ts                   # Common utilities
│   ├── types/
│   │   └── next-auth.d.ts             # NextAuth type definitions
│   └── models/
│       └── File.ts                    # Re-export of file model
├── public/                            # Static assets
├── .env.local                         # Environment variables (gitignored)
├── next.config.ts                     # Next.js config + Image domains
├── tsconfig.json                      # TypeScript configuration
├── tailwind.config.ts                 # Tailwind configuration
└── package.json                       # Dependencies
```

## 🎯 Key Routes

| Route                      | Type      | Description                                 |
| -------------------------- | --------- | ------------------------------------------- |
| `/`                        | Public    | Landing page with features, CTA, animations |
| `/auth/signin`             | Public    | OAuth sign-in page (Google/GitHub)          |
| `/dashboard`               | Protected | File upload & management interface          |
| `/analytics`               | Protected | Analytics dashboard with charts             |
| `/file/[slug]`             | Public    | Public file view & download page            |
| `/api/auth/[...nextauth]`  | API       | NextAuth authentication handlers            |
| `/api/files`               | API       | GET all files, POST create file             |
| `/api/files/[id]`          | API       | GET, PATCH, DELETE specific file            |
| `/api/files/[id]/download` | API       | GET file with forced download               |
| `/api/uploadthing`         | API       | UploadThing upload handlers                 |

## 🔧 Configuration Details

### MongoDB Schema (File Model)

```typescript
{
  name: string; // File name
  size: number; // File size in bytes
  type: string; // MIME type
  url: string; // UploadThing CDN URL
  slug: string; // Unique slug for public URLs
  isPublic: boolean; // Default: true
  downloads: number; // Download count
  visitors: number; // Visitor count
  userId: string; // Owner's ID
  userEmail: string; // Owner's email
  createdAt: Date; // Upload timestamp
}
```

### Next.js 16 Dynamic Routes

All API routes with `[id]` or `[slug]` params use Next.js 16's Promise pattern:

```typescript
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // Must await params
  // ...
}
```

### UploadThing Configuration

- **Version**: SDK v7+ (uses `UPLOADTHING_TOKEN` only, not separate SECRET/APP_ID)
- **Max File Size**: 16MB for all file types
- **Allowed Types**: Images, videos, PDFs, text, audio
- **CDN**: Files hosted on `utfs.io` (configured in `next.config.ts`)

### Download Proxy

Files are downloaded through `/api/files/[id]/download` to force download instead of opening in browser:

```typescript
// Server fetches from UploadThing
const response = await fetch(file.url);
const fileData = await response.arrayBuffer();

// Return with Content-Disposition: attachment
return new NextResponse(fileData, {
  headers: {
    "Content-Disposition": `attachment; filename="${file.name}"`,
  },
});
```

## 🚨 Troubleshooting

### Authentication Issues

**Problem**: "Configuration error" on sign-in  
**Solution**:

- Verify `NEXTAUTH_SECRET` is set (generate with `openssl rand -base64 32`)
- Check OAuth callback URLs match exactly
- Ensure `NEXTAUTH_URL` matches your domain

### Upload Failures

**Problem**: Files not uploading to UploadThing  
**Solution**:

- Verify `UPLOADTHING_TOKEN` is correct
- Check file size is under 16MB
- Clear browser cache and try again
- Check UploadThing dashboard for errors

### MongoDB Connection

**Problem**: "MongoServerError: Authentication failed"  
**Solution**:

- Verify connection string format: `mongodb+srv://username:password@cluster...`
- Check username/password for special characters (URL encode them)
- Whitelist your IP in MongoDB Atlas Network Access
- Ensure database user has read/write permissions

### Next.js Image Error

**Problem**: "Invalid src prop...hostname utfs.io is not configured"  
**Solution**: Already fixed - `next.config.ts` includes:

```typescript
images: {
  remotePatterns: [{ protocol: "https", hostname: "utfs.io" }];
}
```

### Download Opens in New Tab

**Problem**: Files open instead of downloading  
**Solution**: Already fixed - using server proxy with `Content-Disposition: attachment` header

## 📊 Analytics Features

### Stats Cards

- **Total Downloads**: Across all files
- **Total Visitors**: Unique page views on `/file/[slug]` routes
- **Public Files**: Count of files with `isPublic: true`

### Chart Visualization

- **Top 5 Files**: Most downloaded files with gradient bars
- **Color Coded**: Each file gets unique color (Indigo, Violet, Pink, Amber, Emerald)
- **Interactive**: Hover tooltips with download counts
- **Responsive**: Adjusts to screen size

### File Table

- **Sortable Columns**: Click headers to sort
- **Full Details**: Name, downloads, visitors, status, date, size
- **Status Badges**: Green for public, gray for private

## 🌟 Key Achievements

✅ **OAuth Authentication** - Google & GitHub sign-in working  
✅ **File Upload** - UploadThing integration with 16MB limit  
✅ **Public/Private Toggle** - Default public, can toggle to private  
✅ **Share Functionality** - Clipboard copy with toast feedback  
✅ **Download Tracking** - Automatic increment on downloads  
✅ **Analytics Dashboard** - Beautiful charts with Recharts  
✅ **Next.js 16 Compatible** - All routes use Promise params  
✅ **Image CDN Support** - UploadThing images load properly  
✅ **Forced Downloads** - Server proxy prevents browser opening files  
✅ **Responsive Design** - Mobile, tablet, desktop support  
✅ **Animations** - Smooth transitions with Framer Motion

## 🎉 Deployment

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Environment Variables** (add in Vercel dashboard):

- `MONGODB_URI`
- `UPLOADTHING_TOKEN`
- `NEXTAUTH_URL` (set to your production domain)
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`
- `GITHUB_ID` & `GITHUB_SECRET`
- `NEXT_PUBLIC_APP_URL` (your production domain)

**Update OAuth Redirect URIs**:

- Google: `https://yourdomain.com/api/auth/callback/google`
- GitHub: `https://yourdomain.com/api/auth/callback/github`

### Build Command

```bash
npm run build
```

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Vercel** - Hosting and UploadThing service
- **MongoDB** - Database solution
- **ShadCN** - Beautiful UI components
- **Framer Motion** - Smooth animations

---

**Built with ❤️ using Next.js 16, NextAuth.js, MongoDB, and UploadThing**

_For issues or questions, please check the troubleshooting section above._
