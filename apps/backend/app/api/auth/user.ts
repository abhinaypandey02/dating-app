import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { mongodb } from "../../../lib/db";
import type { UserModel } from "../../graphql/types/User/type";

function getFilter(id: string | ObjectId, isPhone?: boolean) {
  if (typeof id === "string") {
    if (isPhone) return { phone: id };
    return { email: id };
  }
  return { _id: id };
}

export function getUser(emailOrId: string | ObjectId, isPhone?: boolean) {
  return mongodb()
    .collection<UserModel>("user")
    .findOne(getFilter(emailOrId, isPhone));
}

export function createUser(user: UserModel) {
  return mongodb().collection<UserModel>("user").insertOne(user);
}

export function updateOTP(
  emailOrId: ObjectId | string,
  otp: UserModel["otp"],
  isPhone?: boolean,
) {
  return mongodb()
    .collection<UserModel>("user")
    .updateOne(getFilter(emailOrId, isPhone), {
      $set: {
        otp,
      },
    });
}

export function clearOTP(emailOrId: ObjectId | string, isPhone?: boolean) {
  return mongodb()
    .collection<UserModel>("user")
    .updateOne(getFilter(emailOrId, isPhone), {
      $set: {
        otp: undefined,
      },
    });
}

export function getTokenizedResponse(
  accessToken?: string,
  refreshToken?: string,
) {
  const body = accessToken || null;
  const response = new NextResponse(body, {
    status: 200,
  });
  if (refreshToken !== undefined) {
    response.cookies.set("refresh", refreshToken, {
      secure: true,
      httpOnly: true,
      expires: refreshToken === "" ? 0 : undefined,
    });
  }
  return response;
}
