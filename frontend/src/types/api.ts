export interface DetectResponse {
  disease: string;
  confidence?: number;
  extras?: Record<string, unknown>;
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
