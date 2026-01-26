import {
  UseInfiniteQueryResult,
  InfiniteData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { Pagination } from "../../history/interfaces";

export function useInfinityPagination<T>(
  queryKey: string[],
  fetchFn: () => Promise<Pagination<T>>,
): UseInfiniteQueryResult<InfiniteData<Pagination<T>, unknown>, Error> {
  return useInfiniteQuery({
    queryKey,
    queryFn: fetchFn,
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
