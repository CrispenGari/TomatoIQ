import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/src/constants";

interface SettingItemProps {
  Icon: React.ReactNode;
  title: string;
  onPress: () => void;
  labelStyle?: StyleProp<TextStyle>;
  subTitle?: string;
}
const SettingItem = ({
  labelStyle,
  Icon,
  title,
  onPress,
  subTitle,
}: SettingItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        gap: 10,
        paddingHorizontal: 20,
        marginBottom: 2,
      }}
    >
      {Icon}
      <View style={{ flex: 1 }}>
        <Text
          style={[
            {
              color: COLORS.black,
              fontFamily: FONTS.bold,
              fontSize: 16,
            },
            labelStyle,
          ]}
        >
          {title}
        </Text>

        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: 10,
            color: COLORS.gray,
          }}
        >
          {subTitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SettingItem;
