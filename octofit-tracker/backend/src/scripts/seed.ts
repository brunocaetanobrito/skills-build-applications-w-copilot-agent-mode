import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Mona the Octocat', email: 'mona@example.com', points: 240 },
      { name: 'Octavius', email: 'octavius@example.com', points: 195 },
      { name: 'Sasha', email: 'sasha@example.com', points: 175 },
    ]);

    const teams = await Team.create([
      {
        name: 'Octocats',
        description: 'A friendly team focused on consistent movement.',
        members: [users[0]._id, users[1]._id],
        points: 435,
      },
      {
        name: 'Fitness Friends',
        description: 'Small steps and strong habits, together.',
        members: [users[2]._id],
        points: 175,
      },
    ]);

    users[0].team = teams[0]._id;
    users[1].team = teams[0]._id;
    users[2].team = teams[1]._id;
    await Promise.all(users.map((user) => user.save()));

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'running',
        durationMinutes: 30,
        distanceKm: 5,
        calories: 310,
        date: new Date('2026-09-28T08:00:00Z'),
      },
      {
        user: users[1]._id,
        type: 'cycling',
        durationMinutes: 45,
        distanceKm: 12,
        calories: 420,
        date: new Date('2026-09-29T17:30:00Z'),
      },
      {
        user: users[2]._id,
        type: 'walking',
        durationMinutes: 40,
        distanceKm: 3.2,
        calories: 180,
        date: new Date('2026-09-30T07:15:00Z'),
      },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, team: teams[0]._id, points: 240, rank: 1, period: 'week' },
      { user: users[1]._id, team: teams[0]._id, points: 195, rank: 2, period: 'week' },
      { user: users[2]._id, team: teams[1]._id, points: 175, rank: 3, period: 'week' },
    ]);

    await Workout.create([
      {
        name: 'Easy 5K Run',
        description: 'A comfortable-paced run to build aerobic endurance.',
        activityType: 'running',
        difficulty: 'beginner',
        durationMinutes: 30,
        goal: 'Complete 5 km at a conversational pace.',
      },
      {
        name: 'Strength Circuit',
        description: 'A full-body circuit using bodyweight movements.',
        activityType: 'strength',
        difficulty: 'intermediate',
        durationMinutes: 35,
        goal: 'Complete three controlled rounds.',
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    try {
      await mongoose.disconnect();
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
      process.exitCode = 1;
    }
  }
}

await seedDatabase();
