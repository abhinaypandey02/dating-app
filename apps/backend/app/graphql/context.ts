import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

export interface Context {
  userId: string | null;
}

export function context(req: NextRequest): Context {
  const bearer = req.headers.get("authorization");
  if (bearer && process.env.SIGNING_KEY) {
    const token = bearer.slice(7);
    try {
      const res = verify(token, process.env.SIGNING_KEY);
      return { userId: typeof res !== "string" ? (res.id as string) : null };
    } catch (e) {
      return { userId: null };
    }
  }
  return { userId: null };
}
