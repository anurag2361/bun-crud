import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia";
import User from "../models/user";

export const AuthController = new Elysia().group("/user", (app) =>
  app
    .use(jwt({ secret: Bun.env.JWT_SECRET!, exp: Bun.env.JWT_EXPIRY! }))
    .post(
      "/signup",
      async (ctx) => {
        try {
          console.log(ctx);
          const newUser = new User({
            name: ctx.body.name,
            email: ctx.body.email,
            password: ctx.body.password,
          });
          await newUser.save();
          const token = await ctx.jwt.sign({
            name: ctx.body.name,
            email: ctx.body.email,
            password: ctx.body.password,
          });
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
          const finduser = await User.findOne({
            email: ctx.body.email,
            password: ctx.body.password,
          });
          if (finduser) {
            const token = await ctx.jwt.sign({
              name: finduser.name!,
              email: ctx.body.email,
              password: ctx.body.password,
            });
            return { success: true, token };
          } else {
            ctx.set.status = 404;
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
      if (!ctx.headers.authorization) {
        ctx.set.status = 401;
        return { success: false };
      }
    })
    .post("/profile", async (ctx) => {
      const token = ctx.headers.authorization;
      const verify = await ctx.jwt.verify(token);
      console.log(verify);
      if (verify) {
        return { success: true, profile: verify };
      } else {
        ctx.set.status = 401;
        return { success: false };
      }
    })
);
