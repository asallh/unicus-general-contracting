import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import { Pressable, StyleSheet, View, Image } from "react-native";
import { titleCase } from "@/lib/helper";
import { Project } from "@unicus-monorepo/api";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ProjectCardProps {
  project: Project;
  onPress?: () => void;
}

export default function ProjectCard({ project, onPress }: ProjectCardProps) {
  const colorScheme = useColorScheme() ?? "light";

  const imageUrl = Array.isArray(project.imageURL)
    ? project.imageURL[0]
    : project.imageURL;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1 })}
    >
      <ThemedView style={styles.card}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        ) : (
          <View
            style={[
              styles.thumbnailPlaceholder,
              { backgroundColor: Colors[colorScheme].accent },
            ]}
          >
            <MaterialCommunityIcons
              name="image-outline"
              size={24}
              color={Colors[colorScheme].icon}
            />
          </View>
        )}

        <View style={styles.content}>
          <ThemedText style={styles.title} numberOfLines={2}>
            {titleCase(project.title)}
          </ThemedText>
          {!!project.description && (
            <ThemedText
              style={[styles.description, { color: Colors[colorScheme].icon }]}
              numberOfLines={1}
            >
              {project.description}
            </ThemedText>
          )}
        </View>

        <MaterialCommunityIcons
          name="chevron-right"
          size={22}
          color={Colors[colorScheme].icon}
        />
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 14,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  thumbnail: {
    width: 66,
    height: 66,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
    flexShrink: 0,
  },
  thumbnailPlaceholder: {
    width: 66,
    height: 66,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
});
