import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../api/client'
import { LoadingState, ErrorState } from '../components/LoadingState'
import { formatNumber } from '../utils/format'

function StateDetail() {
  const { stateId } = useParams()
  const [state, setState] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.getState(stateId)
      .then(setState)
      .catch((e) => setError(e.message))
  }, [stateId])

  if (error) return <ErrorState message={error} />
  if (!state) return <LoadingState />

  return (
    <div>
      <Link to="/states" className="back-link">Back to States</Link>
      <h1 className="page-title">{state.state_name}</h1>

      <div className="card-grid">
        <div className="card">
          <h3>Region</h3>
          <div className="value" style={{ fontSize: '1.25rem' }}>{state.region || '--'}</div>
        </div>
        <div className="card">
          <h3>Type</h3>
          <div className="value" style={{ fontSize: '1.25rem' }}>{state.state_type || '--'}</div>
        </div>
        <div className="card">
          <h3>Capital</h3>
          <div className="value" style={{ fontSize: '1.25rem' }}>{state.capital || '--'}</div>
        </div>
        <div className="card">
          <h3>Population (2011)</h3>
          <div className="value" style={{ fontSize: '1.25rem' }}>{formatNumber(state.census_2011_pop)}</div>
        </div>
      </div>

      {state.districts && state.districts.length > 0 && (
        <>
          <h2 style={{ margin: '2rem 0 1rem', fontSize: '1.1rem', fontWeight: 600 }}>
            Districts ({state.districts.length})
          </h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>District</th>
                  <th>Tier</th>
                  <th>Population (2011)</th>
                </tr>
              </thead>
              <tbody>
                {state.districts.map((d) => (
                  <tr key={d.district_id}>
                    <td>{d.district_name}</td>
                    <td>{d.tier || '--'}</td>
                    <td>{formatNumber(d.census_2011_pop)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default StateDetail
