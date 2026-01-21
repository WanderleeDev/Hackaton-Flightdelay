import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getApiBaseUrl } from "../../shared/utils/getEnv";
import { Lote, Pagination } from "../interfaces";

const fetchPredictionByLote = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<Pagination<Lote>> => {
  const res = await fetch(
    `${getApiBaseUrl()}/history/batch?page=${pageParam}&size=4`,
  );
  return res.json();
};

export function useInfinitePredictionByLote() {
  return useSuspenseInfiniteQuery({
    queryKey: ["history-lote"],
    queryFn: fetchPredictionByLote,
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
