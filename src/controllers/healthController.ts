import Elysia from "elysia";
import mongoose from "mongoose";

export const HealthController = new Elysia().get("/health", async () => {
  const result = await mongoose.connection.db.command({ ping: 1 });
  return result;
});
