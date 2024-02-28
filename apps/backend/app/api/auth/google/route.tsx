import { google } from "googleapis";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { connectMongoClient, disconnectMongoClient } from "../../../../lib/db";
import { generateRefreshToken } from "../../../../lib/auth";
import {
  createUser,
  getUser,
  insertRefreshToken,
  updateRefreshTokenAndScope,
} from "../user";
import { oauth2Client } from "./google-oauth";

const MAX_DEVICES = 2;
function errorResponse(redirectURL: string | null) {
  return NextResponse.redirect(
    redirectURL || process.env.NEXT_PUBLIC_FRONTEND_BASE_URL || "",
  );
}
export const GET = async (req: NextRequest) => {
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");
  const state = req.nextUrl.searchParams.get("state") || undefined;
  const redirectURL = req.nextUrl.searchParams.get("redirectURL");
  if (!code && !error) {
    const authorizationUrl = oauth2Client.generateAuthUrl({
      scope: ["https://www.googleapis.com/auth/userinfo.profile"],
      state,
      include_granted_scopes: true,
    });
    return NextResponse.redirect(authorizationUrl);
  } else if (error) {
    return errorResponse(redirectURL);
  } else if (code) {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const userInfoRequest = await google
      .oauth2({
        auth: oauth2Client,
        version: "v2",
      })
      .userinfo.get();

    const user = userInfoRequest.data;
    if (user.email) {
      await connectMongoClient();

      const existingUser = await getUser(user.email);

      let refreshToken;

      if (existingUser) {
        const refreshTokens = existingUser.refreshTokens;
        if (refreshTokens.length === MAX_DEVICES) {
          refreshTokens.shift();
        }
        refreshToken = generateRefreshToken(existingUser._id);
        refreshTokens.push(refreshToken);

        const scopes = existingUser.scopes;
        if (!scopes.includes("google")) scopes.push("google");

        await updateRefreshTokenAndScope(user.email, refreshTokens, scopes);
      } else if (user.name) {
        const newUser = await createUser({
          email: user.email,
          name: user.name,
          refreshTokens: [],
          scopes: ["google"],
        });

        refreshToken = generateRefreshToken(newUser.insertedId);
        await insertRefreshToken(newUser.insertedId, refreshToken);
      }
      void disconnectMongoClient();

      return NextResponse.redirect(
        `${
          process.env.NEXT_PUBLIC_FRONTEND_BASE_URL
        }/api/auth/google?refresh=${refreshToken}&redirectURL=${
          redirectURL || ""
        }&state=${state}`,
      );
    }
  }
  return errorResponse(redirectURL);
};
