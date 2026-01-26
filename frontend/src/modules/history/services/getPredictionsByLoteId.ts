import { getApiBaseUrl } from "../../shared/utils/getEnv";
import { Pagination, Prediction } from "../interfaces";

export async function getPredictionsByLoteId({
  pageParam,
  id,
}: {
  pageParam: number;
  id: string;
}): Promise<Pagination<Prediction>> {
  const res = await fetch(
    `${getApiBaseUrl()}/history/batches/${id}?page=${pageParam}&size=20`,
  );

  return res.json();
}
