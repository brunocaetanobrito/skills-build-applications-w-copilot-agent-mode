import { Link, Route, Routes } from 'react-router-dom'
import octofitLogo from './assets/octofitapp-small.png'

function App() {
  return (
    <>
      <header className="border-bottom bg-white">
        <nav className="container py-3" aria-label="Main navigation">
          <Link className="navbar-brand d-flex align-items-center gap-3" to="/">
            <img src={octofitLogo} width="64" height="64" alt="OctoFit logo" />
            <span className="fw-bold">OctoFit Tracker</span>
          </Link>
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
                  A foundation for tracking activities, building teams, and
                  reaching your fitness goals.
                </p>
                <p>
                  The React presentation, Express API, and MongoDB data tiers
                  are initialized. Fitness features will be added next.
                </p>
              </>
            }
          />
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
