import { StyleSheet } from "react-native";

export const portraitStyles = StyleSheet.create({
  body: {
    gap: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
  },
  hints: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 10,
  },
  example: {
  },
})

export const landscapeStyles = StyleSheet.create({
  body: {
    ...portraitStyles.body,
  },
  header: {
    ...portraitStyles.header,
  },
  content: {
    ...portraitStyles.content,
  },
  hints: {
    ...portraitStyles.hints,
  },
  example: {
    ...portraitStyles.example,
  },
})
