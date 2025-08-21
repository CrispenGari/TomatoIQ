import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import Card from "../Card/Card";
import { THistory } from "../../types";
import { useSettingsStore } from "../../store/settingsStore";
import { useRouter } from "expo-router";
import { onImpact } from "../../utils";
import {
  APP_NAME,
  COLORS,
  FONTS,
  PLOT_COLORS,
  relativeTimeObject,
} from "../../constants";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";
import { PieChart } from "react-native-gifted-charts";
import LegendItem from "../LegendItem/LegendItem";
import Animated from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import { useHistoryStore } from "../../store/historyStore";
dayjs.extend(relativeTime);
dayjs.extend(updateLocal);
dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});

const HistoryItem = ({ item }: { item: THistory }) => {
  const { settings } = useSettingsStore();
  const router = useRouter();
  const { remove } = useHistoryStore();

  const plotsData = React.useMemo(() => {
    const { maturity, quality } = item.prediction;
    const rawMaturity = ["mature", "inmature"].map((item, index) => {
      const isMatch = item === maturity.class_label;
      const probability = isMatch
        ? maturity.probability * 100
        : (1 - maturity.probability) * 100;

      return {
        value: probability,
        color: PLOT_COLORS[index],
        maturity: `${item} (${
          isMatch ? maturity.label : maturity.label === 1 ? 0 : 1
        }) • ${probability.toFixed(0)}%`,
        label: "",
      };
    });

    const rawQuality = ["fresh", "rotten"].map((item, index) => {
      const isMatch = item === quality.class_label;
      const probability = isMatch
        ? quality.probability * 100
        : (1 - quality.probability) * 100;

      return {
        value: probability,
        color: PLOT_COLORS[index],
        quality: `${item} (${
          isMatch ? quality.label : quality.label === 1 ? 0 : 1
        }) • ${probability.toFixed(0)}%`,
        label: "",
      };
    });

    return {
      quality: rawQuality,
      maturity: rawMaturity,
    };
  }, [item]);
  return (
    <Card
      style={{
        backgroundColor: COLORS.white,
        width: "100%",
        maxWidth: 500,
        alignSelf: "center",
        shadowOffset: { width: 2, height: 2 },
        elevation: 1,
        shadowColor: COLORS.tertiary,
        shadowOpacity: 0.35,
        shadowRadius: 2,
        padding: 20,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          backgroundColor: COLORS.secondary,
          position: "absolute",
          top: 0,
          right: 0,
          width: 80,
          padding: 5,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.bold,
            color: COLORS.white,
          }}
        >
          {dayjs(new Date(item.date)).fromNow()} ago
        </Text>
      </View>
      <TouchableOpacity
        style={{}}
        onPress={async () => {
          if (settings.haptics) {
            await onImpact();
          }
          router.navigate({
            pathname: "/(common)/results",
            params: {
              id: item.id,
            },
          });
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            width: "100%",
            gap: 20,
          }}
        >
          <View style={{ flex: 1 }}>
            <Animated.Image
              source={{
                uri: item.tomato,
              }}
              style={{ width: 80, height: 80, resizeMode: "contain" }}
            />
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 16,
                color: COLORS.gray,
              }}
            >
              {`Based on the Tomato image provided, the tomato is "${item.prediction.maturity.class_label}" and it is "${item.prediction.quality.class_label}".`}
            </Text>
          </View>
          <View
            style={{
              gap: 5,
              flex: 1,
            }}
          >
            <View>
              <PieChart
                donut
                isAnimated
                animationDuration={300}
                innerRadius={30}
                data={plotsData.maturity}
                radius={50}
                centerLabelComponent={() => {
                  return (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: FONTS.bold,
                        }}
                      >
                        Maturity
                      </Text>
                    </View>
                  );
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  flexWrap: "wrap",
                  marginTop: 5,
                }}
              >
                {plotsData.maturity.map((data, index) => (
                  <LegendItem
                    label={data.maturity}
                    key={index}
                    color={data.color}
                    dotStyle={{ width: 10, height: 10, borderRadius: 10 }}
                  />
                ))}
              </View>
            </View>
            <View>
              <PieChart
                donut
                isAnimated
                animationDuration={300}
                innerRadius={30}
                data={plotsData.quality}
                radius={50}
                centerLabelComponent={() => {
                  return (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: FONTS.bold,
                        }}
                      >
                        Quality
                      </Text>
                    </View>
                  );
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  flexWrap: "wrap",
                  marginTop: 5,
                }}
              >
                {plotsData.quality.map((data, index) => (
                  <LegendItem
                    label={data.quality}
                    key={index}
                    color={data.color}
                    dotStyle={{ width: 10, height: 10, borderRadius: 10 }}
                  />
                ))}
              </View>
            </View>
          </View>
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
            Alert.alert(
              APP_NAME,
              "Are you sure you want to remove this item from history?",
              [
                {
                  text: "Yes",
                  style: "default",
                  onPress: async () => {
                    if (settings.haptics) {
                      await onImpact();
                    }
                    remove(item);
                  },
                },

                {
                  text: "No",
                  style: "cancel",
                  onPress: async () => {
                    if (settings.haptics) {
                      await onImpact();
                    }
                  },
                },
              ],
              { cancelable: false }
            );
          }}
        >
          <MaterialIcons name="delete" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Card>
  );
};

export default HistoryItem;
