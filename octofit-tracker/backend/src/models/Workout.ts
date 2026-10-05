import { model, Schema } from 'mongoose';

export interface WorkoutRecord {
  name: string;
  description: string;
  activityType: 'running' | 'cycling' | 'swimming' | 'strength' | 'walking' | 'other';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  goal: string;
}

const workoutSchema: Schema<WorkoutRecord> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true, maxlength: 2000 },
    activityType: {
      type: String,
      enum: ['running', 'cycling', 'swimming', 'strength', 'walking', 'other'],
      required: true,
    },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    goal: { type: String, required: true, trim: true, maxlength: 500 },
  },
  { timestamps: true },
);

export default model('Workout', workoutSchema);
