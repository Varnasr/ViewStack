# Commit Conventions

ViewStack enforces commit message conventions via a git hook.

## Format

```
Prefix: Short description in imperative mood

Optional body explaining why (not what).
```

## Prefixes

| Prefix | When to Use | Example |
|--------|-------------|---------|
| `Add:` | New feature or file | `Add: indicator comparison chart` |
| `Fix:` | Bug fix | `Fix: loading state not showing on slow networks` |
| `Update:` | Enhancement to existing feature | `Update: improve mobile table layout` |
| `Refactor:` | Code restructuring (no behavior change) | `Refactor: extract DataTable component` |
| `Docs:` | Documentation | `Docs: add API client usage guide` |
| `Test:` | Tests | `Test: add StatCard rendering tests` |
| `CI:` | CI/CD pipeline | `CI: add build verification to workflow` |
| `Chore:` | Maintenance | `Chore: update dependencies` |
| `Translate:` | Translation/i18n | `Translate: add Hindi labels` |

## Rules

- Subject line should be under 72 characters
- Use imperative mood ("add", not "added" or "adds")
- Capitalize the first word after the prefix
- No period at the end of the subject line

## Examples

```
Add: budget trend visualization for scheme detail page

Shows allocated vs spent budget over fiscal years using a grouped
bar chart. Data comes from the budgets API endpoint.
```

```
Fix: silent error in Schemes page when sectors API fails
```
