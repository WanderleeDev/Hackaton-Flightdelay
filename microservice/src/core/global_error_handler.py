from urllib.request import Request

from fastapi.exceptions import RequestValidationError
from pydantic import ValidationError
from starlette.responses import JSONResponse
from src.core.schemas import ValidationResponse
from src.predict import CSVValidationException
from src.core.logger import log_event, EventLog


def global_error_handler(request: Request, exc: Exception):
    log_event(event=EventLog.ERROR, input_data={"message": str(exc)})
    return JSONResponse({"error": "Unknown error pls try later again"}, status_code=500)


def csv_error_handler(request: Request, exc: CSVValidationException):
    log_event(event=EventLog.ERROR, input_data={"message": exc.message})
    return JSONResponse({"error": exc.message}, status_code=400)


def request_validation_error_handler(request: Request, exc: RequestValidationError):
    return base_pydantic_error_handler(request, exc)


def validation_error_handler(request: Request, exc: ValidationError):
    return base_pydantic_error_handler(request, exc)


def base_pydantic_error_handler(request: Request, exc: ValidationError | RequestValidationError):
    log_event(event=EventLog.ERROR, input_data={"message": "validation error"})
    errors = ValidationResponse(
        detail="Validation error",
        errors=[{
            "field": error["loc"][-1],
            "message": error["msg"],
        } for error in exc.errors()],
    )

    return JSONResponse(errors.model_dump(), status_code=400)