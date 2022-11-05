import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ThemeProvider } from "@mui/material";
import theme from '../utils/themes';
import { AuthContextProvider } from '../context/AuthContext';
import { useRouter } from 'next/router';
import ProtectedRoutes from '../components/protected-routes/ProtectedRoutes';

const noAuthRequired = ['/', '/login', '/register']

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter()

  return (
      <AuthContextProvider>
        <ThemeProvider theme={theme}>
          {noAuthRequired.includes(router.pathname) ? 
            <Component {...pageProps} />
          :
            <ProtectedRoutes>
              <Component {...pageProps} />
            </ProtectedRoutes>
          }
        </ThemeProvider>    
      </AuthContextProvider> 
  )
}

export default MyApp
