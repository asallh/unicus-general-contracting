import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { View } from "react-native";
import { IconButton } from "react-native-paper";

export default function ProjectImagePicker() {
  const theme = useColorScheme() ?? "light";

  return (
    <View>
      <IconButton
        icon={"cloud-upload"}
        mode="contained"
        size={32}
        iconColor={Colors[theme].background}
        containerColor={Colors[theme].primary}
        onPress={() => console.log("Image Uploader Is Selected")}
      />
    </View>
  );
}
