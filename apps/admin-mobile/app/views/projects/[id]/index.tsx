import Loader from "@/components/Loader";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { trpc } from "@/lib/trpc";
import { useLocalSearchParams } from "expo-router";

export default function ProjectExplorer() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    data: project,
    error,
    isLoading,
  } = trpc.project.getById.useQuery(id!);

  if (isLoading) return <Loader />;

  if (error) {
    console.error("Error", error.message);
    return <ThemedText>Something Went Wrong</ThemedText>;
  }

  if (!project) return <ThemedText>Project Not Found</ThemedText>;

  return (
    <ThemedView>
      <ThemedText>{project.id}</ThemedText>
      <ThemedText>{project.title}</ThemedText>
      <ThemedText>{project.description}</ThemedText>
    </ThemedView>
  );
}
