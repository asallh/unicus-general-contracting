import { Image } from "expo-image";
import { StyleSheet, View, Pressable, useColorScheme } from "react-native";
import { Snackbar } from "react-native-paper";
import * as Clipboard from "expo-clipboard";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { Colors } from "@/constants/theme";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { useState } from "react";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const WEBSITE_URL = "https://www.unicuscontracting.com/";

interface ActionCardProps {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  description: string;
  onPress: () => void;
  accentColor: string;
  iconBgColor: string;
  iconColor: string;
}

function ActionCard({
  iconName,
  title,
  description,
  onPress,
  accentColor,
  iconBgColor,
  iconColor,
}: ActionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
    >
      <ThemedView
        style={[styles.card, { borderLeftColor: accentColor, borderLeftWidth: 4 }]}
      >
        <View style={[styles.iconBg, { backgroundColor: iconBgColor }]}>
          <MaterialCommunityIcons name={iconName} size={26} color={iconColor} />
        </View>
        <View style={styles.cardContent}>
          <ThemedText style={styles.cardTitle}>{title}</ThemedText>
          <ThemedText style={styles.cardDescription}>{description}</ThemedText>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={22} color="#aaa" />
      </ThemedView>
    </Pressable>
  );
}

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = colorScheme as "light" | "dark";
  const router = useRouter();
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(WEBSITE_URL);
    setSnackbarVisible(true);
  };

  const handleViewProjects = () => {
    router.push("/views/projects");
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.light.secondary,
        dark: Colors.dark.secondary,
      }}
      headerImage={
        <Image
          source={require("@/assets/images/full_primary/full_primary.png")}
          style={styles.mainLogo}
        />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText style={styles.welcomeTitle}>Admin Dashboard</ThemedText>
        <ThemedText
          style={[styles.welcomeSubtitle, { color: Colors[theme].icon }]}
        >
          Manage projects and site content
        </ThemedText>

        <View style={styles.cardsContainer}>
          <ActionCard
            iconName="briefcase-outline"
            title="View Projects"
            description="Browse and manage all published projects"
            onPress={handleViewProjects}
            accentColor={Colors[theme].primary}
            iconBgColor={Colors[theme].primary + "18"}
            iconColor={Colors[theme].primary}
          />
          <ActionCard
            iconName="link-variant"
            title="Copy Website Link"
            description={WEBSITE_URL}
            onPress={handleCopy}
            accentColor={Colors[theme].tertiary === "#FFFFFF" ? "#888" : Colors[theme].tertiary}
            iconBgColor={
              colorScheme === "dark"
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.06)"
            }
            iconColor={Colors[theme].icon}
          />
        </View>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={2000}
          style={styles.snackbar}
        >
          Link copied to clipboard!
        </Snackbar>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  mainLogo: {
    height: 160,
    width: "80%",
    maxWidth: 300,
    minWidth: 180,
    alignSelf: "center",
    resizeMode: "contain",
    marginTop: 56,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 32,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  cardsContainer: {
    gap: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    gap: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 5,
    elevation: 2,
  },
  iconBg: {
    width: 50,
    height: 50,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  cardContent: {
    flex: 1,
    gap: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardDescription: {
    fontSize: 13,
    lineHeight: 18,
    color: "#888",
  },
  snackbar: {
    marginTop: 16,
  },
});
