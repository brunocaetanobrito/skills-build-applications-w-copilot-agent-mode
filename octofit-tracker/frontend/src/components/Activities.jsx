import { api, formatReference } from '../api.js'
import ResourceTable from './ResourceTable.jsx'

const loadRecords = (signal) => api.fetch('/api/activities/', signal)

const columns = [
  { key: 'user', label: 'User', render: (activity) => formatReference(activity.user) },
  { key: 'type', label: 'Activity' },
  { key: 'durationMinutes', label: 'Duration (minutes)' },
  { key: 'distanceKm', label: 'Distance (km)' },
  { key: 'calories', label: 'Calories' },
  { key: 'date', label: 'Date' },
]

function Activities() {
  return <ResourceTable title="Activities" resource="activities" columns={columns} loadRecords={loadRecords} />
}

export default Activities
