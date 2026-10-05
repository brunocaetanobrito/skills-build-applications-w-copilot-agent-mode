import { api, formatReference } from '../api.js'
import ResourceTable from './ResourceTable.jsx'

const loadRecords = (signal) => api.fetch('/api/leaderboard/', signal)

const columns = [
  { key: 'rank', label: 'Rank' },
  { key: 'user', label: 'User', render: (entry) => formatReference(entry.user) },
  { key: 'team', label: 'Team', render: (entry) => formatReference(entry.team) },
  { key: 'points', label: 'Points' },
  { key: 'period', label: 'Period' },
]

function Leaderboard() {
  return <ResourceTable title="Leaderboard" resource="leaderboard" columns={columns} loadRecords={loadRecords} />
}

export default Leaderboard
