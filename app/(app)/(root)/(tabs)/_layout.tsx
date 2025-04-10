import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import useColors from '@/hooks/useColors';
import { StyleSheet } from 'react-native';
import { withLayoutContext } from "expo-router";
import { createNativeBottomTabNavigator } from "@bottom-tabs/react-navigation";

export const Tabs = withLayoutContext(
  createNativeBottomTabNavigator().Navigator
);

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colors = useColors();

  return <>
      <Tabs
       hapticFeedbackEnabled
       tabBarActiveTintColor={colors.primary}
       tabBarInactiveTintColor={colors.secondary}
       rippleColor={colors.primary}
       activeIndicatorColor={colors.surfaceContainerHighest}
       tabBarStyle={{
         backgroundColor: colors.surfaceContainer
        }}>
       <Tabs.Screen
         name="index"
         options={{
            title: 'Home',
            tabBarIcon: () => ({
            uri: 'https://www.svgrepo.com/show/22031/home-icon-silhouette.svg',
          })
         }}
       />
       <Tabs.Screen
         name="mytest"
         options={{
            title: 'My Tests',
            tabBarIcon: () => ({
            uri: 'https://www.svgrepo.com/show/326410/i-exam-multiple-choice.svg',
          })
         }}
       />
       <Tabs.Screen
         name="profile"
         options={{
            title: 'Profile',
            tabBarIcon: () => ({
            uri: 'https://www.svgrepo.com/show/445112/explore-solid.svg',
          })
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