function FilterBar({ filters }) {
  return (
    <div className="filter-bar" role="search" aria-label="Filter options">
      {filters.map((filter) => (
        <label key={filter.id} className="filter-label">
          <span className="sr-only">{filter.label}</span>
          <select
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            aria-label={filter.label}
          >
            <option value="">{filter.placeholder}</option>
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  )
}

export default FilterBar
