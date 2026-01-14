import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store"; // Importar para borrado físico
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { HttpStatusCode } from "../api/baseRepositories/api/http/constants";
import { useColorScheme } from "../hooks/useColorSchemeWeb";
import SocketProvider from "../providers/socketProvider";
import { store } from "../redux/store";

// Prevent auto-hiding
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments(); // Track current route
  const [isReady, setIsReady] = useState(false);
  const colorScheme = useColorScheme();

  const clearStorage = async () => {
    try {
      console.log("Limpiando sesión por token inválido...");
      await SecureStore.deleteItemAsync("userToken");
      router.replace("/");
    } catch (e) {
      console.error("Error al limpiar storage", e);
    }
  };

  // onError handler
  useEffect(() => {
    queryClient.setDefaultOptions({
      mutations: {
        onError: (error: any) => {
          if (error?.status === HttpStatusCode.UNAUTHORIZED) {
            clearStorage();
          }
        },
      },
    });
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        const inAuthGroup = segments[0] === "chat";

        if (token && !inAuthGroup) {
          router.replace("/chat");
        } else if (!token && inAuthGroup) {
          router.replace("/");
        }
      } finally {
        setIsReady(true);
        // Hide SplashScreen
        await SplashScreen.hideAsync();
      }
    };

    initializeAuth();
  }, [segments]);

  if (!isReady) return null;

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <SocketProvider>
            <GestureHandlerRootView>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="chat" options={{ headerShown: false }} />
              </Stack>

              <StatusBar style="light" />
            </GestureHandlerRootView>
          </SocketProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
