import { NextResponse } from "next/server";

export const ErrorResponses = {
  noRefreshKey: new NextResponse("REFRESH_KEY not in server", {
    status: 500,
  }),
  alreadyExists: new NextResponse("Already exists", {
    status: 400,
  }),
  missingBodyFields: new NextResponse("Missing required fields", {
    status: 400,
  }),
  wrongCredentials: new NextResponse("Wrong credentials", {
    status: 403,
  }),
  wrongScope: new NextResponse("Wrong signin method", {
    status: 403,
  }),
};
