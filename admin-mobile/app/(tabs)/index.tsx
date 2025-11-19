import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { Button } from 'react-native-paper';


import ParallaxScrollView from "@/components/parallax-scroll-view";
import { darkMode, lightMode } from "@/themes/colors";
import { ThemedView } from "@/components/themed-view";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: lightMode.secondary,
        dark: darkMode.secondary,
      }}
      headerImage={
        <Image
          source={require("@/assets/images/full_primary/full_primary.png")}
          style={styles.mainLogo}
        />
      }
    >
      <ThemedView>
        {/* Quick Access Links */}
        <Button
          icon="camera"
          mode="contained"
          onPress={() => console.log("Pressed")}
        >
          Press me
        </Button>
        {/* Share Projects */}
        {/* Share Website */}
        {/* View Projects */}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  mainLogo: {
    height: 178,
    width: "80%",
    maxWidth: 320,
    minWidth: 200,
    alignSelf: "center",
    resizeMode: "contain",
    marginTop: 52,
    marginBottom: 24,
  },
});
