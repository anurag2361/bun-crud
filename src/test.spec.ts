import { edenTreaty } from "@elysiajs/eden";
import { describe, expect, it } from "bun:test";
import type { App } from "./index";
import "./index";

const api = edenTreaty<App>("localhost:8081");

describe("Health Check", () => {
  it("returns a response", async () => {
    const { data, error } = await api.health.get();
    expect(data).toEqual({ ok: 1 });
  });
});
