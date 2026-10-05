import express from 'express';
import mongoose from 'mongoose';
import db from './config/database.js';
import Activity from './models/Activity.js';
import Leaderboard from './models/Leaderboard.js';
import Team from './models/Team.js';
import User from './models/User.js';
import Workout from './models/Workout.js';
import { createResourceRouter } from './routes/createResourceRouter.js';

export function createApp(baseUrl: string) {
  const app = express();

  app.use(express.json());

  app.use('/api/users', createResourceRouter(User));
  app.use('/api/teams', createResourceRouter(Team));
  app.use('/api/activities', createResourceRouter(Activity));
  app.use('/api/leaderboard', createResourceRouter(Leaderboard, { points: -1, rank: 1 }));
  app.use('/api/workouts', createResourceRouter(Workout));

  app.get('/api/health', (_request, response) => {
    const connected = db.readyState === 1;
    response.status(connected ? 200 : 503).json({
      status: connected ? 'ok' : 'unavailable',
      database: connected ? 'connected' : 'disconnected',
      baseUrl,
    });
  });

  app.use((_request, response) => {
    response.status(404).json({ error: 'Route not found' });
  });

  app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
    console.error('API request error:', error);

    if (error instanceof mongoose.Error.ValidationError) {
      response.status(400).json({ error: error.message });
      return;
    }

    if (error instanceof mongoose.Error.CastError) {
      response.status(400).json({ error: 'Invalid resource data' });
      return;
    }

    if (
      typeof error === 'object' &&
      error !== null &&
      'type' in error &&
      error.type === 'entity.parse.failed'
    ) {
      response.status(400).json({ error: 'Invalid JSON request body' });
      return;
    }

    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 11000
    ) {
      response.status(409).json({ error: 'A resource with that unique value already exists' });
      return;
    }

    response.status(500).json({ error: 'Internal server error' });
  });

  return app;
}
