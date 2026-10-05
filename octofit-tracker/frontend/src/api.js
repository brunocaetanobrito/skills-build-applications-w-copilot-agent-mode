export function getApiBaseUrl(codespaceName) {
  const name = codespaceName?.trim()
  if (!name) return 'http://localhost:8000'
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
    throw new Error('VITE_CODESPACE_NAME must be a valid Codespace name.')
  }
  return `https://${name}-8000.app.github.dev`
}

export function normalizeListResponse(data) {
  const records = Array.isArray(data) ? data : data?.results
  if (!Array.isArray(records) || records.some(
    (record) => typeof record !== 'object' || record === null || Array.isArray(record),
  )) {
    throw new Error('The API returned an invalid list response.')
  }
  return records
}

async function fetchRecords(path, signal) {
  const baseUrl = getApiBaseUrl(import.meta.env.VITE_CODESPACE_NAME)
  // Vite's same-origin proxy avoids CORS during development.
  const response = await fetch(import.meta.env.DEV ? path : `${baseUrl}${path}`, { signal })
  if (!response.ok) {
    throw new Error(`Unable to load ${path} (HTTP ${response.status}).`)
  }
  return normalizeListResponse(await response.json())
}

export const api = { fetch: fetchRecords }

export function formatReference(value) {
  if (value && typeof value === 'object') {
    return value.name ?? value.email ?? value._id ?? value.id ?? 'Not available'
  }
  return value ?? 'Not available'
}
