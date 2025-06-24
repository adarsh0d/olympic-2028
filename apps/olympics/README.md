# Olympic Medals Feature (in Olympics App)

A modern, internationalized Olympic medals feature as part of the Olympics app, supporting multiple languages and environments.

## 🌍 Multi-Lingual Support

The medals feature supports 7 languages (English, Spanish, French, German, Chinese, Japanese, Korean) via translation files in `messages/`.

## 🏅 Medals Feature Structure

```
app/(medals)/medals/
├── components/      # MedalTable, Flag, LoadingState, ErrorState
├── hooks/           # useMedals
├── services/        # OlympicsService
├── utils/           # OlympicsUtils
├── data/            # medals.json (static data)
├── api/             # API route for medals data
├── table/           # Table page
├── __tests__/       # Unit tests for components, hooks, services, utils
├── types.ts         # TypeScript types
├── error.tsx        # Error boundary
├── loading.tsx      # Loading boundary
├── page.tsx         # Medals landing page
```

## Key Features
- Olympic medals table with sorting and tie-breaking
- Country flag rendering using sprite sheet
- Internationalization (i18n) support
- Environment-specific features (configurable via `config/environments.ts`)
- API route for medals data
- Comprehensive test coverage for all logic and UI
- Error and loading states for robust UX

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Start the Olympics app:
   ```bash
   pnpm --filter apps/olympics dev
   ```
3. Access medals feature:
   - Visit `/medals` for the landing page
   - Visit `/medals/table` for the medals table

## Testing

Run all tests for the medals feature:
```bash
pnpm test:olympics
```

## Adding New Languages
- Add the locale to `config/i18n.ts`
- Add a translation file in `messages/`

## Main Files & Components
- `components/MedalTable.tsx` – Main table UI
- `components/Flag.tsx` – Country flag rendering
- `hooks/useMedals.ts` – Data fetching and sorting logic
- `services/olympics.ts` – API service
- `utils/olympics.ts` – Sorting, URL, and flag utilities
- `data/medals.json` – Static medals data
- `api/route.ts` – API endpoint for medals data
- `table/page.tsx` – Medals table page
- `types.ts` – TypeScript types

## License
MIT 