# Olympics 2028 Web Application

A clean, modular Next.js application for displaying Olympic medals data and Olympics features with sorting, internationalization, and robust UI states.

## Architecture

The application follows a clean architecture pattern with clear separation of concerns:

```
apps/web/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── (medals)/           # (If present: medals route group)
├── components/             # Shared/layout components
├── config/                 # Environment and i18n config
├── messages/               # Translation files
├── i18n/                   # i18n request utilities
├── __tests__/              # Test files
├── env.*                   # Environment files
├── public/                 # Static assets (e.g., favicon)
└── package.json            # App dependencies
```

## Route Structure

- `/` - Main application home
- `/olympics` - Olympics landing page (from Olympics app)
- `/olympics/medals` - Medals table (from Olympics app)

## Key Features

- **Proxy to Olympics App**: Medals and Olympics features are served from the Olympics app (`apps/olympics`)
- **Environment-aware configuration**
- **Internationalization**: Language switcher and translation files
- **Shared UI components**: Loading, error, and table components
- **Responsive design**
- **Clean URLs and route groups**

## Usage

1. **Start the application**:
   ```bash
   pnpm --filter apps/web dev
   ```

2. **Navigate to Olympics**:
   - Visit `/olympics` for the landing page (proxied from Olympics app)
   - Visit `/olympics/medals` for the medals table (proxied from Olympics app)

## Development

- **Next.js 15** with App Router and Route Groups
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Hooks** for state management
- **Clean Architecture** principles

## Internationalization

- Translation files in `messages/`
- Language switcher in the UI

## Environment Configuration

- Environment files: `env.development`, `env.staging`, `env.production`
- Dynamic proxying to Olympics app based on environment

## License
MIT 