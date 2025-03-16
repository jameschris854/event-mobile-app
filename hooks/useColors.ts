import { useTheme } from "react-native-paper";

const useColors = () => {
      const colorScheme = useTheme();
    
    return  colorScheme.colors;
}

export default useColors;