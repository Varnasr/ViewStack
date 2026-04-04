# Security

## Practices

### Secrets Prevention
The pre-commit hook blocks committing files that match:
- `.env`, `.env.*`
- `*.key`, `*.pem`
- `credentials.json`, `secrets.*`

### XSS Protection
- React's JSX escapes all values by default
- Never use `dangerouslySetInnerHTML`
- Filter/sanitize any user input before rendering

### API Security
- All API calls go through the centralized `api/client.js`
- The Vite dev proxy prevents CORS issues in development
- In production, configure proper CORS headers on BridgeStack

### Dependency Security
- **Dependabot** is configured for weekly npm and GitHub Actions updates
- Run `npm audit` regularly to check for known vulnerabilities
- Pin major versions in `package.json` to avoid unexpected breaking changes

## Reporting Vulnerabilities

See [SECURITY.md](https://github.com/Varnasr/ViewStack/blob/main/SECURITY.md) for the vulnerability disclosure process. Report issues to **hello@impactmojo.in**.
