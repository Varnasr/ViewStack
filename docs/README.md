# ViewStack

**ViewStack** is the frontend layer of the [OpenStacks](https://openstacks.dev) platform — a React dashboard for exploring Indian development data including government schemes, state indicators, budgets, and geographic coverage.

## Key Features

- **Dashboard** — Summary cards with scheme, state, indicator, and sector counts
- **States Explorer** — Browse states/UTs with region filtering, population data, and district breakdowns
- **Scheme Browser** — Filter government schemes by sector and level, view budget trends and coverage
- **Indicator Explorer** — Interactive charts comparing development indicators across states

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 19 |
| Routing | React Router 7 |
| Charts | Recharts 3 |
| Build Tool | Vite 5 |
| Testing | Vitest + React Testing Library |
| Linting | ESLint 10 + Prettier |
| API Backend | [BridgeStack](https://github.com/Varnasr/BridgeStack) (FastAPI) |

## Getting Started

```bash
# Clone the repo
git clone https://github.com/Varnasr/ViewStack.git
cd ViewStack

# Install dependencies
npm install

# Start dev server (requires BridgeStack running on port 8000)
npm run dev
```

Visit `http://localhost:5173` to see the dashboard.
