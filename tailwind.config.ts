import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      'blueberryPie': "#324d67",
      "coral-red": "#FF6452",
      "slate-gray": "#6D6D6D",
      "pale-blue": "#F5F6FF",
      "white-400": "rgba(255, 255, 255, 0.80)"
    },
    screens: {
      "wide": "1440px"
    },
  },
  plugins: [],
}
export default config
