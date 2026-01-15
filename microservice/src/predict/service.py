from src.predict.schema import PredictionRequest, ResponsePrediction
from src.core.logger import log_event, EventLog


def predict_flight_service(payload: PredictionRequest) -> ResponsePrediction:
    """
    :param payload:
    :return:
    """
    log_event(event=EventLog.PREDICTION, input_data=payload.model_dump())
    return ResponsePrediction(
        delay_prediction=1,
        delay_probability=0.2,
        threshold_used="TRHESHOLD",
    )
