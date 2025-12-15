import Loader from "@/components/Loader";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { trpc } from "@/lib/trpc";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Button, Menu, PaperProvider } from "react-native-paper";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

const OptionsMenu = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleDelete = trpc.project.deleteProject.useMutation({
    onSuccess: () => {
      Alert.alert("Deleted", "Project successfully deleted", [
        {
          text: "Ok",
          onPress: () => router.replace("/views/projects"),
        },
      ]);
    },
    onError: (error) => {
      console.error("Error deleting the project", error);
      Alert.alert("Error", "Failed to delete");
    },
  });

  const confirmDelete = () => {
    closeMenu();
    Alert.alert(
      "Delete Project?",
      "Are you sure you want to delete this project? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            if (id) {
              handleDelete.mutate(id);
            }
          },
        },
      ]
    );
  };
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Button onPress={openMenu}>Show menu</Button>}
    >
      <Menu.Item onPress={confirmDelete} title="Delete Item from Projects" />
    </Menu>
  );
};

export default function ProjectExplorer() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    data: project,
    error,
    isLoading,
  } = trpc.project.getById.useQuery(id!);
  const progress = useSharedValue<number>(0);
  const { width } = Dimensions.get("window");
  const theme = useColorScheme() ?? "light";

  const imageUrls = (project?.imageURL || []).filter(
    (url) => url && url.trim() !== ""
  );

  if (isLoading) return <Loader />;

  if (error) {
    console.error("Error", error.message);
    return <ThemedText>Something Went Wrong</ThemedText>;
  }

  if (!project) return <ThemedText>Project Not Found</ThemedText>;

  // Setting up the dynamic colors for the component
  const dynamicStyles = StyleSheet.create({
    noImagesContainer: {
      height: 400,
      margin: 8,
      justifyContent: "center",
      alignItems: "center",
      borderBottomColor: Colors[theme].secondary,
      borderBottomWidth: 3,
      backgroundColor: Colors[theme].background,
    },
    noImages: {
      marginHorizontal: 32,
      textAlign: "center",
      fontSize: 18,
      color: Colors[theme].text,
    },
    imageContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "black",
      borderBottomColor: Colors[theme].secondary,
      borderBottomWidth: 3,
    },
  });

  return (
    <PaperProvider>
      <ThemedView style={styles.mainContainer}>
        <OptionsMenu />
        {imageUrls.length > 0 ? (
          <Carousel
            width={width}
            height={400}
            data={imageUrls}
            onProgressChange={progress}
            renderItem={({ item }) => (
              <View style={dynamicStyles.imageContainer}>
                <Image
                  source={{ uri: item }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            )}
          />
        ) : (
          <View style={dynamicStyles.noImagesContainer}>
            <ThemedText style={styles.noImages}>
              ❌ No images available
            </ThemedText>
          </View>
        )}
        <View style={styles.infoContainer}>
          <ScrollView>
            <ThemedText>{project.id}</ThemedText>
            <ThemedText>{project.title}</ThemedText>
            <ThemedText>{project.description}</ThemedText>
          </ScrollView>
        </View>
      </ThemedView>
    </PaperProvider>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    width,
    height,
  },

  image: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    padding: 16,
  },
  noImagesContainer: {
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "",
  },
  noImages: {
    marginHorizontal: 32,
    textAlign: "center",
    fontSize: 18,
  },
});
