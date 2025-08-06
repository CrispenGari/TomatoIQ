import "react-native-reanimated";
///

import { Fonts, STORAGE_NAME } from "@/src/constants";
import ReactQueryProvider from "@/src/providers/ReactQueryProvider";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { loadAsync } from "expo-font";
import * as Notifications from "expo-notifications";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  registerForPushNotificationsAsync,
  scheduleDailyNotification,
} from "@/src/utils/notifications";
import { useSettingsStore } from "@/src/store/settingsStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRandomItem } from "@/src/utils";
import { tips } from "@/src/constants/tips";
import { useDailyTipStore } from "@/src/store/useDailyTip";

LogBox.ignoreLogs;
LogBox.ignoreAllLogs();
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Layout = () => {
  const [appIsReady, setAppIsReady] = React.useState(false);

  React.useEffect(() => {
    async function prepare() {
      try {
        await loadAsync(Fonts);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(() => {
    if (appIsReady) {
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar style="dark" />
      <ReactQueryProvider>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <RootLayout />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ReactQueryProvider>
    </View>
  );
};

export default Layout;

const RootLayout = () => {
  const { settings } = useSettingsStore();
  const { update } = useDailyTipStore();
  const router = useRouter();

  React.useEffect(() => {
    registerForPushNotificationsAsync().then(async (token) => {
      if (!settings.new) {
        if (!!token && settings.notifications) {
          const today = new Date().toISOString().split("T")[0];
          const scheduledDate = await AsyncStorage.getItem(
            STORAGE_NAME.TIP_NOTIFICATION_FLAG_KEY
          );
          if (scheduledDate !== today) {
            const tip = getRandomItem(tips);
            await scheduleDailyNotification({
              body: tip.text,
              title: `🌱 Did you know?`,
            });
            update(tip);
            await AsyncStorage.setItem(
              STORAGE_NAME.TIP_NOTIFICATION_FLAG_KEY,
              today
            );
          }
        }
      }
    });
  }, [settings]);

  React.useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener(
      (_notification) => {}
    );
    const responseListener =
      Notifications.addNotificationResponseReceivedListener((_response) => {
        router.navigate({
          pathname: "/(tabs)/home",
        });
      });
    return () => {
      responseListener.remove();
      notificationListener.remove();
    };
  }, []);
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};
