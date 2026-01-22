from fastapi import Depends
from typing import Annotated
from src.predict.service import PredictService

predict_service = PredictService()

def get_predict_service():
    return predict_service

Prediction_DI = Annotated[PredictService, Depends(get_predict_service)]
