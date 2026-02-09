interface DistributionResult {
  label: string;
  value: number;
  color: string;
}

export function transformToDistribution(
  distributions: number[],
): DistributionResult[] {
  const distribution = distributions.reduce(
    (acc, d) => {
      if (d < 0.25) acc.low++;
      else if (d < 0.5) acc.medium++;
      else if (d < 0.75) acc.high++;
      else acc.veryHigh++;
      return acc;
    },
    { low: 0, medium: 0, high: 0, veryHigh: 0 },
  );

  return [
    { label: "Low (0-25%)", value: distribution.low, color: "#00FF00" },
    { label: "Medium (25-50%)", value: distribution.medium, color: "#FFFF00" },
    { label: "High (50-75%)", value: distribution.high, color: "#FFA500" },
    {
      label: "Very High (75-100%)",
      value: distribution.veryHigh,
      color: "#FF0000",
    },
  ];
}
