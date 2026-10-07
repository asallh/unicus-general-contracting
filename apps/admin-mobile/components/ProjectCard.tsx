import { Radius, Spacing } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { titleCase } from "@/lib/helper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Project } from "@unicus-monorepo/api";
import { Image } from "expo-image";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";

interface ProjectCardProps {
  project: Project;
  onPress?: () => void;
}

export default function ProjectCard({ project, onPress }: ProjectCardProps) {
  const { colors } = useAppTheme();

  const imageUrl = Array.isArray(project.imageURL)
    ? project.imageURL[0]
    : project.imageURL;

  const photoCount = Array.isArray(project.imageURL)
    ? project.imageURL.filter(Boolean).length
    : imageUrl
      ? 1
      : 0;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.thumbnail} contentFit="cover" />
      ) : (
        <View style={[styles.thumbnail, { backgroundColor: colors.accent }]}>
          <MaterialCommunityIcons
            name="image-outline"
            size={22}
            color={colors.icon}
          />
        </View>
      )}

      <View style={styles.content}>
        <ThemedText style={styles.title} numberOfLines={2}>
          {titleCase(project.title)}
        </ThemedText>
        {!!project.description && (
          <ThemedText
            style={[styles.description, { color: colors.textMuted }]}
            numberOfLines={2}
          >
            {project.description}
          </ThemedText>
        )}
        {photoCount > 0 && (
          <View style={styles.metaRow}>
            <MaterialCommunityIcons
              name="image-multiple-outline"
              size={14}
              color={colors.textMuted}
            />
            <ThemedText style={[styles.meta, { color: colors.textMuted }]}>
              {photoCount} {photoCount === 1 ? "photo" : "photos"}
            </ThemedText>
          </View>
        )}
      </View>

      <MaterialCommunityIcons
        name="chevron-right"
        size={22}
        color={colors.icon}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: Radius.lg,
    gap: Spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 21,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  meta: {
    fontSize: 12,
    fontWeight: "500",
  },
});
