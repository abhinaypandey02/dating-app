import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserModel {
  @Field()
  name?: string;
  @Field()
  email?: string;
  @Field()
  phone?: string;
  otp?: {
    code: string;
    requested: Date;
  };
  password?: string;
  refreshTokens: string[] = [];
  scopes: ("google" | "email" | "phone")[];
}
