# Architecture Overview

## System Design

ViewStack is the **frontend layer** in the OpenStacks ecosystem:

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  ViewStack  │────▶│  BridgeStack │────▶│  DataStack  │
│  (React)    │ API │  (FastAPI)   │  DB │ (PostgreSQL)│
└─────────────┘     └──────────────┘     └─────────────┘
```

- **ViewStack** — React SPA, renders dashboards and visualizations
- **BridgeStack** — REST API, handles data queries and aggregation
- **DataStack** — Data pipeline, ETL from government sources

## Frontend Architecture

### Routing

React Router handles client-side routing with these routes:

| Path | Page | Description |
|------|------|-------------|
| `/` | Dashboard | Summary overview |
| `/states` | States | State/UT listing |
| `/states/:stateId` | StateDetail | State info + districts |
| `/schemes` | Schemes | Scheme listing |
| `/schemes/:schemeId` | SchemeDetail | Budget + coverage |
| `/indicators` | Indicators | Interactive explorer |

### Data Flow

1. Page mounts → calls `api.*` method
2. `api/client.js` constructs URL and calls `fetch`
3. Response is set in component state via `useState`
4. Component renders data (tables, cards, charts)
5. Error/loading states handled via `ErrorState`/`LoadingState`

### API Client

All API calls are centralized in `src/api/client.js`. This provides:

- Single point of change for base URL, headers, auth
- Consistent error handling (`throw` on non-OK responses)
- Clean separation between data fetching and rendering
