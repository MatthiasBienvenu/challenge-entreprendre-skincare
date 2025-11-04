import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DetectResponse } from '@/types/api';

interface ResultCardProps {
  result: DetectResponse;
}

export const ResultCard = ({ result }: ResultCardProps) => {
  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return 'secondary';
    if (confidence >= 0.7) return 'default';
    if (confidence >= 0.5) return 'secondary';
    return 'destructive';
  };

  const getConfidenceText = (confidence?: number) => {
    if (!confidence) return null;
    return `${(confidence * 100).toFixed(1)}% de confiance`;
  };

  return (
    <Card className="shadow-glow animate-fade-in border-primary/20">
      <CardHeader className="bg-gradient-subtle">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-2xl flex items-center gap-2">
              {result.confidence && result.confidence >= 0.6 ? (
                <CheckCircle2 className="w-6 h-6 text-primary" />
              ) : (
                <AlertCircle className="w-6 h-6 text-muted-foreground" />
              )}
              Résultat de l'analyse
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Condition détectée :</p>
          <p className="text-3xl font-bold text-foreground capitalize">
            {result.disease}
          </p>
        </div>
        
        {result.confidence !== undefined && (
          <div>
            <Badge variant={getConfidenceColor(result.confidence)} className="text-sm px-3 py-1">
              {getConfidenceText(result.confidence)}
            </Badge>
          </div>
        )}

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
      </CardContent>
    </Card>
  );
};
