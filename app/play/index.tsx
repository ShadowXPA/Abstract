import { useRandom } from "@/hooks/useRandom";
import { Alert, BackHandler, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { globalStyles } from "@/app/global.css";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Orientation, useOrientation } from "@/hooks/useOrientation";
import { useEffect, useRef, useState } from "react";
import { landscapeStyles, portraitStyles } from "./play.css";
import XPAHintGroup from "@/components/xpa-hint-group";
import XPAButton from "@/components/xpa-button";
import XPANumberPicker from "@/components/xpa-number-picker";
import { useGameData, Hint } from "@/hooks/useGameData";

export default function Play() {
  const orientation = useOrientation()
  const styles = orientation == Orientation.PORTRAIT ? portraitStyles : landscapeStyles

  const gameData = useGameData()
  let guessScrollView = useRef<ScrollView | null>().current
  const currentGuess = useRef<number[]>()
  const wheelPickers = []
  const [modalVisible, setModalVisible] = useState(false)

  if (!currentGuess.current) {
    currentGuess.current = Array(gameData.solutionSize).fill(0)
  }

  console.log('solution', gameData.solution)

  for (let i = 0; i < gameData.solutionSize; i++) {
    wheelPickers.push(
      <XPANumberPicker key={i} onChange={(option) => currentGuess.current![i] = (parseInt(option))} />
    )
  }

  useEffect(() => {
    gameData.start()
    return () => gameData.stop()
  }, [])

  useEffect(() => {
    console.log('over?', gameData.isGameOver)
    console.log('winner?', gameData.isWinner)

    if (!gameData.isGameOver) return

    // Show modal
    setModalVisible(true)
  }, [gameData.guesses])

  return (
    <View style={globalStyles.body}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          router.navigate('/')
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => router.navigate('/')}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={globalStyles.header}>
        <Ionicons name="arrow-back" size={globalStyles.headerTitle.fontSize} onPress={() => router.navigate('/')} />
      </View>
      <View style={styles.content}>
        <View style={styles.hud}>
          <Text style={styles.time}>{formatTime(gameData.time)}</Text>
          <Text style={styles.score}>{gameData.score}</Text>
          <Text style={styles.numberTries}>{gameData.guesses.length}/{gameData.numberGuesses}</Text>
        </View>
        <View style={styles.gameArea}>
          <View style={styles.hintArea}>
            {gameData.guesses.length === 0 ?
              <View style={{ opacity: 0 }}>
                <XPAHintGroup
                  guess={Array(gameData.solutionSize).fill(0)}
                  hints={Array(gameData.solutionSize).fill(Hint.ABSTRACT)}
                />
              </View>
              :
              <ScrollView
                ref={ref => { guessScrollView = ref }}
                onContentSizeChange={() => guessScrollView?.scrollToEnd({ animated: true })}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={orientation == Orientation.PORTRAIT}>
                <View style={styles.hints}>
                  {gameData.guesses.map((item, index) => <XPAHintGroup key={index} guess={item.guess} hints={item.hints} />)}
                </View>
              </ScrollView>
            }
          </View>
          <View style={styles.actions}>
            <View style={styles.guess}>
              {wheelPickers.map((item) => item)}
            </View>
            <View style={styles.buttonArea}>
              <XPAButton title="Guess"
                disabled={gameData.isGameOver}
                buttonStyle={styles.button}
                onPress={() => gameData.addGuess(JSON.parse(JSON.stringify(currentGuess.current)))}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const formatTime = (seconds: number, maxMinutes = 59): string => {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;

  if (minutes > maxMinutes) {
    minutes = maxMinutes;
    remainingSeconds = 59;
  }

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}
