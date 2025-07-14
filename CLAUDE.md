# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FightHub is a Korean MMA and professional boxing information portal built with:
- **Next.js 14+** with TypeScript and App Router
- **Supabase** for PostgreSQL database and real-time features
- **DrizzleORM** for type-safe database operations
- **Clerk** for authentication (social login, email/password, OTP)
- **ShadCN/UI** components with TailwindCSS
- **Vercel** for deployment

## Development Commands

Once the project is initialized, these commands will be available:

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check

# Database operations (DrizzleORM)
npm run db:generate  # Generate migrations
npm run db:push      # Push schema to database
npm run db:migrate   # Run migrations
npm run db:seed      # Seed initial data
npm run db:studio    # Open Drizzle Studio
```

## Core Architecture

### Database Schema Structure
- **fighters**: Core fighter profiles with Korean name support
- **fights**: Event and match data with bilingual fields
- **predictions**: User predictions linked to Clerk auth
- **articles**: Content management for analysis posts

### API Route Pattern
```
/api/fighters        # Fighter CRUD operations
/api/fights          # Fight information and scheduling
/api/predictions     # User prediction system
/api/articles        # Content management
/api/admin/*         # Administrative functions
```

### Authentication Flow
- Clerk handles all user authentication
- User IDs from Clerk are stored as `varchar(100)` in database
- Row Level Security (RLS) implemented in Supabase for data protection

### Component Architecture
- ShadCN components in `/components/ui/`
- Custom components in `/components/`
- Page components in `/app/` following App Router structure
- Shared utilities in `/lib/`

## Key Design Patterns

### Bilingual Data Support
Most content supports both English and Korean:
- Fighter names: `name` (English) + `nameKr` (Korean)
- Event information: `eventName` + `eventNameKr`
- Venue details: `venue` + `venueKr`

### Status Management
- Fight status: `upcoming`, `live`, `completed`
- Article publishing: `isPublished` boolean with `publishedAt` timestamp
- Prediction confidence: 1-100 integer scale

### Color Theme
Dark theme with fighting sport aesthetics:
- Primary: Red (`346.8 77.2% 49.8%`) for CTAs and highlights
- Background: Dark (`222.2 84% 4.9%`)
- Secondary: Dark gray (`217.2 32.6% 17.5%`)

## Environment Setup Requirements

Create `.env.local` with:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
DATABASE_URL=
```

## Data Seeding Strategy

Priority data for initial population:
1. UFC main card fighters and upcoming events
2. Korean fighters across all organizations
3. Major boxing matches (heavyweight, popular divisions)
4. ONE Championship events (strong in Asia)

## Performance Considerations

- Use Next.js Image component for all fighter photos and event images
- Implement dynamic imports for heavy components (admin panels, prediction charts)
- Optimize Supabase queries with proper indexing on frequently queried fields
- Enable Supabase real-time subscriptions only for live fight updates

## Security Implementation

- Supabase RLS policies based on user roles (admin vs regular users)
- Clerk webhook validation for user data synchronization
- Input sanitization for user-generated content (predictions, comments)
- Rate limiting on prediction submissions and API routes