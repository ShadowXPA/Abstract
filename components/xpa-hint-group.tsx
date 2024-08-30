import { Text, View } from "react-native"
import XPAHint, { Hint } from "./xpa-hint"

export default function XPAHintGroup({ hints, guess }: Readonly<{ hints: Hint[], guess: number[] }>) {
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
              <XPAHint hint={item} />
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
              textAlign: 'center'
            }}>{item}</Text>
          )
        })}
      </View>
    </View>
  )
}
