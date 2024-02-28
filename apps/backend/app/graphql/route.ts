import "reflect-metadata";
import type { NextRequest } from "next/server";
import { ApolloServer } from "@apollo/server";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { buildTypeDefsAndResolvers } from "type-graphql";
import { connectMongoClient, disconnectMongoClient } from "../../lib/db";
import { context } from "./context";
import { UserResolver } from "./types/User/resolver";

const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
  resolvers: [UserResolver],
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    process.env.NEXT_PUBLIC_DEVELOPMENT
      ? ApolloServerPluginLandingPageLocalDefault()
      : ApolloServerPluginLandingPageProductionDefault(),
  ],
  introspection: true,
});
const handler = startServerAndCreateNextHandler(server, {
  context: (req: NextRequest) =>
    new Promise((resolve) => {
      resolve(context(req));
    }),
});

export async function GET(request: NextRequest) {
  await connectMongoClient();
  const res = await handler(request);
  void disconnectMongoClient();
  return res;
}

export async function POST(request: NextRequest) {
  await connectMongoClient();
  const res = await handler(request);
  void disconnectMongoClient();
  return res;
}
