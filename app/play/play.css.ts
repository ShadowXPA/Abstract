import { StyleSheet } from "react-native";

export const portraitStyles = StyleSheet.create({
  header: {
  },
  content: {
    flex: 1
  },
  hints: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  text: {
  },
  actions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  numberAction: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
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
    flexDirection: 'row'
  },
  hints: {
    ...portraitStyles.hints,
    flexDirection: 'column',
  },
  text: {
    ...portraitStyles.text,
  },
  actions: {
    ...portraitStyles.actions,
  },
  numberAction: {
    ...portraitStyles.numberAction,
  },
  button: {
    ...portraitStyles.button,
  }
})
