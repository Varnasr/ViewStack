import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import { LoadingState, ErrorState } from '../components/LoadingState'
import FilterBar from '../components/FilterBar'
import { formatNumber } from '../utils/format'

function States() {
  const [states, setStates] = useState(null)
  const [region, setRegion] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .getStates(region || undefined)
      .then(setStates)
      .catch((e) => setError(e.message))
  }, [region])

  if (error) return <ErrorState message={error} />
  if (!states) return <LoadingState />

  return (
    <div>
      <h1 className="page-title">States & Union Territories</h1>

      <FilterBar
        filters={[
          {
            id: 'region',
            label: 'Filter by region',
            placeholder: 'All Regions',
            value: region,
            onChange: setRegion,
            options: ['North', 'South', 'East', 'West', 'Central', 'Northeast'].map((r) => ({
              value: r,
              label: r,
            })),
          },
        ]}
      />

      <div className="table-wrap">
        <table>
          <caption className="sr-only">States and Union Territories</caption>
          <thead>
            <tr>
              <th scope="col">State / UT</th>
              <th scope="col">Region</th>
              <th scope="col">Type</th>
              <th scope="col">Capital</th>
              <th scope="col">Population (2011)</th>
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
      <p className="table-count">
        {states.length} {region ? `in ${region}` : 'total'}
      </p>
    </div>
  )
}

export default States
