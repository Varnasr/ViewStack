import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import { LoadingState, ErrorState } from '../components/LoadingState'

function Schemes() {
  const [schemes, setSchemes] = useState(null)
  const [sectors, setSectors] = useState([])
  const [sectorFilter, setSectorFilter] = useState('')
  const [levelFilter, setLevelFilter] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    api.getSectors().then(setSectors).catch(() => {})
  }, [])

  useEffect(() => {
    api.getSchemes(sectorFilter || undefined, levelFilter || undefined)
      .then(setSchemes)
      .catch((e) => setError(e.message))
  }, [sectorFilter, levelFilter])

  if (error) return <ErrorState message={error} />
  if (!schemes) return <LoadingState />

  return (
    <div>
      <h1 className="page-title">Government Schemes</h1>

      <div className="filter-bar">
        <select value={sectorFilter} onChange={(e) => setSectorFilter(e.target.value)}>
          <option value="">All Sectors</option>
          {sectors.map((s) => (
            <option key={s.sector_id} value={s.sector_id}>{s.sector_name}</option>
          ))}
        </select>
        <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
          <option value="">All Levels</option>
          <option value="Central">Central</option>
          <option value="State">State</option>
          <option value="Central+State">Central+State</option>
        </select>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Scheme</th>
              <th>Ministry</th>
              <th>Level</th>
              <th>Since</th>
              <th>Beneficiaries</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {schemes.map((s) => (
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
                <td>{s.launch_year || '--'}</td>
                <td>{s.beneficiary_type || '--'}</td>
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
      <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--gray-500)' }}>
        {schemes.length} schemes
      </p>
    </div>
  )
}

export default Schemes
