import { model, Schema, Types } from 'mongoose';

export interface ActivityRecord {
  user: Types.ObjectId;
  type: 'running' | 'cycling' | 'swimming' | 'strength' | 'walking' | 'other';
  durationMinutes: number;
  distanceKm?: number;
  calories?: number;
  date: Date;
}

const activitySchema: Schema<ActivityRecord> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: {
      type: String,
      enum: ['running', 'cycling', 'swimming', 'strength', 'walking', 'other'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    calories: { type: Number, min: 0 },
    date: { type: Date, default: Date.now, required: true },
  },
  { timestamps: true },
);

export default model('Activity', activitySchema);
