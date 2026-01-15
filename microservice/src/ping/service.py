import time

import httpx
from fastapi import HTTPException

from src.core import logger, settings
from src.core.logger import EventLog


def wake_up():
    while True:
        try:
            response = httpx.get(settings.origin_url)

            if not response.is_success:
                raise HTTPException(status_code=500, detail={"message": "Wake up failed"})

            logger.log_event(event=EventLog.INFO, input_data=response.json())

        except Exception as e:
            print(e)

        time.sleep(780)
