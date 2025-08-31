# Deploying Wonky to Vercel

## Prerequisites
- Vercel account
- GitHub repository with your code
- PostgreSQL database (Vercel Postgres recommended)

## Step 1: Set up PostgreSQL Database

### Option A: Vercel Postgres (Recommended)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Create a new project or select existing
3. Go to Storage → Create Database → Postgres
4. Choose your plan and region
5. Copy the connection string

### Option B: External PostgreSQL
- Use [Supabase](https://supabase.com) (free tier available)
- Use [Neon](https://neon.tech) (free tier available)
- Use [Railway](https://railway.app)

## Step 2: Deploy to Vercel

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   ```

2. **Deploy**
   ```bash
   # From your project directory
   vercel
   ```

3. **Set Environment Variables**
   In Vercel Dashboard → Project Settings → Environment Variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `JWT_SECRET`: Generate a secure random string
   - `EMAIL_HOST`: Your SMTP host
   - `EMAIL_PORT`: SMTP port (usually 587)
   - `EMAIL_USER`: Your email
   - `EMAIL_PASS`: Your email app password

## Step 3: Database Migration

After deployment, run database migrations:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Or run migrations if you have them
npx prisma migrate deploy
```

## Step 4: Verify Deployment

1. Check your Vercel deployment URL
2. Test the booking functionality
3. Verify database connections

## Environment Variables Reference

```env
# Required
DATABASE_URL="postgresql://username:password@host:port/database"
JWT_SECRET="your-secure-jwt-secret"

# Email (for booking confirmations)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"

# Next.js
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="https://your-domain.vercel.app"
```

## Troubleshooting

### Common Issues:
1. **Build fails**: Check if `prisma generate` runs successfully
2. **Database connection**: Verify `DATABASE_URL` is correct
3. **Environment variables**: Ensure all required vars are set in Vercel
4. **Prisma client**: Make sure `generated/prisma` is in `.gitignore`

### Local Testing:
```bash
# Test with production database
DATABASE_URL="your-prod-db-url" npm run dev

# Generate Prisma client
npx prisma generate

# Check database connection
npx prisma db pull
```

## Production Considerations

1. **Database**: Use connection pooling for production
2. **Security**: Ensure all secrets are properly set
3. **Monitoring**: Set up Vercel Analytics and monitoring
4. **Backups**: Regular database backups
5. **SSL**: Vercel provides SSL certificates automatically 