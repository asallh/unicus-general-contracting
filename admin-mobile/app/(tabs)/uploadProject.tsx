import { Dimensions, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { darkMode, lightMode } from "@/constants/colors";

export default function AddProjectScreen() {
  const colorScheme = useColorScheme();
  const { width: screenWidth } = Dimensions.get("window");
  const isDark = colorScheme === "dark";

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: isDark ? darkMode.secondary : lightMode.secondary,
        },
      ]}
      edges={["top", "left", "right"]}
    >
      <ThemedView
        style={[
          styles.headerContainer,
          isDark ? styles.headerNoShadow : styles.headerShadow,
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
        {/* Form Fields here */}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#d1d1d1",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 0.5,
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
  contentContainer: {
    flex: 1,
    padding: 24,
  },
});
