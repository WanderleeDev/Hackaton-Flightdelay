from urllib.request import Request

from starlette.responses import JSONResponse
from src.core.logger import log_event, EventLog


def _global_error_handler(request: Request, exc: Exception):
    log_event(event=EventLog.ERROR, input_data={"message": str(exc)})
    return JSONResponse({"error": "Unknown error pls try later again"}, status_code=500)

