import { ReactNode } from "react";
import { GestureResponderEvent, StyleProp, StyleSheet, Text, TextStyle, TouchableHighlight, ViewStyle } from "react-native";

export default function XPAButton({ title, buttonStyle, textStyle, onPress, onLongPress, disabled = false }: Readonly<{
  title: string | ReactNode,
  buttonStyle?: StyleProp<ViewStyle>,
  textStyle?: StyleProp<TextStyle>,
  onPress?: ((event: GestureResponderEvent) => void),
  onLongPress?: ((event: GestureResponderEvent) => void),
  disabled?: boolean
}>) {
  const styles = disabled ? disabledStyles : normalStyles

  return (
    <TouchableHighlight
      disabled={disabled}
      style={StyleSheet.compose(styles.button, buttonStyle)}
      onLongPress={onLongPress ?? (() => { })}
      underlayColor="#DDDDDD"
      onPress={onPress ?? (() => { })}>
      <Text style={StyleSheet.compose(styles.text, textStyle)}>{title}</Text>
    </TouchableHighlight>
  )
}

const normalStyles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: .5,
    borderRadius: 3,
    elevation: 1,
  },
  text: {
    textAlign: 'center',
    padding: 15,
    textTransform: 'uppercase',
    fontWeight: "bold",
  },
})

const disabledStyles = StyleSheet.create({
  button: {
    ...normalStyles.button,
    backgroundColor: '#CCCCCC',
    elevation: 0,
  },
  text: {
    ...normalStyles.text,
  }
})
