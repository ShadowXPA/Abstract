import XPAButton from "@/components/xpa-button"
import { Orientation, useOrientation } from "@/hooks/useOrientation"
import { Image, Text, View } from "react-native"
import { router } from "expo-router"
import { globalStyles } from "@/app/global.css"
import { landscapeStyles, portraitStyles } from "./home.css"

export default function Index() {
  const orientation = useOrientation()
  const styles = orientation == Orientation.PORTRAIT ? portraitStyles : landscapeStyles

  return (
    <View style={[globalStyles.body, styles.body]}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={require('@/assets/images/icon.png')} />
        <Text style={[globalStyles.headerTitle, styles.headerTitle]}>Abstract</Text>
      </View>
      <View style={styles.actions}>
        <XPAButton title="Play" buttonStyle={styles.button} onPress={() => router.navigate('/preparation')} />
        <XPAButton title="How to play" buttonStyle={styles.button} onPress={() => router.navigate('/how-to-play')} />
        <XPAButton title="About" buttonStyle={styles.button} onPress={() => router.navigate('/about')} />
      </View>
    </View>
  )
}
