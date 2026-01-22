from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from src.core import global_error_handler,csv_error_handler, limiter, validation_error_handler, request_validation_error_handler
from src.health_check import health_router
from src.predict import predict_router, CSVValidationException
from pydantic import ValidationError


app = FastAPI(description="API for predicting individual or batch flights")
origins = ["*"]

app.state.limiter = limiter
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_exception_handler(CSVValidationException, csv_error_handler)
app.add_exception_handler(RequestValidationError, request_validation_error_handler)
app.add_exception_handler(ValidationError, validation_error_handler)
app.add_exception_handler(Exception, global_error_handler)

app.include_router(health_router)
app.include_router(predict_router)
