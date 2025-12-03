import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import ProjectCard from "@/components/ProjectCard";
import { View } from "react-native";
import { test_projects } from "@/data/sample_data";
import { trpc } from "@/lib/trpc";

export default function CompletedProjects() {
  const {data: projects} = trpc.project.getAll.useQuery()

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
