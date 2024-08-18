import { CTXUnknownBody } from "../types/ctx.type";

export const AuthMiddleware = (ctx: CTXUnknownBody) => {
  if (!ctx.headers.authorization) {
    ctx.set.status = 401;
    return { success: false };
  }
};
