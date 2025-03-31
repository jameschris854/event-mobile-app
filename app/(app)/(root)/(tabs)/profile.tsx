import useAuthStore from "@/hooks/stores/useAuthStore";
import useColors from "@/hooks/useColors";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, View, useWindowDimensions } from "react-native";
import { Button, Surface ,Text} from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

const Profile = () => {

    const colors = useColors();
    const { width } = useWindowDimensions();
    const styles = createStyle(colors,width);
    const { logout } = useAuthStore();
    const { user } = useAuthStore();
    
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 0.5, backgroundColor: colors.primary }} >
                <Surface style={styles.profilePicContainer}>
                    <FontAwesome color={colors.outline} name="user" style={{fontSize:60}} />
                </Surface>
            </View>
            <View style={styles.personalDetailsContainer}>
                <Text style={styles.name}>{user?.user.email}</Text>
                <View style={styles.detailsRow}>
                    <Text>Phone</Text>
                    <Text>{user?.user.phone}</Text>
                </View>
                <View style={styles.detailsRow}>
                    <Text>Mail</Text>
                    <Text>{user?.user.email}</Text>
                </View>
            </View>
            <View style={styles.menuItem}>
                <Text style={styles.menuText}>Check Updates</Text>
            </View>
            <View style={styles.menuItem}>
                <Text style={styles.menuText}>Dark Mode</Text>
            </View>
            <Button onPress={() => logout()} icon={() => <FontAwesome name="sign-out" style={{paddingLeft:4,fontSize:24,color:colors.tertiary}}/>} style={[styles.menuItem,{flexDirection:"row",alignItems:"center"}]}>
                <Text style={[styles.menuText,styles.logout]}>Log out</Text>
            </Button>
        </View>
    )
}

export default Profile;

const createStyle = (color: MD3Colors,width:number) => StyleSheet.create({
    menuItem: {
        borderTopWidth: 1,
        paddingVertical: 20,
        borderColor: color.outline
    },
    menuText: {
        paddingLeft: 16,
        color: color.primary
    },
    personalDetailsContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    name: {
        fontSize: 32,
        color: color.primary,
        padding: 20,
        paddingTop:80
    },
    detailsRow: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16
    },
    profilePicContainer: {
        position: "absolute",
        bottom:-60,
        left:(width/2) -60,
        width: 120,
        height: 120,
        borderRadius: 100,
        backgroundColor: color.background,
        overflow: "hidden",
        alignItems:"center",
        justifyContent:"center"
    },
    logout: {
        color: color.tertiary,
    }
})
