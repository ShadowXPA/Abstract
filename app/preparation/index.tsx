import { Text, View } from "react-native";
import { globalStyles } from "@/app/global.css";
import { Animated } from "react-native";
import { useEffect, useRef } from "react";
import XPAButton from "@/components/xpa-button";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { landscapeStyles, portraitStyles } from "./preparation.css";
import { Orientation, useOrientation } from "@/hooks/useOrientation";

export default function Preparation() {
  const orientation = useOrientation()
  const styles = orientation == Orientation.PORTRAIT ? portraitStyles : landscapeStyles

  const fadeAnim = useRef(new Animated.Value(0)).current
  const fadeAnim2 = useRef(new Animated.Value(0)).current
  const fadeAnim3 = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        delay: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim2, {
        toValue: 1,
        duration: 1000,
        delay: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim3, {
        toValue: 1,
        duration: 1000,
        delay: 1000,
        useNativeDriver: true,
      })
    ])

    animation.start()

    return () => animation.stop()
  }, [fadeAnim]);

  return (
    <View style={[globalStyles.body]}>
      <View style={globalStyles.header}>
        <Ionicons name="arrow-back" size={globalStyles.headerTitle.fontSize} onPress={() => router.navigate('/')} />
        <Text style={globalStyles.headerTitle}>Get ready</Text>
      </View>
      <View style={styles.content}>
        <Animated.Text style={[styles.text, {
          opacity: fadeAnim,
          transform: [{
            translateX: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [150, 0],
            }),
          }]
        }]}>I am holding a 3-digit number...</Animated.Text>
        <Animated.Text style={[styles.text, {
          opacity: fadeAnim2,
          transform: [{
            translateX: fadeAnim2.interpolate({
              inputRange: [0, 1],
              outputRange: [150, 0],
            }),
          }]
        }]}>Can you guess what it is?</Animated.Text>
      </View>
      <Animated.View style={[styles.actions, {
        opacity: fadeAnim3
      }]}>
        <XPAButton title="I'm ready!" buttonStyle={styles.button} onPress={() => router.navigate('/play')} />
      </Animated.View>
    </View>
  )
}
