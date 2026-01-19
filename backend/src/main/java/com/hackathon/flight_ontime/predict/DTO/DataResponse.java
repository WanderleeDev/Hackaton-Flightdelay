package com.hackathon.flight_ontime.predict.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;

public record DataResponse(
        @Schema(description = "Predicted delay in minutes", example = "12.5")
        @JsonProperty("delay_prediction")
        Double delayPrediction,

        @Schema(description = "Probability of delay", example = "0.85")
        @JsonProperty("delay_probability") 
        Double delayProbability
) {
}
