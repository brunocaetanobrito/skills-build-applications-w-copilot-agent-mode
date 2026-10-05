import ResourceTable from './ResourceTable.jsx'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'description', label: 'Description' },
  { key: 'activityType', label: 'Activity' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'durationMinutes', label: 'Duration (minutes)' },
  { key: 'goal', label: 'Goal' },
]

function Workouts() {
  return <ResourceTable title="Workouts" resource="workouts" columns={columns} />
}

export default Workouts
