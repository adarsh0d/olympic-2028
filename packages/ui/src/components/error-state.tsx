import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './button';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  showRetry?: boolean;
  className?: string;
}

export function ErrorState({ 
  message, 
  onRetry, 
  showRetry = true,
  className = '' 
}: ErrorStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Error</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">{message}</p>
      {showRetry && onRetry && (
        <Button 
          onClick={onRetry}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
      )}
    </div>
  );
} 