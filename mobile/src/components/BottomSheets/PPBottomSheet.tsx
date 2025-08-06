import { COLORS, FONTS } from "@/src/constants";
import { useSettingsStore } from "@/src/store/settingsStore";
import { onImpact } from "@/src/utils";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
const PPBottomSheet = React.forwardRef<BottomSheetModal, {}>(({}, ref) => {
  const snapPoints = React.useMemo(() => ["50%"], []);
  const { dismiss } = useBottomSheetModal();
  const { settings } = useSettingsStore();

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      index={0}
      enablePanDownToClose={false}
      enableOverDrag={false}
      handleComponent={null}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
    >
      <BottomSheetView
        style={{
          flex: 1,
          padding: 10,
          paddingBottom: 100,
        }}
      >
        <View
          style={{
            alignSelf: "flex-end",
            paddingHorizontal: 20,
            paddingTop: 10,
          }}
        >
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              backgroundColor: COLORS.main,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
            }}
            hitSlop={20}
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              dismiss();
            }}
          >
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: FONTS.bold,
              marginBottom: 10,
            }}
          >
            Privacy Policy
          </Text>

          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: 18,
            }}
          >
            We respect your privacy and are committed to protecting your
            personal information. When you use the TomatoIQ app, we may collect
            basic details such as your name, location, and tomato scan data to
            provide accurate maturity and quality predictions and to enhance
            your experience. This information is used solely to support your use
            of the app — we do not sell or share your data with third parties.
            We may also collect anonymous usage statistics to help improve
            TomatoIQ's performance and features. All personal information is
            stored securely and is only accessible to authorized personnel. You
            have full control over your data and can update or delete it at any
            time through the app. By using TomatoIQ, you agree to this privacy
            policy, which may be updated from time to time to reflect changes in
            law or service improvements. If you have any questions or concerns
            about your privacy, our support team is ready to assist you.
          </Text>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default PPBottomSheet;
