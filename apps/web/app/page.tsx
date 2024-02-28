import { Button } from "ui";
// import { gql } from "../__generated__";
// import { getRSCClient } from "../lib/apollo-server";
import { getServerToken } from "../lib/auth-server";
import { getRSCClient } from "../lib/apollo-server";
import { gql } from "../__generated__";
import AuthForm from "./auth-form";

export default async function Page(): Promise<JSX.Element> {
  const token = await getServerToken();
  const client = getRSCClient(token);
  const res = await client.query({
    query: gql(`
      #graphql
      query Users{
        users {
          name
          email
        }
      }
    `),
  });
  return (
    <main>
      {token}
      <a href="/api/auth/google">
        <Button />
      </a>
      <AuthForm token={token} users={res.data.users} />
    </main>
  );
}
