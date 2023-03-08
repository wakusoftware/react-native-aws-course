import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Inter_900Black } from "@expo-google-fonts/inter";
import {
  useFonts,
  DeliusUnicase_400Regular,
  DeliusUnicase_700Bold,
} from "@expo-google-fonts/delius-unicase";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@components";
import Navigator from "@config/navigator";
import { SettingsProvider } from "@contexts/settings-context";
import { Amplify } from "aws-amplify";
import config from "../aws-exports";
Amplify.configure(config);

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          DeliusUnicase_400Regular,
          DeliusUnicase_700Bold,
        });
      } catch {
        // handle error
      } finally {
        setAppIsReady(true);
      }
    })();
  }, []);

  const onLayout = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayout}>
      <SettingsProvider>
        <Navigator />
      </SettingsProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
