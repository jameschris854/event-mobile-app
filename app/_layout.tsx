import { enableScreens } from 'react-native-screens';
enableScreens();
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Redirect, Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme ,ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/components/useColorScheme';
import { adaptNavigationTheme, Appbar, MD3DarkTheme, MD3LightTheme, PaperProvider, useTheme } from 'react-native-paper';
import GlobalSnackbar from '@/components/Snackbar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'GetStarted',
};
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import useAuthStore from '@/hooks/stores/useAuthStore';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const {init} = useAuthStore()
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => 
  {
    init()
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <AppLayout />;
}

function AppLayout() {
  const { theme :SystemThemeColors  } = useMaterial3Theme();
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });
  const CombinedLightTheme = {
    ...LightTheme,
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...LightTheme.colors,
      ...SystemThemeColors.light
    },
  };
  
  const CombinedDarkTheme = {
    ...DarkTheme,
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...DarkTheme.colors,
      ...SystemThemeColors.dark
    },
  };
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? CombinedDarkTheme : CombinedLightTheme;
  const {top} = useSafeAreaInsets()

   const paperTheme =
   isDarkMode
      ? { ...MD3DarkTheme, colors: SystemThemeColors.dark }
      : { ...MD3LightTheme, colors: SystemThemeColors.light };

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={theme}>
        <StatusBar style='auto' backgroundColor={theme.colors.background}  />
        <View style={{paddingTop:top}} />
        <Stack screenOptions={{headerShown:false,animation:"fade"}} /> 
        <GlobalSnackbar />
      </ThemeProvider>
    </PaperProvider>
  );
}
