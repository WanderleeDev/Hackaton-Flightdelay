import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Pagination } from "../../history/interfaces";

interface UseInfinityPaginationProps<T> {
  queryKey: string[];
  fetchFn: (pageParam: number) => Promise<Pagination<T>>;
}

export function useInfinityPagination<T>({
  queryKey,
  fetchFn,
}: UseInfinityPaginationProps<T>) {
  return useSuspenseInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => fetchFn(pageParam),
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
