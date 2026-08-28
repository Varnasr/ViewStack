# ViewStack

**React dashboard for exploring Indian development data.**

> ## ⚠️ This repository is retired
>
> **ViewStack is archived and read-only.** It is no longer maintained and will not
> receive updates, dependency bumps, or responses to issues. Its npm dependencies are
> frozen at their 2026 versions and will accumulate advisories over time.
>
> ViewStack was the frontend of a RootStack → BridgeStack → ViewStack pipeline.
> That pipeline carried most of the OpenStacks maintenance cost and the research
> toolkits never actually depended on it, so all three have been retired together.
>
> **Nothing has been deleted.** The code stays public and forkable.
>
> **If you came here for interactive Indian development data**, use
> [How India Lives](https://github.com/Varnasr/how-india-lives) — 205 state-level
> choropleth maps and 10 visual stories, actively maintained.
>
> Full reasoning: the [OpenStacks maintenance policy](https://github.com/Varnasr/OpenStacks-for-Change/blob/main/MAINTENANCE.md).

[![Part of OpenStacks](https://img.shields.io/badge/Part%20of-OpenStacks-blue)](https://openstacks.dev)
[![Status: Retired](https://img.shields.io/badge/Status-Retired-64748b?style=flat-square)](https://github.com/Varnasr/OpenStacks-for-Change/blob/main/MAINTENANCE.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> The presentation layer for OpenStacks -- interactive dashboards for states, schemes, and development indicators.

---

## Architecture

```
RootStack (PostgreSQL) --> BridgeStack (FastAPI) --> ViewStack (React)
```

ViewStack is a React + Vite application that consumes the [BridgeStack](https://github.com/Varnasr/BridgeStack) REST API to display data stored in [RootStack](https://github.com/Varnasr/RootStack).

## What's Inside

```
ViewStack/
├── src/
│   ├── api/            # API client for BridgeStack
│   ├── components/     # Reusable UI components (StatCard, LoadingState)
│   ├── pages/          # Page views
│   │   ├── Dashboard   # Summary cards, scheme table, regional breakdown
│   │   ├── States      # State/UT list with region filter, drill-down to districts
│   │   ├── Schemes     # Government schemes with sector/level filters
│   │   ├── SchemeDetail # Budget trend charts, coverage data
│   │   └── Indicators  # Indicator explorer with state-level bar charts
│   └── utils/          # Formatting helpers (Indian number system, crores)
├── public/             # Static assets
├── index.html          # Entry point
├── package.json        # React 18, React Router, Recharts
└── vite.config.js      # Dev server with API proxy
```

## Features

- **Dashboard** -- Overview of states, schemes, indicators, and sectors
- **State Explorer** -- Browse 36 states/UTs, filter by region, view districts
- **Scheme Tracker** -- Filter by sector and level, view budget trends as bar charts
- **Indicator Explorer** -- Click any indicator to see state-level comparison charts
- **Responsive** -- Mobile-friendly layout for field use

## Getting Started

**Prerequisites:** Node.js 18+, BridgeStack running on port 8000.

```bash
# Install dependencies
npm install

# Start dev server (proxies API calls to localhost:8000)
npm run dev

# Build for production
npm run build
```

The dev server proxies `/api` requests to BridgeStack at `http://localhost:8000`.

## Data

ViewStack displays data from RootStack's India-focused development database:

- **36 states and UTs** with regional classification and census data
- **22 high-priority districts** across Bihar, Jharkhand, Rajasthan, West Bengal, and more
- **16 indicators** across health, education, gender, and climate sectors
- **15 government schemes** with budget allocation and utilization tracking
- **6 sectors** with hierarchical subsectors

## How It Connects

| Stack | Role |
|-------|------|
| [RootStack](https://github.com/Varnasr/RootStack) | PostgreSQL schemas, seed data, analytical queries |
| [BridgeStack](https://github.com/Varnasr/BridgeStack) | FastAPI REST API (read-only) |
| **ViewStack** (this repo) | React frontend dashboard |

## Contributing

Areas where contributions are welcome:
- Map visualisations using Leaflet
- Additional chart types (sparklines, scatter plots)
- Accessibility improvements
- Mobile UI refinements

See [contributing guidelines](https://github.com/Varnasr/.github/blob/main/CONTRIBUTING.md) or the [OpenStacks hub](https://github.com/Varnasr/OpenStacks-for-Change).

## License

MIT -- free to use, modify, and share. See [LICENSE](LICENSE).

---

**Created by [Varna Sri Raman](https://github.com/Varnasr)** -- Development Economist & Social Researcher
