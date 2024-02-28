import { Query, Resolver } from "type-graphql";
import { mongodb } from "../../../../lib/db";
import { UserModel } from "./type";

@Resolver()
export class UserResolver {
  @Query(() => [UserModel])
  async users(): Promise<UserModel[]> {
    return mongodb().collection<UserModel>("user").find({}).toArray();
  }
}
