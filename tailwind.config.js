/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html"],
  theme: {
    fontFamily: {
      'fr': ['Fira', 'Arial', 'sans-serif'],
    },
    extend: {
      typography: ({ theme }) => ({
        termoblok: {
          css: {
            '--tw-prose-body' : '#f2f2f2',
            '--tw-prose-headings' : '#e2e8f0',
            '--tw-prose-lead' : '#d7d7d7',
            '--tw-prose-links' : '#F36D4A',
            '--tw-prose-bold' : '#171717',
            '--tw-prose-counters' : '#737373',
            '--tw-prose-bullets' : '#ff5e3a',
            '--tw-prose-hr' : '#e5e5e5',
            '--tw-prose-quotes' : '#f2f2f2',
            '--tw-prose-quote-borders' : '#e5e5e5',
            '--tw-prose-captions' : '#a3a2a2',
            '--tw-prose-code' : '#171717',
            '--tw-prose-pre-code' : '#e5e5e5',
            '--tw-prose-pre-bg' : '#262626',
            '--tw-prose-th-borders' : '#773838',
            '--tw-prose-td-borders' : '#773838',
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
        'mobilesm': { 'max': '345px' },
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
          white: '#fff'
        },

      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

