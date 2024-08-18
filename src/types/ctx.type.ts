import { JWTPayloadSpec } from "@elysiajs/jwt";
import { Server } from "bun";
import { redirect, StatusMap, error } from "elysia";
import { Cookie, ElysiaCookie } from "elysia/dist/cookies";
import { HTTPHeaders } from "elysia/dist/types";

export type CTX = {
  body: { email: string; name?: string; password: string };
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

export type CTXUnknownBody = {
  body: unknown;
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
