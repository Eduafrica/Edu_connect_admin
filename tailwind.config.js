export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'edu-main-color': '#00BF63',
        'edu-main-hover-color': '#008F4A',

        'acn-main-color': '#000000',
        'acn-main-hover-color': '#008F4A',

        'text-color': '#384250',
        'text-color-1': '#6C737F',
        'text-color-3': '#727475',
        'text-color-4': '#202224',

        'white': '#fff',

        'error': '#D92D20',
        'success': '#05A753',
        'bgColor': 'fcfbfb',
        'off-black': '#14142B',

        'gray-100': '#F2F4F7',
        'gray-200': '#EAECF0',
        'gray-300': '#D0D5DD',
        'gray-400': '#98A2B3',
        'text-500': '#667085',
        'text-600': '#475467',
        'gray-700': '#344054',
        'gray-900': '#101828',

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