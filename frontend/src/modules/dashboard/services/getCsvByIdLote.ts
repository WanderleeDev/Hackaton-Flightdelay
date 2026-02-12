import { getApiBaseUrl } from "../../../utils/getEnv";

export async function getCsvByIdLote(idLote: string) {
  const res = await fetch(
    `${getApiBaseUrl()}/history/batches/${idLote}/download`,
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch CSV: ${res.statusText}`);
  }

  return res.body;
}
