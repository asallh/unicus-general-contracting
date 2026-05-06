import Loader from "@/components/Loader";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { trpc } from "@/lib/trpc";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { IconButton, Menu, PaperProvider } from "react-native-paper";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const OptionsMenu = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [visible, setVisible] = useState(false);
  const theme = useColorScheme() ?? "light";

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleDelete = trpc.project.deleteProject.useMutation({
    onSuccess: () => {
      Alert.alert("Deleted", "Project successfully deleted.", [
        {
          text: "OK",
          onPress: () => router.replace("/views/projects"),
        },
      ]);
    },
    onError: (error) => {
      console.error("Error deleting the project", error);
      Alert.alert("Error", "Failed to delete project.");
    },
  });

  const confirmDelete = () => {
    closeMenu();
    Alert.alert(
      "Delete Project?",
      "Are you sure you want to delete this project? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            if (id) handleDelete.mutate(id);
          },
        },
      ]
    );
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <IconButton
          icon="dots-vertical"
          size={24}
          iconColor={Colors[theme].tertiary}
          onPress={openMenu}
        />
      }
    >
      <Menu.Item
        onPress={confirmDelete}
        title="Delete Project"
        leadingIcon="delete-outline"
        titleStyle={{ color: Colors[theme].danger }}
      />
    </Menu>
  );
};

export default function ProjectExplorer() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    data: project,
    error,
    isLoading,
  } = trpc.project.getById.useQuery(id!);
  const progress = useSharedValue<number>(0);
  const { width } = Dimensions.get("window");
  const theme = useColorScheme() ?? "light";

  const imageUrls = (project?.imageURL || []).filter(
    (url) => url && url.trim() !== ""
  );
  const ref = React.useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  if (isLoading) return <Loader />;

  if (error) {
    console.error("Error", error.message);
    return (
      <ThemedView style={styles.centerContainer}>
        <ThemedText style={styles.centerText}>Something went wrong</ThemedText>
      </ThemedView>
    );
  }

  if (!project) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ThemedText style={styles.centerText}>Project not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <PaperProvider>
      <ThemedView style={styles.mainContainer}>
        {/* Options menu row */}
        <View style={styles.menuRow}>
          <OptionsMenu />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Image Carousel */}
          {imageUrls.length > 0 ? (
            <View>
              <Carousel
                ref={ref}
                width={width}
                height={300}
                data={imageUrls}
                loop={false}
                onProgressChange={progress}
                renderItem={({ item }) => (
                  <View
                    style={[
                      styles.imageSlide,
                      { borderBottomColor: Colors[theme].secondary },
                    ]}
                  >
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
                  dotStyle={styles.dot}
                  activeDotStyle={[
                    styles.dot,
                    { backgroundColor: Colors[theme].primary },
                  ]}
                  containerStyle={{ gap: 6 }}
                  onPress={onPressPagination}
                />
                <ThemedText
                  style={[styles.photoCount, { color: Colors[theme].icon }]}
                >
                  {imageUrls.length}{" "}
                  {imageUrls.length === 1 ? "photo" : "photos"}
                </ThemedText>
              </View>
            </View>
          ) : (
            <View
              style={[
                styles.noImagesContainer,
                { backgroundColor: Colors[theme].accent },
              ]}
            >
              <MaterialCommunityIcons
                name="image-off-outline"
                size={40}
                color={Colors[theme].icon}
              />
              <ThemedText
                style={[styles.noImagesText, { color: Colors[theme].icon }]}
              >
                No images available
              </ThemedText>
            </View>
          )}

          {/* Project Info */}
          <View style={styles.infoContainer}>
            <ThemedText style={styles.projectTitle}>
              {project.title}
            </ThemedText>

            {!!project.description && (
              <View
                style={[
                  styles.descriptionCard,
                  { backgroundColor: Colors[theme].accent },
                ]}
              >
                <ThemedText
                  style={[
                    styles.fieldLabel,
                    { color: Colors[theme].icon },
                  ]}
                >
                  Description
                </ThemedText>
                <ThemedText style={styles.descriptionText}>
                  {project.description}
                </ThemedText>
              </View>
            )}

            <ThemedText
              style={[styles.idText, { color: Colors[theme].icon }]}
            >
              ID: {project.id}
            </ThemedText>
          </View>
        </ScrollView>
      </ThemedView>
    </PaperProvider>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  centerText: {
    fontSize: 16,
    textAlign: "center",
  },
  menuRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 8,
    paddingTop: 4,
  },
  imageSlide: {
    width,
    height: 300,
    backgroundColor: "#000",
    borderBottomWidth: 3,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  paginationWrapper: {
    alignItems: "center",
    paddingVertical: 12,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  photoCount: {
    fontSize: 12,
  },
  noImagesContainer: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  noImagesText: {
    fontSize: 15,
  },
  infoContainer: {
    padding: 20,
    gap: 16,
  },
  projectTitle: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 30,
  },
  descriptionCard: {
    borderRadius: 12,
    padding: 14,
    gap: 6,
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
  idText: {
    fontSize: 11,
    fontFamily: "monospace",
  },
});
