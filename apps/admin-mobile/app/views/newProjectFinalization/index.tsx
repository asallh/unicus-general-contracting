import { ImageInfo } from "@/components/ProjectImagePicker";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { convertImagesToBase64 } from "@/lib/helper";
import { trpc } from "@/lib/trpc";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ReviewSubmission() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme() ?? "light";
  const theme = colorScheme as "light" | "dark";

  const [imageUris, setImageUris] = useState<ImageInfo[]>([]);
  const [generatedDescription, setGeneratedDescription] = useState("");
  const [isLoadingImages, setIsLoadingImages] = useState(true);

  const title = params.title as string;
  const briefDescription = (params.briefDescription as string) || "";

  const hasInitialized = useRef(false);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const storedImages = await AsyncStorage.getItem("pendingProjectImages");
        if (storedImages) {
          const parsedImages: ImageInfo[] = JSON.parse(storedImages);
          setImageUris(parsedImages);
        }
      } catch (error) {
        console.error("Error loading images:", error);
        Alert.alert("Error", "Failed to load images.");
      } finally {
        setIsLoadingImages(false);
      }
    };
    loadImages();
  }, []);

  useEffect(() => {
    if (
      !hasInitialized.current &&
      title &&
      imageUris.length > 0 &&
      !isLoadingImages
    ) {
      hasInitialized.current = true;
      convertImagesToBase64(imageUris)
        .then((base64Images) => {
          generateProjectDescriptionMutation.mutate({
            title,
            briefDescription: briefDescription || undefined,
            images: base64Images,
          });
        })
        .catch((error) => {
          console.error("Error converting images:", error);
          Alert.alert("Error", "Failed to process images.");
          hasInitialized.current = false;
        });
    }
  }, [title, imageUris, isLoadingImages, briefDescription]);

  const generateProjectDescriptionMutation =
    trpc.project.generateDescription.useMutation({
      onSuccess: (data) => {
        setGeneratedDescription(data.description);
      },
      onError: (error) => {
        console.error("Error generating description:", error);
        Alert.alert(
          "Error",
          "There was an error generating the description. Please try again."
        );
      },
    });

  const createProjectMutation = trpc.project.createWithImages.useMutation({
    onSuccess: () => {
      Alert.alert("Success!", "Project created successfully.", [
        { text: "OK", onPress: () => router.replace("/(tabs)") },
      ]);
    },
    onError: (error) => {
      console.error("Error submitting project:", error);
      Alert.alert("Error", "Failed to submit the project. Please try again.");
    },
  });

  const handleRegenerateDescription = async () => {
    if (!title || imageUris.length === 0) {
      Alert.alert("Error", "Missing title or images.");
      return;
    }
    try {
      const base64Images = await convertImagesToBase64(imageUris);
      generateProjectDescriptionMutation.mutate({
        title,
        briefDescription: briefDescription || undefined,
        images: base64Images,
      });
    } catch (error) {
      console.error("Error converting images:", error);
      Alert.alert("Error", "Failed to process images.");
    }
  };

  const handleSubmit = async () => {
    if (!title || !generatedDescription || imageUris.length === 0) {
      Alert.alert("Error", "Please ensure all fields are filled before submitting.");
      return;
    }
    try {
      const base64Images = await convertImagesToBase64(imageUris);
      createProjectMutation.mutate({
        title,
        description: generatedDescription,
        images: base64Images,
      });
    } catch (error) {
      console.error("Error converting images:", error);
      Alert.alert("Error", "Failed to process images.");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <View
          style={[styles.reviewCard, { backgroundColor: Colors[theme].accent }]}
        >
          <ThemedText style={[styles.fieldLabel, { color: Colors[theme].icon }]}>
            Project Title
          </ThemedText>
          <ThemedText style={styles.fieldValue}>{title}</ThemedText>
        </View>

        {/* Brief description (if provided) */}
        {!!briefDescription && (
          <View
            style={[
              styles.reviewCard,
              { backgroundColor: Colors[theme].accent },
            ]}
          >
            <ThemedText
              style={[styles.fieldLabel, { color: Colors[theme].icon }]}
            >
              Brief Description
            </ThemedText>
            <ThemedText style={styles.fieldValue}>{briefDescription}</ThemedText>
          </View>
        )}

        {/* Image count */}
        <View
          style={[styles.reviewCard, { backgroundColor: Colors[theme].accent }]}
        >
          <ThemedText style={[styles.fieldLabel, { color: Colors[theme].icon }]}>
            Images Selected
          </ThemedText>
          <ThemedText style={styles.fieldValue}>
            {imageUris.length} {imageUris.length === 1 ? "image" : "images"}
          </ThemedText>
        </View>

        {/* AI-Generated Description */}
        <View
          style={[styles.reviewCard, { backgroundColor: Colors[theme].accent }]}
        >
          <View style={styles.labelRow}>
            <ThemedText
              style={[styles.fieldLabel, { color: Colors[theme].icon }]}
            >
              AI-Generated Description
            </ThemedText>
            {generateProjectDescriptionMutation.isPending && (
              <ActivityIndicator
                size="small"
                color={Colors[theme].primary}
              />
            )}
          </View>

          {generateProjectDescriptionMutation.isPending ? (
            <ThemedText
              style={[styles.generatingText, { color: Colors[theme].icon }]}
            >
              Generating description from your images…
            </ThemedText>
          ) : (
            <ThemedText style={styles.fieldValue}>
              {generatedDescription || "Waiting for images to load…"}
            </ThemedText>
          )}

          <Button
            mode="text"
            onPress={handleRegenerateDescription}
            disabled={generateProjectDescriptionMutation.isPending}
            textColor={Colors[theme].primary}
            style={styles.regenerateBtn}
            compact
          >
            Regenerate
          </Button>
        </View>
      </ScrollView>

      {/* Pinned submit button */}
      <View
        style={[
          styles.submitContainer,
          { borderTopColor: Colors[theme].accent },
        ]}
      >
        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={
            createProjectMutation.isPending ||
            !generatedDescription ||
            generateProjectDescriptionMutation.isPending
          }
          loading={createProjectMutation.isPending}
          buttonColor={Colors[theme].primary}
          contentStyle={styles.submitContent}
          labelStyle={styles.submitLabel}
        >
          {createProjectMutation.isPending ? "Submitting…" : "Submit Project"}
        </Button>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 12,
    paddingBottom: 24,
  },
  reviewCard: {
    borderRadius: 14,
    padding: 16,
    gap: 8,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  fieldValue: {
    fontSize: 15,
    lineHeight: 22,
  },
  generatingText: {
    fontSize: 14,
    fontStyle: "italic",
    lineHeight: 20,
  },
  regenerateBtn: {
    alignSelf: "flex-start",
    marginLeft: -8,
    marginTop: 2,
  },
  submitContainer: {
    padding: 16,
    borderTopWidth: 1,
  },
  submitContent: {
    height: 52,
  },
  submitLabel: {
    fontSize: 16,
    fontWeight: "700",
  },
});
