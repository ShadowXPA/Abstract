import { StyleSheet } from "react-native";

export const portraitStyles = StyleSheet.create({
  header: {
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 22
  },
  actions: {
  },
  button: {
    width: '50%',
    marginHorizontal: 'auto'
  }
})

export const landscapeStyles = StyleSheet.create({
  header: {
    ...portraitStyles.header,
  },
  content: {
    ...portraitStyles.content,
  },
  text: {
    ...portraitStyles.text,
  },
  actions: {
    ...portraitStyles.actions,
  },
  button: {
    ...portraitStyles.button,
  }
})
