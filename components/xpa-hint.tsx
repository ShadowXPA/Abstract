import { Ionicons } from "@expo/vector-icons";

/**
 * ASTUTE = Player digit corresponds exactly with that of the number being held in memory
 * ABSTRACT = Player digit has no match anywhere within the computer's number
 * ASKEW = Player digit matches one of the computer's, but the digit is in the wrong position
 */
export enum Hint {
  ASTUTE = "ASTUTE",
  ABSTRACT = "ABSTRACT",
  ASKEW = "ASKEW"
}

export default function XPAHint({ hint, size = 22 }: Readonly<{ hint: Hint, size?: number }>) {
  const [icon, color] = getIconAndColorByHint(hint)

  return (
    <Ionicons name={icon} size={size} color={color} />
  )
}

const getIconAndColorByHint = (hint: Hint): [keyof typeof Ionicons.glyphMap, string] => {
  switch (hint) {
    case Hint.ASTUTE:
      return ['checkmark-done-circle-outline', '#008000'];
    case Hint.ABSTRACT:
      return ['close-circle-outline', '#FF0000'];
    case Hint.ASKEW:
      return ['checkmark-circle-outline', '#0000FF'];
  }
}
