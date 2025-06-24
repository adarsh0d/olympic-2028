# Olympic Medals App - Multi-Lingual & Multi-Environment

A modern, internationalized Olympic medals application with support for multiple languages and environments.

## 🌍 Multi-Lingual Support

The application supports 7 languages:

- 🇺🇸 **English** (en) - Default
- 🇪🇸 **Spanish** (es)
- 🇫🇷 **French** (fr)
- 🇩🇪 **German** (de)
- 🇨🇳 **Chinese** (zh)
- 🇯🇵 **Japanese** (ja)
- 🇰🇷 **Korean** (ko)

### Language Configuration

- **URL Structure**: `/en/medals`, `/es/medals`, `/fr/medals`, etc.
- **Default Language**: English (`/en`)
- **Language Switcher**: Available in the header
- **Translation Files**: Located in `messages/` directory

### Adding New Languages

1. Add the locale to `config/i18n.ts`:
```typescript
export const locales = ['en', 'es', 'fr', 'de', 'zh', 'ja', 'ko', 'it'] as const;
```

2. Add locale configuration:
```typescript
it: {
  name: 'Italiano',
  flag: '🇮🇹',
  direction: 'ltr',
},
```

3. Create translation file: `messages/it.json`

## 🏗️ Multi-Environment Setup

The application supports multiple deployment environments with different configurations:

### Supported Environments

- **Development** (`development`)
- **Staging** (`staging`)
- **Production** (`production`)
- **Test** (`test`)

### Environment Configuration

Each environment has its own configuration in `config/environments.ts`:

```typescript
{
  name: string;
  apiBaseUrl: string;
  medalsApiUrl: string;
  flagsApiUrl: string;
  features: {
    enableSorting: boolean;
    enableFiltering: boolean;
    enablePagination: boolean;
    enableSearch: boolean;
    enableExport: boolean;
  };
  analytics: {
    enabled: boolean;
    trackingId?: string;
  };
  cache: {
    enabled: boolean;
    ttl: number;
  };
}
```

### Environment-Specific Features

| Feature | Development | Staging | Production | Test |
|---------|-------------|---------|------------|------|
| Sorting | ✅ | ✅ | ✅ | ✅ |
| Filtering | ✅ | ✅ | ✅ | ❌ |
| Pagination | ❌ | ✅ | ✅ | ❌ |
| Search | ✅ | ✅ | ✅ | ❌ |
| Export | ✅ | ✅ | ✅ | ❌ |
| Analytics | ❌ | ✅ | ✅ | ❌ |
| Caching | ❌ | ✅ | ✅ | ❌ |

### Environment Variables

Environment-specific variables are configured in:
- `env.development`
- `env.staging`
- `env.production`

## 🎨 UI Components

### Shadcn/ui Table Integration

The application uses shadcn/ui table components for a modern, accessible table:

```typescript
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@workspace/ui/components/table';
```

### Features

- **Responsive Design**: Works on all device sizes
- **Accessibility**: ARIA labels and keyboard navigation
- **Sorting**: Click headers to sort by medal type
- **Flag Display**: Country flags using sprite sheet
- **Loading States**: Smooth loading experience
- **Error Handling**: Graceful error recovery

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment
cp env.development .env.local
```

### Development

```bash
# Start development server
pnpm dev

# Access the application
# English: http://localhost:3001/en/medals
# Spanish: http://localhost:3001/es/medals
# French: http://localhost:3001/fr/medals
```

### Building for Different Environments

```bash
# Development build
NODE_ENV=development pnpm build

# Staging build
NODE_ENV=staging pnpm build

# Production build
NODE_ENV=production pnpm build
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Test Coverage

- **Components**: MedalTable, LanguageSwitcher, LoadingState, ErrorState
- **Hooks**: useMedals with internationalization
- **Services**: OlympicsService with environment configuration
- **Utils**: OlympicsUtils with locale support
- **Configuration**: Environment and i18n setup

## 📁 Project Structure

```
app/(medals)/
├── components/
│   ├── MedalTable.tsx          # Shadcn/ui table component
│   ├── LanguageSwitcher.tsx    # Language selection
│   ├── LoadingState.tsx        # Loading component
│   └── ErrorState.tsx          # Error component
├── hooks/
│   └── useMedals.ts            # Medals data hook
├── services/
│   └── olympics.ts             # API service layer
├── utils/
│   └── olympics.ts             # Utility functions
├── types.ts                    # TypeScript types
├── page.tsx                    # Main page
├── layout.tsx                  # App layout
└── __tests__/                  # Test files

config/
├── environments.ts             # Environment configuration
└── i18n.ts                     # Internationalization setup

messages/
├── en.json                     # English translations
├── es.json                     # Spanish translations
├── fr.json                     # French translations
└── ...                         # Other languages

env.*                          # Environment variables
```

## 🔧 Configuration

### Internationalization

The app uses `next-intl` for internationalization:

- **Middleware**: Handles locale routing
- **Messages**: JSON files for translations
- **Components**: `useTranslations` hook for text
- **Routing**: Locale-prefixed URLs

### Environment Detection

Environment is automatically detected based on:

1. `NODE_ENV` environment variable
2. `NEXT_PUBLIC_ENV` for client-side detection
3. Fallback to development

### Feature Flags

Features can be enabled/disabled per environment:

```typescript
const env = getCurrentEnvironment();
if (env.features.enableSorting) {
  // Enable sorting functionality
}
```

## 🌐 Deployment

### Vercel Deployment

```bash
# Deploy to Vercel
vercel --prod

# Set environment variables
vercel env add NEXT_PUBLIC_ENV production
vercel env add NEXT_PUBLIC_API_BASE_URL https://olympic2028.com
```

### Docker Deployment

```bash
# Build Docker image
docker build -t olympic-medals .

# Run with environment
docker run -e NODE_ENV=production olympic-medals
```

## 📊 Analytics

Analytics are environment-specific:

- **Development**: Disabled
- **Staging**: Enabled with staging tracking ID
- **Production**: Enabled with production tracking ID

## 🔒 Security

- **Headers**: Security headers configured in `next.config.mjs`
- **CORS**: Proper CORS configuration
- **Environment Variables**: Secure handling of sensitive data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add translations for new features
4. Update environment configurations if needed
5. Add tests for new functionality
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🏆 Olympic 2028

This application is designed for the Los Angeles 2028 Olympic Games, providing a modern, scalable, and internationalized platform for Olympic medals data. 