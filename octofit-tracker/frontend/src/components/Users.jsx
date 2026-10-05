import { formatReference } from '../api.js'
import ResourceTable from './ResourceTable.jsx'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'bio', label: 'Bio' },
  { key: 'team', label: 'Team', render: (user) => formatReference(user.team) },
  { key: 'points', label: 'Points' },
]

function Users() {
  return <ResourceTable title="Users" resource="users" columns={columns} />
}

export default Users
