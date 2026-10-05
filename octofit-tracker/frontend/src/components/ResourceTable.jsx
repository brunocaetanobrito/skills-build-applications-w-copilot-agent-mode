import { useEffect, useState } from 'react'

function ResourceTable({ title, resource, columns, loadRecords }) {
  const [state, setState] = useState({ status: 'loading', records: [], error: '' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    loadRecords(controller.signal)
      .then((records) => {
        if (!controller.signal.aborted) {
          setState({ status: 'ready', records, error: '' })
        }
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          setState({ status: 'error', records: [], error: error.message })
        }
      })

    return () => controller.abort()
  }, [loadRecords, attempt])

  return (
    <section aria-labelledby={`${resource}-heading`}>
      <h1 id={`${resource}-heading`}>{title}</h1>
      {state.status === 'loading' && <p role="status">Loading {title.toLowerCase()}...</p>}
      {state.status === 'error' && (
        <div className="alert alert-danger" role="alert">
          <p>{state.error}</p>
          <button className="btn btn-outline-danger" onClick={() => {
            setState({ status: 'loading', records: [], error: '' })
            setAttempt((previous) => previous + 1)
          }}>
            Try again
          </button>
        </div>
      )}
      {state.status === 'ready' && (
        state.records.length === 0 ? (
          <p>No {title.toLowerCase()} found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <caption>{title}</caption>
              <thead>
                <tr>
                  {columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {state.records.map((record, index) => (
                  <tr key={record._id ?? record.id ?? index}>
                    {columns.map((column) => (
                      <td key={column.key}>
                        {column.render ? column.render(record) : record[column.key] ?? 'Not available'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </section>
  )
}

export default ResourceTable
