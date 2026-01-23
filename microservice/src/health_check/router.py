from fastapi import APIRouter
from src.health_check.schemas import HealthCheckResponse


health_router = APIRouter(
    prefix="/health",
    tags=["Health Check"],
)

@health_router.get("", response_model=HealthCheckResponse)
def health() -> HealthCheckResponse:
    return HealthCheckResponse(status="ok")
