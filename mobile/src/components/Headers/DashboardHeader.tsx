import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "@/src/constants";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import HelpBottomSheet from "../BottomSheets/HelpBottomSheet";
import { useSettingsStore } from "@/src/store/settingsStore";
import { onImpact } from "@/src/utils";
import { Ionicons } from "@expo/vector-icons";

const DashboardHeader = () => {
  const helpBottomSheetRef = React.useRef<BottomSheetModal>(null);
  const { settings } = useSettingsStore();
  return (
    <>
      <HelpBottomSheet ref={helpBottomSheetRef} />
      <SafeAreaView
        style={{
          backgroundColor: COLORS.tertiary,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 100,
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingVertical: 30,
            gap: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: FONTS.bold,
                color: COLORS.white,
                fontSize: 20,
              }}
            >
              Tomato IQ
            </Text>
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 16,
                color: COLORS.white,
              }}
            >
              Know When to Harvest, Know What to Sell
            </Text>
          </View>
          <TouchableOpacity
            hitSlop={30}
            style={{
              backgroundColor: COLORS.secondary,
              justifyContent: "center",
              alignItems: "center",
              width: 45,
              height: 45,
              borderRadius: 45,
            }}
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              helpBottomSheetRef.current?.present();
            }}
          >
            <Ionicons name="help" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default DashboardHeader;
