import { Payload } from "../types/payload.interface";
import { CTX, CTXUnknownBody } from "../types/ctx.type";

export const GenerateToken = async (ctx: CTX) => {
  let payload: Payload = {
    email: ctx.body.email,
    password: ctx.body.password,
  };
  if (ctx.body.name) payload["name"] = ctx.body.name;
  const token = await ctx.jwt.sign(payload);
  return token;
};

export const VerifyToken = async (
  ctx: CTXUnknownBody,
  token: string | undefined
) => {
  const data = await ctx.jwt.verify(token);
  return data;
};
