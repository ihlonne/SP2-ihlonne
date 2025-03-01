import { extendTheme } from '@chakra-ui/react';

// Custom Theme
const theme = extendTheme({
  colors: {
    brand: {
      50: '#D8DFEA', // Light gray-blue
      100: '#F6F6F6', // Light gray
      200: '#F4F3FE', // Light lavender
      300: '#FFF5F5', // Soft white-pink
      400: '#F1FFF4', // Soft mint green
      500: '#3A86FF', // Primary blue
      600: '#0450C9', // Deep blue
      700: '#0040A5', // Dark blue
      800: '#747C88', // Dark gray
      900: '#222222', // Almost black
    },
    accent: {
      red: '#F93232', // Bright red - error
      green: '#439f6E', // Deep green - success
      purple: '#7C79EF', // Soft purple - info
      like: '#DC143C', // Deep red - like
    },
    white: '#FFFFFF',
    black: '#222222',
  },
  fonts: {
    heading: '"Poppins", sans-serif',
    body: '"Inter", sans-serif',
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'white',
        color: 'brand.900',
        fontFamily: 'body',
      },
      a: {
        color: 'brand.900',
        _hover: {
          textDecoration: 'underline',
          color: 'brand',
        },
      },
      '.chakra-swiper .swiper-button-prev, .chakra-swiper .swiper-button-next':
        {
          bg: 'white',
          color: 'black',
          borderRadius: 'full',
          width: '35px',
          height: '35px',
        },
      '.chakra-swiper .swiper-button-prev': {
        left: '-8px',
      },
      '.chakra-swiper .swiper-button-next': {
        right: '-8px',
      },
      '.chakra-swiper .swiper-button-prev::after, .chakra-swiper .swiper-button-next::after':
        {
          fontSize: '18px',
          fontWeight: 'bold',
        },
    },
  },
});

export default theme;
