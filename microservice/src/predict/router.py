from fastapi import  APIRouter, Request
from src.predict.schema import ResponsePrediction
from src.core.limiter import limiter
from src.predict.di import Prediction_DI

predict_router = APIRouter(tags=["Prediction to flight"], prefix="/predict")

@predict_router.post("/", response_model=ResponsePrediction)
@limiter.limit("5/minute")
async def predict(request: Request , prediction_service: Prediction_DI) -> ResponsePrediction:
    return prediction_service
