# Build Applications with GitHub Copilot Agent Mode

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

Hey brunocaetanobrito!

Mona here. I'm done preparing your exercise. Hope you enjoy! 💚

Remember, it's self-paced so feel free to take a break! ☕️

[![](https://img.shields.io/badge/Go%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/brunocaetanobrito/skills-build-applications-w-copilot-agent-mode/issues/1)

## OctoFit Tracker foundation

- [Presentation tier](octofit-tracker/frontend): React 19, Vite, React Router,
  and Bootstrap on port **5173**.
- [Logic tier](octofit-tracker/backend): Node.js LTS, Express, and TypeScript
  on port **8000**.
- Data tier: MongoDB on private port **27017**, accessed with Mongoose in
  the `octofit_db` database.

Use Node.js LTS (22.12+; Node.js 24 LTS recommended). Run all commands from
the repository root without changing directories.

```bash
npm ci --prefix octofit-tracker/frontend
npm ci --prefix octofit-tracker/backend
ps aux | grep mongod
```

Ensure the official `mongodb-org` service is running on port 27017. The
Codespaces startup script provides this service. The backend defaults to
`mongodb://127.0.0.1:27017/octofit_db`; set `MONGODB_URI` in the backend's
environment if needed. The database name remains `octofit_db`.

Start each application in a separate terminal:

```bash
npm run dev --prefix octofit-tracker/backend
npm run dev --prefix octofit-tracker/frontend
```

The API waits for MongoDB before accepting requests. Check it directly or
through the Vite development proxy:

```bash
curl --fail http://localhost:8000/api/health
curl --fail http://localhost:5173/api/health
```

The health endpoint returns HTTP 200 when MongoDB is connected and HTTP 503
when disconnected. API startup failures are logged and exit with an error.
The advertised API URL uses `CODESPACE_NAME` in Codespaces and falls back
to `http://localhost:8000` locally. The server entry point constructs this
URL and passes it to the Express application for its health response.
Forward only 5173 and 8000 publicly;
keep 27017 private.

Verify the users and activities endpoints locally:

```bash
curl --fail --show-error http://localhost:8000/api/users
curl --fail --show-error http://localhost:8000/api/activities
```

For the environment-aware API URL, use the Codespaces HTTPS address when
`CODESPACE_NAME` is set and localhost otherwise:

```bash
if [ -n "$CODESPACE_NAME" ]; then
  API_BASE_URL="https://${CODESPACE_NAME}-8000.app.github.dev"
else
  API_BASE_URL="http://localhost:8000"
fi

curl --fail --show-error "$API_BASE_URL/api/users"
curl --fail --show-error "$API_BASE_URL/api/activities"
```

Both endpoints return HTTP 200 with a JSON array (empty until records are
created or seeded). When using `npm start`, rebuild and restart the backend
after source changes so the running API includes the latest routes.

Build and validate:

```bash
npm run lint --prefix octofit-tracker/frontend
npm run build --prefix octofit-tracker/frontend
npm run typecheck --prefix octofit-tracker/backend
npm run build --prefix octofit-tracker/backend
npm start --prefix octofit-tracker/backend
```

The backend includes Mongoose models and CRUD API routes for users, teams,
activities, leaderboard entries, and workouts. Populate sample records with
`npm run seed --prefix octofit-tracker/backend`; the command clears and
recreates those collections in `octofit_db`. Authentication is not included
in this foundation.
