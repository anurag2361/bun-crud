import { Elysia } from "elysia";
import { AuthController } from "./controllers/userController";
import swagger from "@elysiajs/swagger";
//import { logger } from "@grotto/logysia";

import cors from "@elysiajs/cors";
import { connectDB } from "./database/db";
import { HealthController } from "./controllers/healthController";

const port = process.env.PORT!;

await connectDB();

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      path: "/v1/swagger",
      documentation: {
        info: {
          title: "Bun.js CRUD app with Elysia.js",
          version: "1.0.0",
        },
      },
    })
  )
  //.use(logger())
  .use(HealthController)
  .use(AuthController)
  .listen(+port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
