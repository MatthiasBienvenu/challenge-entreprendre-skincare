export interface DetectionInfo {
  class_name: string;
  confidence: number;
}

export interface DetectResponse {
  success: boolean;
  message: string;
  severity_score?: number;
  percentage_area?: number;
  average_intensity?: number;
  lesion_count?: number;
  heatmap_image_base64?: string;
  detections?: DetectionInfo[];
  model_classes?: Record<number, string>;
}

export interface ProductItem {
  name: string;
  url: string;
  image?: string;
  price?: number;
  tags?: string[];
}

export interface ProductConfig {
  version: number;
  currency?: string;
  defaultFallback: ProductItem[];
  map: Record<string, ProductItem[]>;
  overrides?: {
    byConfidence?: {
      disease: string;
      minConfidence: number;
      limit?: number;
    }[];
  };
}

export interface ProfileData {
  user_id: string;
  name?: string;
  dob?: string;
  height?: number;
  weight?: number;
  gender?: string;
}

export interface TimeseriesEntry {
  user_id: string;
  timestamp: string;
  acne_severity_score?: number;
  diet_sugar?: number;
  sleep_hours?: number;
  stress?: string;
  products_used?: string;
}

export interface SkinPlan {
  treatment_plan?: Array<{ date: string; task: string }>;
  lifestyle_advice?: string[];
  diet_recommendations?: string[];
  sleep_recommendations?: string[];
  environmental_factors?: string[];
  product_recommendations?: ProductItem[];
}
