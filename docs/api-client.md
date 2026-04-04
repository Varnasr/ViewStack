# API Client

The API client (`src/api/client.js`) centralizes all communication with the BridgeStack backend.

## Base URL

All requests go to `/api/v1/*`, proxied to `http://localhost:8000` in development.

## Available Methods

### Geography

```js
api.getStates(region?)       // GET /api/v1/geography/states
api.getState(id)             // GET /api/v1/geography/states/:id
api.getDistricts(stateId?)   // GET /api/v1/geography/districts
```

### Sectors

```js
api.getSectors()             // GET /api/v1/sectors/
```

### Indicators

```js
api.getIndicators(sectorId?) // GET /api/v1/indicators/
api.getIndicator(id)         // GET /api/v1/indicators/:id
api.getIndicatorValues(indicatorId, stateId)
                             // GET /api/v1/indicators/values/
```

### Policies

```js
api.getSchemes(sectorId?, level?)  // GET /api/v1/policies/schemes
api.getScheme(id)                  // GET /api/v1/policies/schemes/:id
api.getBudgets(schemeId?)          // GET /api/v1/policies/budgets
```

### Tools

```js
api.getTools(stack?)         // GET /api/v1/tools/
```

## Error Handling

The client throws on non-OK responses with the HTTP status code. Catch errors in the calling component:

```jsx
api.getStates()
  .then(setStates)
  .catch((e) => setError(e.message))
```
