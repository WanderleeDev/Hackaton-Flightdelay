from typing import List, Dict
from pydantic import BaseModel


class ValidationResponse(BaseModel):
    detail: str
    errors:  List[Dict[str, str]]
