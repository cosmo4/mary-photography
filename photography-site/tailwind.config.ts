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

      maxHeight: {
        '50vh': '50vh',
        '75vh': '75vh',
      },

      height: {
        '50vh': '50vh',
        '75vh': '75vh',
      },

      width: {
        '50vw': '50vw',
        '60vw': '60vw',
        '75vw': '75vw',
      },
      brightness: {
        '70': '.7',
      }

    },
  },
  plugins: [],
};
export default config;
