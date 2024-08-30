export function useRandomNumber(min = 0, max = 1): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
