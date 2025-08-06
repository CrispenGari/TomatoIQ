import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import PredictHeader from "@/src/components/Headers/PredictHeader";
import { AUDIOS, COLORS, FONTS } from "@/src/constants";
import Card from "@/src/components/Card/Card";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { useSettingsStore } from "@/src/store/settingsStore";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Button from "@/src/components/Button/Button";
import { useHistoryStore } from "@/src/store/historyStore";
import { useAudioPlayer } from "expo-audio";
import { generateRNFile, onImpact } from "@/src/utils";
import { useMediaPermissions } from "@/src/hooks/useMediaPermissions";
import ContentLoader from "@/src/components/ContentLoader/ContentLoader";
import Animated from "react-native-reanimated";
import { useMutation } from "@tanstack/react-query";
import { predictTomatoQualityAndMaturity } from "@/src/utils/react-query";
import uuid from "react-native-uuid";
import { THistory } from "@/src/types";

const Page = () => {
  const { camera, gallery, requestCameraPermission } = useMediaPermissions();
  const player = useAudioPlayer(AUDIOS.predicting);
  const player2 = useAudioPlayer(AUDIOS.results);
  const { add } = useHistoryStore();
  const { isPending: predicting, mutateAsync } = useMutation({
    mutationKey: ["tomato-prediction"],
    mutationFn: predictTomatoQualityAndMaturity,
  });
  const router = useRouter();
  const { settings } = useSettingsStore();
  const [state, setState] = React.useState<{
    uri?: string;
    fileName?: string | null;
    error?: string;
  }>({
    error: "",
    uri: "",
    fileName: "",
  });

  const makeRecommendations = async () => {
    setState((s) => ({ ...s, error: "" }));
    if (!!!state.uri) {
      setState((s) => ({
        ...s,
        error: "Please select a Tomato image.",
      }));
      return;
    }

    if (settings.sound) {
      player.play();
    }

    const tomato = generateRNFile({
      name: state.fileName || "tomato.jpeg",
      uri: state.uri,
    });
    await mutateAsync({
      tomato,
    })
      .then((res) => {
        player2.play();
        if (res.ok === false) {
          return setState({
            ...state,
            error: "Something went wrong on the server try again.",
          });
        }
        const history = {
          prediction: res.prediction!,
          date: new Date(),
          id: uuid.v4(),
          tomato: state.uri!,
        } satisfies THistory;
        setState((s) => ({ ...s, error: "", fileName: "", uri: "" }));
        add(history);
        router.navigate({
          pathname: "/(common)/results",
          params: {
            id: history.id,
          },
        });
      })
      .finally(() => {
        if (settings.sound) {
          player.pause();
          player.remove();
          player2.pause();
          player2.remove();
        }
      });
  };

  const select = async () => {
    if (settings.haptics) {
      await onImpact();
    }
    if (gallery) {
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
        mediaTypes: ["images"],
        allowsMultipleSelection: false,
        allowsEditing: true,
        presentationStyle: ImagePicker.UIImagePickerPresentationStyle.POPOVER,
      });

      if (!canceled) {
        setState((state) => ({
          ...state,
          uri: assets[0].uri,
          fileName: assets[0].fileName,
        }));
      }
    }
  };
  const take = async () => {
    if (settings.haptics) {
      await onImpact();
    }
    if (camera) {
      const { assets, canceled } = await ImagePicker.launchCameraAsync({
        quality: 1,
        mediaTypes: ["images"],
        allowsMultipleSelection: false,
        allowsEditing: true,
        presentationStyle: ImagePicker.UIImagePickerPresentationStyle.POPOVER,
      });

      if (!canceled) {
        setState((state) => ({
          ...state,
          uri: assets[0].uri,
          fileName: assets[0].fileName,
        }));
      }
    } else {
      await requestCameraPermission();
    }
  };
  const remove = async () => {
    if (settings.haptics) {
      await onImpact();
    }
    setState((state) => ({
      ...state,
      uri: undefined,
    }));
  };

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <PredictHeader />,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: COLORS.main,
        }}
        contentContainerStyle={{
          padding: 10,
          paddingBottom: 400,
          gap: 5,
        }}
      >
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
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View
              style={{
                flex: 1,
              }}
            >
              <Text style={{ fontFamily: FONTS.bold, fontSize: 25 }}>
                Tomato Image Selection
              </Text>
              <Text style={{ fontFamily: FONTS.regular, color: COLORS.gray }}>
                Select a tomato image or take it live from camera.
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.row,
              {
                width: "100%",
                paddingVertical: 20,
                justifyContent: "center",
                gap: 100,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.iconBtn}
              activeOpacity={0.7}
              onPress={select}
            >
              <AntDesign name="picture" size={24} color={COLORS.white} />
            </TouchableOpacity>

            <TouchableOpacity
              disabled={predicting}
              style={styles.iconBtn}
              activeOpacity={0.7}
              onPress={take}
            >
              <Ionicons name="camera" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </Card>

        {!!!state?.uri ? null : (
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
            {state.uri ? (
              <Animated.Image
                style={{
                  width: 250,
                  height: 300,
                  backgroundColor: COLORS.gray,
                  borderRadius: 10,
                  marginTop: 20,
                  alignSelf: "center",
                }}
                source={{ uri: state.uri }}
              />
            ) : (
              <ContentLoader
                style={{
                  width: 250,
                  height: 300,
                  backgroundColor: COLORS.main,
                  borderRadius: 10,
                  marginTop: 20,
                  opacity: 0.4,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <MaterialIcons
                  name="image-not-supported"
                  size={30}
                  color={COLORS.tertiary}
                />
              </ContentLoader>
            )}

            <Button
              title="Remove"
              style={{
                width: "100%",
                marginTop: 20,
              }}
              disabled={predicting}
              onPress={remove}
            />
          </Card>
        )}
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
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View
              style={{
                flex: 1,
              }}
            >
              <Text style={{ fontFamily: FONTS.bold, fontSize: 25 }}>
                Then, What is the Quality and Maturity of this Tomato?
              </Text>
              <Text style={{ fontFamily: FONTS.regular, color: COLORS.gray }}>
                Let AI decide for you.
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontFamily: FONTS.regular,
              color: COLORS.red,
              fontSize: 16,
            }}
          >
            {state.error}
          </Text>
          <Button
            onPress={makeRecommendations}
            loading={predicting}
            disabled={predicting}
            Icon={
              <MaterialCommunityIcons
                name="brain"
                size={24}
                color={COLORS.white}
              />
            }
            title="Analyze Tomato Image"
            style={{
              width: "100%",
              backgroundColor: COLORS.tertiary,
              marginVertical: 20,
            }}
          />
        </Card>
      </ScrollView>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
  },
  iconBtn: {
    padding: 10,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    alignSelf: "center",
    backgroundColor: COLORS.tertiary,
  },
});
