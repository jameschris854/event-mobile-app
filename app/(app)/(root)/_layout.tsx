import { Redirect, Slot, Stack } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import useAuthStore from '@/hooks/stores/useAuthStore';


export default function TabsLayoutNav() {

  return (
      <Slot />
  );
}
