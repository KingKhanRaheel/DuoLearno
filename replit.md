# Duolingo-Style Learning Platform

## Overview

This is a modern web application that mimics the Duolingo language learning experience. Built as a full-stack TypeScript application, it features an interactive learning platform with courses, lessons, quizzes, and user progress tracking. The application uses a React frontend with a custom Express backend, styled with Tailwind CSS and shadcn/ui components.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom Duolingo-inspired color scheme
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Animations**: Framer Motion for XP modals and visual feedback
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Style**: RESTful API endpoints
- **Development**: tsx for TypeScript execution in development
- **Production**: esbuild for server bundling

### Data Storage Strategy
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured via Neon serverless)
- **Schema**: Shared schema definitions between client and server
- **Migration**: Drizzle Kit for database migrations
- **Session Storage**: PostgreSQL-based session storage with connect-pg-simple

## Key Components

### Database Schema
- **Users**: User accounts with XP, streak, and hearts system
- **Courses**: Learning courses with metadata and progress tracking
- **Lessons**: Individual lessons with quiz questions stored as JSONB
- **User Progress**: Tracks completion status and XP earned per lesson

### Authentication & User Management
- Session-based authentication system
- Demo user implementation for development
- XP (experience points) and hearts (lives) gamification system
- Streak tracking for daily engagement

### Learning System
- Course-based learning structure
- Interactive quiz questions with multiple choice answers
- Real-time progress tracking and visual feedback
- XP rewards and heart deduction system for wrong answers

### UI/UX Features
- Mobile-first responsive design
- Duolingo-inspired color scheme and animations
- Progress bars and completion indicators
- Modal system for XP celebrations
- Toast notifications for user feedback

## Data Flow

1. **User Authentication**: Demo user system loads user data on app initialization
2. **Course Selection**: Users browse available courses with progress indicators
3. **Lesson Progression**: Sequential lesson completion within courses
4. **Quiz Interaction**: Real-time quiz answering with immediate feedback
5. **Progress Updates**: XP and completion status updates after each lesson
6. **State Synchronization**: TanStack Query manages server state and caching

## External Dependencies

### Core Framework Dependencies
- React ecosystem (React, React DOM, React Router via Wouter)
- TanStack Query for server state management
- Express.js for backend API

### Database & ORM
- Drizzle ORM with PostgreSQL dialect
- Neon Database serverless PostgreSQL
- Drizzle Zod for schema validation

### UI & Styling
- Tailwind CSS for utility-first styling
- Radix UI primitives for accessible components
- shadcn/ui component system
- Framer Motion for animations
- Lucide React for icons

### Development Tools
- Vite for frontend bundling and dev server
- TypeScript for type safety
- esbuild for production server bundling
- tsx for TypeScript execution in development

## Deployment Strategy

### Development Environment
- Vite dev server for frontend development
- tsx for hot-reloading TypeScript server
- Shared TypeScript configuration for consistent builds
- Replit-specific development tools integration

### Production Build Process
1. Frontend build via Vite to `dist/public`
2. Server bundling via esbuild to `dist/index.js`
3. Single-artifact deployment with static file serving
4. Environment-based configuration for database connections

### Database Management
- Drizzle migrations for schema changes
- Environment variable configuration for database connections
- PostgreSQL session storage for production scalability

## Changelog
- July 01, 2025. Initial setup with complete Duolingo-style learning platform
- July 01, 2025. Migrated from in-memory storage to PostgreSQL database with Drizzle ORM
- July 01, 2025. User requested JavaScript preference - simplified TypeScript code to be more JavaScript-like
- July 03, 2025. Major redesign and feature upgrade:
  - Migrated from Duolingo colors to purple/teal theme with Inter font
  - Added LocalStorage with daily streak tracking and activity dates
  - Implemented sound effects system with mute/unmute toggle
  - Created multi-tab navigation (Home, Courses, Profile)
  - Added floating XP/streak/hearts counter
  - Built comprehensive homepage with feature explanations
  - Enhanced course selection page with progress indicators
  - Added profile dashboard with detailed user stats
  - Integrated glassmorphic design elements throughout UI
- August 06, 2025. Enhanced lesson experience and navigation:
  - Fixed navigation from footer tabs to left sidebar to resolve scrolling issues
  - Implemented full-screen animated quiz feedback modals with detailed educational content
  - Added personalized tips and explanations for each financial concept based on question content
  - Fixed continue button functionality to properly advance between lessons automatically
  - Enhanced XP modal with auto-close timer for seamless lesson-to-lesson progression
  - Improved progress tracking synchronization across the platform

## User Preferences

Preferred communication style: Simple, everyday language.
Code preference: JavaScript-style code with minimal TypeScript type annotations.