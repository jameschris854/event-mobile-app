import useAuthStore from "@/hooks/stores/useAuthStore";
import { Redirect, router, Slot, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

export default function RootLayoutNav() {
    const { isAuthenticated,user } = useAuthStore();
    console.log(isAuthenticated)

    // return <Redirect href="/(app)/(root)/(tabs)" />

    useEffect(() => {
        setTimeout(() => {
            if(!isAuthenticated){
                router.replace("/onboard")
            }
        },100)
    },[isAuthenticated])
    
    return (
        <Stack screenOptions={{animation:"fade_from_bottom", headerShown:false}} />
    );
}
