import type { Config } from "tailwindcss";

const config: Config = {
  // ...existing content, theme, etc...
  theme: {
    extend: {
      // ...existing extensions...
      fontFamily: {
        'urbanist': ['Urbanist', 'sans-serif'],
        // ...any other existing font families...
      },
    },
  },
  // ...rest of your existing config...
};

export default config;