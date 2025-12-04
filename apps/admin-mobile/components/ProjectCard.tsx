import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import { Pressable, StyleSheet } from "react-native";
import { titleCase } from "@/lib/helper";
import { Project } from "@unicus-monorepo/api";

interface ProjectCardProps {
  project: Project;
  onPress?: () => void;
}

export default function ProjectCard({ project, onPress }: ProjectCardProps) {
  return (
    <Pressable onPress={onPress}>
      <ThemedView style={styles.primaryContainer}>
        <ThemedText style={styles.projectTitle}>
          {titleCase(project.title)}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primaryContainer: {
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    margin: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  projectTitle: {
    margin: 4,
  },
});
