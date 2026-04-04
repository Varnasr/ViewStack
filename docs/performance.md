# Performance

## Current Optimizations

- **Vite** — Fast HMR in development, optimized production builds with tree-shaking
- **Responsive container** — Recharts charts resize without re-rendering
- **Conditional rendering** — Charts/tables only render when data is available

## Recommendations for Contributors

### Code Splitting

For large pages, consider lazy loading:

```jsx
import { lazy, Suspense } from 'react'
const Indicators = lazy(() => import('./pages/Indicators'))

// In routes:
<Route path="/indicators" element={
  <Suspense fallback={<LoadingState />}>
    <Indicators />
  </Suspense>
} />
```

### Data Fetching

- Avoid duplicate API calls — check if data is already loaded before refetching
- Use `useEffect` cleanup to prevent state updates on unmounted components
- Consider adding `AbortController` for cancellable requests

### Bundle Size

- The production bundle includes React, Recharts, and React Router
- Run `npm run build` to check output size
- Recharts is the largest dependency — only import the chart types you need

### Images and Assets

- Use SVG for icons and logos (smaller, scalable)
- Lazy load images below the fold
- Prefer CSS over images where possible
