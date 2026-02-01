import { getApiBaseUrl } from "../../../utils/getEnv";
import { Lote, Pagination } from "../interfaces";

interface PredictionLoteOptions {
  pageParam: number;
  size: number;
}

export async function getAllPredictionsLote({
  pageParam,
  size = 4,
}: PredictionLoteOptions): Promise<Pagination<Lote>> {
  const res = await fetch(
    `${getApiBaseUrl()}/history/batch?page=${pageParam}&size=${size}`,
  );

  return res.json();
}
