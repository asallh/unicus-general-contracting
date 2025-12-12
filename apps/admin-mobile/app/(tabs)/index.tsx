import { Image } from "expo-image";
import { StyleSheet, useColorScheme } from "react-native";
import { Button, Snackbar } from "react-native-paper";
import * as Clipboard from "expo-clipboard";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { darkMode, lightMode } from "@/constants/colors";
import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
import { useRouter } from "expo-router";

interface ButtonProps {
  icon: string;
  buttonValue: string;
  onPress?: () => void;
}

function MainButton({ icon, buttonValue, onPress }: ButtonProps) {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? darkMode.primary : lightMode.primary;

  return (
    <Button
      icon={icon}
      mode="contained"
      onPress={onPress}
      style={[styles.gridButton, { backgroundColor }]}
      contentStyle={{ height: 56 }}
      labelStyle={{ fontSize: 14 }}
      uppercase={false}
    >
      {buttonValue}
    </Button>
  );
}

function GridView() {
  const router = useRouter();
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleCopy = () => {
    Clipboard.setStringAsync("https://www.unicuscontracting.com/");
    setSnackbarVisible(true);
  };

  const handleViewProjects = () => {
    console.log("View Projects Clicked");
    router.push("/views/projects");
  };

  return (
    <ThemedView style={styles.gridContainer}>
      <MainButton
        icon={"content-copy"}
        buttonValue={"Copy"}
        onPress={handleCopy}
      />
      <MainButton
        icon={"tools"}
        buttonValue={"Projects"}
        onPress={handleViewProjects}
      />
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        style={styles.popUp}
        theme={{ colors: { onSurface: lightMode.textColorMain } }}
      >
        Link copied!
      </Snackbar>
    </ThemedView>
  );
}

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
        <GridView />
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
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 24,
  },
  gridButton: {
    width: "48%",
    marginBottom: 16,
    borderRadius: 32,
    elevation: 2,
    overflow: "hidden",
  },
  popUp: {
    justifyContent: "center",
    textAlign: "center",
  },
});
