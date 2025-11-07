import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CameraCard } from '@/components/CameraCard';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useCamera } from '@/hooks/useCamera';
import { useDetect } from '@/hooks/useDetect';
import { toast } from '@/hooks/use-toast';
import { Scan as ScanIcon } from 'lucide-react';

const Scan = () => {
  const navigate = useNavigate();
  const { videoRef, stream, capturedImage, startCamera, capturePhoto, clearCapture } = useCamera();
  const { isDetecting, detectSkinCondition } = useDetect();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setUploadedImage(result);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    const imageToAnalyze = capturedImage || uploadedImage;
    if (!imageToAnalyze) {
      toast({
        title: 'Aucune image',
        description: 'Veuillez capturer ou importer une image avant d\'analyser.',
        variant: 'destructive',
      });
      return;
    }

    const result = await detectSkinCondition(imageToAnalyze);

    if (result) {
      // Store result and image in localStorage
      localStorage.setItem('lastScanResult', JSON.stringify(result));
      localStorage.setItem('lastScanImage', imageToAnalyze);

      // Navigate to result page
      navigate('/result');
    }
  };

  const currentImage = capturedImage || uploadedImage;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <ScanIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">AIVANA Tech</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Analysez votre peau
            </h2>
            <p className="text-muted-foreground">
              Obtenez des recommandations produits personnalisées
            </p>
          </div>

          <CameraCard
            videoRef={videoRef}
            stream={stream}
            capturedImage={currentImage}
            onStartCamera={startCamera}
            onCapture={capturePhoto}
            onClear={() => {
              clearCapture();
              setUploadedImage(null);
            }}
            onFileUpload={handleFileUpload}
          />

          {isDetecting && (
            <LoadingSpinner text="Analyse en cours..." />
          )}

          {currentImage && !isDetecting && (
            <Button
              variant="scan"
              size="lg"
              className="w-full"
              onClick={handleAnalyze}
            >
              Analyser l'image
            </Button>
          )}

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Vos données sont sécurisées et ne sont pas stockées sur nos serveurs
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Scan;
