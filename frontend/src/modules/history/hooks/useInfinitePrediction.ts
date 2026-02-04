import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getPredictions } from "../services/getPredictions";

export function useInfinitePrediction() {
  return useSuspenseInfiniteQuery({
    queryKey: ["histories"],
    queryFn: getPredictions,
    initialPageParam: 0,
    getNextPageParam: ({ last, pageNumber }) => {
      const nextPage = !last ? pageNumber + 1 : undefined;
      return nextPage;
    },
    getPreviousPageParam: ({ first, pageNumber }) => {
      const previousPage = !first ? pageNumber - 1 : undefined;
      return previousPage;
    },
  });
}
