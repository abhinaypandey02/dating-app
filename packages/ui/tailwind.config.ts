import defaultTheme from "config/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./**/*.tsx"],
  theme: {
    extend: {
      ...defaultTheme,
    },
  },
};
export default config;
