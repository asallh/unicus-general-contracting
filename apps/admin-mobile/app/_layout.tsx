import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import superjson from "superjson";

import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL!;
  const { scheme, colors, isDark } = useAppTheme();

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: apiUrl,
          transformer: superjson,
        }),
      ],
    })
  );

  const navigationTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      notification: colors.primary,
    },
  };

  const brandHeaderOptions = {
    headerStyle: { backgroundColor: colors.surface },
    headerTintColor: colors.text,
    headerTitleStyle: { fontWeight: "700" as const, fontSize: 17 },
    headerShadowVisible: false,
    headerBackTitle: "Back",
    contentStyle: { backgroundColor: colors.background },
  };

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <ThemeProvider value={navigationTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="project/[id]"
                options={{ title: "Project", ...brandHeaderOptions }}
              />
              <Stack.Screen
                name="review"
                options={{ title: "Review & Publish", ...brandHeaderOptions }}
              />
            </Stack>
            <StatusBar style={scheme === "dark" ? "light" : "dark"} />
          </ThemeProvider>
        </PaperProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
