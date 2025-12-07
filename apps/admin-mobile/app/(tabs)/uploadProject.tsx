import { Dimensions, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useState, useMemo } from "react";
import { Button, TextInput, useTheme } from "react-native-paper";
import ProjectImagePicker from "@/components/ProjectImagePicker";

interface formFieldProps {
  theme: "light" | "dark";
}

const FormFields = ({ theme }: formFieldProps) => {
  const [title, setTitle] = useState("");
  const [briefDescription, setBriefDescription] = useState("");
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
      <TextInput
        label="Project Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
        textColor={Colors[theme].text}
        underlineColor={Colors[theme].primary}
        activeUnderlineColor={Colors[theme].primary}
        style={textInputStyle}
        theme={customTheme}
      />
      <TextInput
        label="Brief Description"
        value={briefDescription}
        onChangeText={(text) => setBriefDescription(text)}
        textColor={Colors[theme].text}
        underlineColor={Colors[theme].primary}
        activeUnderlineColor={Colors[theme].primary}
        style={textInputStyle}
        theme={customTheme}
      />
      <ProjectImagePicker />
    </ThemedView>
  );
};

export default function AddProjectScreen() {
  const colorScheme = useColorScheme();
  const { width: screenWidth } = Dimensions.get("window");
  const theme = colorScheme ?? "light";

  // Create dynamic styles with theme colors
  const dynamicStyles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: Colors[theme].secondary,
    },
    headerContainer: {
      paddingBottom: 24,
      paddingHorizontal: 24,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: Colors[theme].icon,
    },
    headerText: {
      fontSize: 24,
      fontWeight: "700",
      letterSpacing: 0.5,
      color: Colors[theme].textColorMain,
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
          Add New Projects
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.contentContainer}>
        <FormFields theme={theme} />
        <View style={styles.reviewContainer}>
          <Button
            icon="send-variant"
            mode="contained"
            onPress={() => console.log("Review Pressed")}
            buttonColor={Colors[theme].primary}
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
    padding: 24,
  },
  formContainer: {
    gap: 16,
  },
  reviewContainer: {
    marginTop: "auto",
    paddingVertical: 16,
  },
});
