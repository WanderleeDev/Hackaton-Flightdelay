import { useInfiniteQuery } from "@tanstack/react-query";
import { Lote } from "../interfaces";
import { useInfinityPagination } from "../../shared/hooks/useinfinityPagination";
import { getPredictionsByLoteId } from "../services/getPredictionsByLoteId";
import { getAllPredictionsLote } from "../services/getAllPredictionsLote";

export const useInfinityPredictionByLoteById = (id: string) => {
  return useInfiniteQuery({
    queryKey: ["history-lote", id],
    queryFn: ({ pageParam }) =>
      getPredictionsByLoteId({ pageParam, idLote: id }),
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
};

export const useInfinitePredictionByLote = () => {
  return useInfinityPagination<Lote>({
    queryKey: ["history-lote"],
    fetchFn: (pageParam) => getAllPredictionsLote({ pageParam, size: 4 }),
  });
};
