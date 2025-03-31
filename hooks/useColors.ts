import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, useTheme } from "react-native-paper";

const useColors = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const { theme :SystemThemeColors  } = useMaterial3Theme();
  
       const paperTheme =
       isDarkMode
          ? { ...MD3DarkTheme, colors: SystemThemeColors.dark }
          : { ...MD3LightTheme, colors: SystemThemeColors.light };
    
    return  paperTheme.colors;
}

export default useColors;