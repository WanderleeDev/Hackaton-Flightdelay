package com.hackathon.flight_ontime.predict.DTO;

import java.util.List;

public record BatchPredictionResponse(
        List<FlightPredictionItem> predictions,
        Integer totalProcessed,
        Integer successCount,
        Integer errorCount) {
}
