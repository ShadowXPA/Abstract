import { StyleSheet } from "react-native";

export const portraitStyles = StyleSheet.create({
  content: {
    flex: 1,
    gap: 50
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
    alignItems: 'center'
  },
  actions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  guess: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonArea: {
    width: '50%'
  },
  // button: {
  // },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
    flexDirection: 'row'
  },
  hintArea: {
    ...portraitStyles.hintArea,
    paddingHorizontal: 50
  },
  hints: {
    ...portraitStyles.hints,
    flexDirection: 'column',
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
