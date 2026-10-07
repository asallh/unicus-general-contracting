import EmptyState from "@/components/EmptyState";
import Loader from "@/components/Loader";
import { ThemedText } from "@/components/themed-text";
import { Radius, Spacing } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { trpc } from "@/lib/trpc";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const utils = trpc.useUtils();
  const progress = useSharedValue(0);
  const carouselRef = useRef<ICarouselInstance>(null);
  const { width } = Dimensions.get("window");

  const {
    data: project,
    error,
    isLoading,
  } = trpc.project.getById.useQuery(id!, { enabled: !!id });

  const deleteMutation = trpc.project.deleteProject.useMutation({
    onSuccess: async () => {
      await utils.project.getAll.invalidate();
      Alert.alert("Deleted", "Project removed from the site.", [
        { text: "OK", onPress: () => router.replace("/(tabs)") },
      ]);
    },
    onError: (err) => {
      console.error("Error deleting project", err);
      Alert.alert("Error", "Failed to delete project.");
    },
  });

  const confirmDelete = useCallback(() => {
    Alert.alert(
      "Delete project?",
      "This removes it from the marketing site. This can’t be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            if (id) deleteMutation.mutate(id);
          },
        },
      ]
    );
  }, [deleteMutation, id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: project?.title ?? "Project",
      headerRight: () => (
        <IconButton
          icon="delete-outline"
          size={22}
          iconColor={colors.danger}
          onPress={confirmDelete}
          disabled={deleteMutation.isPending}
          accessibilityLabel="Delete project"
        />
      ),
    });
  }, [
    navigation,
    project?.title,
    confirmDelete,
    colors.danger,
    deleteMutation.isPending,
  ]);

  useEffect(() => {
    if (project?.title) {
      navigation.setOptions({ title: project.title });
    }
  }, [navigation, project?.title]);

  if (isLoading) return <Loader message="Loading project…" />;

  if (error) {
    return (
      <EmptyState
        icon="alert-circle-outline"
        title="Something went wrong"
        message={error.message}
        actionLabel="Go back"
        onAction={() => router.back()}
      />
    );
  }

  if (!project) {
    return (
      <EmptyState
        icon="file-search-outline"
        title="Project not found"
        message="It may have already been deleted."
        actionLabel="Back to projects"
        onAction={() => router.replace("/(tabs)")}
      />
    );
  }

  const imageUrls = (project.imageURL || []).filter(
    (url) => url && url.trim() !== ""
  );

  return (
    <View style={[styles.main, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {imageUrls.length > 0 ? (
          <View>
            <Carousel
              ref={carouselRef}
              width={width}
              height={300}
              data={imageUrls}
              loop={false}
              onProgressChange={progress}
              renderItem={({ item }) => (
                <View style={[styles.imageSlide, { backgroundColor: "#111" }]}>
                  <Image
                    source={{ uri: item }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
              )}
            />
            <View style={styles.paginationWrapper}>
              <Pagination.Basic
                progress={progress}
                data={imageUrls}
                dotStyle={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: colors.border,
                }}
                activeDotStyle={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: colors.primary,
                }}
                containerStyle={{ gap: 6 }}
                onPress={(index) =>
                  carouselRef.current?.scrollTo({
                    count: index - progress.value,
                    animated: true,
                  })
                }
              />
              <ThemedText style={[styles.photoCount, { color: colors.textMuted }]}>
                {imageUrls.length}{" "}
                {imageUrls.length === 1 ? "photo" : "photos"}
              </ThemedText>
            </View>
          </View>
        ) : (
          <View style={[styles.noImages, { backgroundColor: colors.accent }]}>
            <MaterialCommunityIcons
              name="image-off-outline"
              size={40}
              color={colors.icon}
            />
            <ThemedText style={{ color: colors.textMuted }}>
              No images
            </ThemedText>
          </View>
        )}

        <View style={styles.info}>
          <ThemedText style={styles.projectTitle}>{project.title}</ThemedText>

          {!!project.description && (
            <View
              style={[
                styles.descriptionCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <ThemedText
                style={[styles.fieldLabel, { color: colors.textMuted }]}
              >
                Description
              </ThemedText>
              <ThemedText style={styles.descriptionText}>
                {project.description}
              </ThemedText>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  imageSlide: {
    width: "100%",
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  paginationWrapper: {
    alignItems: "center",
    paddingVertical: Spacing.md,
    gap: 6,
  },
  photoCount: {
    fontSize: 12,
  },
  noImages: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  info: {
    padding: Spacing.xl,
    gap: Spacing.lg,
  },
  projectTitle: {
    fontSize: 26,
    fontWeight: "800",
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  descriptionCard: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    gap: Spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
