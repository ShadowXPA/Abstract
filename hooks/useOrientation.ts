import { useEffect, useState } from "react"
import { Dimensions } from "react-native"

const isPortrait = () => {
  const dimensions = Dimensions.get('screen')
  return dimensions.height >= dimensions.width
}

export enum Orientation {
  PORTRAIT,
  LANDSCAPE
}

export function useOrientation(): Orientation {
  const [orientation, setOrientation] = useState<Orientation>(isPortrait() ? Orientation.PORTRAIT : Orientation.LANDSCAPE)

  useEffect(() => {
    const callback = () => setOrientation(isPortrait() ? Orientation.PORTRAIT : Orientation.LANDSCAPE)
    const listener = Dimensions.addEventListener('change', callback)
    return () => listener.remove()
  }, [])

  return orientation
}
