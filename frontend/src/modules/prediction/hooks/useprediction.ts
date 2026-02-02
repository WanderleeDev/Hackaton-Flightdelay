import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formSchemaType } from "../schemas/form.schema";
import {
  predictFlightDelay,
  PredictionResponse,
} from "../services/predictFlightDelay";
import { showCustomToast } from "../../shared/components/custom-toast";

type PredictionError = { message: string };

export const usePrediction = () => {
  const queryClient = useQueryClient();

  return useMutation<PredictionResponse, PredictionError, formSchemaType>({
    mutationFn: predictFlightDelay,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["histories"] });
    },
    onError: (error) => {
      showCustomToast("Prediction Failed", {
        description: error.message,
        type: "error",
      });
    },
  });
};
