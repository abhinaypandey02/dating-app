import { PromptCategory } from "./prompt-category";

const PromptValue = [
  {
    label: "This year I really want to",
    value: "THIS_YEAR_I_REALLY_WANT_TO" as const,
    category: "ABOUT_ME" as const,
  },
];
type Prompt = {
  label: string;
  value: (typeof PromptValue)[number]["value"];
  category: (typeof PromptCategory)[number]["value"];
}[];
export const Prompt: Prompt = PromptValue;
export interface PromptAnswer {
  prompt: Prompt[number]["value"];
  answer: string;
}
