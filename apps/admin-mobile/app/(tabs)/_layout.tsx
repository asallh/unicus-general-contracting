import { Tabs } from "expo-router";
import { Platform, StyleSheet } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useAppTheme } from "@/hooks/use-app-theme";

export default function TabLayout() {
  const { colors } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab as never,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: StyleSheet.hairlineWidth,
          height: Platform.OS === "ios" ? 84 : 64,
          paddingBottom: Platform.OS === "ios" ? 28 : 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          letterSpacing: 0.2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Projects",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="briefcase.fill" color={String(color)} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add Project",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={26}
              name="plus.circle.fill"
              color={String(color)}
            />
          ),
        }}
      />
    </Tabs>
  );
}
