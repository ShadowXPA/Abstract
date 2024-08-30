import { useState } from "react"

export interface GameState {
  over: boolean,
  winner: boolean
}

export type SetGameStateAction = (over?: boolean, winner?: boolean) => void

export function useGameState(): [GameState, SetGameStateAction] {
  const [winner, setWinner] = useState(false)
  const [over, setOver] = useState(false)

  const setGameState = (over?: boolean, winner?: boolean) => {
    if (over) {
      setOver(over)
    }

    if (winner) {
      setWinner(winner)
      setOver(true)
    }
  }

  return [{ over, winner }, setGameState]
}
