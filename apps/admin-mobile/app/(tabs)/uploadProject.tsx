import { Alert, Dimensions, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useState, useMemo } from "react";
import { Button, TextInput, useTheme } from "react-native-paper";
import ProjectImagePicker from "@/components/ProjectImagePicker";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FormFieldProps {
  theme: "light" | "dark";
  title: string;
  setTitle: (text: string) => void;
  briefDescription: string;
  setBriefDescription: (text: string) => void;
  selectedImages: any[];
  setSelectedImages: (images: any[]) => void;
}

const FormFields = ({
  theme,
  title,
  setTitle,
  briefDescription,
  setBriefDescription,
  selectedImages,
  setSelectedImages,
}: FormFieldProps) => {
  const paperTheme = useTheme();

  const { customTheme, textInputStyle } = useMemo(
    () => ({
      customTheme: {
        ...paperTheme,
        colors: {
          ...paperTheme.colors,
          onSurfaceVariant: theme === "light" ? "#666666" : "#CCCCCC",
        },
      },
      textInputStyle: {
        backgroundColor: Colors[theme].background,
      },
    }),
    [paperTheme, theme]
  );

  return (
    <ThemedView style={styles.formContainer}>
      <View>
        <TextInput
          label="Project Title *"
          value={title}
          onChangeText={setTitle}
          textColor={Colors[theme].text}
          underlineColor={Colors[theme].primary}
          activeUnderlineColor={Colors[theme].primary}
          style={textInputStyle}
          theme={customTheme}
          returnKeyType="next"
        />
      </View>

      <View>
        <TextInput
          label="Brief Description (optional)"
          value={briefDescription}
          onChangeText={setBriefDescription}
          textColor={Colors[theme].text}
          underlineColor={Colors[theme].primary}
          activeUnderlineColor={Colors[theme].primary}
          style={[textInputStyle, styles.multilineInput]}
          theme={customTheme}
          multiline
          numberOfLines={3}
        />
        <ThemedText style={[styles.fieldHint, { color: Colors[theme].icon }]}>
          A brief hint helps the AI generate a better description
        </ThemedText>
      </View>

      <View>
        <ThemedText style={[styles.sectionLabel, { color: Colors[theme].icon }]}>
          Project Images *
        </ThemedText>
        <ProjectImagePicker
          onImagesChange={setSelectedImages}
          maxImages={20}
        />
      </View>
    </ThemedView>
  );
};

export default function AddProjectScreen() {
  const [title, setTitle] = useState("");
  const [briefDescription, setBriefDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState<any[]>([]);

  const router = useRouter();
  const colorScheme = useColorScheme();
  const { width: screenWidth } = Dimensions.get("window");
  const theme = colorScheme ?? "light";

  const handleReviewSubmission = async () => {
    if (!title.trim()) {
      Alert.alert("Missing Title", "Please enter a project title.");
      return;
    }

    if (selectedImages.length === 0) {
      Alert.alert("No Images", "Please select at least one image.");
      return;
    }

    try {
      await AsyncStorage.setItem(
        "pendingProjectImages",
        JSON.stringify(selectedImages)
      );
      router.push({
        pathname: "/views/newProjectFinalization",
        params: {
          title,
          briefDescription: briefDescription || "",
        },
      });
    } catch (error) {
      console.error("Error storing images:", error);
      Alert.alert("Error", "Failed to save project data. Please try again.");
    }
  };

  const dynamicStyles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: Colors[theme].secondary,
    },
    headerContainer: {
      paddingBottom: 20,
      paddingHorizontal: 20,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: "rgba(0,0,0,0.1)",
    },
    headerText: {
      fontSize: 22,
      fontWeight: "700",
      letterSpacing: 0.3,
      color: Colors[theme].textColorMain,
    },
    headerSubText: {
      fontSize: 13,
      color: Colors[theme].textColorMain + "99",
      marginTop: 2,
    },
    headerShadow: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    headerNoShadow: {
      shadowColor: "transparent",
      elevation: 0,
    },
  });

  return (
    <SafeAreaView
      style={dynamicStyles.safeArea}
      edges={["top", "left", "right"]}
    >
      <ThemedView
        style={[
          dynamicStyles.headerContainer,
          theme === "dark"
            ? dynamicStyles.headerNoShadow
            : dynamicStyles.headerShadow,
          { width: screenWidth },
        ]}
        lightColor={Colors.light.secondary}
        darkColor={Colors.dark.secondary}
      >
        <ThemedText
          lightColor={Colors.light.textColorMain}
          darkColor={Colors.dark.textColorMain}
          style={dynamicStyles.headerText}
        >
          Add New Project
        </ThemedText>
        <ThemedText
          lightColor={Colors.light.textColorMain}
          darkColor={Colors.dark.textColorMain}
          style={dynamicStyles.headerSubText}
        >
          Fill in the details and select images
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.contentContainer}>
        <FormFields
          theme={theme}
          title={title}
          setTitle={setTitle}
          briefDescription={briefDescription}
          setBriefDescription={setBriefDescription}
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
        />
        <View style={styles.reviewContainer}>
          <Button
            icon="send-variant"
            mode="contained"
            onPress={handleReviewSubmission}
            buttonColor={Colors[theme].primary}
            contentStyle={styles.submitButtonContent}
            labelStyle={styles.submitButtonLabel}
          >
            Review Submission
          </Button>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    gap: 20,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  fieldHint: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
  },
  reviewContainer: {
    marginTop: "auto",
    paddingVertical: 16,
  },
  submitButtonContent: {
    height: 52,
  },
  submitButtonLabel: {
    fontSize: 15,
    fontWeight: "700",
  },
});
