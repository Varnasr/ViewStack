import { useState, useEffect } from 'react'
import { api } from '../api/client'
import { LoadingState, ErrorState } from '../components/LoadingState'
import FilterBar from '../components/FilterBar'
import DataTable from '../components/DataTable'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

function Indicators() {
  const [indicators, setIndicators] = useState(null)
  const [sectors, setSectors] = useState([])
  const [sectorFilter, setSectorFilter] = useState('')
  const [selected, setSelected] = useState(null)
  const [values, setValues] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .getSectors()
      .then(setSectors)
      .catch((e) => setError(e.message))
  }, [])

  useEffect(() => {
    api
      .getIndicators(sectorFilter || undefined)
      .then(setIndicators)
      .catch((e) => setError(e.message))
  }, [sectorFilter])

  useEffect(() => {
    if (!selected) {
      setValues(null)
      return
    }
    api
      .getIndicator(selected)
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

  const columns = [
    { key: 'indicator_name', label: 'Indicator' },
    { key: 'unit', label: 'Unit', className: 'text-sm text-muted' },
  ]

  const rows = indicators.map((ind) => ({
    id: ind.indicator_id,
    indicator_name: ind.indicator_name,
    unit: ind.unit,
  }))

  return (
    <div>
      <h1 className="page-title">Development Indicators</h1>

      <FilterBar
        filters={[
          {
            id: 'sector',
            label: 'Filter by sector',
            placeholder: 'All Sectors',
            value: sectorFilter,
            onChange: setSectorFilter,
            options: sectors.map((s) => ({ value: s.sector_id, label: s.sector_name })),
          },
        ]}
      />

      <div className="indicators-layout">
        <div className="indicators-list">
          <DataTable
            columns={columns}
            rows={rows}
            caption="Development indicators list"
            onRowClick={setSelected}
            selectedId={selected}
          />
        </div>

        <div className="indicators-chart">
          {selected && values === null && <LoadingState message="Loading data..." />}
          {selected && chartData.length > 0 && (
            <div className="card card-padded">
              <h3 className="chart-title">
                {selectedIndicator?.indicator_name}
                {selectedIndicator?.direction && (
                  <span className="chart-direction">
                    (
                    {selectedIndicator.direction === 'higher_better'
                      ? 'higher is better'
                      : 'lower is better'}
                    )
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
              <p className="chart-source">Source: {selectedIndicator?.source || 'Various'}</p>
            </div>
          )}
          {selected && values && chartData.length === 0 && (
            <div className="card card-empty">No state-level data available for this indicator.</div>
          )}
          {!selected && (
            <div className="card card-empty">Select an indicator to view state-level data.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Indicators
