import { Link, NavLink, Route, Routes } from 'react-router-dom'
import octofitLogo from './assets/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const pages = [
  { path: '/activities', title: 'Activities', Component: Activities },
  { path: '/leaderboard', title: 'Leaderboard', Component: Leaderboard },
  { path: '/teams', title: 'Teams', Component: Teams },
  { path: '/users', title: 'Users', Component: Users },
  { path: '/workouts', title: 'Workouts', Component: Workouts },
]

function App() {
  return (
    <>
      <header className="border-bottom bg-white">
        <nav className="container py-3" aria-label="Main navigation">
          <Link className="navbar-brand d-flex align-items-center gap-3" to="/">
            <img src={octofitLogo} width="64" height="64" alt="OctoFit logo" />
            <span className="fw-bold">OctoFit Tracker</span>
          </Link>
          <ul className="nav nav-pills flex-wrap mt-3">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>Home</NavLink>
            </li>
            {pages.map((page) => (
              <li className="nav-item" key={page.path}>
                <NavLink className="nav-link" to={page.path}>{page.title}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="container py-5">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Welcome to OctoFit Tracker</h1>
                <p className="lead">
                  Track activities, explore teams, and
                  reach your fitness goals.
                </p>
                <p>
                  Use the navigation to view activities, leaderboard rankings,
                  teams, user profiles, and workout suggestions.
                </p>
              </>
            }
          />
          {pages.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route
            path="*"
            element={
              <>
                <h1>Page not found</h1>
                <Link to="/">Return home</Link>
              </>
            }
          />
        </Routes>
      </main>
    </>
  )
}

export default App
