# GS Realty - Developer Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account
- Git

### 1. Clone & Install
```bash
cd d:\GS_Realty_website
npm install
```

### 2. Environment Setup
The `.env` file is already configured with:
```env
MONGODB_URI=mongodb+srv://gsrealty2022_db_user:...@cluster0.zvv5ehm.mongodb.net/
CLOUDINARY_CLOUD_NAME=dfwz85tgn
CLOUDINARY_API_KEY=539287851671949
CLOUDINARY_API_SECRET=wVzqlvOCgYIq7SoaoaVCr-kwfYc
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```
Visit: `http://localhost:3000`

---

## 📂 Project Structure at a Glance

```
app/
├── page.tsx              → Homepage
├── properties/           → Property listings
├── view-details/[id]/    → Property details
├── dashboard/            → Admin panel
└── api/                  → Backend APIs

components/
├── Header.tsx            → Navigation
├── Footer.tsx            → Footer
├── PropertyCard.tsx      → Property card
└── dashboard/            → Dashboard components

lib/
├── mongodb.ts            → Database connection
└── cloudinary.ts         → File uploads
```

---

## 🎯 Common Tasks

### Add a New Property
1. Go to `http://localhost:3000/dashboard`
2. Click "Properties" tab
3. Click "Add Property" button
4. Fill required fields:
   - Property Name
   - Location
   - Developer (select from dropdown)
   - Description
   - Price
   - At least 1 image
5. Click "Create Property"

### Modify Homepage Sections
Edit `app/page.tsx`:
```tsx
<Hero />              // Hero slider
<TopSellingProjects /> // Top selling section
<FindByLocations />   // Location cards
<PremiumProjects />   // Premium properties
<Testimonials />      // Customer reviews
```

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  'brand-primary': '#0f172a',    // Navy blue
  'brand-secondary': '#C5A028',  // Gold
}
```

### Add New API Endpoint
Create `app/api/[name]/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  const db = await getDatabase();
  const data = await db.collection('your_collection').find({}).toArray();
  return NextResponse.json(data);
}
```

---

## 🗄️ Database Quick Reference

### Collections
- **properties** - Property listings (main collection)
- **developers** - Developer/builder info
- **locations** - Cities/locations
- **blogs** - Blog posts
- **hero_slides** - Homepage slider
- **orders** - Customer inquiries

### Property Schema (Essential Fields)
```typescript
{
  name: string,           // Required
  description: string,    // Required
  price: number,          // Required
  developer: string,      // Required
  location: string,       // Required
  images: string[],       // Required (min 1)
  bedrooms?: number,
  bathrooms?: number,
  area?: number,
  showInTopSelling: boolean,
  showInPremium: boolean,
  showInNewlyLaunched: boolean
}
```

---

## 🎨 Styling Guide

### Use Tailwind Classes
```tsx
// Primary button
<button className="bg-brand-secondary text-white px-6 py-2 rounded-xl hover:bg-brand-secondary-dark">
  Click Me
</button>

// Premium card
<div className="premium-card p-8">
  Content
</div>

// Navy background
<div className="bg-brand-primary text-white">
  Dark section
</div>
```

### Custom Animations
Available in `globals.css`:
- `hero-text-animate` - Fade down animation
- `animate-scroll-left` - Infinite scroll
- `premium-card` - Card with hover effect
- `gradient-text` - Gradient text effect

---

## 🔌 API Endpoints Cheat Sheet

### Properties
- `GET /api/properties` - List all
- `POST /api/properties` - Create new
- `GET /api/properties/[id]` - Get one
- `PUT /api/properties/[id]` - Update
- `DELETE /api/properties/[id]` - Delete

### Developers
- `GET /api/developers` - List all
- `POST /api/developers` - Create new
- `GET /api/developers/[id]` - Get one
- `PUT /api/developers/[id]` - Update
- `DELETE /api/developers/[id]` - Delete

### Locations
- `GET /api/locations` - List all
- `POST /api/locations` - Create new
- `GET /api/locations/[id]` - Get one
- `PUT /api/locations/[id]` - Update
- `DELETE /api/locations/[id]` - Delete

### Upload
- `POST /api/upload` - Upload to Cloudinary

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
Error: MongoDB connection failed
```
**Fix:** Check `.env` file has correct `MONGODB_URI`

