from datetime import datetime
from typing import Literal
from pydantic import BaseModel, Field


class PredictionRequest(BaseModel):
    airline: str = Field(min_length=1)
    origin: str = Field(min_length=1)
    destination: str = Field(min_length=1)
    departure_date: datetime
    distance_km: float = Field(gt=0)


class ResponsePrediction(BaseModel):
    probability: float = Field(gt=0)
    forecast: Literal["delayed", "on time"]


