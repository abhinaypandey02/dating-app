import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI || "");
export function mongodb() {
  return client.db("default");
}
export async function connectMongoClient() {
  return client.connect();
}
export async function disconnectMongoClient() {
  return client.close();
}
