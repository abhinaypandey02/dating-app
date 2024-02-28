import { Field, ObjectType } from "type-graphql";
import { Gender } from "../../../../constants/gender";
import { Ethnicity } from "../../../../constants/ethnicity";
import { Religion } from "../../../../constants/religion";
import { DatingIntentions } from "../../../../constants/dating-intentions";
import { FamilyPlans } from "../../../../constants/family-plans";
import { ViceLevel } from "../../../../constants/vice-level";
import { Politics } from "../../../../constants/politics";
import { PromptAnswer } from "../../../../constants/prompt";

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
  datingPreferences?: {
    interestedGender: (typeof Gender)[number]["value"];
    neighbourhood: string;
    maximumDistance: number;
    ageRange: [number, number];
    ethnicity?: (typeof Ethnicity)[number]["value"];
    religion?: (typeof Religion)[number]["value"];
    heightRange?: [number, number];
    datingIntentions?: (typeof DatingIntentions)[number]["value"];
    familyPlans?: (typeof FamilyPlans)[number]["value"];
    drugs?: (typeof ViceLevel)[number]["value"];
    smoking?: (typeof ViceLevel)[number]["value"];
    marijuana?: (typeof ViceLevel)[number]["value"];
    drinking?: (typeof ViceLevel)[number]["value"];
    politics?: (typeof Politics)[number]["value"];
  };
}
