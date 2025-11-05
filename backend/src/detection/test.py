from ultralytics import YOLO
import sys

# Load your trained YOLO model
model = YOLO("best.pt")  # Replace with your model path

# Perform inference on an image
predict_results = model.predict(source="test2.jpg", conf=0.9, save=True)
