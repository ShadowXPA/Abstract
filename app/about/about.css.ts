import { StyleSheet } from "react-native";

export const portraitStyles = StyleSheet.create({
  body: {
    gap: 10,
  },
  content: {
  }
})

export const landscapeStyles = StyleSheet.create({
  body: {
    ...portraitStyles.body,
  },
  content: {
    ...portraitStyles.content,
  }
})
