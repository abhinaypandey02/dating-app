export async function getClientToken() {
  const res = await fetch(`/api/auth/email`, {
    credentials: "include",
  });
  if (res.ok) return res.text();
  return null;
}
export async function signup(email: string, password: string, name: string) {
  const res = await fetch(`/api/auth/email`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      name,
    }),
    credentials: "include",
  });
  if (res.ok) return res.text();
  return null;
}
export async function login(email: string, password: string) {
  const res = await fetch(`/api/auth/email`, {
    method: "PUT",
    body: JSON.stringify({
      email,
      password,
    }),
    credentials: "include",
  });
  if (res.ok) return res.text();
  return null;
}
export async function logout() {
  const res = await fetch(`/api/auth/email`, {
    method: "DELETE",
    credentials: "include",
  });
  if (res.ok) return res.text();
  return null;
}
