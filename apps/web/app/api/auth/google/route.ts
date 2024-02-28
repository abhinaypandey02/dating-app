import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { v4 } from "uuid";

export const GET = (req: NextRequest) => {
  const refresh = req.nextUrl.searchParams.get("refresh");
  const redirectURL = req.nextUrl.searchParams.get("redirectURL");
  const newState = req.nextUrl.searchParams.get("state");
  if (refresh && process.env.NEXT_PUBLIC_FRONTEND_BASE_URL) {
    const res = NextResponse.redirect(
      redirectURL || process.env.NEXT_PUBLIC_FRONTEND_BASE_URL,
    );
    const oldState = req.cookies.get("state")?.value;
    if (oldState === newState) {
      res.cookies.set("refresh", refresh, {
        httpOnly: true,
        secure: true,
      });
      res.cookies.set("state", "", {
        httpOnly: true,
        secure: true,
        maxAge: 0,
      });
    }
    return res;
  }
  const state = v4();
  const res = NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/google?state=${state}`,
  );
  res.cookies.set("state", state, {
    httpOnly: true,
    secure: true,
  });
  return res;
};
