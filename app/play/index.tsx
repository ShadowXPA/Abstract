import { Alert, ScrollView, Text, View } from "react-native";
import { globalStyles } from "@/app/global.css";
import { router, useNavigation } from "expo-router";
import { Orientation, useOrientation } from "@/hooks/useOrientation";
import { useEffect, useRef, useState } from "react";
import { landscapeStyles, portraitStyles } from "./play.css";
import XPAHintGroup from "@/components/xpa-hint-group";
import XPAButton from "@/components/xpa-button";
import XPANumberPicker from "@/components/xpa-number-picker";
import { formatTime, Hint, useGameData } from "@/hooks/useGameData";

export default function Play() {
  const navigation = useNavigation()
  const orientation = useOrientation()
  const styles = orientation == Orientation.PORTRAIT ? portraitStyles : landscapeStyles

  const gameData = useGameData()
  const currentGuess = useRef<number[]>()
  const guessScrollView = useRef<ScrollView | null>()
  const wheelPickers = useRef<React.JSX.Element[]>()

  if (!currentGuess.current) {
    currentGuess.current = Array(gameData.solutionSize).fill(0)
  }

  if (!wheelPickers.current) {
    wheelPickers.current = []

    for (let i = 0; i < gameData.solutionSize; i++) {
      wheelPickers.current.push(
        <XPANumberPicker key={i} onChange={(option) => currentGuess.current![i] = (parseInt(option))} />
      )
    }
  }

  useEffect(() => {
    gameData.start()

    const unsubscribeBeforeRemove = navigation.addListener('beforeRemove', (e) => {
      if (e.data.action.type === 'GO_BACK' || e.data.action.type === 'POP') {
        e.preventDefault()

        Alert.alert('You are leaving the game...', 'Are you sure you want to go back?', [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          { text: 'Yes', onPress: () => navigation.dispatch(e.data.action) },
        ])
      }
    })

    return () => {
      gameData.stop()
      unsubscribeBeforeRemove()
    }
  }, [])

  useEffect(() => {
    if (!gameData.isGameOver) return

    Alert.alert(gameData.isWinner ? 'Winner!' : 'Game over!', gameData.getGameOverText(), [
          { text: 'Close', onPress: () => router.navigate('/')},
        ])
  }, [gameData.guesses])

  return (
    <View style={globalStyles.body}>
      <View style={styles.content}>
        <View style={styles.hud}>
          <Text style={styles.time}>{formatTime(gameData.time)}</Text>
          <Text style={styles.score}>{gameData.score}</Text>
          <Text style={styles.numberTries}>{gameData.guesses.length}/{gameData.numberGuesses}</Text>
        </View>
        <View style={styles.gameArea}>
          <View style={styles.hintArea}>
            {gameData.guesses.length === 0 ?
              <View style={[styles.hints, { opacity: 0 }]}>
                <XPAHintGroup
                  guess={Array(gameData.solutionSize).fill(0)}
                  hints={Array(gameData.solutionSize).fill(Hint.ABSTRACT)}
                />
              </View>
              :
              <ScrollView
                ref={ref => { guessScrollView.current = ref }}
                onContentSizeChange={() => guessScrollView.current?.scrollToEnd({ animated: true })}
                horizontal={orientation == Orientation.PORTRAIT}>
                <View style={styles.hints}>
                  {gameData.guesses.map((item, index) => <XPAHintGroup key={index} guess={item.guess} hints={item.hints} />)}
                </View>
              </ScrollView>
            }
          </View>
          <View style={styles.actions}>
            <View style={styles.guess}>
              {wheelPickers.current.map((item) => item)}
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
