import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useState } from "react";
import {
  Alert,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button, IconButton } from "react-native-paper";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

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
  const theme = useColorScheme() ?? "light";
  const [images, setImages] = useState<ImageInfo[]>([]);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "We need access to your photo library to select images."
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
        `You can only select up to ${maxImages} images.`
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
      <Button
        icon="cloud-upload"
        mode="outlined"
        onPress={pickImage}
        textColor={Colors[theme].primary}
        style={[styles.uploadButton, { borderColor: Colors[theme].primary }]}
        contentStyle={styles.uploadButtonContent}
      >
        Upload Images
      </Button>

      {images.length > 0 && (
        <>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.imageRow}
          >
            {images.map((image, index) => (
              <View
                key={index}
                style={[
                  styles.imageWrapper,
                  { borderColor: Colors[theme].icon + "40" },
                ]}
              >
                <Image
                  source={{ uri: image.uri }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeImage(index)}
                  hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
                >
                  <IconButton
                    icon="close-circle"
                    size={18}
                    iconColor={Colors[theme].danger}
                    style={styles.removeIcon}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <ThemedText style={[styles.countText, { color: Colors[theme].icon }]}>
            {images.length} of {maxImages} images selected
          </ThemedText>
        </>
      )}

      {images.length === 0 && (
        <ThemedView
          style={[
            styles.emptyState,
            {
              borderColor: Colors[theme].icon + "40",
              backgroundColor: Colors[theme].background,
            },
          ]}
        >
          <ThemedText
            style={[styles.emptyStateText, { color: Colors[theme].icon }]}
          >
            No images selected — tap the button above to add images.
          </ThemedText>
        </ThemedView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },
  uploadButton: {
    alignSelf: "flex-start",
    borderRadius: 10,
  },
  uploadButtonContent: {
    height: 44,
    paddingHorizontal: 4,
  },
  imageRow: {
    flexDirection: "row",
    gap: 10,
  },
  imageWrapper: {
    position: "relative",
    width: 96,
    height: 96,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  removeButton: {
    position: "absolute",
    top: -4,
    right: -4,
  },
  removeIcon: {
    margin: 0,
    padding: 0,
  },
  emptyState: {
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
  },
  emptyStateText: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
  },
  countText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
