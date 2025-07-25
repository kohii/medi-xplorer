# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MediXplorer is a Next.js application for searching and browsing Japanese medical procedure master data (医科診療行為マスター) provided by the Social Insurance Medical Fee Payment Fund. The app is built with TypeScript, React, and deployed on Cloudflare Pages.

## Common Development Commands

```bash
# Development
npm install              # Install dependencies
npm run build:masters    # Generate master data (required before first run)
npm run dev             # Start development server

# Build & Deploy
npm run build           # Build for production
npm run pages:build     # Build for Cloudflare Pages
npm run pages:deploy    # Deploy to Cloudflare Pages

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Run ESLint with auto-fix
npm test                # Run all tests
npm run test:watch      # Run tests in watch mode

# Data Generation
npm run generate-master-data      # Convert CSV to TSV format
npm run generate-master-versions  # Generate version list from raw data
```

## Architecture Overview

### Data Flow
1. Raw CSV files in Shift_JIS encoding are stored in `raw-master-data/s/`
2. `generate-master-data.ts` converts them to UTF-8 TSV files in `public/master-data/s/`
3. The app loads TSV data on-demand based on version selection
4. Data is cached using React Query for performance

### Key Architectural Patterns

- **Next.js App Router**: Uses the app directory structure with server/client components
- **State Management**: React Context for global state (master data, shisetsukijun data)
- **Data Fetching**: React Query for async state management and caching
- **Styling**: Tailwind CSS v4 with PostCSS
- **Path Aliases**: `@/` maps to `src/` directory

### Core Components Structure

- `src/app/`: Next.js app router pages and layouts
- `src/components/`: Reusable UI components (buttons, modals, tables, etc.)
- `src/features/`: Domain-specific features
  - `advanced-search/`: Complex search functionality
  - `display-fields/`: Configurable field display
  - `exports/`: Data export functionality
  - `search/`: Search parsing and filtering logic
  - `shinryoukoui-master-fields/`: Master data field definitions
- `src/contexts/`: React contexts for global state
- `src/hooks/`: Custom React hooks
- `src/apis/`: Data fetching functions

### Important Code Conventions

- **ESLint Rules**: 
  - Semicolons required
  - 2-space indentation
  - Double quotes for strings
  - Strict import ordering (builtin → external → internal)
- **TypeScript**: Strict mode enabled
- **File Naming**: kebab-case for files, PascalCase for components
- **Exports**: Named exports preferred over default exports

### Master Data Versions

The app supports multiple versions of master data. Version management is handled through:
- `shinryoukoui-master-versions.json`: Auto-generated list of available versions
- Layout versions in `layouts.ts` define field structure changes over time
- Version selection persists via URL search params

### Testing

Tests use Jest with ts-jest for TypeScript support. Test files follow the pattern `*.test.ts`.

```bash
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
```