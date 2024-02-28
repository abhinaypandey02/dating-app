import { sign } from "jsonwebtoken";
import type { ObjectId } from "mongodb";

export function generateAccessToken(id: ObjectId) {
  if (process.env.SIGNING_KEY)
    return sign({ id: id.toString() }, process.env.SIGNING_KEY, {
      expiresIn: 600,
    });
  return "";
}

export function generateRefreshToken(id: ObjectId) {
  if (process.env.REFRESH_KEY)
    return sign({ id: id.toString() }, process.env.REFRESH_KEY);
  return "";
}
