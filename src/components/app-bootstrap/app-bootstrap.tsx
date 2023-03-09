import React, {
  ReactElement,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  DeliusUnicase_400Regular,
  DeliusUnicase_700Bold,
} from "@expo-google-fonts/delius-unicase";
import { Auth, Hub } from "aws-amplify";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useAuth } from "@contexts/auth-context";
import { View } from "react-native";

type AppBootstrapProps = {
  children: ReactNode;
};

export default function AppBootstrap({
  children,
}: AppBootstrapProps): ReactElement {
  const [authLoaded, setAuthLoaded] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const { setUser } = useAuth();

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

  useEffect(() => {
    async function checkCurrentUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUser(user);
      } catch (error) {
        setUser(null);
      }
      setAuthLoaded(true);
    }

    checkCurrentUser();

    function hubListener(hubData: any) {
      const { data, event } = hubData.payload;
      switch (event) {
        case "signOut":
          setUser(null);
          break;
        case "signIn":
          setUser(data);
          break;
        default:
          break;
      }
    }

    Hub.listen("auth", hubListener);

    return () => {
      Hub.remove("auth", hubListener);
    };
  }, []);

  const onLayout = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  return appIsReady && authLoaded ? (
    <View style={{ flex: 1 }} onLayout={onLayout}>
      {children}
    </View>
  ) : (
    <></>
  );
}
