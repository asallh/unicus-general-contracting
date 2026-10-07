import ProjectImagePicker from "@/components/ProjectImagePicker";
import Screen from "@/components/Screen";
import { ThemedText } from "@/components/themed-text";
import { Radius, Spacing } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";

export default function AddProjectScreen() {
  const [title, setTitle] = useState("");
  const [briefDescription, setBriefDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  const router = useRouter();
  const { colors } = useAppTheme();
  const paperTheme = useTheme();

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

  const handleReview = async () => {
    if (!title.trim()) {
      Alert.alert("Missing title", "Enter a project title to continue.");
      return;
    }
    if (selectedImages.length === 0) {
      Alert.alert("Add photos", "Select at least one project photo.");
      return;
    }

    try {
      setSaving(true);
      await AsyncStorage.setItem(
        "pendingProjectImages",
        JSON.stringify(selectedImages)
      );
      router.push({
        pathname: "/review",
        params: {
          title: title.trim(),
          briefDescription: briefDescription.trim(),
        },
      });
    } catch (error) {
      console.error("Error storing images:", error);
      Alert.alert("Error", "Couldn’t save draft. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const footer = (
    <View
      style={[
        styles.footer,
        { borderTopColor: colors.border, backgroundColor: colors.surface },
      ]}
    >
      <Button
        mode="contained"
        onPress={handleReview}
        loading={saving}
        disabled={saving}
        buttonColor={colors.primary}
        contentStyle={styles.submitContent}
        labelStyle={styles.submitLabel}
        style={styles.submitButton}
      >
        Continue to review
      </Button>
    </View>
  );

  return (
    <Screen scroll padded footer={footer}>
      <View style={styles.headerBlock}>
        <ThemedText style={styles.title}>Add project</ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.textMuted }]}>
          Title and photos are required. We’ll draft a description from your
          images next.
        </ThemedText>
      </View>

      <View
        style={[
          styles.stepCard,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <ThemedText style={[styles.stepLabel, { color: colors.primary }]}>
          Step 1 of 2
        </ThemedText>

        <TextInput
          label="Project title"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          textColor={colors.text}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          style={[styles.input, { backgroundColor: colors.surface }]}
          theme={inputTheme}
          returnKeyType="next"
        />

        <View>
          <TextInput
            label="Short hint for AI (optional)"
            value={briefDescription}
            onChangeText={setBriefDescription}
            mode="outlined"
            textColor={colors.text}
            outlineColor={colors.border}
            activeOutlineColor={colors.primary}
            style={[styles.input, styles.multiline, { backgroundColor: colors.surface }]}
            theme={inputTheme}
            multiline
            numberOfLines={3}
          />
          <ThemedText style={[styles.hint, { color: colors.textMuted }]}>
            e.g. kitchen remodel in Denver — helps the AI write a better blurb
          </ThemedText>
        </View>

        <View style={styles.photosBlock}>
          <ThemedText style={styles.sectionTitle}>Photos</ThemedText>
          <ProjectImagePicker
            onImagesChange={setSelectedImages}
            maxImages={20}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerBlock: {
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.lg,
    gap: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  stepCard: {
    borderRadius: Radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  input: {
    fontSize: 16,
  },
  multiline: {
    minHeight: 96,
  },
  hint: {
    fontSize: 12,
    marginTop: 6,
    lineHeight: 17,
  },
  photosBlock: {
    gap: Spacing.md,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  submitButton: {
    borderRadius: Radius.md,
  },
  submitContent: {
    height: 52,
  },
  submitLabel: {
    fontSize: 15,
    fontWeight: "700",
  },
});
