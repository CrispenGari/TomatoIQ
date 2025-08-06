### Using cURL

The following commands can be used to test the API using `cURL`.

```shell
# immature
cURL -X POST -F tomato=@immature.jpg http://127.0.0.1:8000/api/v1/tomato/predict

# mature
cURL -X POST -F tomato=@mature.jpg http://127.0.0.1:8000/api/v1/tomato/predict


# rotten
cURL -X POST -F tomato=@rotten.jpg http://127.0.0.1:8000/api/v1/tomato/predict

# fresh
cURL -X POST -F tomato=@fresh.jpg http://127.0.0.1:8000/api/v1/tomato/predict
```

### Expected Response

The following is the API expected response.

```json
{
  "time": 0.474229097366333,
  "ok": true,
  "status": "ok",
  "prediction": {
    "quality": { "label": 1, "class_label": "rotten", "probability": 1.0 },
    "maturity": { "label": 1, "class_label": "mature", "probability": 1.0 }
  }
}
```

### Testing the API.

To run some unit test on the API you run the following command:

```shell
pytest
```

### Getting teh Weather

You can get your current weather by sending a get request to `http://127.0.0.1:8000/api/v1/weather/current?lat=-32.78749&lon=26.8344`. To get the following json response:

```json
{
  "success": true,
  "weather": {
    "request": {
      "type": "LatLon",
      "query": "Lat -32.79 and Lon 26.83",
      "language": "en",
      "unit": "m"
    },
    "location": {
      "name": "Alice",
      "country": "South Africa",
      "region": "Eastern Cape",
      "lat": "-32.783",
      "lon": "26.833",
      "timezone_id": "Africa/Johannesburg",
      "localtime": "2025-08-06 10:57",
      "localtime_epoch": 1754477820,
      "utc_offset": "2.0"
    },
    "current": {
      "observation_time": "08:57 AM",
      "temperature": 9,
      "weather_code": 176,
      "weather_icons": [
        "https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0009_light_rain_showers.png"
      ],
      "weather_descriptions": ["Patchy rain nearby"],
      "astro": {
        "sunrise": "06:59 AM",
        "sunset": "05:39 PM",
        "moonrise": "02:39 PM",
        "moonset": "04:57 AM",
        "moon_phase": "Waxing Gibbous",
        "moon_illumination": 88
      },
      "air_quality": {
        "co": "210.9",
        "no2": "4.255",
        "o3": "60",
        "so2": "3.33",
        "pm2_5": "3.885",
        "pm10": "4.44",
        "us-epa-index": "1",
        "gb-defra-index": "1"
      },
      "wind_speed": 6,
      "wind_degree": 279,
      "wind_dir": "W",
      "pressure": 1027,
      "precip": 0,
      "humidity": 79,
      "cloudcover": 88,
      "feelslike": 8,
      "uv_index": 0,
      "visibility": 10,
      "is_day": "yes"
    }
  }
}
```
