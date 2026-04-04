# Code Style

## Tools

| Tool | Purpose | Config File |
|------|---------|-------------|
| ESLint | Linting | `eslint.config.js` |
| Prettier | Formatting | `.prettierrc` |
| EditorConfig | Editor settings | `.editorconfig` |

## Prettier Rules

- No semicolons
- Single quotes
- Trailing commas (all)
- 100 character line width
- 2 space indentation

## ESLint Rules

- React Hooks rules enforced (rules-of-hooks, exhaustive-deps)
- Accessibility rules via `eslint-plugin-jsx-a11y`
- Unused variables warned (except `_`-prefixed args)

## Commit Conventions

Commits must use a prefix:

| Prefix | Usage |
|--------|-------|
| `Add:` | New feature |
| `Fix:` | Bug fix |
| `Update:` | Enhancement to existing feature |
| `Refactor:` | Code restructuring |
| `Docs:` | Documentation changes |
| `Test:` | Test additions/changes |
| `CI:` | CI/CD changes |
| `Chore:` | Maintenance tasks |

Example: `Add: budget trend chart to scheme detail page`

The commit-msg hook validates this automatically.

## Pre-commit Checks

The pre-commit hook blocks:
- Committing `.env`, `.key`, `.pem`, or credential files
- `debugger` statements
- Merge conflict markers
- Files over 500KB

It warns on `console.log/debug/warn` statements (add `// keep` to bypass).
