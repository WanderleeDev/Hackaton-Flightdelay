package com.hackathon.flight_ontime.predict.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

public record DataResponse(
        @JsonProperty("delay _prediction") Double delayPrediction,
        @JsonProperty("delay_probability") Double delayProbability,
        @JsonProperty("treshold_used") Double tresholdUsed
) {
}
