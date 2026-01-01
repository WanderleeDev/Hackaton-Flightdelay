from fastapi import Depends
from typing import Annotated

from src.predict.schema import ResponsePrediction
from src.predict.service import predict_flight_service

Prediction_DI = Annotated[ResponsePrediction, Depends(predict_flight_service)]
