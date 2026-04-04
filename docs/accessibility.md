# Accessibility

ViewStack follows web accessibility best practices to ensure the dashboard is usable by everyone.

## Current Implementation

### Skip Navigation
A "Skip to main content" link appears on keyboard focus, allowing users to bypass the navigation.

### ARIA Roles
- `LoadingState` uses `role="status"` with `aria-live="polite"` for screen reader announcements
- `ErrorState` uses `role="alert"` for immediate error announcements
- `FilterBar` uses `role="search"` with `aria-label` on each select
- Navigation uses `aria-label="Main navigation"`
- Footer uses `role="contentinfo"`

### Semantic HTML
- Tables use `<caption>` (visually hidden) for screen readers
- Table headers use `scope="col"` for proper association
- Interactive table rows have `role="button"`, `tabIndex`, and keyboard handlers

### Keyboard Navigation
- `DataTable` rows with `onRowClick` support Enter and Space key activation
- All interactive elements are focusable and keyboard-operable

## Best Practices for Contributors

1. **Always add `aria-label`** to interactive elements without visible text
2. **Use semantic HTML** — prefer `<button>` over `<div onClick>`
3. **Provide text alternatives** for color-coded information (badges include text labels)
4. **Test with keyboard only** — tab through the page, ensure all actions are reachable
5. **Use the `sr-only` CSS class** for screen-reader-only content
6. **Never remove focus outlines** without providing an alternative indicator
