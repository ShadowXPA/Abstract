import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#f8f8ff',
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  header: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold'
  },
})
