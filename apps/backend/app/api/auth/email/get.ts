import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { connectMongoClient, disconnectMongoClient } from "../../../../lib/db";
import { generateAccessToken } from "../../../../lib/auth";
import { getTokenizedResponse, getUser } from "../user";
import { ErrorResponses } from "./error-responses";

export const GET = async () => {
  const refresh = cookies().get("refresh")?.value;

  if (!process.env.REFRESH_KEY) return ErrorResponses.noRefreshKey;

  if (refresh) {
    let payload = null;

    try {
      const decoded = verify(refresh, process.env.REFRESH_KEY);
      if (typeof decoded !== "string") payload = decoded as { id: string };
    } catch (e) {
      /* empty */
    }

    if (payload?.id) {
      await connectMongoClient();
      const user = await getUser(new ObjectId(payload.id));
      void disconnectMongoClient();

      if (user?.refreshTokens.includes(refresh))
        return getTokenizedResponse(generateAccessToken(user._id));
    }
  }

  return getTokenizedResponse();
};