### Cloudinary Upload Failed
```bash
Error: Upload failed
```
**Fix:** Verify Cloudinary credentials in `.env`

### Image Not Displaying
```bash
Error: Invalid src prop
```
**Fix:** Add domain to `next.config.js`:
```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-domain.com',
    },
  ],
}
```

### Build Error
```bash
npm run build
```
Check for:
- TypeScript errors
- Missing dependencies
- Environment variables

---

## 📱 Responsive Breakpoints

```css
sm: 640px   // Small devices
md: 768px   // Tablets
lg: 1024px  // Laptops
xl: 1280px  // Desktops
2xl: 1536px // Large screens
```

Usage:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  // 1 column mobile, 2 tablet, 3 desktop
</div>
```

---

## 🔧 Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
# Connect to MongoDB Atlas via MongoDB Compass
# Connection string in .env file

# Git
git status           # Check changes
git add .            # Stage all changes
git commit -m "msg"  # Commit changes
git push             # Push to remote
```

---

## 📚 Key Files to Know

### Configuration
- `next.config.js` - Next.js config
- `tailwind.config.ts` - Tailwind config
- `tsconfig.json` - TypeScript config
- `.env` - Environment variables

### Core Files
- `app/layout.tsx` - Root layout
- `app/page.tsx` - Homepage
- `app/globals.css` - Global styles
- `lib/mongodb.ts` - Database connection
- `lib/cloudinary.ts` - File uploads

### Dashboard
- `app/dashboard/page.tsx` - Dashboard router
- `components/dashboard/PropertiesTab.tsx` - Property management (largest file)
- `components/dashboard/DevelopersTab.tsx` - Developer management
- `components/dashboard/LocationManager.tsx` - Location management

---

## 🎓 Learning Resources

### Next.js
- [Next.js Docs](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

### MongoDB
- [MongoDB Manual](https://docs.mongodb.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com/)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🚨 Important Notes

1. **Never commit `.env` file** - Contains sensitive credentials
2. **Categories system is legacy** - Use `developer` field instead
3. **Images auto-optimized** - Next.js Image component handles it
4. **Dashboard has no auth** - Add authentication before production
5. **Property counts are dynamic** - Calculated on-the-fly for locations

---

## 💡 Pro Tips

### Performance
- Use `next/image` for all images
- Lazy load heavy components
- Use `loading="lazy"` for images below fold
- Minimize API calls with proper caching

### Code Quality
- Follow TypeScript types strictly
- Use meaningful component names
- Keep components under 300 lines
- Extract reusable logic to hooks

### Database
- Always validate input server-side
- Use indexes for frequently queried fields
- Keep connection pool size optimal (currently 10)
- Handle errors gracefully

### Deployment
- Test build locally: `npm run build`
- Set all environment variables in hosting platform
- Use Vercel for easiest deployment
- Monitor MongoDB Atlas usage

---

## 🎯 Next Steps

1. **Add Authentication**
   - Install NextAuth.js
   - Protect dashboard routes
   - Add user roles

2. **Improve SEO**
   - Add meta tags to all pages
   - Create sitemap.xml
   - Add robots.txt

3. **Add Analytics**
   - Google Analytics
   - Property view tracking
   - User behavior analysis

4. **Optimize Performance**
   - Image optimization
   - Code splitting
   - Caching strategy

5. **Testing**
   - Unit tests (Jest)
   - Integration tests
   - E2E tests (Playwright)

---

## 📞 Need Help?

### Documentation
- `PROJECT_OVERVIEW.md` - Complete project documentation
- `README_DASHBOARD_SETUP.md` - Dashboard setup guide
- `CATEGORY_SUBCATEGORY_SYSTEM.md` - Category system docs
- `PROPERTY_FORM_FIELDS.txt` - Property form reference

### Debugging
1. Check browser console for errors
2. Check terminal for server errors
3. Verify environment variables
4. Test API endpoints with Postman/Thunder Client
5. Check MongoDB Atlas for data issues

---

**Happy Coding! 🚀**

*Last Updated: January 28, 2026*
