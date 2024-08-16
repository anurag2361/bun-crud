import { Elysia } from "elysia";
import { AuthController } from "./controllers/userController";
import swagger from "@elysiajs/swagger";
import { logger } from "@grotto/logysia";
import { helmet } from "elysia-helmet";

import cors from "@elysiajs/cors";
import { connectDB } from "./database/db";
import { HealthController } from "./controllers/healthController";

const port = process.env.PORT!;

await connectDB();
const name = "Test Server";

const app = new Elysia({ name })
  .use(cors())
  .use(helmet({}))
  .use(
    swagger({
      documentation: {
        info: {
          title: `${name} - Documentation`,
          version: "1.0.0",
        },
      },
      path: "/docs",
    })
  )
  .use(logger())
  .use(HealthController)
  .use(AuthController)
  .listen(+port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
