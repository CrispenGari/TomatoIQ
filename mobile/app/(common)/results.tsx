import { Text, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useHistoryStore } from "@/src/store/historyStore";
import ResultHeader from "@/src/components/Headers/ResultHeader";
import {
  COLORS,
  FONTS,
  PLOT_COLORS,
  relativeTimeObject,
} from "@/src/constants";
import Card from "@/src/components/Card/Card";
import Animated, { SlideInLeft, SlideInRight } from "react-native-reanimated";
import { BarChart, CurveType } from "react-native-gifted-charts";
import LegendItem from "@/src/components/LegendItem/LegendItem";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/src/components/Button/Button";

dayjs.extend(relativeTime);
dayjs.extend(updateLocal);
dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { history } = useHistoryStore();
  const hist = React.useMemo(
    () => history.find((h) => h.id === id)!,
    [history, id]
  );

  const plotsData = React.useMemo(() => {
    const { maturity, quality } = hist.prediction;
    const rawMaturity = ["mature", "inmature"].map((item, index) => {
      const isMatch = item === maturity.class_label;
      const probability = isMatch
        ? maturity.probability * 100
        : (1 - maturity.probability) * 100;

      return {
        value: probability,
        frontColor: PLOT_COLORS[index],
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
        frontColor: PLOT_COLORS[index],
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
  }, [hist]);
  return (
    <>
      <Stack.Screen options={{ header: () => <ResultHeader /> }} />
      <ScrollView
        bounces
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 300,
          padding: 10,
          gap: 5,
        }}
        style={{
          flex: 1,
          backgroundColor: COLORS.main,
        }}
      >
        <Animated.View entering={SlideInRight.duration(200).delay(200)}>
          <Card style={[styles.card, { marginTop: 30 }]}>
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
                {dayjs(new Date(hist.date)).fromNow()} ago
              </Text>
            </View>
            <View style={[styles.badge, {}]}>
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  color: COLORS.white,
                }}
              >
                Image
              </Text>
            </View>

            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 29,
              }}
            >
              Tomato Image
            </Text>
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 14,
                color: COLORS.gray,
              }}
            >
              The image that was used for the predictions response.
            </Text>

            <Animated.Image
              source={{
                uri: hist.tomato,
              }}
              style={{
                width: 200,
                height: 200,
                alignSelf: "center",
                marginVertical: 20,
              }}
            />
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(200).delay(200)}>
          <Card style={[styles.card]}>
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
                {dayjs(new Date(hist.date)).fromNow()} ago
              </Text>
            </View>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 29,
              }}
            >
              Tomato Quality
            </Text>
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 14,
                color: COLORS.gray,
              }}
            >
              Based on the provided images, here are the tomato quality
              insights.
            </Text>

            <View
              style={{
                paddingBottom: 30,
                marginTop: 20,
              }}
            >
              <BarChart
                barWidth={50}
                noOfSections={3}
                barBorderRadius={4}
                minHeight={5}
                frontColor={COLORS.gray200}
                data={plotsData.quality}
                yAxisThickness={0}
                xAxisThickness={0}
                width={300}
                isAnimated
                animationDuration={300}
                gradientColor={COLORS.red}
                xAxisLabelTextStyle={{
                  fontFamily: FONTS.bold,
                  color: COLORS.black,
                }}
                yAxisTextStyle={{
                  fontFamily: FONTS.bold,
                  color: COLORS.black,
                }}
                yAxisLabelSuffix="%"
                showLine
                rotateLabel
                roundToDigits={1}
                lineConfig={{
                  curved: true,
                  color: COLORS.secondary,
                  curveType: CurveType.QUADRATIC,
                  isAnimated: true,
                  dataPointsColor: COLORS.red,
                  animationDuration: 300,
                  thickness: 2,
                }}
              />
            </View>
            <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
              {plotsData.quality
                .filter((i) => i.quality !== "")
                .map((data) => (
                  <LegendItem
                    label={data.quality}
                    key={data.quality}
                    color={data.frontColor}
                  />
                ))}
            </View>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(200).delay(200)}>
          <Card style={[styles.card]}>
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
                {dayjs(new Date(hist.date)).fromNow()} ago
              </Text>
            </View>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 29,
              }}
            >
              Tomato Maturity
            </Text>
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 14,
                color: COLORS.gray,
              }}
            >
              Based on the provided images, here are the tomato maturity
              insights.
            </Text>

            <View
              style={{
                paddingBottom: 30,
                marginTop: 20,
              }}
            >
              <BarChart
                barWidth={50}
                noOfSections={3}
                barBorderRadius={4}
                minHeight={5}
                frontColor={COLORS.gray200}
                data={plotsData.maturity}
                yAxisThickness={0}
                xAxisThickness={0}
                width={300}
                isAnimated
                animationDuration={300}
                gradientColor={COLORS.red}
                xAxisLabelTextStyle={{
                  fontFamily: FONTS.bold,
                  color: COLORS.black,
                }}
                yAxisTextStyle={{
                  fontFamily: FONTS.bold,
                  color: COLORS.black,
                }}
                yAxisLabelSuffix="%"
                showLine
                rotateLabel
                roundToDigits={1}
                lineConfig={{
                  curved: true,
                  color: COLORS.secondary,
                  curveType: CurveType.QUADRATIC,
                  isAnimated: true,
                  dataPointsColor: COLORS.red,
                  animationDuration: 300,
                  thickness: 2,
                }}
              />
            </View>
            <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
              {plotsData.maturity
                .filter((i) => i.maturity !== "")
                .map((data) => (
                  <LegendItem
                    label={data.maturity}
                    key={data.maturity}
                    color={data.frontColor}
                  />
                ))}
            </View>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(200).delay(200)}>
          <Card style={[styles.card]}>
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
                {dayjs(new Date(hist.date)).fromNow()} ago
              </Text>
            </View>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 29,
              }}
            >
              Prediction Summary
            </Text>
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 20,
                color: COLORS.tertiary,
              }}
            >
              {`Based on the Tomato image provided, the tomato is "${hist.prediction.maturity.class_label}" and it is "${hist.prediction.quality.class_label}".`}
            </Text>

            <Text>{}</Text>
          </Card>
        </Animated.View>

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
            gap: 20,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 25,
              }}
            >
              Want to try another Tomato Image?
            </Text>
            <Text
              style={{
                fontFamily: FONTS.regular,
                color: COLORS.gray,
              }}
            >
              Change the tomato image or try to take another clear image and see
              the results.
            </Text>
          </View>
          <Button
            title="Scan a Tomato"
            Icon={
              <Ionicons name="camera-outline" size={24} color={COLORS.white} />
            }
            style={{
              width: "100%",
              backgroundColor: COLORS.tertiary,
              marginVertical: 10,
            }}
            onPress={() => {
              if (router.canGoBack()) router.back();
              router.navigate({
                pathname: "/(common)/predict",
              });
            }}
          />
        </Card>
      </ScrollView>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  card: {
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
  },
  badge: {
    alignSelf: "center",
    position: "absolute",
    backgroundColor: COLORS.tertiary,
    borderRadius: 999,
    shadowOffset: { width: 2, height: 2 },
    elevation: 1,
    shadowColor: COLORS.tertiary,
    shadowOpacity: 0.35,
    shadowRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    top: -10,
    paddingHorizontal: 30,
  },
});
