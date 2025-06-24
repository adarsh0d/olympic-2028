# Olympics 2028 Application

A clean, modular Next.js application for displaying Olympic medals data with sorting capabilities.

## Architecture

The application follows a clean architecture pattern with clear separation of concerns:

```
apps/web/
├── app/                    # Next.js App Router pages
│   ├── (olympics)/        # Olympics route group
│   │   ├── layout.tsx     # Olympics-specific layout
│   │   ├── page.tsx       # Olympics landing page
│   │   └── medals/        # Medals table page
│   └── api/               # API routes
├── components/            # React components
│   └── olympics/          # Olympics-specific components
├── hooks/                 # Custom React hooks
├── services/              # API and data services
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
└── public/                # Static assets
    ├── flags.png          # Country flags sprite sheet
    └── medals.json        # Olympic medals data
```

## Route Structure

- `/` - Main application home
- `/olympics` - Olympics landing page with features overview
- `/olympics/medals` - Medals table with sorting capabilities
- `/api/medals` - API endpoint for medals data
- `/api/flags` - API endpoint for flags data

## Key Features

- **Route Groups**: Organized Olympics-related pages in `(olympics)` route group
- **URL Parameter Support**: Accepts `sort` parameter (`?sort=gold`, `?sort=silver`, etc.)
- **Bidirectional Sorting**: Click headers to sort ascending/descending
- **Default Sorting**: Defaults to gold medals when no parameter is provided
- **Tie-Breaking Logic**: Implements proper Olympic tie-breaking rules
- **Clickable Headers**: Sort by clicking column headers
- **No Re-fetching**: Client-side sorting without API calls
- **Error Handling**: Graceful error states with retry functionality
- **Loading States**: Proper loading indicators
- **Responsive Design**: Mobile-friendly table layout
- **Olympics-Specific UI**: Custom layout and styling for Olympics section
- **Flag Display**: Uses flags.png sprite sheet for country flags

## Components

### Core Components
- `MedalTable`: Main table component
- `LoadingState`: Loading indicator
- `ErrorState`: Error display with retry

### Custom Hooks
- `useMedals`: Manages medals data state and operations

### Services
- `OlympicsService`: Handles API calls and data fetching

### Utilities
- `OlympicsUtils`: Sorting, flag positioning, URL handling

### Types
- `MedalData`: Medal data interface
- `SortType`: Sort type union
- `SortDirection`: Sort direction union
- `SortConfig`: Sort configuration interface
- Component prop interfaces

## Usage

1. **Start the application**:
   ```bash
   pnpm --filter apps/web dev
   ```

2. **Navigate to Olympics**:
   - Visit `/olympics` for the landing page
   - Navigate to `/olympics/medals` for the medals table
   - Use URL parameters: `/olympics/medals?sort=total&direction=asc`

3. **Sort data**:
   - Click column headers to sort
   - Click again to reverse sort direction
   - URL updates automatically
   - No page reloads

## API Endpoints

- `GET /api/medals`: Returns medals data with calculated totals
- `GET /api/flags`: Returns flags data (currently unused, using sprite sheet)

## Data Structure

Medals data includes:
- `country`: Country code
- `gold`: Gold medal count
- `silver`: Silver medal count  
- `bronze`: Bronze medal count
- `total`: Calculated total medals

## Flag Display

The application uses a sprite sheet (`flags.png`) for displaying country flags:
- Flags are arranged alphabetically by country code
- Each flag is 24x16 pixels
- Position calculation based on alphabetical order
- Fallback to emoji flags if country not found

## Sorting Logic

1. **Primary Sort**: By selected column (gold, silver, bronze, total)
2. **Direction**: Toggle between ascending (↑) and descending (↓)
3. **Tie-Breaking**:
   - Total: Break by most gold
   - Gold: Break by most silver
   - Silver: Break by most gold
   - Bronze: Break by most gold

## Route Groups Benefits

- **Organized Structure**: Olympics-related pages are grouped together
- **Shared Layout**: Common header, footer, and styling for Olympics section
- **Clean URLs**: URLs remain clean (`/olympics/medals`) despite grouping
- **Scalability**: Easy to add more Olympics-related pages in the future

## Development

The application is built with:
- **Next.js 15** with App Router and Route Groups
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Hooks** for state management
- **Clean Architecture** principles
- **Sprite Sheet** for efficient flag loading 