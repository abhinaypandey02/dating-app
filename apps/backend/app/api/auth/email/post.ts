import { hash } from "bcrypt";
import { connectMongoClient, disconnectMongoClient } from "../../../../lib/db";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../../lib/auth";
import {
  createUser,
  getTokenizedResponse,
  getUser,
  insertRefreshToken,
} from "../user";
import { ErrorResponses } from "./error-responses";

export const POST = async (req: Request) => {
  const body = (await req.json()) as {
    email: string;
    password: string;
    name: string;
  };

  if (!body.email || !body.password || !body.name)
    return ErrorResponses.missingBodyFields;

  await connectMongoClient();
  const existingUser = await getUser(body.email);
  if (existingUser) return ErrorResponses.alreadyExists;

  const encryptedPassword = await hash(body.password, 10);
  const newUser = await createUser({
    ...body,
    refreshTokens: [],
    scopes: ["email"],
    password: encryptedPassword,
  });

  const refreshToken = generateRefreshToken(newUser.insertedId);
  await insertRefreshToken(newUser.insertedId, refreshToken);
  void disconnectMongoClient();

  return getTokenizedResponse(
    generateAccessToken(newUser.insertedId),
    refreshToken,
  );
};
