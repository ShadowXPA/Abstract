import { ScrollView, Text, View } from "react-native";
import { globalStyles } from "@/app/global.css";
import { Orientation, useOrientation } from "@/hooks/useOrientation";
import { landscapeStyles, portraitStyles } from "./about.css";
import { ExternalLink } from "@/components/ExternalLink";

export default function About() {
  const orientation = useOrientation()
  const styles = orientation == Orientation.PORTRAIT ? portraitStyles : landscapeStyles

  return (
    <View style={[globalStyles.body, styles.body]}>
      <ScrollView>
        <Text style={styles.content}>This game was made by <ExternalLink style={styles.link} href="https://shadowxpa.github.io">Pedro Alves (a.k.a. ShadowXPA)</ExternalLink>.</Text>
        <Text style={styles.content}>It was made using <ExternalLink style={styles.link} href="https://reactnative.dev/">React Native</ExternalLink> and <ExternalLink style={styles.link} href="https://expo.dev/">Expo</ExternalLink>.</Text>
        <Text style={styles.content}>Inspired by Abstract (from "The A to Z book of computer games" by Thomas C. McIntire) and Master Mind.</Text>
      </ScrollView>
    </View>
  )
}
