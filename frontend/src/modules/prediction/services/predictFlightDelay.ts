import { formSchemaType } from "../schemas/form.schema";
import { getApiBaseUrl } from "../../shared/utils/getEnv";

export interface PredictionResponse {
  delay_prediction: number;
  delay_probability: number;
}

export async function predictFlightDelay({
  flightDistance,
  departureDate,
  ...rest
}: formSchemaType): Promise<PredictionResponse> {
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
}
