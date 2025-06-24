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



---

## **How to Test Request Parameters in the Medals Application**

The medals table page supports URL query parameters for sorting and other features. You can test these by modifying the URL in your browser.

---

### **1. Sorting by Medal Type**

You can sort the medals table by different medal types using the `sort` parameter in the URL.

- **Gold (default):**
  ```
  http://localhost:3001/medals/table?sort=gold
  ```
- **Silver:**
  ```
  http://localhost:3001/medals/table?sort=silver
  ```
- **Bronze:**
  ```
  http://localhost:3001/medals/table?sort=bronze
  ```
- **Total:**
  ```
  http://localhost:3001/medals/table?sort=total
  ```

---

### **2. Sorting Direction**

If your app supports sorting direction (ascending/descending), you may also use a `direction` parameter:

- **Ascending:**
  ```
  http://localhost:3001/medals/table?sort=gold&direction=asc
  ```
- **Descending:**
  ```
  http://localhost:3001/medals/table?sort=gold&direction=desc
  ```

---

### **3. Testing in the Browser**

1. **Start the Olympics app:**
   ```bash
   pnpm --filter apps/olympics dev
   ```
2. **Open your browser and navigate to the medals table page.**
3. **Manually edit the URL** in the address bar to include the desired query parameters (as shown above).
4. **Observe the table:**  
   - The table should update to reflect the sorting you specified in the URL.
   - You can also click the column headers to change the sort, and the URL should update accordingly.

---

### **5. Resetting to Default**

To reset to the default view, simply remove the query parameters:

```
http://localhost:3001/medals/table
```



## License
MIT 