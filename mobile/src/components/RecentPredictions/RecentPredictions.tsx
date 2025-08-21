import { View, Text } from "react-native";
import React from "react";
import Card from "../Card/Card";
import { COLORS, FONTS } from "@/src/constants";
import { useHistoryStore } from "@/src/store/historyStore";
import HistoryItemHome from "../HistoryItem/HistoryItemHome";

const RecentPredictions = () => {
  const { history } = useHistoryStore();
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
      }}
    >
      <View>
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: 25,
          }}
        >
          Your Recent History
        </Text>
        <Text
          style={{
            fontFamily: FONTS.regular,
            color: COLORS.gray,
          }}
        >
          Quickly access your recent predictions on tomato images.
        </Text>
      </View>

      {history.length === 0 ? (
        <View
          style={{
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
            No recent predictions.
          </Text>
        </View>
      ) : (
        <View>
          {history.slice(0, 2).map((item, index) => (
            <HistoryItemHome key={index} item={item} />
          ))}
        </View>
      )}
    </Card>
  );
};

export default RecentPredictions;
