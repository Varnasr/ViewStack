# How to Contribute

ViewStack welcomes contributions from the community!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/ViewStack.git`
3. Create a branch: `git checkout -b feature/my-feature`
4. Install dependencies: `npm install`
5. Make your changes
6. Run checks: `npm run lint && npm test && npm run build`
7. Commit with a proper prefix (see [Commit Conventions](commits.md))
8. Push and open a PR

## Areas for Contribution

- **Maps** — Add geographic visualizations (Leaflet, D3)
- **Charts** — New visualization types for indicators
- **Accessibility** — Improve ARIA, keyboard navigation, screen reader support
- **Mobile** — Responsive design improvements
- **Internationalization** — Hindi and regional language support
- **Data** — Integrate additional government data sources

## Pull Request Checklist

- [ ] Code follows the project's [code style](code-style.md)
- [ ] Tests added/updated for new functionality
- [ ] `npm run lint` passes with no errors
- [ ] `npm test` passes
- [ ] `npm run build` succeeds
- [ ] Tested on mobile browser
- [ ] Accessibility checked (keyboard navigation, screen reader)

## Code Review

All PRs require review from [@Varnasr](https://github.com/Varnasr) (CODEOWNERS). Keep PRs focused — one feature or fix per PR.
