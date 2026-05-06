import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { httpBatchLink } from "@trpc/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import superjson from "superjson";
import { Colors } from "@/constants/theme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL!;

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

  const colorScheme = useColorScheme() ?? "light";

  const brandHeaderOptions = {
    headerStyle: { backgroundColor: Colors[colorScheme].secondary },
    headerTintColor: Colors[colorScheme].tertiary,
    headerTitleStyle: { fontWeight: "700" as const },
    headerShadowVisible: false,
  };

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="views/projects/index"
              options={{ title: "Projects", ...brandHeaderOptions }}
            />
            <Stack.Screen
              name="views/projects/[id]/index"
              options={{ title: "Project Details", ...brandHeaderOptions }}
            />
            <Stack.Screen
              name="views/newProjectFinalization/index"
              options={{ title: "Review Submission", ...brandHeaderOptions }}
            />
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
