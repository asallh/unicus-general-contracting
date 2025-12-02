import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { useState } from "react";
import { List } from "react-native-paper";

export const options = {
  // replaces "(tabs)" with proper title text for the header
  title: "Existing Projects",
  headerBackTitle: "Back", // text under the back arrow (iOS)
  headerBackTitleVisible: false, // or hide text, keep only arrow
  headerTintColor: "#000", // arrow color
  headerStyle: {
    backgroundColor: "#FED411", // matches your lightMode.secondary
  },
};

export default function ExistingProjects() {
  const [expanded, setExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);

  return (
    <ThemedView>
      <ThemedText>Existing Projects</ThemedText>
      <ThemedView>
        <List.Section title="Accordions">
          <List.Accordion
            title="Controlled Accordion"
            left={(props) => <List.Icon {...props} icon="folder" />}
            expanded={expanded}
            onPress={handlePress}
          >
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion>
        </List.Section>
      </ThemedView>
    </ThemedView>
  );
}
