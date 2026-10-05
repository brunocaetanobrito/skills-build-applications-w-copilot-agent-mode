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

## API configuration

For Codespaces, `VITE_CODESPACE_NAME` must be defined, for example in
`octofit-tracker/frontend/.env.local` (ignored by Git):

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Use the value of the Codespaces `CODESPACE_NAME` variable, not a URL.
Vite exposes this public setting through `import.meta.env.VITE_CODESPACE_NAME`;
never put secrets in `VITE_` variables. Restart Vite after changing it and
rebuild for production because Vite embeds environment variables at build time.

The API base URL is `https://<VITE_CODESPACE_NAME>-8000.app.github.dev`.
If the variable is unset or blank, the safe local fallback is
`http://localhost:8000`; no URL containing `undefined` is generated.
During development, requests use Vite's same-origin `/api` proxy to the local
backend on port 8000, avoiding CORS. Production builds use the configured API
base URL directly; the API host must allow the presentation origin via CORS.
The current Express scaffold does not enable cross-origin access, so production
cross-origin API access requires CORS configuration on the backend.

The presentation routes are `/activities`, `/leaderboard`, `/teams`, `/users`,
and `/workouts`. They request `/api/activities/`, `/api/leaderboard/`,
`/api/teams/`, `/api/users/`, and `/api/workouts/`, respectively.
Lists accept either a JSON array or a paginated `{ "results": [...] }` response.
For paginated responses, the current page's results are displayed.
Each view includes loading, empty, error, and retry states.
Each resource component declares its endpoint through the shared `api.fetch`
client; the shared table handles loading and rendering without choosing the API route.

```bash
npm run lint --prefix octofit-tracker/frontend
npm test --prefix octofit-tracker/frontend
npm run build --prefix octofit-tracker/frontend
npm run preview --prefix octofit-tracker/frontend
```

Preview also uses port 5173; stop the development server before previewing.
The development API proxy is not a production deployment configuration.
Production hosting must serve the frontend with an SPA fallback for React
Router and allow access to the configured API host.
