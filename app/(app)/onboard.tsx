import useColors from "@/hooks/useColors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BlurView from "expo-blur/build/BlurView";
import { router } from "expo-router";
import {  StyleSheet, useColorScheme, View } from "react-native"
import { Button, Text, useTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
const letters = "טריוויהחידוןתנ\"ךטריוויהחידוןתנ\"ך טריוויהחידוןתנ\"ךטריוויהחידוןתנ\"ך"
  .split("")
  .map((e) => ({ id: Math.random() + "e", val: e }));
const onboard = () => {

    const colors = useColors();
    const styles = createStyle(colors);
    const theme = useTheme();
    const scheme = useColorScheme();
    return <View style={styles.container}>
        <View style={styles.top}>
            <View style={{flexDirection:"row",gap:25,flexWrap:"wrap",alignItems:"center",justifyContent:"center",padding:16,}}>
               { letters.map((e) => {
                    return <Text style={{color:colors.primaryContainer}} key={e.id} variant="displayMedium">{e.val}</Text>
                })}
            </View>
            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",position:"absolute",height:"100%",width:"100%"}}>
                <BlurView blurReductionFactor={2} tint={scheme ?? "dark"} intensity={1} experimentalBlurMethod="dimezisBlurView" style={{width:"100%",height:"100%",alignItems:"center",justifyContent:"center"}} ></BlurView>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",position:"absolute",height:"100%",width:"100%"}}>
            <MaterialCommunityIcons name="lightbulb-on-outline" size={200} color={theme.colors.primary} style={{padding:20}}/>
            <Text variant="displayLarge">Quiz</Text>
        </View>
        <Button style={styles.button} mode="contained" onPress={() => router.navigate("/sign-in")} >
            Get Started
        </Button>
    </View>
}

export default onboard;

const createStyle = (color: MD3Colors) => StyleSheet.create({
    button: {
        margin:16
    },
    container:{
        justifyContent:'center',
        flex:1,
        backgroundColor:color.background,
    },
    top: {
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }
})