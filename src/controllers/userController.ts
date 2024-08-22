import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia";
import { AuthMiddleware } from "../libs/auth.middleware";
import { FindUser, SaveUser } from "../services/user.service";
import { GenerateToken, VerifyToken } from "../libs/utils";
import { StatusCodes } from "../types/http.status";

export const AuthController = new Elysia().group("/user", (app) =>
  app
    .use(jwt({ secret: Bun.env.JWT_SECRET!, exp: Bun.env.JWT_EXPIRY! }))
    .post(
      "/signup",
      async (ctx) => {
        try {
          console.log(ctx);
          const saveUser = await SaveUser(
            ctx.body.name,
            ctx.body.email,
            ctx.body.password
          );
          const token = await GenerateToken(ctx);
          return { success: true, token };
        } catch (err) {
          return { success: false, error: err };
        }
      },
      {
        body: t.Object({
          email: t.String(),
          name: t.String(),
          password: t.String(),
        }),
      }
    )
    .post(
      "/login",
      async (ctx) => {
        try {
          const user = await FindUser(ctx.body.email, ctx.body.password);
          if (user!.data) {
            const token = await GenerateToken(ctx);
            return { success: true, token };
          } else if (user!.status === StatusCodes.UNAUTHORIZED) {
            ctx.set.status = StatusCodes.UNAUTHORIZED;
            return { success: false, message: "Password Mismatch" };
          } else {
            ctx.set.status = StatusCodes.NOT_FOUND;
            return { success: false, message: "User not found" };
          }
        } catch (err) {
          return { success: false, error: err };
        }
      },
      {
        body: t.Object({
          email: t.String(),
          password: t.String(),
        }),
      }
    )
    .onBeforeHandle((ctx) => {
      AuthMiddleware(ctx);
    })
    .get("/profile", async (ctx) => {
      const token = ctx.headers.authorization;
      const userData = await VerifyToken(ctx, token);
      if (userData) {
        return { success: true, profile: userData };
      } else {
        ctx.set.status = StatusCodes.UNAUTHORIZED;
        return { success: false };
      }
    })
);
