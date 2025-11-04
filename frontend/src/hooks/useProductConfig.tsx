import { useState, useEffect } from 'react';
import { ProductConfig, ProductItem } from '@/types/api';

export const useProductConfig = () => {
  const [config, setConfig] = useState<ProductConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch('/config/products.config.json');
        if (!response.ok) {
          throw new Error('Failed to load product configuration');
        }
        const data = await response.json();
        setConfig(data);
      } catch (err) {
        console.error('Error loading product config:', err);
        setError('Configuration produits non disponible');
        // Fallback config
        setConfig({
          version: 1,
          currency: 'EUR',
          defaultFallback: [],
          map: {},
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();
  }, []);

  const getProductsForDisease = (
    disease: string,
    confidence?: number
  ): ProductItem[] => {
    if (!config) return [];

    const normalizedDisease = disease.toLowerCase().trim();
    let products = config.map[normalizedDisease];

    if (!products || products.length === 0) {
      return config.defaultFallback;
    }

    // Apply overrides based on confidence
    if (confidence !== undefined && config.overrides?.byConfidence) {
      const override = config.overrides.byConfidence.find(
        (o) => o.disease === normalizedDisease
      );

      if (override) {
        if (confidence < override.minConfidence) {
          return config.defaultFallback;
        }
        if (override.limit && products.length > override.limit) {
          products = products.slice(0, override.limit);
        }
      }
    }

    return products;
  };

  return {
    config,
    isLoading,
    error,
    getProductsForDisease,
  };
};
