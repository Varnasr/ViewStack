export function formatNumber(n) {
  if (n === null || n === undefined) return '--'
  if (n >= 10000000) return `${(n / 10000000).toFixed(1)} Cr`
  if (n >= 100000) return `${(n / 100000).toFixed(1)} L`
  if (n >= 1000) return n.toLocaleString('en-IN')
  return String(n)
}

export function formatCrores(n) {
  if (n === null || n === undefined) return '--'
  return `Rs ${n.toLocaleString('en-IN')} Cr`
}

export function formatPercent(n) {
  if (n === null || n === undefined) return '--'
  return `${n.toFixed(1)}%`
}

export function utilizationColor(pct) {
  if (pct >= 90) return 'var(--success)'
  if (pct >= 75) return 'var(--warning)'
  return 'var(--danger)'
}
