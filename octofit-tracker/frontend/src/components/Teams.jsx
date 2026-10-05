import { formatReference } from '../api.js'
import ResourceTable from './ResourceTable.jsx'

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
  return <ResourceTable title="Teams" resource="teams" columns={columns} />
}

export default Teams
