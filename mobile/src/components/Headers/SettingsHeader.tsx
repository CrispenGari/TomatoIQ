import { Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "@/src/constants";

const SettingsHeader = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.tertiary,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontFamily: FONTS.bold,
          color: COLORS.white,
          fontSize: 20,
          marginVertical: 10,
        }}
      >
        Settings
      </Text>
    </SafeAreaView>
  );
};

export default SettingsHeader;
