import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function Loader() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? "light";
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator
        animating={true}
        size="large"
        color={Colors[theme].secondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
