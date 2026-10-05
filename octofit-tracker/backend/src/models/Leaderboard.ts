import { model, Schema, Types } from 'mongoose';

export interface LeaderboardRecord {
  user: Types.ObjectId;
  team?: Types.ObjectId;
  points: number;
  rank: number;
  period: 'week' | 'month' | 'all-time';
}

const leaderboardSchema: Schema<LeaderboardRecord> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, enum: ['week', 'month', 'all-time'], default: 'week' },
  },
  { timestamps: true },
);

leaderboardSchema.index({ period: 1, rank: 1 });

export default model('Leaderboard', leaderboardSchema);
