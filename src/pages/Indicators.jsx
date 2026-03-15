import { useState, useEffect } from 'react'
import { api } from '../api/client'
import { LoadingState, ErrorState } from '../components/LoadingState'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

function Indicators() {
  const [indicators, setIndicators] = useState(null)
  const [sectors, setSectors] = useState([])
  const [sectorFilter, setSectorFilter] = useState('')
  const [selected, setSelected] = useState(null)
  const [values, setValues] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.getSectors().then(setSectors).catch(() => {})
  }, [])

  useEffect(() => {
    api.getIndicators(sectorFilter || undefined)
      .then(setIndicators)
      .catch((e) => setError(e.message))
  }, [sectorFilter])

  useEffect(() => {
    if (!selected) { setValues(null); return }
    api.getIndicator(selected)
      .then((data) => setValues(data.values || []))
      .catch(() => setValues([]))
  }, [selected])

  if (error) return <ErrorState message={error} />
  if (!indicators) return <LoadingState />

  const chartData = values
    ? values
        .filter((v) => v.state_id && v.value !== null)
        .map((v) => ({ name: v.state_id, value: v.value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 15)
    : []

  const selectedIndicator = indicators.find((i) => i.indicator_id === selected)

  return (
    <div>
      <h1 className="page-title">Development Indicators</h1>

      <div className="filter-bar">
        <select value={sectorFilter} onChange={(e) => setSectorFilter(e.target.value)}>
          <option value="">All Sectors</option>
          {sectors.map((s) => (
            <option key={s.sector_id} value={s.sector_id}>{s.sector_name}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
        <div className="table-wrap" style={{ maxHeight: '600px', overflow: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Indicator</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {indicators.map((ind) => (
                <tr
                  key={ind.indicator_id}
                  onClick={() => setSelected(ind.indicator_id)}
                  style={{
                    cursor: 'pointer',
                    background: selected === ind.indicator_id ? 'var(--primary-light)' : undefined,
                  }}
                >
                  <td>{ind.indicator_name}</td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>{ind.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          {selected && values === null && <LoadingState message="Loading data..." />}
          {selected && chartData.length > 0 && (
            <div className="card" style={{ padding: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>
                {selectedIndicator?.indicator_name}
                {selectedIndicator?.direction && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginLeft: '0.5rem' }}>
                    ({selectedIndicator.direction === 'higher_better' ? 'higher is better' : 'lower is better'})
                  </span>
                )}
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} layout="vertical" margin={{ left: 60 }}>
                  <XAxis type="number" fontSize={11} />
                  <YAxis type="category" dataKey="name" fontSize={11} width={50} />
                  <Tooltip formatter={(v) => v.toFixed(1)} />
                  <Bar
                    dataKey="value"
                    fill={selectedIndicator?.direction === 'lower_better' ? '#f87171' : '#60a5fa'}
                  />
                </BarChart>
              </ResponsiveContainer>
              <p style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '0.5rem' }}>
                Source: {selectedIndicator?.source || 'Various'}
              </p>
            </div>
          )}
          {selected && values && chartData.length === 0 && (
            <div className="card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--gray-500)' }}>
              No state-level data available for this indicator.
            </div>
          )}
          {!selected && (
            <div className="card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--gray-500)' }}>
              Select an indicator to view state-level data.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Indicators
