import type { Config } from "tailwindcss";

const config: Config = {
  purge: {
    safelist: [
      "bg-red-100",
      "bg-orange-100",
      "bg-yellow-100",
      "bg-green-100",
      "bg-blue-100",
      "bg-indigo-100",
      "bg-purple-100",
      "bg-pink-100",
      "bg-stone-100",
      "bg-cyan-100",
      "bg-slate-100",
      "bg-lime-100",
      "bg-violet-100",
      "bg-amber-100",
    ]
  },
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
