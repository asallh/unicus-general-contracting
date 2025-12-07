<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
<img src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
<img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" />
<img src="https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white" />
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white" />
<img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
<img src="https://img.shields.io/badge/pnpm-yellow?style=for-the-badge&logo=pnpm&logoColor=white" />


# Unicus General Contracting

This project contains the marketing site of Unicus General Contracting as well as the Admin Portal.

## Tech Stack

### Marketing Page (Client Web)

- **T3 Stack**
  - Next.js 15
  - tRPC
  - TypeScript
  - Prisma
  - Supabase (PostgreSQL)
  - Tailwind CSS

### Admin Portal (Admin Mobile)

- React Native
- Expo
- tRPC
- TypeScript

### Shared

- Monorepo structure (pnpm workspaces + Turbo)
- Shared API package with tRPC and Prisma

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **pnpm** (v10.18.1) - Install with `npm install -g pnpm@10.18.1`
- **Expo CLI** (for mobile development) - Install with `npm install -g expo-cli`
- **Supabase account** (for database hosting)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd unicus-general-contracting
```

### 2. Install Dependencies

Install all dependencies for the monorepo:

```bash
pnpm install
```

This will install dependencies for all apps and packages in the monorepo.

### 3. Set Up Environment Variables

#### For Client Web App

Create a `.env` file in the `apps/client-web` directory:

```bash
cd apps/client-web
touch .env
```

Add the following environment variables:

```env
DATABASE_URL="your-supabase-postgres-connection-string"
DIRECT_URL="your-supabase-direct-connection-string"
NODE_ENV="development"
```

**Getting Supabase Connection Strings:**

1. Go to your Supabase project dashboard
2. Navigate to Settings → Database
3. Copy the "Connection string" (URI format) for `DATABASE_URL`
4. Copy the "Direct connection" string for `DIRECT_URL` (used for migrations)

#### For Admin Mobile App

If the mobile app needs environment variables, create a `.env` file in `apps/admin-mobile` directory. Check the app's configuration for any required API endpoints or keys.

### 4. Set Up the Database

Navigate to the API package and run Prisma migrations:

```bash
cd packages/api
pnpm prisma migrate dev
```

This will:

- Create the database schema
- Generate the Prisma Client
- Run any pending migrations

**Optional:** Open Prisma Studio to view/manage your database:

```bash
cd apps/client-web
pnpm db:studio
```

### 5. Generate Prisma Client

The Prisma client is automatically generated after `pnpm install` (via postinstall script), but you can regenerate it manually:

```bash
cd packages/api
pnpm prisma generate
```

### 6. Run the Development Servers

#### Option 1: Run All Apps (Recommended)

From the root directory, run all apps in development mode:

```bash
pnpm dev
```

This uses Turbo to run all apps concurrently.

#### Option 2: Run Apps Individually

**Client Web (Marketing Site):**

```bash
cd apps/client-web
pnpm dev
```

The app will be available at `http://localhost:3000`

**Admin Mobile:**

```bash
cd apps/admin-mobile
pnpm dev
```

This will start the Expo development server. You can:

- Scan the QR code with Expo Go app on your phone
- Press `i` to open iOS simulator
- Press `a` to open Android emulator
- Press `w` to open in web browser

## Available Scripts

### Root Level

- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps for production
- `pnpm lint` - Lint all apps

### Client Web (`apps/client-web`)

- `pnpm dev` - Start Next.js development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:generate` - Generate Prisma migrations
- `pnpm db:push` - Push schema changes to database
- `pnpm db:studio` - Open Prisma Studio

### Admin Mobile (`apps/admin-mobile`)

- `pnpm dev` or `pnpm start` - Start Expo development server
- `pnpm ios` - Start iOS simulator
- `pnpm android` - Start Android emulator
- `pnpm web` - Start web version
- `pnpm lint` - Run ESLint

## Troubleshooting

### Database Connection Issues

- Verify your `DATABASE_URL` and `DIRECT_URL` are correct
- Ensure your Supabase project is active
- Check that your IP is allowed in Supabase's connection settings

### Prisma Client Not Found

If you see errors about Prisma Client not being found:

```bash
cd packages/api
pnpm prisma generate
```

### Port Already in Use

If port 3000 is already in use, Next.js will automatically use the next available port. For Expo, you can specify a different port:

```bash
cd apps/admin-mobile
pnpm start --port 8081
```

### pnpm Issues

If you encounter issues with pnpm, ensure you're using the correct version:

```bash
pnpm --version  # Should be 10.18.1
```

If not, install the correct version:

```bash
npm install -g pnpm@10.18.1
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Expo Documentation](https://docs.expo.dev/)
- [tRPC Documentation](https://trpc.io/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Turbo Documentation](https://turbo.build/repo/docs)
