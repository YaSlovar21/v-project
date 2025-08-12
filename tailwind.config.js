/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html"],
  
  theme: {
    fontFamily: {
      'fr': ['Onest', 'Arial', 'sans-serif'],
    },
    extend: {
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      typography: ({ theme }) => ({
        vik: {
          css: {
            '--tw-prose-body' : '#171515',
            '--tw-prose-headings' : '#003049',
            '--tw-prose-lead' : '#003049',
            '--tw-prose-links' : '#C1121F',
            '--tw-prose-bold' : '#171515',
            '--tw-prose-counters' : '#C1121F',
            '--tw-prose-bullets' : '#C1121F',
            '--tw-prose-hr' : '#C1121F',
            '--tw-prose-quotes' : '#003049',
            '--tw-prose-quote-borders' : '#C1121F',
            '--tw-prose-captions' : '#003049',
            '--tw-prose-code' : '#003049',
            '--tw-prose-pre-code' : '#e5e5e5',
            '--tw-prose-pre-bg' : '#262626',
            '--tw-prose-th-borders' : '#E8E8E8',
            '--tw-prose-td-borders' : '#E8E8E8',
          },
        },
      }),
      screens: {
        'pc': {'max': '1620px'},
        // => @media (max-width: 1535px) { ... }
  
        'mvpc': {'max': '1441px'},
        // => @media (max-width: 1441px) { ... }
  
        'olpc': {'max': '1240px'},

        'laptop': {'max': '1024px'},
        // => @media (max-width: 1024px) { ... }
  
        'mobile': {'max': '639px'},
        // => @media (max-width: 639px) { ... }
        'mobilesm': { 'max': '400px' },
      },
      colors: {
        primary: {
          red: '#CD2C2C',
          black: '#171515',
          lightgray: '#E8E8E8',
          gray: '#B5B7C0',
          darker: '#171B33',
          darkbg: '#172249',
          blue: '#20488A',
          lightblue: '#0479E8',
          white: '#fff',
          prblue: '#003049',
          prred: '#C1121F',
          prredlight: '#CD131F',
          floral: '#FEF8EC'
        },
        mary: {
          blue: '#0139B0',
          blue100: '#0139B01A',
          blueacc: '#0054D1', //и background-secondary
          secondary: '#60697D',
          primary: '#010A1B',
          lightred: '#CD2C2C26'
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

