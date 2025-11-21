import { Dimensions, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { darkMode, lightMode } from "@/constants/colors";

export default function AddProjectScreen() {
  const { width: screenWidth } = Dimensions.get("window");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ThemedView
        style={[
          styles.headerContainer,
          styles.headerNoShadow,
          { width: screenWidth },
        ]}
        lightColor={lightMode.secondary}
        darkColor={darkMode.secondary}
      >
        <ThemedText
          lightColor={lightMode.textColorMain}
          darkColor={darkMode.textColorMain}
          style={styles.headerText}
        >
          Add New Projects
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.contentContainer}>
        {/* Form/input components will go here */}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: lightMode.secondary, // keeps bar background consistent
  },
  headerContainer: {
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e2e2",
  },
  // turn off or lighten shadow
  headerNoShadow: {
    shadowColor: "transparent", // removes shadow completely
    shadowOpacity: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0,
    elevation: 0,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
});
