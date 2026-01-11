import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import ProjectCard from "@/components/ProjectCard";
import { ScrollView } from "react-native";
import { trpc } from "@/lib/trpc";
import Loader from "@/components/Loader";
import { useRouter } from "expo-router";

export default function CompletedProjects() {
  const router = useRouter();
  const { data: projects, error, isLoading } = trpc.project.getAll.useQuery();

  if (isLoading) return <Loader />;

  if (error) return <ThemedText>Error: {error.message}</ThemedText>;

  if (!projects || projects.length === 0)
    return <ThemedText>No projects found</ThemedText>;

  return (
    <ThemedView>
      <ThemedText>Current Projects</ThemedText>
      <ScrollView>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onPress={() => router.push(`/views/projects/${project.id}`)}
          />
        ))}
      </ScrollView>
    </ThemedView>
  );
}
