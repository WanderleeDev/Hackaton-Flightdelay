import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getApiBaseUrl } from "@/src/modules/shared/utils/getEnv";
import { Schema } from "../schemas/form.schema";

export interface PredictionResponse {
  delay_prediction: number;
  delay_probability: number;
}

const fetchPrediction = async ({
  flightDistance,
  departureDate,
  ...rest
}: Schema): Promise<PredictionResponse> => {
  try {
    const response = await fetch(`${getApiBaseUrl()}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...rest,
        departureDate: departureDate.toISOString(),
        distanceKm: flightDistance,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch((e) => {
        console.log(e);
        return {
          message:
            e instanceof Error ? e.message : "Failed to process prediction",
        };
      });
      throw new Error(errorData.message || "Failed to process prediction");
    }

    const data: PredictionResponse = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

interface PredictionError {
  message: string;
}

export const usePrediction = () => {
  const queryClient = useQueryClient();

  return useMutation<PredictionResponse, PredictionError, Schema>({
    mutationFn: fetchPrediction,
    onSuccess: () => {
      // Invalida todas las queries del historial para que se actualicen automáticamente
      queryClient.invalidateQueries({ queryKey: ["history"] });
      queryClient.invalidateQueries({ queryKey: ["histories"] });
    },
  });
};
