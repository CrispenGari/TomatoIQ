import { ScrollView, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/src/constants";
import WeatherCard from "@/src/components/WeatherCard/WeatherCard";
import Card from "@/src/components/Card/Card";
import Button from "@/src/components/Button/Button";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import DailyTip from "@/src/components/DailyTip/DailyTip";
import RecentPredictions from "@/src/components/RecentPredictions/RecentPredictions";
const Home = () => {
  const router = useRouter();
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: COLORS.main,
      }}
      contentContainerStyle={{
        paddingBottom: 300,
        padding: 10,
        gap: 10,
      }}
      showsVerticalScrollIndicator={false}
      bounces
    >
      <WeatherCard />
      <DailyTip />
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
            Check Tomato Quality and Maturity
          </Text>
          <Text
            style={{
              fontFamily: FONTS.regular,
              color: COLORS.gray,
            }}
          >
            Snap a photo of your tomato, and we'll analyze its ripeness and
            quality using AI. Make smarter harvest and sorting decisions
            instantly.
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
            marginVertical: 25,
          }}
          onPress={() => {
            router.navigate({
              pathname: "/(common)/predict",
            });
          }}
        />
      </Card>

      <RecentPredictions />
    </ScrollView>
  );
};

export default Home;
