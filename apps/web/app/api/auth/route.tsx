import { NextResponse } from "next/server";

async function handleAuth(req: Request) {
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/email`,
    {
      method: req.method,
      body: ["GET", "DELETE"].includes(req.method)
        ? undefined
        : await req.text(),
      credentials: "include",
      headers: ["DELETE"].includes(req.method)
        ? undefined
        : {
            Cookie: req.headers.get("Cookie") || "",
          },
    },
  );
  return new NextResponse(await res.text(), {
    headers: {
      "Set-Cookie": res.headers.get("Set-Cookie") || "",
    },
  });
}
export const PUT = handleAuth;
export const POST = handleAuth;
export const GET = handleAuth;
export const DELETE = handleAuth;
export const runtime = "edge";
