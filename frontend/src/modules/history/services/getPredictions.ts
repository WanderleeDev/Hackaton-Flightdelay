import { getApiBaseUrl } from "@/src/utils/getEnv";
import { Pagination, Prediction } from "../interfaces";

export async function getPredictions({
  pageParam,
}: {
  pageParam: number;
}): Promise<Pagination<Prediction>> {
  const res = await fetch(
    `${getApiBaseUrl()}/history?page=${pageParam}&size=8`,
  );

  return res.json();
}
