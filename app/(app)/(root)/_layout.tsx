import { Redirect, Stack } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import useAuthStore from '@/hooks/stores/useAuthStore';


export default function RootLayoutNav() {
  return (
      <Stack >
        {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
  );
}
