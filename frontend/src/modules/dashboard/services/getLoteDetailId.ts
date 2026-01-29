import { LoteDetail } from "../../history/interfaces";
import { getApiBaseUrl } from "../../shared/utils/getEnv";

interface PredictionLoteByIdOptions {
  idLote: string;
  pageParam?: number;
  size?: number;
}

export async function getLoteDetailId({
  idLote,
  pageParam = 0,
  size = 20,
}: PredictionLoteByIdOptions): Promise<LoteDetail> {
  const res = await fetch(
    `${getApiBaseUrl()}/history/batches/${idLote}?page=${pageParam}&size=${size}`,
    { headers: { "Content-Type": "application/json" } },
  );

  return res.json();
}
