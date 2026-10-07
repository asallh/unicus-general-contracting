import EmptyState from "@/components/EmptyState";
import Loader from "@/components/Loader";
import ProjectCard from "@/components/ProjectCard";
import Screen from "@/components/Screen";
import { ThemedText } from "@/components/themed-text";
import { Radius, Spacing } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { trpc } from "@/lib/trpc";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { Snackbar } from "react-native-paper";

const WEBSITE_URL = "https://www.unicuscontracting.com/";

export default function ProjectsScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const {
    data: projects,
    error,
    isLoading,
    isRefetching,
    refetch,
  } = trpc.project.getAll.useQuery();

  const handleCopyLink = useCallback(async () => {
    await Clipboard.setStringAsync(WEBSITE_URL);
    setSnackbarVisible(true);
  }, []);

  const header = (
    <View style={[styles.header, { borderBottomColor: colors.border }]}>
      <View style={styles.headerRow}>
        <Image
          source={require("@/assets/images/favicon/favicon-21.png")}
          style={styles.mark}
          contentFit="contain"
        />
        <View style={styles.headerText}>
          <ThemedText style={styles.title} numberOfLines={1}>
            Projects
          </ThemedText>
          <ThemedText
            style={[styles.subtitle, { color: colors.textMuted }]}
            numberOfLines={2}
          >
            Portfolio on the Unicus marketing site
          </ThemedText>
        </View>
        <Pressable
          onPress={handleCopyLink}
          hitSlop={10}
          accessibilityLabel="Copy website link"
          style={({ pressed }) => [
            styles.linkButton,
            {
              backgroundColor: colors.accent,
              opacity: pressed ? 0.75 : 1,
            },
          ]}
        >
          <MaterialCommunityIcons
            name="open-in-new"
            size={18}
            color={colors.primary}
          />
        </Pressable>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <Screen padded={false} header={header}>
        <Loader message="Loading projects…" />
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen padded={false} header={header}>
        <EmptyState
          icon="alert-circle-outline"
          title="Couldn’t load projects"
          message={error.message || "Check your connection and try again."}
          actionLabel="Retry"
          onAction={() => refetch()}
        />
      </Screen>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <Screen padded={false} header={header}>
        <EmptyState
          icon="briefcase-plus-outline"
          title="No projects yet"
          message="Add a project with photos and we’ll publish it to the marketing site."
          actionLabel="Add Project"
          onAction={() => router.push("/(tabs)/add")}
        />
      </Screen>
    );
  }

  return (
    <Screen padded={false} header={header}>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProjectCard
            project={item}
            onPress={() => router.push(`/project/${item.id}`)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <ThemedText style={[styles.countLabel, { color: colors.textMuted }]}>
            {projects.length} {projects.length === 1 ? "project" : "projects"}
          </ThemedText>
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => {
              void refetch();
            }}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      />
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        style={{ backgroundColor: colors.tertiary }}
      >
        Website link copied
      </Snackbar>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  mark: {
    width: 56,
    height: 56,
    flexShrink: 0,
  },
  headerText: {
    flex: 1,
    minWidth: 0,
    justifyContent: "center",
    gap: 2,
  },
  linkButton: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.3,
    lineHeight: 32,
    includeFontPadding: false,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  listContent: {
    padding: Spacing.lg,
    paddingBottom: 40,
  },
  countLabel: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: Spacing.md,
  },
  separator: {
    height: Spacing.md,
  },
});
