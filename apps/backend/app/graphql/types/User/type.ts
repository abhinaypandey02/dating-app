import { Gender } from "values/gender";
import { Ethnicity } from "values/ethnicity";
import { Religion } from "values/religion";
import { DatingIntentions } from "values/dating-intentions";
import { FamilyPlans } from "values/family-plans";
import { ViceLevel } from "values/vice-level";
import { Politics } from "values/politics";
import { PromptAnswer } from "values/prompt";
import { Education } from "values/education";
import { Sexuality } from "values/sexuality";
import { PossibleValues } from "values/generics";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserModel {
  @Field()
  phone?: string;
  otp?: {
    code: string;
    requested: Date;
  };
  refreshTokens: string[] = [];
  scopes: "phone"[];
  media?: {
    type: "photo" | "video";
    prompt: PromptAnswer;
  }[];
  prompts: PromptAnswer[];
  virtues?: {
    jobCompany?: string;
    jobTitle: string;
    college: string;
    educationLevel?: PossibleValues<typeof Education>;
    religion?: PossibleValues<typeof Religion>;
    hometown: string;
    languages: string[];
    politics?: PossibleValues<typeof Politics>;
    datingIntentions?: PossibleValues<typeof DatingIntentions>;
  };
  vitals?: {
    name: string;
    gender: PossibleValues<typeof Gender>;
    sexuality: PossibleValues<typeof Sexuality>;
    dob: Date;
    height: number;
    location: string;
    ethnicity?: PossibleValues<typeof Ethnicity>;
    familyPlans?: PossibleValues<typeof FamilyPlans>;
  };
  datingPreferences?: {
    gender: PossibleValues<typeof Gender>;
    neighbourhood: string;
    maximumDistance: number;
    ageRange: [number, number];
    ethnicity?: PossibleValues<typeof Ethnicity>;
    religion?: PossibleValues<typeof Religion>;
    heightRange?: [number, number];
    datingIntentions?: PossibleValues<typeof DatingIntentions>;
    familyPlans?: PossibleValues<typeof FamilyPlans>;
    drugs?: PossibleValues<typeof ViceLevel>;
    smoking?: PossibleValues<typeof ViceLevel>;
    marijuana?: PossibleValues<typeof ViceLevel>;
    drinking?: PossibleValues<typeof ViceLevel>;
    politics?: PossibleValues<typeof Politics>;
    education?: PossibleValues<typeof Education>;
  };
}
