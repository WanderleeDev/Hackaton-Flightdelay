export interface BatchFlightRequest {
    airline: string;
    origin: string;
    destination: string;
    departureDate: string;
    distanceKm: number;
}

export interface FlightPredictionItem {
    airline: string;
    origin: string;
    destination: string;
    departureDate: string;
    distanceKm: number;
    probability: number | null;
    forecast: string | null;
    error: string | null;
}

export interface BatchPredictionResponse {
    predictions: FlightPredictionItem[];
    totalProcessed: number;
    successCount: number;
    errorCount: number;
}
