import { Colors, Spacing } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenProps {
  children: ReactNode;
  scroll?: boolean;
  padded?: boolean;
  edges?: ("top" | "right" | "bottom" | "left")[];
  header?: ReactNode;
  footer?: ReactNode;
}

export default function Screen({
  children,
  scroll = false,
  padded = true,
  edges = ["top", "left", "right"],
  header,
  footer,
}: ScreenProps) {
  const { scheme } = useAppTheme();
  const backgroundColor = Colors[scheme].background;

  const body = scroll ? (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[
        padded ? styles.padded : undefined,
        styles.scrollContent,
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.flex, padded ? styles.padded : undefined]}>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor }]} edges={edges}>
      {header}
      {body}
      {footer}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: Spacing.lg,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
    flexGrow: 1,
  },
});
