import mongoose from 'mongoose';
import app, { baseUrl } from './app.js';
import { connectDatabase } from './config/database.js';

const port = 8000;

async function startServer() {
  await connectDatabase();

  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit Tracker API listening at ${baseUrl}`);
  });

  server.on('error', (error) => {
    console.error('API server error:', error);
    process.exit(1);
  });

  for (const signal of ['SIGINT', 'SIGTERM'] as const) {
    process.once(signal, () => {
      server.close((error) => {
        if (error) {
          console.error('Error closing API server:', error);
          process.exitCode = 1;
        }
        mongoose.disconnect().catch((disconnectError) => {
          console.error('Error disconnecting MongoDB:', disconnectError);
          process.exitCode = 1;
        });
      });
    });
  }
}

startServer().catch((error) => {
  console.error('Failed to start OctoFit Tracker API:', error);
  process.exit(1);
});
