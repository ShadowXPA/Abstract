import { ScrollView, Text, View } from "react-native";
import { globalStyles } from "@/app/global.css";
import { Orientation, useOrientation } from "@/hooks/useOrientation";
import { landscapeStyles, portraitStyles } from "./about.css";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function About() {
  const orientation = useOrientation()
  const styles = orientation == Orientation.PORTRAIT ? portraitStyles : landscapeStyles

  return (
    <View style={[globalStyles.body, styles.body]}>
      <View style={globalStyles.header}>
        <Ionicons name="arrow-back" size={globalStyles.headerTitle.fontSize} onPress={() => router.navigate('/')} />
        <Text style={globalStyles.headerTitle}>About</Text>
      </View>
      <ScrollView>
        <Text style={styles.content}></Text>
      </ScrollView>
    </View>
  )
}
