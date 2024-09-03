import { ScrollView, Text, View } from "react-native";
import { globalStyles } from "@/app/global.css";
import { Orientation, useOrientation } from "@/hooks/useOrientation";
import { landscapeStyles, portraitStyles } from "./how-to-play.css";
import { defaultSettings, generateHint, generateSolution, Guess, Hint, useGameData } from "@/hooks/useGameData";
import XPAHint from "@/components/xpa-hint";
import XPAHintGroup from "@/components/xpa-hint-group";

export default function HowToPlay() {
  const orientation = useOrientation()
  const styles = orientation == Orientation.PORTRAIT ? portraitStyles : landscapeStyles
  const solution: number[] = [8, 4, 3, 8]
  const guesses: Guess[] = []

  guesses.push({ guess: [4, 6, 4, 8], hints: generateHint(solution, [4, 6, 4, 8]) })
  guesses.push({ guess: [4, 6, 3, 8], hints: generateHint(solution, [4, 6, 3, 8]) })
  guesses.push({ guess: [6, 4, 3, 8], hints: generateHint(solution, [6, 4, 3, 8]) })
  guesses.push({ guess: [3, 4, 8, 8], hints: generateHint(solution, [3, 4, 8, 8]) })
  guesses.push({ guess: [...solution], hints: generateHint(solution, [...solution]) })

  return (
    <View style={[globalStyles.body, styles.body]}>
      <ScrollView>
        <Text style={styles.content}>Abstract is a number guessing game.</Text>
        <Text style={styles.content}>A random {defaultSettings.solutionSize}-digit number is generated in the beginning of the game. You will have {defaultSettings.numberGuesses} chances to guess the solution.</Text>
        <Text style={styles.content}>After each guess, some clues are presented to show the relative accuracy of each of the digits you provided.</Text>
        <Text style={styles.content}>The clues are presented in a specific order ({<XPAHint hint={Hint.ASTUTE} size={styles.content.fontSize} />}, {<XPAHint hint={Hint.ASKEW} size={styles.content.fontSize} />}, {<XPAHint hint={Hint.ABSTRACT} size={styles.content.fontSize} />}), <Text style={{ fontWeight: 'bold' }}>and do not reveal which clue belongs to which digit</Text>.</Text>
        <Text style={styles.content}>{<XPAHint hint={Hint.ASTUTE} size={styles.content.fontSize} />} = a digit matches exactly with that of the solution.</Text>
        <Text style={styles.content}>{<XPAHint hint={Hint.ASKEW} size={styles.content.fontSize} />} = a digit matches with that of the solution, but it is in the wrong position.</Text>
        <Text style={styles.content}>{<XPAHint hint={Hint.ABSTRACT} size={styles.content.fontSize} />} = a digit has no match with that of the solution.</Text>
        <Text style={styles.content}>If all the clues show {<XPAHint hint={Hint.ASTUTE} size={styles.content.fontSize} />} before all guesses are used, then it is a win!</Text>
        <Text style={styles.content}></Text>
        <View style={styles.example}>
          <Text style={styles.header}>Here's an example:</Text>
          <Text style={styles.content}>Solution: {solution}</Text>
          <ScrollView horizontal={true}>
            <View style={styles.hints}>
              <Text style={styles.content}>...</Text>
              {guesses.map((item, index) => <XPAHintGroup key={index} guess={item.guess} hints={item.hints} size={styles.content.fontSize} />)}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  )
}
