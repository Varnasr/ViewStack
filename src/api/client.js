const BASE_URL = '/api/v1'

async function fetchApi(path, params = {}) {
  const url = new URL(path, window.location.origin)
  url.pathname = BASE_URL + path
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== '') url.searchParams.set(k, v)
  })
  const res = await fetch(url)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export const api = {
  // Geography
  getStates: (region) => fetchApi('/geography/states', { region }),
  getState: (id) => fetchApi(`/geography/states/${id}`),
  getDistricts: (stateId) => fetchApi('/geography/districts', { state_id: stateId }),

  // Sectors
  getSectors: () => fetchApi('/sectors/'),

  // Indicators
  getIndicators: (sectorId) => fetchApi('/indicators/', { sector_id: sectorId }),
  getIndicator: (id) => fetchApi(`/indicators/${id}`),
  getIndicatorValues: (indicatorId, stateId) =>
    fetchApi('/indicators/values/', { indicator_id: indicatorId, state_id: stateId }),

  // Policies
  getSchemes: (sectorId, level) => fetchApi('/policies/schemes', { sector_id: sectorId, level }),
  getScheme: (id) => fetchApi(`/policies/schemes/${id}`),
  getBudgets: (schemeId) => fetchApi('/policies/budgets', { scheme_id: schemeId }),

  // Tools
  getTools: (stack) => fetchApi('/tools/', { stack }),
}
