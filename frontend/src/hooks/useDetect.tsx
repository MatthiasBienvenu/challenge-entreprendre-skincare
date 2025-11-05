import { useState } from "react";
import { DetectResponse } from "@/types/api";
import { toast } from "@/hooks/use-toast";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const useDetect = () => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [result, setResult] = useState<DetectResponse | null>(null);

  const detectSkinCondition = async (
    imageDataUrl: string,
  ): Promise<DetectResponse | null> => {
    setIsDetecting(true);
    try {
      // Convert base64 to blob
      const blob = await fetch(imageDataUrl).then((res) => res.blob());

      // Create FormData
      const formData = new FormData();
      formData.append("file", blob, "photo.jpg");

      const response = await fetch(`${API_BASE_URL}/api/v1/detect/`, {
        method: "POST",
        body: formData,
      });

      if (response.status === 429) {
        toast({
          title: "Limite de taux dépassée",
          description:
            "Trop de requêtes. Veuillez réessayer dans quelques instants.",
          variant: "destructive",
        });
        return null;
      }

      if (response.status === 402) {
        toast({
          title: "Paiement requis",
          description: "Crédit insuffisant. Veuillez ajouter des fonds.",
          variant: "destructive",
        });
        return null;
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Detection API error:", response.status, errorText);
        toast({
          title: "Erreur d'analyse",
          description: "Impossible d'analyser l'image. Veuillez réessayer.",
          variant: "destructive",
        });
        return null;
      }

      const data = await response.json();

      if (!data.success) {
        toast({
          title: "Échec de l'analyse",
          description: data.message || "L'analyse a échoué.",
          variant: "destructive",
        });
        return null;
      }

      setResult(data);
      return data;
    } catch (error) {
      console.error("Detection error:", error);
      toast({
        title: "Erreur réseau",
        description:
          "Impossible de se connecter au serveur. Vérifiez votre connexion.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsDetecting(false);
    }
  };

  return {
    isDetecting,
    result,
    detectSkinCondition,
  };
};