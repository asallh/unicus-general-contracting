import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import ProjectCard from "@/components/ProjectCard";
import { View } from "react-native";
import { test_projects } from "@/data/sample_data";

export default function ExistingProjects() {
  const projects = test_projects;
  return (
    <ThemedView>
      <ThemedText>Current Projects</ThemedText>
      <View>
        {projects?.map((project) => (
          <View key={project.id}>
            <ProjectCard id={project.id} projectTitle={project.title} />
          </View>
        ))}
      </View>
    </ThemedView>
  );
}
