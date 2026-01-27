import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getApiBaseUrl } from "@/src/modules/shared/utils/getEnv";
import { Lote } from "@/src/modules/history/interfaces";

interface BatchPredictionParams {
  file: File;
  batchName: string;
}

interface BatchPredictionError {
  message: string;
}

const fetchPredictionBatch = async ({
  file,
  batchName,
}: BatchPredictionParams) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const apiBaseUrl = getApiBaseUrl();
    const response = await fetch(
      `${apiBaseUrl}/predict/batchEx?batchName=${encodeURIComponent(batchName)}`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch((e) => {
        console.log(e);

        return {
          message:
            e instanceof Error
              ? e.message
              : "Failed to process batch predictions",
        };
      });
      throw new Error(
        errorData.message || "Failed to process batch predictions",
      );
    }

    const data: Lote = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const usePredictionBatch = () => {
  const queryClient = useQueryClient();

  return useMutation<Lote, BatchPredictionError, BatchPredictionParams>({
    mutationFn: fetchPredictionBatch,
    onSuccess: () => {
      // Invalida las queries del historial y lotes para que se actualicen automáticamente
      queryClient.invalidateQueries({ queryKey: ["history"] });
      queryClient.invalidateQueries({ queryKey: ["histories"] });
      queryClient.invalidateQueries({ queryKey: ["lotes"] });
    },
  });
};
