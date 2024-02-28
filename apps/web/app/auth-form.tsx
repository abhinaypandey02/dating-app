"use client";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { login, logout, signup } from "../lib/auth-client";
import type { UsersQuery } from "../__generated__/graphql";
import { getClient } from "../lib/apollo-client";
import { gql } from "../__generated__";

const defaultValues = {
  email: "",
  password: "",
  name: "",
};

export default function AuthForm({
  users,
  token,
}: {
  users: UsersQuery["users"];
  token: string | null;
}) {
  const { register, handleSubmit } = useForm({ defaultValues });
  const router = useRouter();
  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    if (data.name) await signup(data.email, data.password, data.name);
    else await login(data.email, data.password);
    router.refresh();
  };
  async function cleanUser(email: string) {
    const client = getClient(token);
    await client.mutate({
      mutation: gql(`
                #graphql
                mutation CleanUserName($email:String!){
                    updateUser(user: {email:$email,name: "clean"}){
                        name
                    }
                }
            `),
      variables: {
        email,
      },
    });
    router.refresh();
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        Email
        <input {...register("email")} />
        Password
        <input {...register("password")} />
        Name
        <input {...register("name")} />
        <button>Submit</button>
      </form>
      <button
        onClick={async () => {
          await logout().then(() => {
            router.refresh();
          });
        }}
      >
        Logout
      </button>

      {users?.map((user) => (
        <div key={user.email}>
          {user.name}
          <button
            onClick={() => {
              void cleanUser(user.email);
            }}
          >
            Clear
          </button>
        </div>
      ))}
    </div>
  );
}
