# PokePao Poke Bowl Café

## Overview

PokePao is a modern food e-commerce website for a Hamburg-based Hawaiian poke bowl restaurant. The application enables customers to browse the menu, add items to their cart, and learn about the restaurant. Built as a full-stack web application with a React frontend and Express backend, it follows a food delivery platform design approach inspired by Uber Eats and DoorDash, combined with fresh, health-focused restaurant aesthetics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast HMR (Hot Module Replacement)
- **Wouter** for lightweight client-side routing instead of React Router

**UI Component System**
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for utility-first styling with custom design tokens
- Custom design system with ocean blue (#33A9D9) and sunset orange (#F26522) brand colors
- Poppins font for headings, Lato for body text

**State Management**
- **TanStack Query (React Query)** for server state management and data fetching
- **Zustand** with persist middleware for client-side cart state management
- Cart data persisted to localStorage for session continuity

**Key Design Patterns**
- Component-based architecture with reusable UI components
- Custom hooks for mobile detection and toast notifications
- Form validation using React Hook Form with Zod resolvers
- Responsive design with mobile-first approach

### Backend Architecture

**Server Framework**
- **Express.js** on Node.js for RESTful API endpoints
- **TypeScript** for type safety across the stack
- Custom middleware for request logging and error handling

**API Design**
- RESTful endpoints for categories and menu items
- Resource-based URL structure (`/api/categories`, `/api/menu-items`)
- Support for filtering menu items by category
- JSON request/response format

**Data Access Layer**
- Abstracted storage interface (`IStorage`) for data operations
- In-memory storage implementation (`MemStorage`) with pre-seeded data
- Prepared for database migration through interface abstraction

### Data Storage

**Current Implementation**
- In-memory storage using JavaScript Maps
- Pre-initialized with sample categories (Poke Bowls, Bao Buns, Drinks) and menu items
- Cart data stored client-side in browser localStorage via Zustand persist

**Database Schema (Prepared)**
- **Drizzle ORM** configured for PostgreSQL with Neon serverless
- Schema defined for `categories` and `menu_items` tables
- UUID primary keys with auto-generation
- Foreign key relationships between menu items and categories
- Support for bilingual content (English/German) with separate fields

**Schema Design Rationale**
- Normalized data structure to avoid duplication
- Boolean flags stored as integers (0/1) for availability and popularity
- Decimal type for precise price storage
- Separate language fields rather than JSON for better queryability

### External Dependencies

**Core Libraries**
- `@tanstack/react-query` - Server state management and caching
- `zustand` - Lightweight state management for cart
- `drizzle-orm` - Type-safe SQL ORM (configured for future use)
- `@neondatabase/serverless` - PostgreSQL driver for serverless environments

**UI Component Libraries**
- `@radix-ui/*` - Accessible, unstyled UI primitives (dialogs, dropdowns, tooltips, etc.)
- `tailwindcss` - Utility-first CSS framework
- `class-variance-authority` - Type-safe component variants
- `embla-carousel-react` - Carousel/slider functionality

**Form Handling**
- `react-hook-form` - Performant form management
- `zod` - Schema validation
- `@hookform/resolvers` - Integration between react-hook-form and Zod

**Development Tools**
- `tsx` - TypeScript execution for development
- `esbuild` - Fast JavaScript bundler for production builds
- `@replit/*` plugins - Development environment enhancements (error overlay, cartographer, dev banner)

**Icons & Fonts**
- `lucide-react` - Icon library
- `react-icons` - Additional icon sets (FontAwesome for social media)
- Google Fonts (Poppins, Lato) loaded via CDN

**Session Management**
- `express-session` with `connect-pg-simple` - Configured for PostgreSQL session storage
- Session data prepared for database persistence

**Third-Party Integrations**
- Food delivery platforms: Lieferando, Wolt, Uber Eats (external links)
- Social media: WhatsApp, Instagram, TikTok (external links)
- Google Fonts API for typography