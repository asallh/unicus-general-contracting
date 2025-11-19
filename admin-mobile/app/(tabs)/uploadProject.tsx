import { StyleSheet } from "react-native";

import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { darkMode, lightMode } from "@/themes/colors";

export default function AddProject() {
  return (
    <ThemedView
      style={styles.mainContainer}
      lightColor={lightMode.accent}
      darkColor={darkMode.accent}
    >
      <ThemedText>Add New Projects</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 64,
    paddingLeft: 16,
  },
});
