import { ReactNode } from "react";
import { GestureResponderEvent, StyleProp, StyleSheet, Text, TouchableHighlight, ViewStyle } from "react-native";

export default function XPAButton({ title, buttonStyle, onPress, onLongPress, disabled = false }: Readonly<{
  title: string | ReactNode,
  buttonStyle?: StyleProp<ViewStyle>,
  textStyle?: StyleProp<ViewStyle>,
  onPress?: ((event: GestureResponderEvent) => void),
  onLongPress?: ((event: GestureResponderEvent) => void),
  disabled?: boolean
}>) {
  return (
    <TouchableHighlight
      disabled={disabled}
      style={StyleSheet.compose([styles.button, disabled ? {opacity: .5} : {}], buttonStyle)}
      activeOpacity={0.6}
      onLongPress={onLongPress ?? (() => { })}
      underlayColor="#DDDDDD"
      onPress={onPress ?? (() => { })}>
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: .5,
    borderRadius: 3
  },
  text: {
    textAlign: 'center',
    padding: 15,
    textTransform: 'uppercase',
    fontWeight: "500"
  }
})
