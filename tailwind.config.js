export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'edu-main-color': '#00BF63',
        'edu-main-hover-color': '#008F4A',

        'text-color': '#384250',
        'text-color-1': '#6C737F',
        'text-color-3': '#727475',

        'error': '#D92D20',
        'bgColor': 'fcfbfb',
        'off-black': '#14142B',

        'gray-100': '#F2F4F7',
        'gray-300': '#D0D5DD',
        'text-500': '#667085',
        'gray-700': '#344054',
      },
      screens: {
        'medium-pc' : {'max': '1300px'},
        'small-pc': {'max': '950px'},
        'tablet': {'max': '700px'},
        'phone': {'max': '500px'},
        'small-phone': {'max': '450px'},
        'smaller-phone': {'max': '400px'},
      },
      fontFamily: {
        'font-1': ['Montserrat', 'sans-serif'], 
      },
    },
  },


  plugins: [],
}