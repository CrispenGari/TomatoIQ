import torch
import os
import io
from torch.nn import functional as F
import numpy as np
from PIL import Image
from torchvision import models
from torch import nn
from utils import get_image_transformations


OUTPUT_DIM = 1
quality_classes = ["fresh", "rotten"]
maturity_classes = ["inmature", "mature"]
quality_means, quality_stds = (
    torch.tensor([0.7104, 0.6445, 0.6112]),
    torch.tensor([0.0977, 0.1952, 0.2105]),
)
maturity_means, maturity_stds = (
    torch.tensor([0.4666, 0.4713, 0.3025]),
    torch.tensor([0.2010, 0.1837, 0.1917]),
)

quality_image_transforms = get_image_transformations(quality_means, quality_stds)
maturity_image_transforms = get_image_transformations(maturity_means, maturity_stds)


device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
pretrained_size = 224
criterion = nn.BCEWithLogitsLoss().to(device)

maturity_path = os.path.join(os.getcwd(), "models/static/maturity.pt")
quality_path = os.path.join(os.getcwd(), "models/static/quality.pt")


print(" *  LOADING MODELS")

quality_mobilenetv3 = models.mobilenet_v3_large(weights=False).to(device)
quality_mobilenetv3.classifier[-1] = nn.Linear(
    quality_mobilenetv3.classifier[-1].in_features, OUTPUT_DIM
).to(device)
quality_mobilenetv3.load_state_dict(torch.load(quality_path, map_location=device))

maturity_mobilenetv3 = models.mobilenet_v3_large(weights=False).to(device)
maturity_mobilenetv3.classifier[-1] = nn.Linear(
    maturity_mobilenetv3.classifier[-1].in_features, OUTPUT_DIM
).to(device)
maturity_mobilenetv3.load_state_dict(torch.load(maturity_path, map_location=device))

print("\n *  LOADING MODELS COMPLETE")


def preprocess_img(img: str, image_transforms):
    """
    takes in an image path and pre process it
    """
    img = image_transforms["test"](Image.open(io.BytesIO(img)).convert("RGB"))
    return img


def predict_quality_and_maturity(quality_model, maturity_model, image, device):
    image1 = preprocess_img(image, quality_image_transforms)
    image1 = torch.unsqueeze(image1, 0).to(device)
    image2 = preprocess_img(image, maturity_image_transforms)
    image2 = torch.unsqueeze(image2, 0).to(device)
    
    quality_model.eval()
    maturity_model.eval()
    with torch.no_grad():
        quality_pred = F.sigmoid(quality_model(image1).squeeze().cpu()).item()
        maturity_pred = F.sigmoid(maturity_model(image2).squeeze().cpu()).item()

        quality_predicted_label = 1 if quality_pred >= 0.5 else 0
        maturity_predicted_label = 1 if maturity_pred >= 0.5 else 0

        quality_confidence = quality_pred if quality_pred >= 0.5 else 1 - quality_pred
        maturity_confidence = (
            maturity_pred if maturity_pred >= 0.5 else 1 - maturity_pred
        )

        res = {
            "quality": {
                "label": quality_predicted_label,
                "class_label": quality_classes[quality_predicted_label],
                "probability": float(np.round(quality_confidence, 2)),
            },
            "maturity": {
                "label": maturity_predicted_label,
                "class_label": maturity_classes[maturity_predicted_label],
                "probability": float(np.round(maturity_confidence, 2)),
            },
        }
        return res
