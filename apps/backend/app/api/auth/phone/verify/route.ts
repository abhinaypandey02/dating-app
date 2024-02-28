import { NextRequest } from "next/server";
import { compare } from "bcrypt";
import { ErrorResponses } from "../../email/error-responses";
import { clearOTP, getTokenizedResponse, getUser } from "../../user";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../../../lib/auth";
import {
  connectMongoClient,
  disconnectMongoClient,
} from "../../../../../lib/db";

export const POST = async (req: NextRequest) => {
  const body = (await req.json()) as { phone?: string; otp?: string };
  if (!body.phone || !body.otp) return ErrorResponses.missingBodyFields;
  await connectMongoClient();
  const user = await getUser(body.phone, true);
  if (!user) return ErrorResponses.wrongCredentials;

  const otp = user.otp?.code;

  if (otp && (await compare(body.otp, otp))) {
    await clearOTP(body.phone, true);
    void disconnectMongoClient();
    return getTokenizedResponse(
      generateAccessToken(user._id),
      generateRefreshToken(user._id),
    );
  }
  void disconnectMongoClient();
  return ErrorResponses.wrongCredentials;
};
