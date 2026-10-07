import { useAppTheme } from "@/hooks/use-app-theme";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { ThemedText } from "./themed-text";

interface LoaderProps {
  message?: string;
}

export default function Loader({ message }: LoaderProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator animating size="large" color={colors.primary} />
      {message ? (
        <ThemedText style={[styles.message, { color: colors.textMuted }]}>
          {message}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    padding: 24,
  },
  message: {
    fontSize: 14,
    textAlign: "center",
  },
});
