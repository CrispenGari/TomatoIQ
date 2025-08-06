import { COLORS, FONTS } from "@/src/constants";
import React from "react";
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";

const LegendItem = ({
  color,
  label,
  dotStyle,
  labelStyle,
}: {
  color: string;
  label: string;
  dotStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}) => {
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginRight: 16 }}
    >
      <View
        style={[
          {
            width: 12,
            height: 12,
            backgroundColor: color,
            marginRight: 6,
            borderRadius: 6,
          },
          dotStyle,
        ]}
      />
      <Text
        style={[
          { fontSize: 14, color: COLORS.black, fontFamily: FONTS.bold },
          labelStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

export default LegendItem;
