# Environment Setup Guide - Olubadan Palace Website

## Overview
This document walks you through setting up the Olubadan Palace website to use real database data instead of simulated data.

---

## 1. Environment Variables

### What You Need to Configure

The `.env` file in the project root contains all configuration variables. **Never commit this file to git.**

```bash
# Copy the example file
cp .env.example .env
```

### Required Environment Variables

#### 1. **DATABASE_URL** (PostgreSQL Connection)
```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/olubadan?schema=public"
```

**Setup Steps:**
1. Create a PostgreSQL database named `olubadan`
2. Replace `USER` with your PostgreSQL username (e.g., `postgres`)
3. Replace `PASSWORD` with your PostgreSQL password
4. Replace `HOST` with your database server (e.g., `localhost` for local development)

**Example for local development:**
```
DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/olubadan?schema=public"
```

---

#### 2. **NEXTAUTH_SECRET** (Session Encryption)
```
NEXTAUTH_SECRET="your-super-secret-random-string-min-32-characters"
```

**Why it's needed:** Encrypts session tokens for secure authentication.

**How to generate a secure secret:**

Using Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Or on macOS/Linux:
```bash
openssl rand -base64 32
```

Or on Windows (PowerShell):
```powershell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

**Example:**
```
NEXTAUTH_SECRET="a3f5c8d9e2b7f4a1c6d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9"
```

---

#### 3. **NEXTAUTH_URL** (NextAuth Callback URL)
```
NEXTAUTH_URL="http://localhost:3000"
```

**For different environments:**
- **Local development:** `http://localhost:3000`
- **Production:** `https://yourdomain.com`

---

#### 4. **ADMIN_EMAIL** (Default Admin Account)
```
ADMIN_EMAIL="admin@olubadan-palace.local"
```

This email is used to create the initial admin user when seeding the database.

---

#### 5. **ADMIN_PASSWORD** (Default Admin Password)
```
ADMIN_PASSWORD="change-this-password"
```

⚠️ **IMPORTANT:** This is only used during database seeding. Change it in production before running the seed script.

---

#### 6. **ADMIN_API_KEY** (API Authentication)
```
ADMIN_API_KEY="local-dev-admin-key"
```

For production, generate a strong random key:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 2. Database Setup

### Prerequisites
- PostgreSQL installed and running
- Node.js and npm installed

### Setup Steps

**Step 1: Create the database**
```bash
createdb olubadan
```

**Step 2: Install dependencies**
```bash
npm install
```

**Step 3: Generate Prisma client**
```bash
npm run prisma:generate
```

**Step 4: Apply database schema**
```bash
npm run db:push
```

**Step 5: Seed initial data (creates admin user and mock content)**
```bash
npm run db:seed
```

---

## 3. Creating Users for Testing

After seeding the database, you can create additional users via the `/api/users` endpoint or directly through the database.

### Create an Admin User
```bash
# Using curl
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Palace Administrator",
    "email": "palace-admin@olubadan-palace.local",
    "password": "SecurePassword123!",
    "role": "SUPER_ADMIN",
    "positionTitle": "Chief Administrator"
  }'
```

### Create a Title Holder User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Oba Abiodun Kola-Daisi",
    "email": "otun-oba@olubadan-palace.local",
    "password": "SecurePassword123!",
    "role": "LINE_REPRESENTATIVE",
    "line": "OTUN",
    "positionTitle": "Osi Olubadan of Ibadanland"
  }'
```

---

## 4. Accessing the Portal

### Admin Console
1. Navigate to `http://localhost:3000/portal`
2. Click **"Super Admin"** button
3. Email: Your admin email (e.g., `admin@olubadan-palace.local`)
4. Password: Your admin password
5. You'll be redirected to `/admin`

### Title Holder Console
1. Navigate to `http://localhost:3000/portal`
2. Click **"Title Holder"** button
3. Email: Your title holder email
4. Password: Your title holder password
5. You'll be redirected to `/portal/dashboard`

---

## 5. Application Architecture Overview

### Three-Actor System

| Actor | Role | Access | Portal Route |
|-------|------|--------|--------------|
| **End User** | Public | View news, profiles, events | None (public site) |
| **Title Holder** | Representative | Submit/edit profile, view dashboard | `/portal/dashboard` |
| **Admin** | Super Admin | Approve profiles, manage content | `/admin` |

### Data Flow

