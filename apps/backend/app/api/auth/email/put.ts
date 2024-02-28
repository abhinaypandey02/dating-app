import { compare } from "bcrypt";
import { connectMongoClient, disconnectMongoClient } from "../../../../lib/db";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../../lib/auth";
import {
  getTokenizedResponse,
  getUser,
  updateRefreshTokenAndScope,
} from "../user";
import { ErrorResponses } from "./error-responses";

const MAX_DEVICES = 2;
export const PUT = async (req: Request) => {
  const body = (await req.json()) as { email?: string; password?: string };

  if (!body.email || !body.password) return ErrorResponses.missingBodyFields;

  await connectMongoClient();

  const user = await getUser(body.email);
  if (!user) return ErrorResponses.wrongCredentials;

  // if (!user.scopes.includes("email")) return ErrorResponses.wrongScope;

  if (
    user.password &&
    user.email &&
    (await compare(body.password, user.password))
  ) {
    const refreshToken = generateRefreshToken(user._id);

    const tokens = user.refreshTokens;
    if (tokens.length === MAX_DEVICES) {
      tokens.shift();
    }
    tokens.push(refreshToken);

    const scopes = user.scopes;
    if (!scopes.includes("email")) scopes.push("email");

    await updateRefreshTokenAndScope(user.email, tokens, scopes);
    void disconnectMongoClient();

    return getTokenizedResponse(generateAccessToken(user._id), refreshToken);
  }
  void disconnectMongoClient();
  return ErrorResponses.wrongCredentials;
};
