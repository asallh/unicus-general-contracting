import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import ProjectCard from "@/components/ProjectCard";
import { View } from "react-native";
import { test_projects } from "@/data/sample_data";
import { trpc } from "@/lib/trpc";

export default function CompletedProjects() {
  const { data: projects, error, isLoading } = trpc.project.getAll.useQuery();

  console.log("Projects:", projects);
  console.log("Error:", error);
  console.log("Loading:", isLoading);

  if (isLoading) return <ThemedText>Loading...</ThemedText>;

  if (error) return <ThemedText>Error: {error.message}</ThemedText>;

  if (!projects || projects.length === 0)
    return <ThemedText>No projects found</ThemedText>;

  return (
    <ThemedView>
      <ThemedText>Current Projects</ThemedText>
      <View>
        {projects.map((project) => (
          <View key={project.id}>
            <ProjectCard id={project.id} projectTitle={project.title} />
          </View>
        ))}
      </View>
    </ThemedView>
  );
}
