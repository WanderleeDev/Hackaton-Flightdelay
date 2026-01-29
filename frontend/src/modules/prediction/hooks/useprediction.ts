import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formSchemaType } from "../schemas/form.schema";
import {
  predictFlightDelay,
  PredictionResponse,
} from "../services/predictFlightDelay";

type PredictionError = { message: string };

export const usePrediction = () => {
  const queryClient = useQueryClient();

  return useMutation<PredictionResponse, PredictionError, formSchemaType>({
    mutationFn: predictFlightDelay,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["histories"] });
    },
  });
};
