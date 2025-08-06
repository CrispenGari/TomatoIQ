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
