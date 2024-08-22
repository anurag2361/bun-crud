import { StatusCodes } from "../types/http.status";
import User from "./../models/user";

export const SaveUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();
  } catch (error) {
    throw error;
  }
};

export const FindUser = async (email: string, password: string) => {
  try {
    const userData = await User.findOne({ email }).select("+password"); // Make sure to include the password field
    if (!userData) {
      // User not found
      console.log("User Not Found");
      return { data: null, status: StatusCodes.NOT_FOUND };
    } else if (userData && !(await userData.comparePassword(password))) {
      // Passwords don't match
      console.log("Authentication failed");
      return { data: null, status: StatusCodes.UNAUTHORIZED };
    } else if (userData && (await userData.comparePassword(password))) {
      // Passwords match
      console.log("Authentication successful");
      return { data: userData, status: StatusCodes.OK };
    }
  } catch (error) {
    throw error;
  }
};
