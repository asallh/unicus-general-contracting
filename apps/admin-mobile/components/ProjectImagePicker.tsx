import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
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
import { IconButton } from "react-native-paper";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface ImageInfo {
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
        "Premession Required",
        "We need access to your photo Library"
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
        "Maxumum Images Reached",
        `You can only select up to ${maxImages} images`
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
      Alert.alert("Error", "Failed to pick iamge. Please try again.");
    }
  };

  const remvoeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesChange?.(updatedImages);
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      gap: 12,
    },
    uploadButton: {
      alignSelf: "flex-start",
    },
    imagesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    imageWrapper: {
      position: "relative",
      width: 100,
      height: 100,
      borderRadius: 8,
      overflow: "hidden",
      backgroundColor: Colors[theme].background,
      borderWidth: 1,
      borderColor: Colors[theme].icon,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    removeButton: {
      position: "absolute",
      top: -8,
      right: -8,
      backgroundColor: "transparent",
      borderRadius: 12,
      padding: 2,
    },
    emptyState: {
      padding: 16,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors[theme].background,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: Colors[theme].icon,
      borderStyle: "dashed",
    },
    emptyStateText: {
      color: Colors[theme].text,
      fontSize: 14,
      marginTop: 8,
    },
  });

  return (
    <View style={dynamicStyles.container}>
      <IconButton
        icon={"cloud-upload"}
        mode="contained"
        size={32}
        iconColor={Colors[theme].background}
        containerColor={Colors[theme].primary}
        onPress={pickImage}
        style={dynamicStyles.uploadButton}
      />
      {images.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={dynamicStyles.imagesContainer}
        >
          {images.map((image, index) => (
            <View key={index} style={dynamicStyles.imageWrapper}>
              <Image
                source={{ uri: image.uri }}
                style={dynamicStyles.image}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={dynamicStyles.removeButton}
                onPress={() => remvoeImage(index)}
              >
                <IconButton
                  icon={"close-circle"}
                  size={20}
                  iconColor={Colors[theme].danger}
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      {images.length === 0 && (
        <ThemedView style={dynamicStyles.emptyState}>
            <ThemedText style={dynamicStyles.emptyStateText}>
                No Images Selected. Tap the Upload iamge to add iamges
            </ThemedText>
        </ThemedView>
      )}

      {images.length > 0 && (
        <ThemedText style={{fontSize:12}}>{images.length} of {maxImages} images se</ThemedText>
      )}
    </View>
  );
}
