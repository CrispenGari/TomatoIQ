from fastapi import APIRouter
from fastapi.responses import JSONResponse
import requests
import os
from pydantic import BaseModel
currentWeatherRouter = APIRouter(prefix="/api/v1/weather")


class TCord(BaseModel):
    lat: float
    lon: float

@currentWeatherRouter.get("/current")
def weather_resolver(body: TCord):
    try:
        api_key = os.getenv("WEATHER_STACK_API_KEY")
        res = requests.get(
              f"https://api.weatherstack.com/current?access_key={api_key}&query={body.lat},{body.lon}"
          ).json()
        return JSONResponse({"success": True, "weather": res}, status_code=200)
    except Exception:
        return JSONResponse(
            {
                "error": {
                    "field": "sever",
                    "message": "There was something wrong on the server.",
                },
                "success": False,
            },
            status_code=200,
        )
