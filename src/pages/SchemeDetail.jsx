import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { api } from '../api/client'
import { LoadingState, ErrorState } from '../components/LoadingState'
import { formatCrores, formatPercent, utilizationColor } from '../utils/format'

function SchemeDetail() {
  const { schemeId } = useParams()
  const [scheme, setScheme] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .getScheme(schemeId)
      .then(setScheme)
      .catch((e) => setError(e.message))
  }, [schemeId])

  if (error) return <ErrorState message={error} />
  if (!scheme) return <LoadingState />

  const budgetData = (scheme.budgets || [])
    .sort((a, b) => (a.fiscal_year || '').localeCompare(b.fiscal_year || ''))
    .map((b) => ({
      year: b.fiscal_year || '',
      Allocated: b.allocated_crores || 0,
      Spent: b.spent_crores || 0,
      Revised: b.revised_crores || 0,
    }))

  const latestBudget =
    scheme.budgets && scheme.budgets.length > 0
      ? scheme.budgets[scheme.budgets.length - 1]
      : null

  const utilization =
    latestBudget && latestBudget.allocated_crores && latestBudget.spent_crores
      ? (latestBudget.spent_crores / latestBudget.allocated_crores) * 100
      : null

  return (
    <div>
      <Link to="/schemes" className="back-link">
        Back to Schemes
      </Link>
      <h1 className="page-title">{scheme.scheme_name}</h1>

      {scheme.description && <p className="scheme-description">{scheme.description}</p>}

      <div className="card-grid">
        <div className="card">
          <h3>Ministry</h3>
          <div className="value value-md">{scheme.ministry || '--'}</div>
        </div>
        <div className="card">
          <h3>Level</h3>
          <div className="value value-md">{scheme.level || '--'}</div>
        </div>
        <div className="card">
          <h3>Since</h3>
          <div className="value value-lg">{scheme.launch_year || '--'}</div>
        </div>
        {latestBudget && (
          <div className="card">
            <h3>Latest Budget ({latestBudget.fiscal_year})</h3>
            <div className="value value-sm">{formatCrores(latestBudget.allocated_crores)}</div>
            {utilization !== null && (
              <div className="subtitle" style={{ color: utilizationColor(utilization) }}>
                {formatPercent(utilization)} utilization
              </div>
            )}
          </div>
        )}
      </div>

      {budgetData.length > 0 && (
        <>
          <h2 className="section-title">Budget Trend</h2>
          <div className="card card-padded">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={budgetData}>
                <XAxis dataKey="year" fontSize={12} />
                <YAxis fontSize={12} tickFormatter={(v) => `${v} Cr`} />
                <Tooltip formatter={(v) => `Rs ${v.toLocaleString('en-IN')} Cr`} />
                <Legend />
                <Bar dataKey="Allocated" fill="#93c5fd" />
                <Bar dataKey="Spent" fill="#1a56db" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {scheme.coverage && scheme.coverage.length > 0 && (
        <>
          <h2 className="section-title">Coverage by State</h2>
          <div className="table-wrap">
            <table>
              <caption className="sr-only">Scheme coverage by state</caption>
              <thead>
                <tr>
                  <th scope="col">State</th>
                  <th scope="col">Year</th>
                  <th scope="col">Beneficiaries</th>
                  <th scope="col">Target</th>
                  <th scope="col">Achievement</th>
                </tr>
              </thead>
              <tbody>
                {scheme.coverage.map((c, i) => (
                  <tr key={i}>
                    <td>{c.state_id}</td>
                    <td>{c.year || '--'}</td>
                    <td>{c.beneficiaries ? c.beneficiaries.toLocaleString('en-IN') : '--'}</td>
                    <td>{c.target ? c.target.toLocaleString('en-IN') : '--'}</td>
                    <td>
                      {c.achievement_pct !== null && c.achievement_pct !== undefined
                        ? formatPercent(c.achievement_pct)
                        : '--'}
                    </td>
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

export default SchemeDetail
