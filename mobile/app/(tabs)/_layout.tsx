import DashboardHeader from "@/src/components/Headers/DashboardHeader";
import SettingsHeader from "@/src/components/Headers/SettingsHeader";
import { COLORS } from "@/src/constants";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");
const Layout = () => {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarStyle: {
          paddingVertical: 10,
          backgroundColor: COLORS.tertiary,
          elevation: 0,
          width: 250,
          bottom: 30,
          borderRadius: 999,
          height: 60,
          position: "absolute",
          marginLeft: width / 2 - 125,
        },
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: COLORS.main,
        tabBarActiveTintColor: COLORS.white,
        headerShown: true,
        tabBarLabelStyle: {
          display: "none",
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarIconStyle: {
          marginTop: 10,
        },
        tabBarBackground: () => (
          <BlurView
            tint="dark"
            intensity={1}
            style={[StyleSheet.absoluteFill]}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="dashboard" size={size} color={color} />
          ),
          header: () => <DashboardHeader />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="history" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
          headerShown: true,
          header: () => <SettingsHeader />,
        }}
      />
    </Tabs>
  );
};
export default Layout;
