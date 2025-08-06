from fastapi import APIRouter, File
from fastapi.responses import JSONResponse
from typing import Annotated
from models import (
    maturity_mobilenetv3,
    quality_mobilenetv3,
    device,
    predict_quality_and_maturity,
)
import time

predictTomatoQualityAndMaturityRouter = APIRouter(prefix="/api/v1/tomato")


@predictTomatoQualityAndMaturityRouter.post("/predict")
def predict_tomato(tomato: Annotated[bytes, File()]):
    start = time.time()
    try:
        prediction = predict_quality_and_maturity(
            quality_mobilenetv3, maturity_mobilenetv3, tomato, device=device
        )
        return JSONResponse(
            {
                "time": time.time() - start,
                "ok": True,
                "status": "ok",
                "prediction": prediction,
            },
            status_code=200,
        )
    except Exception:
        JSONResponse(
            {
                "time": time.time() - start,
                "ok": False,
                "field": "server",
                "status": "error",
                "message": "Internal Server Error.",
            },
            status_code=500,
        )
