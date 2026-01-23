from typing import List

from fastapi import APIRouter, Request, UploadFile, File
from src.predict.schema import ResponsePrediction, PredictionRequest, ResponsePredictionBatch
from src.core.limiter import limiter
from src.predict.di import Prediction_DI

predict_router = APIRouter(tags=["Prediction to flight"], prefix="/predict")

@predict_router.post("", response_model=ResponsePrediction)
@limiter.limit("10/minute")
async def predict(
        request: Request,
        prediction_request: PredictionRequest,
        prediction_service: Prediction_DI
) -> ResponsePrediction:
    prediction = await prediction_service.single(prediction_request)
    return prediction


@predict_router.post("/batch", response_model=List[ResponsePredictionBatch])
@limiter.limit("10/minute")
async def predict_batch(
        request: Request,
        prediction_service: Prediction_DI,
        file: UploadFile = File(...),
) -> List[ResponsePredictionBatch]:
    prediction = await prediction_service.batch(file)
    return prediction