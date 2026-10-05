import { model, Schema, Types } from 'mongoose';

export interface UserRecord {
  name: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
  points: number;
  team?: Types.ObjectId;
}

const userSchema: Schema<UserRecord> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    bio: { type: String, trim: true, maxlength: 500 },
    avatarUrl: { type: String, trim: true },
    points: { type: Number, default: 0, min: 0 },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

export default model('User', userSchema);
