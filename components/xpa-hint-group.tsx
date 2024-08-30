import { Hint } from "@/hooks/useGameData"
import { Text, View } from "react-native"
import XPAHint from "./xpa-hint"

export default function XPAHintGroup({ hints, guess, size = 22 }: Readonly<{ hints: Hint[], guess: number[], size?: number }>) {
  return (
    <View style={{
      flexDirection: 'column',
      alignItems: 'center',
      gap: 5
    }}>
      <View style={{
        flexDirection: 'row',
        gap: 5
      }}>
        {hints.map((item, index) => {
          return (
            <View key={index} style={{
            }}>
              <XPAHint hint={item} size={size} />
            </View>
          )
        })}
      </View>
      <View style={{
        flexDirection: 'row',
        gap: 5
      }}>
        {guess.map((item, index) => {
          return (
            <Text key={index} style={{
              textAlign: 'center',
              fontSize: size
            }}>{item}</Text>
          )
        })}
      </View>
    </View>
  )
}
