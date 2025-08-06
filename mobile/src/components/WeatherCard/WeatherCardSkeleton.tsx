import { View } from "react-native";
import React from "react";
import Card from "../Card/Card";
import ContentLoader from "../ContentLoader/ContentLoader";
import { COLORS } from "@/src/constants";

const WeatherCardSkeleton = () => {
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
      <ContentLoader
        style={{
          borderRadius: 5,
          padding: 8,
          marginBottom: 5,
          width: 80,
        }}
      />
      <View
        style={{
          gap: 10,
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1 }}>
          <ContentLoader
            style={{
              borderRadius: 5,
              padding: 15,
            }}
          />
          <ContentLoader
            style={{
              borderRadius: 5,
              padding: 5,
              marginTop: 3,
              width: "60%",
            }}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <ContentLoader
            style={{
              width: 30,
              height: 40,
              borderRadius: 5,
            }}
          />
          <View
            style={{
              alignItems: "center",
            }}
          >
            <ContentLoader
              style={{
                width: 40,
                height: 40,
                borderRadius: 5,
                marginBottom: 3,
              }}
            />
            <ContentLoader
              style={{
                borderRadius: 5,
                width: 80,
                padding: 5,
              }}
            />
          </View>
        </View>
      </View>

      <View style={{ marginTop: 5 }}>
        <ContentLoader
          style={{
            borderRadius: 5,
            width: 50,
            height: 50,
          }}
        />
        <ContentLoader
          style={{
            borderRadius: 5,
            width: "60%",
            padding: 5,
            marginTop: 3,
          }}
        />
      </View>

      <View style={{ marginTop: 5, flexDirection: "row", gap: 10 }}>
        <ContentLoader
          style={{
            minWidth: 80,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: COLORS.secondary,
            padding: 10,
            flex: 1,
          }}
        />

        <ContentLoader
          style={{
            minWidth: 80,
            flex: 1,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: COLORS.tertiary,
            padding: 10,
          }}
        />

        <ContentLoader
          style={{
            minWidth: 80,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: COLORS.main,
            padding: 10,
          }}
        />

        <ContentLoader
          style={{
            minWidth: 80,
            flex: 1,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: COLORS.red,
            padding: 10,
          }}
        />
      </View>
    </Card>
  );
};

export default WeatherCardSkeleton;
