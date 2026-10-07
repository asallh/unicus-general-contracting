import { Colors, Radius, Spacing } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { ThemedText } from "./themed-text";

interface EmptyStateProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon,
  title,
  message,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const { colors, scheme } = useAppTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconWrap,
          { backgroundColor: Colors[scheme].primaryMuted },
        ]}
      >
        <MaterialCommunityIcons name={icon} size={32} color={colors.primary} />
      </View>
      <ThemedText style={styles.title}>{title}</ThemedText>
      <ThemedText style={[styles.message, { color: colors.textMuted }]}>
        {message}
      </ThemedText>
      {actionLabel && onAction ? (
        <Button
          mode="contained"
          onPress={onAction}
          buttonColor={colors.primary}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          {actionLabel}
        </Button>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xxl,
    gap: Spacing.sm,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: Radius.xl,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  message: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  button: {
    borderRadius: Radius.md,
    marginTop: Spacing.sm,
  },
  buttonContent: {
    height: 48,
    paddingHorizontal: Spacing.lg,
  },
  buttonLabel: {
    fontSize: 15,
    fontWeight: "700",
  },
});
