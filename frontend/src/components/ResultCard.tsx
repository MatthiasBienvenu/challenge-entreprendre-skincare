import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DetectResponse } from '@/types/api';
import { AlertCircle, Activity, Droplets, Hash } from 'lucide-react';

interface ResultCardProps {
  result: DetectResponse;
}

export const ResultCard = ({ result }: ResultCardProps) => {
  // Get the primary detection (highest confidence)
  const primaryDetection = result.detections && result.detections.length > 0
    ? result.detections.reduce((prev, current) => 
        (prev.confidence > current.confidence) ? prev : current
      )
    : null;

  // Get severity level based on severity_score
  const getSeverityLevel = (score?: number) => {
    if (!score) return { label: 'Inconnu', color: 'bg-gray-500' };
    if (score < 25) return { label: 'Léger', color: 'bg-green-500' };
    if (score < 50) return { label: 'Modéré', color: 'bg-yellow-500' };
    if (score < 75) return { label: 'Sévère', color: 'bg-orange-500' };
    return { label: 'Très Sévère', color: 'bg-red-500' };
  };

  const severity = getSeverityLevel(result.severity_score);

  return (
    <Card className="shadow-glow animate-fade-in border-primary/20">
      <CardHeader className="bg-gradient-subtle">
        <CardTitle className="text-2xl flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-primary" />
          Résultats de l'analyse
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Primary Detection */}
        {primaryDetection ? (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Condition détectée :</p>
            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-3xl font-bold text-foreground capitalize">
                {primaryDetection.class_name}
              </p>
              <Badge variant="default" className="text-sm px-3 py-1">
                {(primaryDetection.confidence * 100).toFixed(1)}% de confiance
              </Badge>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Condition détectée :</p>
            <p className="text-muted-foreground">Aucune détection spécifique</p>
          </div>
        )}

        {/* Severity Score */}
        {result.severity_score !== undefined && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <h3 className="font-semibold">Sévérité</h3>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className={`${severity.color} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                {severity.label}
              </div>
              <span className="text-muted-foreground">
                Score: {result.severity_score.toFixed(1)}/100
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div 
                className={`${severity.color} h-2.5 rounded-full transition-all`}
                style={{ width: `${Math.min(result.severity_score, 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {result.percentage_area !== undefined && (
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Droplets className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Zone affectée</span>
              </div>
              <p className="text-2xl font-bold">{result.percentage_area.toFixed(1)}%</p>
            </div>
          )}

          {result.lesion_count !== undefined && (
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Hash className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Nombre de lésions</span>
              </div>
              <p className="text-2xl font-bold">{result.lesion_count}</p>
            </div>
          )}

          {result.average_intensity !== undefined && (
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Intensité moyenne</span>
              </div>
              <p className="text-2xl font-bold">{result.average_intensity.toFixed(2)}</p>
            </div>
          )}
        </div>

        {/* All Detections */}
        {result.detections && result.detections.length > 1 && (
          <div className="space-y-2">
            <h3 className="font-semibold">Toutes les détections ({result.detections.length})</h3>
            <div className="flex flex-wrap gap-2">
              {result.detections
                .sort((a, b) => b.confidence - a.confidence)
                .slice(0, 10)
                .map((detection, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm"
                  >
                    <span className="font-medium capitalize">{detection.class_name}</span>
                    <span className="text-muted-foreground">
                      {(detection.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              {result.detections.length > 10 && (
                <span className="text-sm text-muted-foreground px-3 py-1">
                  +{result.detections.length - 10} autres...
                </span>
              )}
            </div>
          </div>
        )}

        {/* Timestamp */}
        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Analysé le {new Date().toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>

        {/* Backend message */}
        {result.message && (
          <div className="text-sm text-muted-foreground italic border-l-2 border-primary pl-3">
            {result.message}
          </div>
        )}
      </CardContent>
    </Card>
  );
};