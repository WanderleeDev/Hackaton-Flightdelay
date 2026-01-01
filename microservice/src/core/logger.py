from enum import Enum

from loguru import logger
import json
import sys

class EventLog(Enum):
    PREDICTION = "prediction"
    ERROR = "error"
    INFO = "info"

logger.remove()
logger.add(sys.stdout, colorize=True, format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level}</level> | {message}")

logger.add("logs/predictions.log", rotation="10 MB", retention="10 days", compression="zip")

def log_event(event: EventLog, input_data: dict):
    log_entry = {
        "event": event.value,
        "input": input_data,
    }

    logger.info(json.dumps(log_entry))