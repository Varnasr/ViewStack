# Development Guide

## Setting Up Your Environment

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Start BridgeStack on port 8000
4. Run `npm run dev` — opens at `http://localhost:5173`

## Adding a New Page

1. Create `src/pages/MyPage.jsx`
2. Add a route in `src/App.jsx`
3. Add a nav link in the header if it's a top-level page
4. Use `api.*` methods for data, `LoadingState`/`ErrorState` for status

```jsx
import { useState, useEffect } from 'react'
import { api } from '../api/client'
import { LoadingState, ErrorState } from '../components/LoadingState'

function MyPage() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.getMyData()
      .then(setData)
      .catch((e) => setError(e.message))
  }, [])

  if (error) return <ErrorState message={error} />
  if (!data) return <LoadingState />

  return <div>{/* render data */}</div>
}

export default MyPage
```

## Adding an API Endpoint

Add a new method to `src/api/client.js`:

```js
export const api = {
  // ... existing methods
  getMyData: (param) => fetchApi('/my-endpoint', { param }),
}
```

## Code Style

- No semicolons, single quotes, trailing commas (enforced by Prettier)
- Functional components with hooks only
- Co-locate tests next to source files
- Use CSS classes from `App.css` — avoid inline styles
