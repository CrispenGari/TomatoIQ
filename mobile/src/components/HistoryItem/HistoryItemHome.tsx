import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Card from "../Card/Card";
import { THistory } from "../../types";
import { useSettingsStore } from "../../store/settingsStore";
import { useRouter } from "expo-router";
import { onImpact } from "../../utils";
import {
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
dayjs.extend(relativeTime);
dayjs.extend(updateLocal);
dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});

const HistoryItemHome = ({ item }: { item: THistory }) => {
  const { settings } = useSettingsStore();
  const router = useRouter();

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
        padding: 10,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          backgroundColor: COLORS.secondary,
          position: "absolute",
          top: 0,
          right: 0,
          width: 50,
          padding: 5,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.bold,
            color: COLORS.white,
            fontSize: 10,
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
              style={{ width: 30, height: 30, resizeMode: "contain" }}
            />
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 14,
                color: COLORS.gray,
              }}
            >
              {`Based on the Tomato image provided, the tomato is "${item.prediction.maturity.class_label}" and it is "${item.prediction.quality.class_label}".`}
            </Text>

            <View>
              <PieChart
                donut
                isAnimated
                animationDuration={300}
                innerRadius={20}
                data={plotsData.quality}
                radius={30}
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
                          fontSize: 10,
                          textAlign: "center",
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
                  flexWrap: "wrap",
                  marginTop: 5,
                }}
              >
                {plotsData.quality.map((data) => (
                  <LegendItem
                    label={data.quality}
                    key={data.label}
                    color={data.color}
                    dotStyle={{ width: 10, height: 10, borderRadius: 10 }}
                    labelStyle={{
                      fontSize: 12,
                      fontFamily: FONTS.regular,
                    }}
                  />
                ))}
              </View>
            </View>
          </View>
          <View
            style={{
              gap: 5,
              flex: 1,
            }}
          >
            <View style={{}}>
              <PieChart
                donut
                isAnimated
                animationDuration={300}
                innerRadius={20}
                data={plotsData.maturity}
                radius={30}
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
                          fontSize: 10,
                          textAlign: "center",
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
                  flexWrap: "wrap",
                  marginTop: 5,
                }}
              >
                {plotsData.maturity.map((data) => (
                  <LegendItem
                    label={data.maturity}
                    key={data.label}
                    color={data.color}
                    dotStyle={{ width: 10, height: 10, borderRadius: 10 }}
                    labelStyle={{
                      fontSize: 12,
                      fontFamily: FONTS.regular,
                    }}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default HistoryItemHome;
