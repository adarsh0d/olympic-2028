# Olympic 2028 - Multizone Next.js Monorepo

A modern multizone Next.js application showcasing Olympic medals with internationalization, environment-aware configuration, and shared UI components.

## Architecture

This monorepo consists of:

- **Web App** (`apps/web`): Main application environment configuration
- **Olympics App** (`apps/olympics`): Olympics application with medals feature, internationalization, and environment-aware configuration
- **UI Package** (`packages/ui`): Shared components used across both apps
- **ESLint Config** (`packages/eslint-config`): Shared ESLint configuration
- **TypeScript Config** (`packages/typescript-config`): Shared TypeScript configuration

## Environment Configuration

The application supports multiple environments with dynamic configuration:

### Environment Files
- `apps/web/env.development` - Development environment
- `apps/web/env.staging` - Staging environment  
- `apps/web/env.production` - Production environment

### Environment Variables
- `NEXT_PUBLIC_ENV` - Current environment (development/staging/production/test)
- `NEXT_PUBLIC_MEDALS_APP_URL` - URL for the medals app (overrides default)

### Environment-Specific Features
- **Development**: Local medals app, language switcher enabled, no analytics
- **Staging**: Staging medals app, language switcher enabled, analytics enabled
- **Production**: Production medals app, language switcher enabled, analytics enabled
- **Test**: Local medals app, language switcher disabled, no analytics

## Multizone Setup

The web app dynamically proxies requests to the medals app based on the current environment:

- **Development**: `http://localhost:3001`
- **Staging**: `https://staging-medals.olympic2028.com`
- **Production**: `https://medals.olympic2028.com`

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm

### Installation
```bash
pnpm install
```

### Development
```bash
# Start both apps in development mode
pnpm dev

# Or start individually
pnpm dev:web
pnpm dev:medals
```

### Environment Setup
```bash
# Development (default)
pnpm dev

# Staging
NEXT_PUBLIC_ENV=staging pnpm dev

# Production
NEXT_PUBLIC_ENV=production pnpm dev

# Custom medals app URL
NEXT_PUBLIC_MEDALS_APP_URL=https://custom-medals-url.com pnpm dev
```

### Testing
```bash
# Run all tests
pnpm test

# Run tests for specific app
pnpm test:web
pnpm test:medals

# Run tests with coverage
pnpm test:coverage
```

## Features

### Web App (`apps/web`)
- Environment-aware configuration
- Language switcher (English, Spanish, French)
- Dynamic medals app proxying
- Shared loading and error states
- Responsive design

### Olympics App (`apps/olympics`)
- Olympic medals table with sorting
- Country flag rendering using sprite sheet
- Internationalization support
- Environment-specific features
- API routes for data fetching
- Comprehensive test coverage

### Shared UI Package (`packages/ui`)
- Reusable components (Button, Table, LoadingState, ErrorState, LanguageSwitcher)
- Internationalization utilities
- Consistent styling with Tailwind CSS

## Project Structure

```
olympic-2028/
├── apps/
│   ├── web/                    # Main web application
│   │   ├── app/               # Next.js app directory
│   │   ├── config/            # Environment and i18n config
│   │   ├── messages/          # Translation files
│   │   ├── components/        # Shared/layout components
│   │   └── env.*              # Environment files
│   └── olympics/              # Olympics application (includes medals feature)
│       ├── app/               # Next.js app directory
│       │   └── (medals)/      # Medals route group
│       │       └── medals/    # Medals feature (components, hooks, services, utils, data, api)
│       ├── config/            # Environment and i18n config
│       ├── messages/          # Translation files
│       └── __tests__/         # Test files
├── packages/
│   ├── ui/                    # Shared UI components
│   │   ├── src/components/    # Reusable components
│   │   ├── src/config/        # Shared configuration
│   │   └── src/styles/        # Global styles
│   ├── eslint-config/         # Shared ESLint configuration
│   └── typescript-config/     # Shared TypeScript configuration
└── package.json               # Root package.json
```

## Internationalization

Both apps support multiple languages:
- English (en)
- Spanish (es) 
- French (fr)

Translation files are located in `apps/web/messages/` and `apps/olympics/messages/`.

## Deployment

### Environment-Specific Deployment

1. **Development**: Uses localhost for medals app
2. **Staging**: Deploy medals app to staging URL, set `NEXT_PUBLIC_ENV=staging`
3. **Production**: Deploy medals app to production URL, set `NEXT_PUBLIC_ENV=production`

### Environment Variables

Set the following environment variables for deployment:

```bash
# Required
NEXT_PUBLIC_ENV=production
NEXT_PUBLIC_MEDALS_APP_URL=https://medals.olympic2028.com

# Optional
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

This project is licensed under the MIT License.
