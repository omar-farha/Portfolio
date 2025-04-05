import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: {
          DEFALT: "#000",
          100: "#000319",
        },
      },
    },
  },
  plugins: [],
};

export default config;
