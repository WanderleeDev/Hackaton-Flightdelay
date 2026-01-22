from typing import Literal
from pydantic import BaseModel, Field, field_validator, ConfigDict
from datetime import datetime


class PredictionRequest(BaseModel):
    airline: str = Field(..., min_length=2, max_length=2)
    origin: str = Field(..., min_length=3, max_length=4)
    destination: str = Field(..., min_length=3, max_length=4)
    distance_km: float = Field(..., ge=3000, le=13500)
    day_of_week: int = Field(..., ge=0, le=6)
    hour: int = Field(..., ge=0, le=23)

    @field_validator("airline", "origin", "destination", mode="before")
    def to_upper(cls, v: str) -> str:
        return v.upper()

    model_config = ConfigDict(
        extra="ignore",
        json_schema_extra={
            "example": {
                "airline": "AA",
                "origin": "SFO",
                "destination": "LAX",
                "distance_km": 3000,
                "day_of_week": 3,
                "hour": 23,
            }
        }
    )


class ResponsePrediction(BaseModel):
    delay_prediction: Literal[0, 1] = Field(
        ..., description="Binary prediction of delay (0 = no, 1 = yes)"
    )
    delay_probability: float = Field(
        ..., gt=0, le=1,
        description="Probability of delay (value between 0 and 1)"
    )

    model_config = ConfigDict(
        extra="ignore",
        json_schema_extra={
            "example": {
                "delay_prediction": 1,
                "delay_probability": 0.2
            }
        }
    )


class ResponsePredictionBatch(BaseModel):
    airline: str = Field(..., min_length=2, max_length=2)
    origin: str = Field(..., min_length=3, max_length=4)
    destination: str = Field(..., min_length=3, max_length=4)
    departureDate: datetime =Field(...)
    distance_km: float = Field(..., ge=3000, le=13500)
    hour: int = Field(..., ge=0, le=23)
    day_of_week: int = Field(..., ge=0, le=6)
    delay_prediction: Literal[0, 1] = Field(..., description="0 = no delay, 1 = delay")
    delay_probability: float = Field(..., ge=0.0, le=1.0)

    model_config = ConfigDict(
        extra="ignore",
        json_schema_extra={
            "example": {
                "airline": "DL",
                "origin": "SKBO",
                "destination": "EGLL",
                "departureDate": "2026-01-21T14:30:00Z",
                "distance_km": 8500,
                "hour": 7,
                "day_of_week": 2,
                "delay_prediction": 1,
                "delay_probability": 0.2
            }
        }
    )