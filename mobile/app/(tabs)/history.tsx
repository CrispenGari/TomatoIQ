import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import HistoryHeader from "@/src/components/Headers/HistoryHeader";
import { COLORS, FONTS } from "@/src/constants";
import { useHistoryStore } from "@/src/store/historyStore";
import HistoryItem from "@/src/components/HistoryItem/HistoryItem";
import Card from "@/src/components/Card/Card";

const Page = () => {
  const { history } = useHistoryStore();
  return (
    <>
      <Stack.Screen
        options={{
          header: () => <HistoryHeader />,
        }}
      />
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
        {history.length === 0 ? (
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
              height: 200,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 18,
                color: COLORS.gray,
              }}
            >
              You don't have any prediction history on this device.
            </Text>
          </Card>
        ) : (
          history.map((history, index) => (
            <HistoryItem key={index} item={history} />
          ))
        )}
      </ScrollView>
    </>
  );
};

export default Page;
