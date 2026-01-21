import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getApiBaseUrl } from "../../shared/utils/getEnv";
import { Pagination, Prediction } from "../interfaces";

const fetchPrediction = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<Pagination<Prediction>> => {
  const res = await fetch(
    `${getApiBaseUrl()}/history?page=${pageParam}&size=8`,
  );

  return res.json();
};

export function useInfinitePrediction() {
  return useSuspenseInfiniteQuery({
    queryKey: ["histories"],
    queryFn: fetchPrediction,
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
