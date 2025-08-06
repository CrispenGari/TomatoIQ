### 📌 TomatoIQ

**Smart Tomato Quality and Maturity Detection App**

TomatoIQ is a mobile application that uses computer vision and machine learning to predict the quality and maturity level of tomatoes from images. Designed for farmers, supply chain managers, and agricultural researchers, the app helps streamline harvesting decisions, reduce waste, and ensure optimal crop value.

> This repository contains two main sub directory which are:

1. `mobile` - The mobile app that does predictions by sending requests to the API server using `X-Ray` images of a human chest.
2. `server` - This is an API server that serves different models that does TB predictions on chest-x-ray images of a human.

<p align="center">
  <a href="https://github.com/crispengari/tomatoIQ/actions/workflows/ci.yml">
    <img src="https://github.com/crispengari/tomatoIQ/actions/workflows/ci.yml/badge.svg" alt="CI Status">
  </a>
   <a href="https://github.com/crispengari/tomatoIQ/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License: MIT">
  </a>
  <a href="https://typescriptlang.org/">
    <img src="https://img.shields.io/badge/language-typescript-blue.svg" alt="Language: TypeScript">
  </a>
  <a href="https://www.python.org/">
    <img src="https://img.shields.io/badge/language-python-blue.svg" alt="Language: Python">
  </a>
</p>

---

### 🚀 Features

- 📷 Real-time tomato image analysis using AI
- 🍅 Maturity stage classification (e.g., green, breaker, pink, red)
- ✅ Quality grading based on texture, color, and surface defects
- 🌐 Offline support for field use
- 📊 Visual insights and prediction confidence scores

---

### 🧠 Powered By

- **PyTorch** – for model training and inference
- **OpenCV** – for image preprocessing and enhancement
- **React Native** – for cross-platform mobile support

---

### 📸 Example Prediction

You can send the request to the server. Here are some examples of requests that are send to the server using `cURL` locally.

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

---

### 📂 Dataset

The dataset that was used to train the models for tomato quality assessment and maturity was found on (Kaggle](https://www.kaggle.com/datasets/sujaykapadnis/tomato-maturity-detection-and-quality-grading).

### LICENSE

This project is using the [`MIT`](/LICENSE) LICENSE which reads as follows:
