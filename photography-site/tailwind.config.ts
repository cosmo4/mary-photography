import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--sugar)",
        foreground: "var(--foreground)",
        sugar: "var(--sugar)",
        bone: 'var(--bone)',
        wheat: 'var(--wheat)',
        sage: 'var(--sage)',
        mocha: 'var(--mocha)',
        oak: 'var(--oak)',
      },
    },
  },
  plugins: [],
};
export default config;
