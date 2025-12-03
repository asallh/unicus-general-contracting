import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import { StyleSheet } from "react-native";
import { titleCase } from "@/lib/helper";

interface ProjectCardProps {
  id: string;
  projectTitle: string;
}

export default function ProjectCard({ id, projectTitle }: ProjectCardProps) {
  return (
    <ThemedView style={styles.primaryContainer}>
      <ThemedText style={styles.projectTitle}>
        {titleCase(projectTitle)}
      </ThemedText>
    </ThemedView>
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
