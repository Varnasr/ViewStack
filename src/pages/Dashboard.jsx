import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import StatCard from '../components/StatCard'
import { LoadingState, ErrorState } from '../components/LoadingState'

function Dashboard() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([
      api.getStates(),
      api.getSchemes(),
      api.getIndicators(),
      api.getSectors(),
    ])
      .then(([states, schemes, indicators, sectors]) => {
        setData({ states, schemes, indicators, sectors })
      })
      .catch((e) => setError(e.message))
  }, [])

  if (error) return <ErrorState message={error} />
  if (!data) return <LoadingState />

  const activeSchemes = data.schemes.filter((s) => s.status === 'Active')

  return (
    <div>
      <h1 className="page-title">Development Data Dashboard</h1>

      <div className="card-grid">
        <StatCard label="States & UTs" value={data.states.length} subtitle="Geographic coverage" />
        <StatCard label="Active Schemes" value={activeSchemes.length} subtitle="Government programs" />
        <StatCard label="Indicators" value={data.indicators.length} subtitle="Development metrics" />
        <StatCard label="Sectors" value={data.sectors.length} subtitle="Thematic areas" />
      </div>

      <h2 style={{ margin: '2rem 0 1rem', fontSize: '1.1rem', fontWeight: 600 }}>
        Government Schemes
      </h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Scheme</th>
              <th>Ministry</th>
              <th>Level</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.schemes.slice(0, 10).map((s) => (
              <tr key={s.scheme_id}>
                <td>
                  <Link to={`/schemes/${s.scheme_id}`}>{s.scheme_name}</Link>
                </td>
                <td>{s.ministry || '--'}</td>
                <td>
                  <span className={`badge badge-${s.level === 'Central' ? 'central' : 'state'}`}>
                    {s.level}
                  </span>
                </td>
                <td>
                  <span className={`badge ${s.status === 'Active' ? 'badge-active' : ''}`}>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.schemes.length > 10 && (
        <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
          <Link to="/schemes">View all {data.schemes.length} schemes</Link>
        </p>
      )}

      <h2 style={{ margin: '2rem 0 1rem', fontSize: '1.1rem', fontWeight: 600 }}>
        States by Region
      </h2>
      <div className="card-grid">
        {['North', 'South', 'East', 'West', 'Central', 'Northeast'].map((region) => {
          const regionStates = data.states.filter((s) => s.region === region)
          return (
            <div className="card" key={region}>
              <h3>{region}</h3>
              <div className="value">{regionStates.length}</div>
              <div className="subtitle">
                {regionStates
                  .slice(0, 3)
                  .map((s) => s.state_name)
                  .join(', ')}
                {regionStates.length > 3 && '...'}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard
