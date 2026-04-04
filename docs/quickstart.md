# Quick Start

## Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+
- **BridgeStack** API running on `http://localhost:8000` ([setup guide](https://github.com/Varnasr/BridgeStack))

## Installation

```bash
git clone https://github.com/Varnasr/ViewStack.git
cd ViewStack
npm install
```

## Development

```bash
# Start the dev server with hot reload
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint the codebase
npm run lint

# Format code with Prettier
npm run format

# Production build
npm run build

# Preview production build
npm run preview
```

## Environment

The dev server proxies `/api` requests to `http://localhost:8000` (BridgeStack). See `.env.example` for configuration options.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint on `src/` |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check formatting |
| `npm test` | Run test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |
