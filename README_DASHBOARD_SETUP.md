# Dashboard Setup Guide - MongoDB & Cloudinary Configuration

This guide explains how to set up MongoDB and Cloudinary credentials for the FD MAKAN dashboard.

## 📋 Prerequisites

1. MongoDB account (local or MongoDB Atlas)
2. Cloudinary account
3. Node.js and npm installed

## 🔧 Step 1: Install Required Packages

Run the following command to install MongoDB and Cloudinary packages:

```bash
npm install mongodb cloudinary
```

## 🔐 Step 2: Set Up Environment Variables

1. **Create `.env.local` file** in the root directory of your project:

```bash
# Copy the example file
cp .env.local.example .env.local
```

2. **Add your credentials** to `.env.local`:

```env
# MongoDB Configuration
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/fdmakan

# For MongoDB Atlas (recommended for production):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fdmakan?retryWrites=true&w=majority

# Cloudinary Configuration
# Get these from https://cloudinary.com/console
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Next.js Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# Admin Authentication (Optional)
ADMIN_SECRET_KEY=your_admin_secret_key_here
```

## 📦 Step 3: Get Your Credentials

### MongoDB Setup:

**Option A: Local MongoDB**
1. Install MongoDB locally: https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Use: `mongodb://localhost:27017/fdmakan`

**Option B: MongoDB Atlas (Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Replace `<dbname>` with `fdmakan`

### Cloudinary Setup:

1. Go to https://cloudinary.com/
2. Sign up for a free account
3. Go to Dashboard
4. Copy your:
   - Cloud Name
   - API Key
   - API Secret

## 🗄️ Step 4: Database Collections

The following collections will be created automatically when you add data:

- **properties** - Property listings
- **main_categories** - Main categories (Residential, Commercial)
- **sub_categories** - Sub categories (House, Apartment, Villa, etc.)
- **orders** - Customer enquiries/orders
- **developers** - Developer information (if needed)

## 🚀 Step 5: Test the Setup

1. Start your development server:
```bash
npm run dev
```

2. Navigate to `/dashboard` in your browser

3. Try adding a property:
   - Go to "Properties" tab
   - Click "Add Property"
   - Fill in the form
   - Submit

4. Check your MongoDB database to verify the property was saved

## 📁 File Structure

```
your-project/
├── .env.local                 # Your credentials (DO NOT COMMIT)
├── .env.local.example         # Example file (safe to commit)
├── lib/
│   ├── mongodb.ts            # MongoDB connection utility
│   └── cloudinary.ts          # Cloudinary upload utilities
└── app/
    └── api/
        ├── properties/
        │   ├── route.ts       # GET, POST properties
        │   └── [id]/
        │       └── route.ts   # GET, PUT, DELETE single property
        ├── categories/
        │   ├── main/
        │   │   └── route.ts   # Main categories CRUD
        │   └── sub/
        │       └── route.ts   # Sub categories CRUD
        └── orders/
            └── route.ts       # Orders/Enquiries
```

## 🔒 Security Notes

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Use environment variables** - Never hardcode credentials
3. **Use MongoDB Atlas** for production - More secure than local MongoDB
4. **Rotate credentials** if they're ever exposed

## 🐛 Troubleshooting

### MongoDB Connection Issues:
- Check if MongoDB is running (local) or cluster is active (Atlas)
- Verify connection string is correct
- Check firewall settings (Atlas)

### Cloudinary Upload Issues:
- Verify API credentials are correct
- Check Cloudinary dashboard for upload limits
- Ensure images are valid formats (jpg, png, webp)

### API Route Errors:
- Check server console for error messages
- Verify environment variables are loaded
- Check MongoDB and Cloudinary credentials

## 📝 Next Steps

1. Set up authentication for dashboard access
2. Add image upload functionality (file picker)
3. Implement category management UI
4. Add order management features
5. Set up production environment variables

## 💡 Tips

- Use MongoDB Atlas free tier for development
- Cloudinary free tier includes 25GB storage
- Test locally before deploying to production
- Keep backups of your database


