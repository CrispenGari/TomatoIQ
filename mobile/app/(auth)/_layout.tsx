import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <>
      <Stack
        initialRouteName="landing"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="landing" />
      </Stack>
    </>
  );
};

export default Layout;
