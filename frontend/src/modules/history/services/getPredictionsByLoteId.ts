import { getApiBaseUrl } from "../../../utils/getEnv";
import { Pagination, Prediction } from "../interfaces";

interface PredictionLoteByIdOptions {
  idLote: string;
  pageParam?: number;
  size?: number;
}

export async function getPredictionsByLoteId({
  idLote,
  pageParam = 0,
  size = 20,
}: PredictionLoteByIdOptions): Promise<Pagination<Prediction>> {
  const res = await fetch(
    `${getApiBaseUrl()}/history/batches/${idLote}?page=${pageParam}&size=${size}`,
    { headers: { "Content-Type": "application/json" } },
  );

  return res.json();
}
