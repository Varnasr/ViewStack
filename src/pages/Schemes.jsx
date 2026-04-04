import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import { LoadingState, ErrorState } from '../components/LoadingState'
import FilterBar from '../components/FilterBar'

function Schemes() {
  const [schemes, setSchemes] = useState(null)
  const [sectors, setSectors] = useState([])
  const [sectorFilter, setSectorFilter] = useState('')
  const [levelFilter, setLevelFilter] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .getSectors()
      .then(setSectors)
      .catch((e) => setError(e.message))
  }, [])

  useEffect(() => {
    api
      .getSchemes(sectorFilter || undefined, levelFilter || undefined)
      .then(setSchemes)
      .catch((e) => setError(e.message))
  }, [sectorFilter, levelFilter])

  if (error) return <ErrorState message={error} />
  if (!schemes) return <LoadingState />

  return (
    <div>
      <h1 className="page-title">Government Schemes</h1>

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
          {
            id: 'level',
            label: 'Filter by level',
            placeholder: 'All Levels',
            value: levelFilter,
            onChange: setLevelFilter,
            options: [
              { value: 'Central', label: 'Central' },
              { value: 'State', label: 'State' },
              { value: 'Central+State', label: 'Central+State' },
            ],
          },
        ]}
      />

      <div className="table-wrap">
        <table>
          <caption className="sr-only">Government schemes</caption>
          <thead>
            <tr>
              <th scope="col">Scheme</th>
              <th scope="col">Ministry</th>
              <th scope="col">Level</th>
              <th scope="col">Since</th>
              <th scope="col">Beneficiaries</th>
              <th scope="col">Status</th>
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
      <p className="table-count">{schemes.length} schemes</p>
    </div>
  )
}

export default Schemes
