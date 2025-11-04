import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  text?: string;
}

export const LoadingSpinner = ({ text = 'Chargement...' }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <Loader2 className="w-12 h-12 text-primary animate-spin" />
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
};
