import { ImageInfo } from "@/components/ProjectImagePicker";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { convertImagesToBase64 } from "@/lib/helper";
import { trpc } from "@/lib/trpc";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ReviewSubmission() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const theme = useColorScheme() ?? "light";

  const [imageUris, setImageUris] = useState<ImageInfo[]>([]);
  const [generatedDescription, setGeneratedDescription] = useState("");
  const [isLoadingImages, setIsLoadingImages] = useState(true);

  const title = params.title as string;
  const briefDescription = (params.briefDescription as string) || "";

  // Double check what this does
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
        Alert.alert("Error", "Failed to load images");
      } finally {
        setIsLoadingImages(false);
      }
    };

    loadImages();
  }, []);

  // Move the description generation into a useEffect
  useEffect(() => {
    if (
      !hasInitialized.current &&
      title &&
      imageUris.length > 0 &&
      !isLoadingImages
    ) {
      hasInitialized.current = true; // Set flag BEFORE making the call

      convertImagesToBase64(imageUris)
        .then((base64Images) => {
          generateProjectDescriptionMutation.mutate({
            title,
            briefDescription: briefDescription || undefined,
            images: base64Images,
          });
        })
        .catch((error) => {
          console.error("Error converting the Images:", error);
          Alert.alert("Error", "Failed to process images");
          hasInitialized.current = false; // Reset on error so user can retry
        });
    }
  }, [title, imageUris, isLoadingImages, briefDescription]);

  // tRPC mutations
  const generateProjectDescriptionMutation =
    trpc.project.generateDescription.useMutation({
      onSuccess: (data) => {
        setGeneratedDescription(data.description);
      },
      onError: (error) => {
        console.error("Error generating the description", error);
        Alert.alert(
          "Error",
          "There was an error generating the Description. Please Try Again"
        );
      },
    });

  const createProjectMutation = trpc.project.createWithImages.useMutation({
    onSuccess: () => {
      Alert.alert("Sucess 🎉", "Project Created Successfully!", [
        {
          text: "Ok",
          onPress: () => router.back(),
        },
      ]);
    },
    onError: (error) => {
      console.error("Error submitting the Project 🚨", error);
      Alert.alert(
        "Error 🚨",
        "Failed to submit the project to the Databse. Please try again"
      );
    },
  });

  const handleRegenerateDescription = async () => {
    if (!title || imageUris.length === 0) {
      Alert.alert("Error", "Missing title or images");
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
      console.error("Error Converring the Images:", error);
      Alert.alert("Error", "Failed to Process the images");
    }
  };

  const handleSubmit = async () => {
    if (!title || !generatedDescription || imageUris.length === 0) {
      Alert.alert("Error", "Please ensure all the fields are filled");
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
      Alert.alert("Error", "Failed to process images");
    }
  };
  return (
    <ThemedView>
      <ThemedText>Title: {title}</ThemedText>
      <ThemedText>Brief Description: {briefDescription}</ThemedText>
      {generateProjectDescriptionMutation.isPending ? (
        <ActivityIndicator size={"small"} color={Colors[theme].secondary} />
      ) : (
        <ThemedText>Generated Description: {generatedDescription}</ThemedText>
      )}
      <Button
        mode="outlined"
        onPress={handleRegenerateDescription}
        disabled={generateProjectDescriptionMutation.isPending}
      >
        {generateProjectDescriptionMutation.isPending
          ? "Generating..."
          : "Regenerate Description"}
      </Button>
      <ThemedText>Images:{imageUris.length}</ThemedText>

      <View>
        <Button
          mode="outlined"
          onPress={handleSubmit}
          disabled={createProjectMutation.isPending || !generatedDescription}
          loading={createProjectMutation.isPending}
        >
          {createProjectMutation.isPending ? "Submitting..." : "Submit Project"}
        </Button>
      </View>
    </ThemedView>
  );
}
