from typing import Literal
from pydantic import BaseModel, Field, field_validator


class PredictionRequest(BaseModel):
    airline: str = Field(min_length=2, max_length=2)
    origin: str = Field(min_length=3, max_length=3)
    destination: str = Field(min_length=3, max_length=3)
    distance_km: float = Field(ge=3000, le=13500)
    day_of_week: int = Field(ge=0, le=6)
    hour: int = Field(ge=0, le=23)

    @field_validator("airline", "origin", "destination", mode="before")
    def to_upper(cls, v: str) -> str:
        return v.upper()

    model_config = {
        "json_schema_extra": {
            "example": {
                "airline": "AA",
                "origin": "SFO",
                "destination": "LAX",
                "distance_km": 3000,
                "day_of_week": 3,
                "hour": 23,
            }
        }
    }



class ResponsePrediction(BaseModel):
    delay_prediction: Literal[0, 1] = Field(
        description="Binary prediction of delay (0 = no, 1 = yes)"
    )
    delay_probability: float = Field(
        gt=0, le=1,
        description="Probability of delay (value between 0 and 1)"
    )
    threshold_used: str = Field(
        description="Threshold applied for the delay decision"
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "delay_prediction": 1,
                "delay_probability": 0.2,
                "treshold_used": "TRHESHOLD"
            }
        }
    }
