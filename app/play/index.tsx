import { useRandom } from "@/hooks/useRandom";
import { ScrollView, Text, View } from "react-native";
import { globalStyles } from "../global.css";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Orientation, useOrientation } from "@/hooks/useOrientation";
import { useEffect, useRef, useState } from "react";
import { landscapeStyles, portraitStyles } from "./play.css";
import { Hint } from "@/components/xpa-hint";
import XPAHintGroup from "@/components/xpa-hint-group";
import WheelPicker from "react-native-wheely";
import XPAButton from "@/components/xpa-button";
import { GameState, SetGameStateAction, useGameState } from "@/hooks/useGameState";

const options = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const solutionSize = 3
const numberGuesses = 10

export default function Play() {
  const orientation = useOrientation()
  const styles = orientation == Orientation.PORTRAIT ? portraitStyles : landscapeStyles

  let guessScrollView = useRef<ScrollView | null>().current
  const solution = useRef<number[]>(generateSolution(solutionSize)).current
  const [guesses, setGuesses] = useState<Guess[]>([])
  const [gameState, setGameState] = useGameState()
  const currentGuess: number[] = []
  const wheelPickers = []

  console.log('solution', solution)

  for (let i = 0; i < solutionSize; i++) {
    const [num, setNum] = useState<number>(0)
    currentGuess.push(num)

    wheelPickers.push(
      <WheelPicker key={i} selectedIndex={num} options={options} onChange={(index) => setNum(parseInt(options[index]))} />
    )
  }

  useEffect(() => {
    console.log('over?', gameState.over)
    console.log('winner?', gameState.winner)

    if (!gameState.over) return

  }, [guesses])

  return (
    <View style={globalStyles.body}>
      <View style={globalStyles.header}>
        <Ionicons name="arrow-back" size={globalStyles.headerTitle.fontSize} onPress={() => router.navigate('/')} />
      </View>
      <View style={styles.content}>
        <ScrollView
          horizontal={orientation == Orientation.PORTRAIT}
          ref={ref => { guessScrollView = ref }}
          onContentSizeChange={() => guessScrollView?.scrollToEnd({ animated: true })}>
          <View style={styles.hints}>
            {guesses.map((item, index) => <XPAHintGroup key={index} guess={item.num} hints={item.hints} />)}
          </View>
        </ScrollView>
        <View style={styles.actions}>
          <View style={styles.numberAction}>
            {wheelPickers.map((item) => item)}
          </View>
          <XPAButton title="Guess"
            disabled={gameState.over}
            buttonStyle={styles.button}
            onPress={() => addGuess(guesses, currentGuess, solution, setGuesses, setGameState)}
          />
        </View>
      </View>
    </View>
  )
}

interface Guess {
  num: number[],
  hints: Hint[]
}

const generateSolution = (size = 3): number[] => {
  const array: number[] = []

  while (array.length < size) {
    array.push(useRandom(0, 9))
  }

  return array
}

const generateHint = (solution: Readonly<number[]>, guess: Readonly<number[]>): Hint[] => {
  let solutionCopy: (number | null)[] = JSON.parse(JSON.stringify(solution))
  const hints: Hint[] = []

  for (let i = 0; i < solutionCopy.length; i++) {
    if (solutionCopy[i] === guess[i]) {
      hints.push(Hint.ASTUTE)
      solutionCopy[i] = null
    }
  }

  for (let i = 0; i < guess.length; i++) {
    const index = solutionCopy.indexOf(guess[i])
    if (index !== -1) {
      hints.push(Hint.ASKEW)
      solutionCopy[index] = null
    }
  }

  solutionCopy = solutionCopy.filter(number => number != null)

  while (hints.length < solution.length) {
    hints.push(Hint.ABSTRACT)
  }

  return hints
}

const addGuess = (guesses: Guess[], currentGuess: number[], solution: number[], setGuesses: React.Dispatch<React.SetStateAction<Guess[]>>, setGameState: SetGameStateAction) => {
  if (guesses.length >= numberGuesses) return

  const hints = generateHint(solution, currentGuess)

  setGameState((guesses.length + 1) >= numberGuesses, hints.every((item) => item === Hint.ASTUTE))

  setGuesses([...guesses, {
    num: currentGuess,
    hints
  }])
}
