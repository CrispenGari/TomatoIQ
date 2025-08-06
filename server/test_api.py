from fastapi.testclient import TestClient
from app import app

client = TestClient(app)


class TestApI:
    def test_root(self):
        res = client.get("/")
        assert res.status_code == 200
        assert res.json() == {
            "title": "TomatoIQ Server.",
            "description": "API for predicting tomato quality and maturity from tomato images using Deep Leaning.",
            "version": "0.0.1",
        }

    def test_mature_prediction(self):
        files = {"tomato": ("images/mature.jpg", open("images/mature.jpg", "rb"))}
        res = client.post("/api/v1/tomato/predict", files=files)
        data = res.json()

        assert res.status_code == 200
        assert data["ok"] is True
        assert data["status"] == "ok"
        assert data["prediction"]["maturity"]["label"] == 1

    def test_immature_prediction(self):
        files = {"tomato": ("images/immature.jpg", open("images/immature.jpg", "rb"))}
        res = client.post("/api/v1/tomato/predict", files=files)
        data = res.json()

        assert res.status_code == 200
        assert data["ok"] is True
        assert data["status"] == "ok"
        assert data["prediction"]["maturity"]["label"] == 0

    def test_fresh_prediction(self):
        files = {"tomato": ("images/fresh.jpg", open("images/fresh.jpg", "rb"))}
        res = client.post("/api/v1/tomato/predict", files=files)
        data = res.json()

        assert res.status_code == 200
        assert data["ok"] is True
        assert data["status"] == "ok"
        assert data["prediction"]["quality"]["label"] == 0

    def test_rotten_prediction(self):
        files = {"tomato": ("images/rotten.jpg", open("images/rotten.jpg", "rb"))}
        res = client.post("/api/v1/tomato/predict", files=files)
        data = res.json()

        assert res.status_code == 200
        assert data["ok"] is True
        assert data["status"] == "ok"
        assert data["prediction"]["quality"]["label"] == 1
