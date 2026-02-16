package com.hackathon.flight_ontime.predict.dto;

import java.util.List;

public record BatchPredictionResponse(
        List<FlightPredictionItem> predictions,
        Integer totalProcessed,
        Integer successCount,
        Integer errorCount) {
}
