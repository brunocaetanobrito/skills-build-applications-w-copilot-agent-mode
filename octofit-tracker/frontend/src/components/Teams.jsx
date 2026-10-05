import { api, formatReference } from '../api.js'
import ResourceTable from './ResourceTable.jsx'

const loadRecords = (signal) => api.fetch('/api/teams/', signal)

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'description', label: 'Description' },
  {
    key: 'members',
    label: 'Members',
    render: (team) => team.members?.map(formatReference).join(', ') || 'No members',
  },
  { key: 'points', label: 'Points' },
]

function Teams() {
  return <ResourceTable title="Teams" resource="teams" columns={columns} loadRecords={loadRecords} />
}

export default Teams
