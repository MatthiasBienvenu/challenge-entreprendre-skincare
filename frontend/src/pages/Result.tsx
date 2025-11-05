import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResultCard } from '@/components/ResultCard';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useProductConfig } from '@/hooks/useProductConfig';
import { DetectResponse } from '@/types/api';
import { ArrowLeft, Camera } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Result = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<DetectResponse | null>(null);
  const [scanImage, setScanImage] = useState<string | null>(null);
  const { config, isLoading, getProductsForDisease } = useProductConfig();

  useEffect(() => {
    const storedResult = localStorage.getItem('lastScanResult');
    const storedImage = localStorage.getItem('lastScanImage');

    if (!storedResult) {
      toast({
        title: 'Aucun résultat',
        description: 'Veuillez effectuer une analyse d\'abord.',
        variant: 'destructive',
      });
      navigate('/');
      return;
    }

    const parsedResult = JSON.parse(storedResult);
    setResult(parsedResult);
    setScanImage(storedImage);
  }, [navigate]);

  if (isLoading || !result) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <LoadingSpinner text="Chargement des résultats..." />
      </div>
    );
  }

  // Get the primary detection (highest confidence)
  const primaryDetection = result.detections && result.detections.length > 0
    ? result.detections.reduce((prev, current) => 
        (prev.confidence > current.confidence) ? prev : current
      )
    : null;

  const products = primaryDetection 
    ? getProductsForDisease(primaryDetection.class_name, primaryDetection.confidence)
    : [];

  const handleNewScan = () => {
    localStorage.removeItem('lastScanResult');
    localStorage.removeItem('lastScanImage');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Résultats</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Display both original image and heatmap if available */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scanImage && (
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src={scanImage}
                  alt="Scan original"
                  className="w-full aspect-video object-cover"
                />
                <p className="text-center text-sm text-muted-foreground p-2">Image originale</p>
              </div>
            )}
            
            {result.heatmap_image_base64 && (
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src={`data:image/png;base64,${result.heatmap_image_base64}`}
                  alt="Carte thermique"
                  className="w-full aspect-video object-cover"
                />
                <p className="text-center text-sm text-muted-foreground p-2">Carte thermique</p>
              </div>
            )}
          </div>

          <ResultCard result={result} />

          <div className="space-y-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Produits recommandés</h2>
              <p className="text-muted-foreground">
                {products.length > 0
                  ? 'Voici des produits adaptés à votre condition'
                  : 'Aucun produit spécifique trouvé pour cette condition'}
              </p>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((product, index) => (
                  <ProductCard
                    key={index}
                    product={product}
                    currency={config?.currency}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>Nous travaillons à élargir notre gamme de recommandations.</p>
              </div>
            )}
          </div>

          <div className="flex justify-center pt-6">
            <Button
              variant="scan"
              size="lg"
              onClick={handleNewScan}
              className="gap-2"
            >
              <Camera className="w-5 h-5" />
              Nouvelle analyse
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Result;