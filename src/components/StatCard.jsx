function StatCard({ label, value, subtitle }) {
  return (
    <div className="card">
      <h3>{label}</h3>
      <div className="value">{value}</div>
      {subtitle && <div className="subtitle">{subtitle}</div>}
    </div>
  )
}

export default StatCard
