import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import useColors from '@/hooks/useColors';
import { BottomNavigation, Icon, Text } from 'react-native-paper';
import TabOneScreen from '.';
import Profile from './profile';
import MyTests from './MyTests';
import { BaseRoute } from 'react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation';
import { StyleSheet, View } from 'react-native';
import { withLayoutContext } from "expo-router";
import { createNativeBottomTabNavigator } from "@bottom-tabs/react-navigation";

export const Tabs = withLayoutContext(
  createNativeBottomTabNavigator().Navigator
);
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colors = useColors();
    const [index, setIndex] = useState(0);
    const [routes] = useState<BaseRoute[]>([
      { key: 'index', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline', lazy: true },
      { key: 'MyTests', title: 'MyTests', focusedIcon: 'clipboard-list', unfocusedIcon: 'clipboard-list-outline', lazy: true },
      { key: 'profile', title: 'Profile', focusedIcon: 'account', unfocusedIcon: 'account-outline', lazy: true },
    ]);
  
    const renderScene = BottomNavigation.SceneMap({
      "index": TabOneScreen,
      "MyTests": MyTests,
      profile: Profile,
    })

  return <>
      <Tabs
       hapticFeedbackEnabled
       
       screenOptions={{
         tabBarActiveTintColor: colors.primary,
       }}>
       <Tabs.Screen
         name="index"
         options={{
            title: 'Home',
            tabBarIcon: () => ({
            uri: 'https://www.svgrepo.com/show/22031/home-icon-silhouette.svg',
          }),
         }}
       />
       <Tabs.Screen
         name="MyTests"
         options={{
            title: 'Explore',
            tabBarIcon: () => ({
            uri: 'https://www.svgrepo.com/show/445112/explore-solid.svg',
          }),
         }}
       />
       <Tabs.Screen
         name="profile"
         options={{
            title: 'Profile',
            tabBarIcon: () => ({
            uri: 'https://www.svgrepo.com/show/445112/explore-solid.svg',
          }),
         }}
       />
     </Tabs>

  </>

}

const styles = StyleSheet.create({
	tabList: {
		display: "flex",
		position: "absolute",
		bottom: 32,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "red",
		padding: 8,
		width: "100%",
	},
	tabTrigger: {
		flex: 1,
		borderWidth: 1,
		borderColor: "blue",
		alignItems: "center",
		justifyContent: "center"
	}
});