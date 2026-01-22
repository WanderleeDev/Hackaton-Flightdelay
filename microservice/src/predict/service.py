from typing import List

from fastapi import UploadFile
from src.predict.execptions import CSVValidationException
from src.predict.schema import PredictionRequest, ResponsePrediction, ResponsePredictionBatch
from src.core.logger import log_event, EventLog
from pathlib import Path
import joblib
import pandas as pd


class PredictService:
    THRESHOLD = 0.4
    CHUNK_SIZE = 1024 * 1024
    MAX_FILE_SIZE = 5 * 1024 * 1024

    COLUMNS_CSV  = {"airline", "origin", "destination", "distance_km", "day_of_week", "hour"}

    def __init__(self):
        model_path = Path(__file__).parent.parent.parent / "model" / "predictor_delay.pkl"
        self.model = joblib.load(model_path)

    async def single(self, request: PredictionRequest) -> ResponsePrediction:
        log_event(event=EventLog.PREDICTION, input_data=request.model_dump())
        df = pd.DataFrame([request.model_dump()])
        prediction = await self.__predict_df(df)

        return ResponsePrediction(**prediction.iloc[0].to_dict())

    async def batch(self, file: UploadFile) -> List[ResponsePredictionBatch]:
        csv_validated = await self.__validate_and_load_csv(file)
        batch_result = await  self.__predict_df(csv_validated)

        return [ResponsePredictionBatch(**row) for row in batch_result.to_dict("records")]

    async def __predict_df(self, df: pd.DataFrame) -> pd.DataFrame:
        probs = self.model.predict_proba(df)[:, 1]
        df = df.copy()
        df["delay_prediction"] = (probs >= self.THRESHOLD).astype(int)
        df["delay_probability"] = probs.round(3)

        return df

    async def __validate_and_load_csv(self, file: UploadFile) -> pd.DataFrame:
        suffix_file = Path(file.filename).suffix

        if suffix_file != ".csv":
            raise CSVValidationException(f"Invalid file type. Expected .csv, got {suffix_file}")

        file_size = 0

        while chunk := await file.read(self.CHUNK_SIZE):
            file_size += len(chunk)

            if file_size > self.MAX_FILE_SIZE:
                raise CSVValidationException(f"File too large, max size valid: {self.MAX_FILE_SIZE}")

        await file.seek(0)
        df = pd.read_csv(file.file)

        for record in df.to_dict("records"):
            PredictionRequest.model_validate(record)

        if not self.COLUMNS_CSV.issubset(df.columns):
            raise CSVValidationException(f"Columns not in CSV file {self.COLUMNS_CSV.difference(df.columns)}")

        return df
