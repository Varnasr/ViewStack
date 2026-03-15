import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import { LoadingState, ErrorState } from '../components/LoadingState'
import { formatNumber } from '../utils/format'

function States() {
  const [states, setStates] = useState(null)
  const [region, setRegion] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    api.getStates(region || undefined)
      .then(setStates)
      .catch((e) => setError(e.message))
  }, [region])

  if (error) return <ErrorState message={error} />
  if (!states) return <LoadingState />

  return (
    <div>
      <h1 className="page-title">States & Union Territories</h1>

      <div className="filter-bar">
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="">All Regions</option>
          {['North', 'South', 'East', 'West', 'Central', 'Northeast'].map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>State / UT</th>
              <th>Region</th>
              <th>Type</th>
              <th>Capital</th>
              <th>Population (2011)</th>
            </tr>
          </thead>
          <tbody>
            {states.map((s) => (
              <tr key={s.state_id}>
                <td>
                  <Link to={`/states/${s.state_id}`}>{s.state_name}</Link>
                </td>
                <td>{s.region || '--'}</td>
                <td>{s.state_type || '--'}</td>
                <td>{s.capital || '--'}</td>
                <td>{formatNumber(s.census_2011_pop)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--gray-500)' }}>
        {states.length} {region ? `in ${region}` : 'total'}
      </p>
    </div>
  )
}

export default States
