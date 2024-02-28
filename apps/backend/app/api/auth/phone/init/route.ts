import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { ErrorResponses } from "../error-responses";
import {
  connectMongoClient,
  disconnectMongoClient,
} from "../../../../../lib/db";
import { createUser, getUser, updateOTP } from "../../user";
import { sendOtp } from "../send-otp";

export const POST = async (req: NextRequest) => {
  const body = (await req.json()) as { phone?: string };
  if (!body.phone) return ErrorResponses.missingBodyFields;

  await connectMongoClient();
  const user = await getUser(body.phone, true);
  const otp = Math.floor(100000 + Math.random() * 900000);
  const hashedOtp = await hash(otp.toString(), 10);
  if (!user) {
    await createUser({
      phone: body.phone,
      otp: {
        code: hashedOtp,
        requested: new Date(),
      },
      refreshTokens: [],
      scopes: ["phone"],
    });
  } else {
    await updateOTP(
      body.phone,
      {
        code: hashedOtp,
        requested: new Date(),
      },
      true,
    );
  }
  void disconnectMongoClient();
  sendOtp(body.phone, otp);
  return new NextResponse();
};
