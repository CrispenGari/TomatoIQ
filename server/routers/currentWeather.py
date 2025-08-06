from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse
import requests
import os

currentWeatherRouter = APIRouter(prefix="/api/v1/weather")


@currentWeatherRouter.get("/current")
def weather_resolver(
    lat: float = Query(description="Latitude"),
    lon: float = Query(description="Longitude"),
):
    try:
        api_key = os.getenv("WEATHER_STACK_API_KEY")
        res = requests.get(
            f"https://api.weatherstack.com/current?access_key={api_key}&query={lat},{lon}"
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
