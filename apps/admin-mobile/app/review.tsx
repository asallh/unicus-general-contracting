import { ImageInfo } from "@/components/ProjectImagePicker";
import { ThemedText } from "@/components/themed-text";
import { Radius, Spacing } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { convertImagesToBase64 } from "@/lib/helper";
import { trpc } from "@/lib/trpc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  TextInput,
  useTheme,
} from "react-native-paper";

export default function ReviewSubmissionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { colors } = useAppTheme();
  const paperTheme = useTheme();
  const utils = trpc.useUtils();

  const [imageUris, setImageUris] = useState<ImageInfo[]>([]);
  const [generatedDescription, setGeneratedDescription] = useState("");
  const [isLoadingImages, setIsLoadingImages] = useState(true);

  const title = params.title as string;
  const briefDescription = (params.briefDescription as string) || "";
  const hasInitialized = useRef(false);

  const inputTheme = useMemo(
    () => ({
      ...paperTheme,
      colors: {
        ...paperTheme.colors,
        primary: colors.primary,
        onSurfaceVariant: colors.textMuted,
      },
      roundness: Radius.md,
    }),
    [paperTheme, colors]
  );

  useEffect(() => {
    const loadImages = async () => {
      try {
        const storedImages = await AsyncStorage.getItem("pendingProjectImages");
        if (storedImages) {
          setImageUris(JSON.parse(storedImages) as ImageInfo[]);
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

  const generateMutation = trpc.project.generateDescription.useMutation({
    onSuccess: (data) => {
      setGeneratedDescription(data.description);
    },
    onError: (error) => {
      console.error("Error generating description:", error);
      Alert.alert(
        "Couldn’t generate description",
        "Check your connection and try again."
      );
    },
  });

  const createMutation = trpc.project.createWithImages.useMutation({
    onSuccess: async () => {
      await AsyncStorage.removeItem("pendingProjectImages");
      await utils.project.getAll.invalidate();
      Alert.alert("Published", "Project is live on the marketing site.", [
        { text: "View projects", onPress: () => router.replace("/(tabs)") },
      ]);
    },
    onError: (error) => {
      console.error("Error submitting project:", error);
      Alert.alert("Error", "Failed to publish. Please try again.");
    },
  });

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
          generateMutation.mutate({
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
    // intentionally run once when images are ready
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, imageUris, isLoadingImages, briefDescription]);

  const handleRegenerate = async () => {
    if (!title || imageUris.length === 0) {
      Alert.alert("Error", "Missing title or images.");
      return;
    }
    try {
      const base64Images = await convertImagesToBase64(imageUris);
      generateMutation.mutate({
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
    const description = generatedDescription.trim();
    if (!title || !description || imageUris.length === 0) {
      Alert.alert(
        "Almost done",
        "Wait for the description, or write one before publishing."
      );
      return;
    }
    try {
      const base64Images = await convertImagesToBase64(imageUris);
      createMutation.mutate({
        title,
        description,
        images: base64Images,
      });
    } catch (error) {
      console.error("Error converting images:", error);
      Alert.alert("Error", "Failed to process images.");
    }
  };

  const generating = generateMutation.isPending;
  const publishing = createMutation.isPending;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedText style={[styles.stepLabel, { color: colors.primary }]}>
          Step 2 of 2 · Review
        </ThemedText>
        <ThemedText style={styles.heading}>Check before publishing</ThemedText>
        <ThemedText style={[styles.lede, { color: colors.textMuted }]}>
          Edit the AI description if needed, then publish to the site.
        </ThemedText>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <ThemedText style={[styles.fieldLabel, { color: colors.textMuted }]}>
            Title
          </ThemedText>
          <ThemedText style={styles.fieldValue}>{title}</ThemedText>
        </View>

        {!!briefDescription && (
          <View
            style={[
              styles.card,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <ThemedText style={[styles.fieldLabel, { color: colors.textMuted }]}>
              Your hint
            </ThemedText>
            <ThemedText style={styles.fieldValue}>{briefDescription}</ThemedText>
          </View>
        )}

        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <ThemedText style={[styles.fieldLabel, { color: colors.textMuted }]}>
            Photos ({imageUris.length})
          </ThemedText>
          {isLoadingImages ? (
            <ActivityIndicator color={colors.primary} />
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.thumbRow}
            >
              {imageUris.map((image, index) => (
                <Image
                  key={`${image.uri}-${index}`}
                  source={{ uri: image.uri }}
                  style={styles.thumb}
                />
              ))}
            </ScrollView>
          )}
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.labelRow}>
            <ThemedText style={[styles.fieldLabel, { color: colors.textMuted }]}>
              Site description
            </ThemedText>
            {generating && (
              <ActivityIndicator size="small" color={colors.primary} />
            )}
          </View>

          {generating ? (
            <ThemedText style={[styles.generating, { color: colors.textMuted }]}>
              Writing a description from your photos…
            </ThemedText>
          ) : (
            <TextInput
              mode="outlined"
              value={generatedDescription}
              onChangeText={setGeneratedDescription}
              multiline
              numberOfLines={6}
              placeholder="Description will appear here"
              textColor={colors.text}
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
              style={[styles.descriptionInput, { backgroundColor: colors.surface }]}
              theme={inputTheme}
            />
          )}

          <Button
            mode="text"
            onPress={handleRegenerate}
            disabled={generating || publishing}
            textColor={colors.primary}
            style={styles.regenerateBtn}
            compact
            icon="refresh"
          >
            Regenerate with AI
          </Button>
        </View>
      </ScrollView>

      <View
        style={[
          styles.submitContainer,
          {
            borderTopColor: colors.border,
            backgroundColor: colors.surface,
          },
        ]}
      >
        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={generating || publishing || !generatedDescription.trim()}
          loading={publishing}
          buttonColor={colors.primary}
          contentStyle={styles.submitContent}
          labelStyle={styles.submitLabel}
          style={styles.submitButton}
        >
          {publishing ? "Publishing…" : "Publish to site"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
    gap: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  heading: {
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.3,
    marginTop: -4,
  },
  lede: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    gap: Spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
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
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
  },
  thumbRow: {
    gap: Spacing.sm,
    paddingVertical: 2,
  },
  thumb: {
    width: 72,
    height: 72,
    borderRadius: Radius.sm,
  },
  generating: {
    fontSize: 14,
    fontStyle: "italic",
    lineHeight: 20,
  },
  descriptionInput: {
    minHeight: 140,
    fontSize: 15,
  },
  regenerateBtn: {
    alignSelf: "flex-start",
    marginLeft: -8,
  },
  submitContainer: {
    padding: Spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  submitButton: {
    borderRadius: Radius.md,
  },
  submitContent: {
    height: 52,
  },
  submitLabel: {
    fontSize: 16,
    fontWeight: "700",
  },
});