```
User Portal Login (/portal)
    ↓
NextAuth Credentials Provider
    ↓
Validate email/password against database
    ↓
Check role (admin vs. holder)
    ↓
Route to /admin or /portal/dashboard
```

### API Endpoints

| Endpoint | Method | Purpose | Auth |
|----------|--------|---------|------|
| `/api/news` | GET | Fetch published news | None |
| `/api/news` | POST | Create news article | Admin |
| `/api/profiles` | GET | Fetch profiles by line | None |
| `/api/profile` | GET | Get authenticated user's profile | User |
| `/api/users` | POST | Create new user | Admin |
| `/api/announcements` | GET/POST | Fetch/create announcements | User/Admin |

---

## 6. Removing Simulated Data

All components now use **real database data** with fallback to mock data:

### Homepage News Section
- **File:** `src/components/LatestNewsSection.tsx`
- **Behavior:** Fetches from `/api/news`, falls back to mock data if empty
- **Status:** ✅ Live data

### News Page
- **File:** `src/components/Newspage.tsx`
- **Behavior:** Fetches from `/api/news`, falls back to mock data if API fails
- **Status:** ✅ Live data

### Ancestral Line Profiles
- **File:** `src/components/LineProfilesPage.tsx`
- **Behavior:** Fetches from `/api/profiles?line=X`
- **Status:** ✅ Live data

### Mock Data File
- **File:** `src/lib/palace-data.ts`
- **Purpose:** Fallback only when database is empty
- **When used:** During development/testing before data is added

---

## 7. Running the Application

### Development Mode
```bash
npm run dev
```
Access at `http://localhost:3000`

### Production Build
```bash
npm run build
npm run start
```

### Database Migrations
```bash
npm run db:push      # Apply schema changes
npm run db:seed      # Reset with initial data
npm run prisma:generate  # Regenerate Prisma client
```

---

## 8. Security Checklist

- [ ] Change `ADMIN_PASSWORD` before production
- [ ] Generate strong `NEXTAUTH_SECRET`
- [ ] Set `NEXTAUTH_URL` to your production domain
- [ ] Store `.env` file securely (never commit to git)
- [ ] Use environment variable service in production (AWS Secrets Manager, etc.)
- [ ] Enable HTTPS in production
- [ ] Use strong database passwords
- [ ] Enable database backups
- [ ] Add rate limiting to auth endpoints
- [ ] Use API keys for admin operations

---

## 9. Troubleshooting

### "Database connection refused"
```
ERROR: Cannot find module database
```
**Solution:** Ensure PostgreSQL is running and DATABASE_URL is correct
```bash
# Test connection
psql "postgresql://USER:PASSWORD@HOST:5432/olubadan"
```

### "NEXTAUTH_SECRET is not set"
```
ERROR: Insecure development secret used
```
**Solution:** Add NEXTAUTH_SECRET to `.env` file

### "Invalid credentials" at login
**Solutions:**
1. Verify user email exists in database
2. Ensure password is correct
3. Check user's role matches selected portal role (admin/holder)
4. Run seed script to create test users: `npm run db:seed`

### "Prisma client not generated"
```bash
npm run prisma:generate
```

---

## 10. Next Steps

After environment setup:

1. **Start development server:** `npm run dev`
2. **Visit homepage:** `http://localhost:3000`
3. **Test portal:** `http://localhost:3000/portal`
4. **Add content via admin:** `/admin` console
5. **View real data:** News page and profiles now show database content

---

## File Structure Reference

```
olubadan/
├── .env                          # Environment variables (create this)
├── .env.example                  # Template for .env
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── seed.ts                  # Initial data script
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/            # Authentication routes
│   │   │   ├── news/            # News API
│   │   │   ├── profiles/        # Profiles API
│   │   │   └── users/           # User management API
│   │   ├── portal/              # Portal login & dashboard
│   │   ├── admin/               # Admin console
│   │   └── page.tsx             # Homepage
│   ├── components/
│   │   ├── LatestNewsSection.tsx   # Homepage news (uses API)
│   │   ├── Newspage.tsx            # News page (uses API)
│   │   └── LineProfilesPage.tsx    # Profile pages (uses API)
│   ├── lib/
│   │   ├── auth.ts              # NextAuth config
│   │   ├── prisma.ts            # Prisma client
│   │   └── palace-data.ts       # Mock data (fallback)
│   └── middleware.ts            # Route protection
└── package.json                 # Dependencies
```

---

**Last Updated:** June 2, 2026  
**Status:** ✅ All systems configured for live database
