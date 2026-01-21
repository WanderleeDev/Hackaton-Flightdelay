import { useSuspenseQuery } from "@tanstack/react-query";
import { getApiBaseUrl } from "../../shared/utils/getEnv";

export interface Prediction {
  origin: string;
  destination: string;
  status: string;
  createdAt: string;
}

export function useHistoryPredictions() {
  return useSuspenseQuery<Prediction[]>({
    queryKey: ["history"],
    queryFn: async () =>
      await fetch(`${getApiBaseUrl()}/predict/all`).then((res) => res.json()),
  });
}
