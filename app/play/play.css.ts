import { StyleSheet } from "react-native";

export const portraitStyles = StyleSheet.create({
  content: {
    flex: 1,
    gap: 75
  },
  hud: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  time: {
    padding: 5
  },
  score: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold'
  },
  numberTries: {
    borderWidth: 1,
    padding: 5
  },
  gameArea: {
    flex: 1,
    gap: 10
  },
  hintArea: {
  },
  hints: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 10,
  },
  actions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  guess: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-evenly',
    gap: 10,
  },
  buttonArea: {
    width: '50%'
  },
  button: {
  },
})

export const landscapeStyles = StyleSheet.create({
  content: {
    ...portraitStyles.content,
    gap: 10
  },
  hud: {
    ...portraitStyles.hud,
  },
  time: {
    ...portraitStyles.time,
  },
  score: {
    ...portraitStyles.score,
  },
  numberTries: {
    ...portraitStyles.numberTries,
  },
  gameArea: {
    ...portraitStyles.gameArea,
    flexDirection: 'row',
  },
  hintArea: {
    ...portraitStyles.hintArea,
    paddingHorizontal: 50,
  },
  hints: {
    ...portraitStyles.hints,
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  actions: {
    ...portraitStyles.actions,
  },
  guess: {
    ...portraitStyles.guess,
  },
  buttonArea: {
    ...portraitStyles.buttonArea,
  },
  button: {
    ...portraitStyles.button,
  },
})
