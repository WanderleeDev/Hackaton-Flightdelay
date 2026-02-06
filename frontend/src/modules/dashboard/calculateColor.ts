const PROBABILITY_COLORS = {
  low: "bg-green-500/10 text-green-700 dark:text-green-400",
  medium: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  high: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
  critical: "bg-red-500/10 text-red-700 dark:text-red-400",
};

const STATUS_COLORS = {
  succeeded:
    "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  failed: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
};

type ProbabilityLevel = keyof typeof PROBABILITY_COLORS;

export function calculateColor(level: ProbabilityLevel) {
  return Object.hasOwn(PROBABILITY_COLORS, level)
    ? PROBABILITY_COLORS[level]
    : PROBABILITY_COLORS.critical;
}

export const getProbabilityColor = (probability: number) => {
  if (probability < 0.25) return calculateColor("low");
  if (probability < 0.5) return calculateColor("medium");
  if (probability < 0.75) return calculateColor("high");
  return calculateColor("critical");
};

export const getStatusColor = (status: string) => {
  return status === "succeeded"
    ? STATUS_COLORS.succeeded
    : STATUS_COLORS.failed;
};
