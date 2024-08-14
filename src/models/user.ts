import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
  name?: string;
  password: string;
  email: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      select: false, // will not appear in the response
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("users", userSchema);
