# OctoFit Tracker presentation tier

React 19 and Vite, with React Router for navigation and Bootstrap for styling.
The app logo is copied from [the repository logo](../../docs/octofitapp-small.png).

Run these commands from the repository root:

```bash
npm ci --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```

Vite listens on `0.0.0.0:5173` and refuses to switch ports when 5173 is occupied.
During development, `/api` requests are proxied to the backend on port 8000.
The backend must be running for these requests to succeed.

```bash
npm run lint --prefix octofit-tracker/frontend
npm run build --prefix octofit-tracker/frontend
npm run preview --prefix octofit-tracker/frontend
```

Preview also uses port 5173; stop the development server before previewing.
The development API proxy is not a production deployment configuration.
Production hosting must route `/api` to the backend and serve the frontend
with an SPA fallback for React Router.
