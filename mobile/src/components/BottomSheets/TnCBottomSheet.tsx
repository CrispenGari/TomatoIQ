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

const TnCBottomSheet = React.forwardRef<BottomSheetModal, {}>(({}, ref) => {
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
            Terms and Conditions
          </Text>
          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: 18,
            }}
          >
            By using the TomatoIQ app, you agree to these terms: TomatoIQ is a
            tool designed to assist farmers and agribusinesses in assessing the
            quality and maturity of tomatoes using image-based AI predictions.
            The app does not facilitate product sales or financial transactions.
            You must be 18 years or older to use the app. Any data or images you
            provide should be accurate to ensure reliable analysis results.
            While TomatoIQ offers helpful insights, all decisions and outcomes
            based on its predictions remain your responsibility. We may
            introduce new features or services in the future, some of which may
            include optional fees. Users who misuse the app or submit misleading
            information may have their access revoked. Your personal information
            is only used to improve your experience and is kept private and
            secure. These terms may be updated occasionally to reflect changes
            in the app or legal requirements. By continuing to use TomatoIQ, you
            agree to any such changes. If you have questions or need support,
            our team is here to help.
          </Text>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default TnCBottomSheet;
