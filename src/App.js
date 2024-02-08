import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AuthConsumer, AuthProvider } from './contexts/auth-context';
import { createEmotionCache } from './utils/create-emotion-cache';
import 'simplebar-react/dist/simplebar.min.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ThemeCustomization from './themes';

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

function App() {

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <CacheProvider value={clientSideEmotionCache}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AuthProvider>
            <AuthConsumer>
              {
                (auth) => auth.isLoading ?
                  <SplashScreen /> :
                  <ThemeCustomization>
                    <RouterProvider router={router} />
                  </ThemeCustomization>
              }
            </AuthConsumer>
          </AuthProvider>
        </LocalizationProvider>
      </CacheProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
