import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import ProjectCard from "@/components/ProjectCard";
import { FlatList, StyleSheet, View } from "react-native";
import { trpc } from "@/lib/trpc";
import Loader from "@/components/Loader";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function CompletedProjects() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const { data: projects, error, isLoading } = trpc.project.getAll.useQuery();

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ThemedText style={styles.errorText}>
          Failed to load projects
        </ThemedText>
        <ThemedText
          style={[styles.errorSubText, { color: Colors[colorScheme].icon }]}
        >
          {error.message}
        </ThemedText>
      </ThemedView>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ThemedText style={styles.emptyTitle}>No Projects Yet</ThemedText>
        <ThemedText
          style={[styles.emptySubtitle, { color: Colors[colorScheme].icon }]}
        >
          Add your first project using the Add Project tab
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProjectCard
            project={item}
            onPress={() => router.push(`/views/projects/${item.id}`)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <ThemedText
            style={[styles.countLabel, { color: Colors[colorScheme].icon }]}
          >
            {projects.length}{" "}
            {projects.length === 1 ? "project" : "projects"}
          </ThemedText>
        }
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    gap: 8,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  errorSubText: {
    fontSize: 13,
    textAlign: "center",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  countLabel: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 14,
  },
  separator: {
    height: 10,
  },
});
