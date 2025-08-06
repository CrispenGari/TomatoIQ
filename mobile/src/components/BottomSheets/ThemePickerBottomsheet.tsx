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
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  ColorFormatsObject,
} from "reanimated-color-picker";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
const ThemePickerBottomSheet = React.forwardRef<
  BottomSheetModal,
  {
    value: string;
    onComplete: (colors: ColorFormatsObject) => void;
  }
>(({ value, onComplete }, ref) => {
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
            Select a Segment theme.
          </Text>
          <View style={{ marginVertical: 10 }}>
            <ColorPicker
              onComplete={onComplete}
              style={{ width: "70%", alignSelf: "center" }}
              value={value}
            >
              <Preview />
              <Panel1 />
              <OpacitySlider />
              <Swatches />
            </ColorPicker>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default ThemePickerBottomSheet;
