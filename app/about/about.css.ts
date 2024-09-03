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
  link: {
    color: '#0000EE',
    textDecorationLine: 'underline',
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
  link: {
    ...portraitStyles.link,
  },
})
