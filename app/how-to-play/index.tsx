import { ScrollView, Text, View } from "react-native";
import { globalStyles } from "@/app/global.css";
import { Orientation, useOrientation } from "@/hooks/useOrientation";
import { landscapeStyles, portraitStyles } from "./how-to-play.css";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function HowToPlay() {  
  const orientation = useOrientation()
  const styles = orientation == Orientation.PORTRAIT ? portraitStyles : landscapeStyles

  return (
    <View style={[globalStyles.body, styles.body]}>
      <View style={globalStyles.header}>
        <Ionicons name="arrow-back" size={globalStyles.headerTitle.fontSize} onPress={() => router.navigate('/')} />
        <Text style={globalStyles.headerTitle}>How to play</Text>
      </View>
      <ScrollView>
        <Text style={styles.content}></Text>
      </ScrollView>
    </View>
  )
}
