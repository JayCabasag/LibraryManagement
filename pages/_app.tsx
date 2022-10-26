import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../containers/header/Header'
import {ThemeProvider } from "@mui/material";
import theme from '../utils/themes';

function MyApp({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
}

export default MyApp
