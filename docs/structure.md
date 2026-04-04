# Project Structure

```
ViewStack/
├── docs/                  # Documentation site (Docsify)
├── public/                # Static assets
│   └── favicon.svg
├── src/
│   ├── api/
│   │   └── client.js      # API client — all backend calls
│   ├── components/
│   │   ├── DataTable.jsx   # Reusable accessible table
│   │   ├── ErrorState.jsx  # Error display with alert role
│   │   ├── FilterBar.jsx   # Reusable filter controls
│   │   ├── LoadingState.jsx # Loading indicator with status role
│   │   └── StatCard.jsx    # Metric card component
│   ├── pages/
│   │   ├── Dashboard.jsx   # Home — summary cards + overview
│   │   ├── Indicators.jsx  # Indicator explorer with charts
│   │   ├── SchemeDetail.jsx # Budget trend + coverage table
│   │   ├── Schemes.jsx     # Scheme listing with filters
│   │   ├── StateDetail.jsx # State info + districts
│   │   └── States.jsx      # State/UT listing with filter
│   ├── test/
│   │   └── setup.js        # Vitest + Testing Library setup
│   ├── utils/
│   │   └── format.js       # Indian number formatting (Cr, L)
│   ├── App.css             # Layout, components, responsive
│   ├── App.jsx             # Routes + navigation shell
│   ├── index.css           # CSS variables + reset
│   └── main.jsx            # React entry point
├── .github/
│   ├── workflows/          # CI (lint, test, build, link check)
│   ├── ISSUE_TEMPLATE/     # Bug, feature, content templates
│   └── PULL_REQUEST_TEMPLATE.md
├── .githooks/              # Pre-commit + commit-msg hooks
├── eslint.config.js        # ESLint flat config
├── vitest.config.js        # Test configuration
├── tsconfig.json           # TypeScript (checkJs off, for IDE)
├── .prettierrc             # Prettier settings
└── .env.example            # Environment variable template
```

## Key Conventions

- **Pages** live in `src/pages/` — one per route
- **Shared components** live in `src/components/`
- **All API calls** go through `src/api/client.js` — never call `fetch` directly in components
- **Formatting utilities** in `src/utils/format.js` handle Indian number system (crores, lakhs)
- **Tests** are co-located next to the files they test (e.g., `format.test.js`)
