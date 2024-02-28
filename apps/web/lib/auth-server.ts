import { cookies } from "next/headers";

export async function getServerToken() {
  const token = cookies().get("refresh")?.value;
  if (!token) return null;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/email`,
    {
      headers: {
        Cookie: `refresh=${token};`,
      },
    },
  );
  if (res.ok) return res.text();
  return null;
}
