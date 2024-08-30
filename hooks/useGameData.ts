import { useEffect, useRef, useState } from "react"
import { useRandomNumber } from "./useRandomNumber"

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

export interface Guess {
  guess: number[],
  hints: Hint[]
}

export interface ScoreSystem {
  astute: number,
  askew: number,
  abstract: number,
  winner: number,
  loser: number
}

export const defaultScoreSystem = {
  astute: 50,
  askew: 25,
  abstract: 10,
  winner: 3000,
  loser: -1000
}

export interface GameData {
  solutionSize: number,
  numberGuesses: number,
  start: () => void,
  stop: () => void,
  time: number,
  score: number,
  solution: number[],
  guesses: Guess[],
  addGuess: (guess: number[]) => void,
  scoreSystem: ScoreSystem,
  isGameOver: boolean,
  setGameOver: (over: boolean) => void,
  isWinner: boolean,
  setWinner: (winner: boolean) => void,
}

export function useGameData({ solutionSize, numberGuesses, solution, scoreSystem }:
  Readonly<{
    solutionSize?: number,
    numberGuesses?: number,
    solution?: number[],
    scoreSystem?: ScoreSystem
  }> = {}): GameData {
  const [time, setTime] = useState(0)
  const size = useRef(solutionSize ?? 3)
  const numGuesses = useRef(numberGuesses ?? 10)
  const score = useRef(0)
  const sol = useRef<number[]>()
  const [guesses, setGuesses] = useState<Guess[]>([])
  const scoreSys = useRef<ScoreSystem>(scoreSystem ?? defaultScoreSystem)
  const isGameOver = useRef(false)
  const isWinner = useRef(false)
  let timeInterval: (NodeJS.Timeout | undefined)

  if (!sol.current) {
    sol.current = solution ?? [0, 0, 1]//generateSolution(size.current)
  }

  const start = () => {
    if (isGameOver.current || timeInterval) return

    timeInterval = setInterval(() => {
      if (isGameOver.current) {
        stop()
      }

      setTime((prevTime) => isGameOver.current ? prevTime : prevTime + 1)
    }, 1000)
  }

  const stop = () => {
    clearInterval(timeInterval)
    timeInterval = undefined
  }

  const setGameOver = (gameOver: boolean) => {
    isGameOver.current = gameOver

    if (isGameOver.current) {
      // TODO: fix these scores
      if (isWinner.current) {
        score.current += (scoreSys.current.winner + (guesses.length * scoreSys.current.loser))
      } else {
        score.current += scoreSys.current.loser
        score.current = Math.max(score.current, 0)
      }
    }
  }

  const setWinner = (winner: boolean) => {
    isWinner.current = winner

    if (isWinner.current) {
      setGameOver(true)
    }
  }

  const addGuess = (guess: number[]) => {
    if (guesses.length >= numGuesses.current) return

    const hints = generateHint(sol.current!, guess)

    score.current += calculateHintScore(hints, scoreSys.current)
    setGameOver((guesses.length + 1) >= numGuesses.current)
    setWinner(hints.every((item) => item === Hint.ASTUTE))

    setGuesses([...guesses, { guess, hints }])
  }

  return {
    solutionSize: size.current,
    numberGuesses: numGuesses.current,
    start: start,
    stop: stop,
    time: time,
    score: score.current,
    solution: sol.current,
    guesses: guesses,
    scoreSystem: scoreSys.current,
    addGuess: addGuess,
    isGameOver: isGameOver.current,
    setGameOver: setGameOver,
    isWinner: isWinner.current,
    setWinner: setWinner,
  }
}

const generateSolution = (size = 3): number[] => {
  const array: number[] = []

  while (array.length < size) {
    array.push(useRandomNumber(0, 9))
  }

  return array
}

const generateHint = (solution: Readonly<number[]>, guess: Readonly<number[]>): Hint[] => {
  let solutionCopy: (number | null)[] = JSON.parse(JSON.stringify(solution))
  let guessCopy: (number | null)[] = JSON.parse(JSON.stringify(guess))
  const hints: Hint[] = []

  for (let i = 0; i < solutionCopy.length; i++) {
    if (solutionCopy[i] === guessCopy[i]) {
      hints.push(Hint.ASTUTE)
      solutionCopy[i] = null
      guessCopy[i] = null
    }
  }

  solutionCopy = solutionCopy.filter(number => number != null)
  guessCopy = guessCopy.filter(number => number != null)

  for (let i = 0; i < guessCopy.length; i++) {
    const index = solutionCopy.indexOf(guessCopy[i])
    if (index !== -1) {
      hints.push(Hint.ASKEW)
      solutionCopy[index] = null
    }
  }

  while (hints.length < solution.length) {
    hints.push(Hint.ABSTRACT)
  }

  return hints
}

const calculateHintScore = (hints: Hint[], scoreSystem: ScoreSystem): number => {
  return hints
    .map((hint) => {
      switch (hint) {
        case Hint.ASTUTE: return scoreSystem.astute
        case Hint.ABSTRACT: return scoreSystem.abstract
        case Hint.ASKEW: return scoreSystem.askew
      }
    })
    .reduce((prev, cur) => prev + cur)
}
