import { useRef, useEffect } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CameraCardProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  stream: MediaStream | null;
  capturedImage: string | null;
  onStartCamera: () => void;
  onCapture: () => void;
  onClear: () => void;
  onFileUpload: (file: File) => void;
  isLoading?: boolean;
}

export const CameraCard = ({
  videoRef,
  stream,
  capturedImage,
  onStartCamera,
  onCapture,
  onClear,
  onFileUpload,
  isLoading = false,
}: CameraCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, videoRef]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <Card className="overflow-hidden shadow-lg animate-fade-in">
      <CardContent className="p-0">
        {!stream && !capturedImage && (
          <div className="bg-gradient-subtle p-8 sm:p-12 text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Camera className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Analyse de peau</h3>
              <p className="text-muted-foreground">
                Prenez une photo ou importez une image pour détecter les problèmes de peau
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="scan"
                size="lg"
                onClick={onStartCamera}
                disabled={isLoading}
                className="gap-2"
              >
                <Camera className="w-5 h-5" />
                Ouvrir la caméra
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="gap-2"
              >
                <Upload className="w-5 h-5" />
                Importer une image
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        )}

        {stream && !capturedImage && (
          <div className="relative bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full aspect-video object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <div className="flex justify-center gap-3">
                <Button
                  variant="scan"
                  size="lg"
                  onClick={onCapture}
                  className="gap-2"
                >
                  <Camera className="w-5 h-5" />
                  Capturer
                </Button>
              </div>
            </div>
          </div>
        )}

        {capturedImage && (
          <div className="relative">
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full aspect-video object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={onClear}
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
