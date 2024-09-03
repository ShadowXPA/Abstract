import { Modal, StyleSheet, Text, View } from "react-native";
import XPAButton from "./xpa-button";
import { Orientation, useOrientation } from "@/hooks/useOrientation";

export default function XPAAlert({ title, text, onClose, visible }: Readonly<{
  title?: string,
  text: string,
  onClose?: () => void,
  visible: boolean
}>) {
  const orientation = useOrientation()
  const styles = orientation == Orientation.PORTRAIT ? portraitStyles : landscapeStyles

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose ?? (() => { })}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {title &&
            <Text style={styles.modalHeader}>{title}</Text>
          }
          <Text style={styles.modalText}>{text}</Text>
          <XPAButton title="Close" onPress={onClose ?? (() => { })} buttonStyle={styles.button} textStyle={styles.btnText} />
        </View>
      </View>
    </Modal>
  )
}

const portraitStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 35,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 22,
  },
  modalHeader: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 16,
  },
  button: {
    alignSelf: 'center',
    width: '50%',
    marginTop: 15,
  },
  btnText: {
    padding: 10,
  },
})

const landscapeStyles = StyleSheet.create({
  centeredView: {
    ...portraitStyles.centeredView,
    width: '50%',
    marginHorizontal: 'auto',
  },
  modalView: {
    ...portraitStyles.modalView,
  },
  modalHeader: {
    ...portraitStyles.modalHeader,
  },
  modalText: {
    ...portraitStyles.modalText,
  },
  button: {
    ...portraitStyles.button,
  },
  btnText: {
    ...portraitStyles.btnText,
  },
})
