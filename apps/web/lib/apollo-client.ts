import { ApolloClient, InMemoryCache } from "@apollo/client";

export const getClient = (idToken?: string | null) => {
  return new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/graphql`,
    cache: new InMemoryCache(),
    headers: {
      authorization: `Bearer ${idToken || null}`,
    },
  });
};
