import useColors from "@/hooks/useColors";
import { router } from "expo-router";
import {  StyleSheet, View } from "react-native"
import { Button, Text } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

const GetStarted = () => {

    const colors = useColors();
    const styles = createStyle(colors);

    return <View style={styles.container}>
        <View style={styles.top}>
            <Text style={{color:colors.primary}}>Welcome</Text>
        </View>
        <Button style={{}} mode="contained" onPress={() => router.navigate("/sign-in")} >
            Get Started
        </Button>
    </View>
}

export default GetStarted;

const createStyle = (color: MD3Colors) => StyleSheet.create({
    button: {
        backgroundColor:color.primaryContainer,
        color:color.primaryContainer    
    },
    container:{
        backgroundColor:color.background,
        padding:16,
        flex:1
    },
    top: {
        flex:1
    }
})