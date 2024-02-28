import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const getRSCClient = (
  idToken?: string | null,
): ApolloClient<unknown> => {
  try {
    return registerApolloClient(
      () =>
        new ApolloClient({
          cache: new InMemoryCache(),
          link: new HttpLink({
            uri: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/graphql`,
            headers: {
              authorization: `Bearer ${idToken || null}`,
            },
          }),
        }),
    ).getClient();
  } catch (e) {
    return new ApolloClient({
      uri: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/graphql`,
      cache: new InMemoryCache(),
      headers: {
        authorization: `Bearer ${idToken || null}`,
      },
    });
  }
};
