import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

const fetchPredictionByLote = async ({ pageParam }: { pageParam: number }) => {
  const res = await fetch("/predict/all?cursor=" + pageParam);
  return res.json();
};

export function useInfinitePredictionByLote() {
  return useSuspenseInfiniteQuery({
    queryKey: ["history-lote"],
    queryFn: fetchPredictionByLote,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length : undefined;
      return nextPage;
    },
  });
}
