import { StyleSheet } from "react-native";

export const portraitStyles = StyleSheet.create({
  body: {
    justifyContent: 'center',
  },
  header: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    fontSize: 50,
  },
  headerImage: {
    width: '50%',
    height: '50%',
  },
  actions: {
    flex: 1,
    justifyContent: 'center',
    gap: 20
  },
  button: {
    width: '50%',
    marginHorizontal: 'auto'
  }
})

export const landscapeStyles = StyleSheet.create({
  body: {
    ...portraitStyles.body,
    flexDirection: 'row'
  },
  header: {
    ...portraitStyles.header,
    flex: 1,
  },
  headerTitle: {
    ...portraitStyles.headerTitle,
  },
  headerImage: {
    ...portraitStyles.headerImage,
  },
  actions: {
    ...portraitStyles.actions,
  },
  button: {
    ...portraitStyles.button,
  }
})
