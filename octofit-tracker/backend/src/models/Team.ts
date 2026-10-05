import { model, Schema, Types } from 'mongoose';

export interface TeamRecord {
  name: string;
  description?: string;
  members: Types.ObjectId[];
  points: number;
}

const teamSchema: Schema<TeamRecord> = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true, maxlength: 1000 },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

export default model('Team', teamSchema);
