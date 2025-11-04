from ultralytics import YOLO
import sys

# Load your trained YOLO model
model = YOLO("best.pt")  # Replace with your model path

# Perform inference on an image
results = model("img.png")[0]  # Replace with your test image path

# Print results
#results.print()  # Prints a summary of detections

# Optionally, show the image with detections
results.show()  # Opens the image in a window with detections

# Optionally, save results to a folder
#results.save("runs/detect")  # Saves annotated images to runs/detect

