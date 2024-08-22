import { JWTPayloadSpec } from "@elysiajs/jwt";
import { Server } from "bun";
import { redirect, StatusMap, error } from "elysia";
import { Cookie, ElysiaCookie } from "elysia/dist/cookies";
import { HTTPHeaders } from "elysia/dist/types";

// Define a base type with common properties
export type BaseCTX = {
  query: Record<string, string | undefined>;
  params: never;
  headers: Record<string, string | undefined>;
  cookie: Record<string, Cookie<string | undefined>>;
  server: Server | null;
  redirect: redirect;
  set: {
    headers: HTTPHeaders;
    status?: number | keyof StatusMap;
    redirect?: string;
    cookie?: Record<string, ElysiaCookie>;
  };
  path: string;
  route: string;
  request: Request;
  store: {};
  response?: {} | undefined;
  error: typeof error;
  jwt: {
    readonly sign: (
      morePayload: Record<string, string | number> & JWTPayloadSpec
    ) => Promise<string>;
    readonly verify: (
      jwt?: string
    ) => Promise<false | (Record<string, string | number> & JWTPayloadSpec)>;
  };
};

// Extend the base type for specific context with known body
export type CTX = BaseCTX & {
  body: { email: string; name?: string; password: string };
};

// Extend the base type for specific context with unknown body
export type CTXUnknownBody = BaseCTX & {
  body: unknown;
};
