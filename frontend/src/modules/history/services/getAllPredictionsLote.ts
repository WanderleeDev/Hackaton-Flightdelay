import { getApiBaseUrl } from "../../shared/utils/getEnv";
import { Lote, Pagination } from "../interfaces";

export async function getAllPredictionsLote({
  pageParam,
}: {
  pageParam: number;
}): Promise<Pagination<Lote>> {
  const res = await fetch(
    `${getApiBaseUrl()}/history/batch?page=${pageParam}&size=4`,
  );

  return res.json();
}
