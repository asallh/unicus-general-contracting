import { Radius, Spacing } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { ThemedText } from "./themed-text";

export interface ImageInfo {
  uri: string;
  type?: string;
  name?: string;
}

interface ProjectImagePickerProps {
  onImagesChange?: (images: ImageInfo[]) => void;
  maxImages?: number;
}

export default function ProjectImagePicker({
  onImagesChange,
  maxImages = 15,
}: ProjectImagePickerProps) {
  const { colors } = useAppTheme();
  const [images, setImages] = useState<ImageInfo[]>([]);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Allow photo library access so you can attach project images."
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    if (images.length >= maxImages) {
      Alert.alert(
        "Maximum Reached",
        `You can select up to ${maxImages} images.`
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        quality: 0.8,
        allowsEditing: false,
      });

      if (!result.canceled && result.assets) {
        const newImages = result.assets.map((asset) => ({
          uri: asset.uri,
          type: asset.mimeType,
          name: asset.fileName || `image-${Date.now()}.jpg`,
        }));

        const updatedImages = [...images, ...newImages].slice(0, maxImages);
        setImages(updatedImages);
        onImagesChange?.(updatedImages);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesChange?.(updatedImages);
  };

  return (
    <View style={styles.container}>
      {images.length === 0 ? (
        <Pressable
          onPress={pickImage}
          style={({ pressed }) => [
            styles.dropZone,
            {
              borderColor: colors.primary,
              backgroundColor: colors.primaryMuted,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
        >
          <MaterialCommunityIcons
            name="image-plus"
            size={36}
            color={colors.primary}
          />
          <ThemedText style={[styles.dropTitle, { color: colors.primary }]}>
            Add project photos
          </ThemedText>
          <ThemedText style={[styles.dropHint, { color: colors.textMuted }]}>
            Tap to choose from your library · up to {maxImages}
          </ThemedText>
        </Pressable>
      ) : (
        <>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.imageRow}
          >
            <Pressable
              onPress={pickImage}
              style={({ pressed }) => [
                styles.addTile,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <MaterialCommunityIcons
                name="plus"
                size={28}
                color={colors.primary}
              />
              <ThemedText style={[styles.addTileLabel, { color: colors.primary }]}>
                Add
              </ThemedText>
            </Pressable>

            {images.map((image, index) => (
              <View
                key={`${image.uri}-${index}`}
                style={[styles.imageWrapper, { borderColor: colors.border }]}
              >
                <Image
                  source={{ uri: image.uri }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <Pressable
                  style={[styles.removeButton, { backgroundColor: colors.surface }]}
                  onPress={() => removeImage(index)}
                  hitSlop={8}
                >
                  <MaterialCommunityIcons
                    name="close"
                    size={14}
                    color={colors.danger}
                  />
                </Pressable>
                {index === 0 && (
                  <View
                    style={[styles.coverBadge, { backgroundColor: colors.secondary }]}
                  >
                    <ThemedText style={styles.coverBadgeText}>Cover</ThemedText>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>

          <ThemedText style={[styles.countText, { color: colors.textMuted }]}>
            {images.length} of {maxImages} selected · first photo is the cover
          </ThemedText>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  dropZone: {
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderRadius: Radius.lg,
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    alignItems: "center",
    gap: Spacing.sm,
  },
  dropTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  dropHint: {
    fontSize: 13,
    textAlign: "center",
  },
  imageRow: {
    flexDirection: "row",
    gap: Spacing.md,
    paddingVertical: 2,
  },
  addTile: {
    width: 96,
    height: 96,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  addTileLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  imageWrapper: {
    position: "relative",
    width: 96,
    height: 96,
    borderRadius: Radius.md,
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  removeButton: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  coverBadge: {
    position: "absolute",
    left: 6,
    bottom: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  coverBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#222",
  },
  countText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
