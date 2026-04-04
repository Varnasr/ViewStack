# Components

## Shared Components

### StatCard

Displays a metric with label, value, and optional subtitle.

```jsx
<StatCard label="Active Schemes" value={42} subtitle="Government programs" />
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | string | Yes | Metric label |
| `value` | string/number | Yes | Primary value |
| `subtitle` | string | No | Additional context |

### DataTable

Accessible, reusable table with optional row selection and keyboard navigation.

```jsx
<DataTable
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'value', label: 'Value', render: (row) => <strong>{row.value}</strong> },
  ]}
  rows={[{ id: 1, name: 'Test', value: 42 }]}
  caption="Data overview"
  onRowClick={(id) => setSelected(id)}
  selectedId={selected}
/>
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `columns` | array | Yes | Column definitions with `key`, `label`, optional `render` and `className` |
| `rows` | array | Yes | Row data — each must have an `id` field |
| `caption` | string | No | Screen-reader-only table caption |
| `onRowClick` | function | No | Click handler, receives row `id` |
| `selectedId` | any | No | Highlights the selected row |

### FilterBar

Accessible filter controls with labeled selects.

```jsx
<FilterBar
  filters={[{
    id: 'region',
    label: 'Filter by region',
    placeholder: 'All Regions',
    value: region,
    onChange: setRegion,
    options: [{ value: 'North', label: 'North' }],
  }]}
/>
```

### LoadingState / ErrorState

Status indicators with proper ARIA roles.

```jsx
<LoadingState message="Fetching data..." />   // role="status"
<ErrorState message="Failed to load." />       // role="alert"
```
