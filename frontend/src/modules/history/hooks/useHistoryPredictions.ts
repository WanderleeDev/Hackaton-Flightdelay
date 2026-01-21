import { useSuspenseQuery } from "@tanstack/react-query";
import { getApiBaseUrl } from "../../shared/utils/getEnv";
import { Prediction } from "../interfaces";

export function useHistoryPredictions() {
  return useSuspenseQuery<Prediction[]>({
    queryKey: ["history"],
    queryFn: async () =>
      await fetch(`${getApiBaseUrl()}/history`).then((res) => res.json()),
  });
}
