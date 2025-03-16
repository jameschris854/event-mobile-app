import useAuthStore from "@/hooks/stores/useAuthStore";
import { Redirect, Slot, Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayoutNav() {

    const { isAuthenticated } = useAuthStore();
    console.log("root nav", isAuthenticated)

    if (!isAuthenticated) {
        return <Redirect href="/sign-in" />;
    } 
    
    return (
        <Slot  />
    );
}
