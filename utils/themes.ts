import { createTheme } from '@mui/material/styles'
import { COLORS } from './app_constants'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 375,
      sm: 800,
      md: 960,
      lg: 1280,
      xl: 1440
    }
  },
  palette: {
    primary: {
      main: COLORS.RED,
      contrastText: COLORS.WHITE
    },
    secondary: {
      main: COLORS.RED,
      contrastText: COLORS.WHITE
    },
    // info: {
    //   main: COLORS.BLUE,
    //   contrastText: COLORS.ALMOST_BLACK,
    //   light: COLORS.LIGHT_BLUE
    // },
    // success: {
    //   main: COLORS.GREEN,
    //   contrastText: COLORS.WHITE,
    //   light: COLORS.LIGHT_GREEN
    // },
    // error: {
    //   main: COLORS.RED,
    //   contrastText: COLORS.WHITE,
    //   light: COLORS.ALT_RED
    // },
    // warning: {
    //   main: COLORS.YELLOW,
    //   contrastText: COLORS.ALMOST_BLACK,
    //   light: COLORS.LIGHT_ORANGE
    // }
  },
  typography: {
    fontSize: 14,
    fontFamily: '"Open Sans", sans-serif !important',
    h1: {
      fontSize: '1.825rem',
      fontWeight: 700,
      letterSpacing: '-0.46px'
    },
    h2: {
      fontSize: '1.625rem',
      fontWeight: 700,
      letterSpacing: '-0.6px'
    },
    h3: {
      fontSize: '1.45rem',
      fontWeight: 700,
      letterSpacing: '-0.6px'
    },
    h4: {
      fontSize: '1.15rem',
      fontWeight: 600,
      letterSpacing: '-0.35px'
    }
  },
  zIndex: {
    snackbar: 9000, // alerts
    modal: 8000, // product view
    drawer: 7000, // cart view
    tooltip: 6000, // menu items
    appBar: 5000 // navbar
  }
})

export default theme
