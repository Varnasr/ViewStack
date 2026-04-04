# Testing

## Setup

ViewStack uses **Vitest** with **React Testing Library** for unit and component tests.

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage
```

## Writing Tests

Tests are co-located next to source files:

```
src/utils/format.js       → src/utils/format.test.js
src/components/StatCard.jsx → src/components/StatCard.test.jsx
```

### Unit Test Example

```js
import { describe, it, expect } from 'vitest'
import { formatNumber } from './format'

describe('formatNumber', () => {
  it('formats crores', () => {
    expect(formatNumber(10000000)).toBe('1.0 Cr')
  })

  it('returns -- for null', () => {
    expect(formatNumber(null)).toBe('--')
  })
})
```

### Component Test Example

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import StatCard from './StatCard'

describe('StatCard', () => {
  it('renders label and value', () => {
    render(<StatCard label="Test" value={42} />)
    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
  })
})
```

## Best Practices

- Test **behavior**, not implementation details
- Use `screen.getByRole`, `getByText`, `getByLabelText` — avoid `querySelector`
- Mock API calls with `vi.mock` when testing pages
- Keep tests focused — one assertion per test when possible
- Always test error and loading states
