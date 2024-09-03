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
  winner: number
}

export const defaultSettings = {
  solutionSize: 4,
  numberGuesses: 10,
  scoreSystem: {
    astute: 50,
    askew: 25,
    abstract: 5,
    winner: 200,
  },
}

export interface GameData {
  solutionSize: number,
  numberGuesses: number,
  start: () => void,
  stop: () => void,
  time: number,
  getElapsedTime: () => number,
  score: number,
  solution: number[],
  guesses: Guess[],
  addGuess: (guess: number[]) => void,
  scoreSystem: ScoreSystem,
  isGameOver: boolean,
  setGameOver: (over: boolean) => void,
  isWinner: boolean,
  setWinner: (winner: boolean) => void,
  getGameOverText: () => string,
}

export function useGameData({ solutionSize, numberGuesses, solution, scoreSystem }:
  Readonly<{
    solutionSize?: number,
    numberGuesses?: number,
    solution?: number[],
    scoreSystem?: ScoreSystem
  }> = {}): GameData {
  const [time, setTime] = useState(0)
  const elapsedTime = useRef(time)
  const size = useRef(solutionSize ?? defaultSettings.solutionSize)
  const numGuesses = useRef(numberGuesses ?? defaultSettings.numberGuesses)
  const score = useRef(0)
  const sol = useRef<number[]>()
  const [guesses, setGuesses] = useState<Guess[]>([])
  const scoreSys = useRef<ScoreSystem>(scoreSystem ?? defaultSettings.scoreSystem)
  const isGameOver = useRef(false)
  const isWinner = useRef(false)
  let timeInterval: (NodeJS.Timeout | undefined)

  if (!sol.current) {
    sol.current = solution ?? generateSolution(size.current)
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

  const getElapsedTime = () => elapsedTime.current

  useEffect(() => {
    elapsedTime.current = time
  }, [time])

  const setGameOver = (gameOver: boolean) => {
    isGameOver.current = gameOver

    if (isGameOver.current) {
      if (isWinner.current) {
        score.current += Math.floor((scoreSys.current.winner * (numGuesses.current - ((guesses.length + 1) + (elapsedTime.current / 3600)))))
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

  const getGameOverText = () => {
    return (isWinner.current
      ? 'You got it - ' + ((guesses.length < Math.ceil(numGuesses.current * 0.65))
        ? `in only ${guesses.length} guess${guesses.length === 1 ? '' : 'es'}!`
        : 'finally!!!')
      : 'Better luck next time...')
      + `\n\nTime: ${formatTime(time)}\nFinal score: ${score.current}\nSolution: ${formatSolution(sol.current!)}`
  }

  return {
    solutionSize: size.current,
    numberGuesses: numGuesses.current,
    start,
    stop,
    time,
    getElapsedTime,
    score: score.current,
    solution: sol.current,
    guesses,
    scoreSystem: scoreSys.current,
    addGuess,
    isGameOver: isGameOver.current,
    setGameOver,
    isWinner: isWinner.current,
    setWinner,
    getGameOverText,
  }
}

export const generateSolution = (size = 3): number[] => {
  const array: number[] = []

  while (array.length < size) {
    array.push(useRandomNumber(0, 9))
  }

  return array
}

export const generateHint = (solution: Readonly<number[]>, guess: Readonly<number[]>): Hint[] => {
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

export const formatTime = (seconds: number, maxMinutes = 59): string => {
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

export const formatSolution = (solution: number[]): string => {
  return solution.toString().replaceAll(',', '')
}
