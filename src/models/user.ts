import { Document, model, Schema } from "mongoose";
import argon2 from "argon2";

export interface IUser extends Document {
  name?: string;
  password: string;
  email: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
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

// Hash password before saving
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Hash the password using argon2
    this.password = await argon2.hash(this.password);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  try {
    // Verify the password
    return await argon2.verify(this.password, candidatePassword);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

export default model<IUser>("users", userSchema);
