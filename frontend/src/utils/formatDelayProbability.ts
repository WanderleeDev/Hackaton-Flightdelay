export function formatDelayProbability(delayProbability: number) {
  return `${Math.round(delayProbability * 100)}%`;
}
