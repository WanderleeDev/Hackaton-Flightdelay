from src.predict.schema import PredictionRequest, ResponsePrediction
from src.core.logger import log_event, EventLog

def predict_flight_service(payload: PredictionRequest)-> ResponsePrediction:
    log_event(event=EventLog.PREDICTION, input_data=payload.model_dump())
    return ResponsePrediction(
        forecast="on time",
        probability=0.52
    )