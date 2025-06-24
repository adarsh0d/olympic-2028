'use client';

import { ErrorState } from './components/ErrorState';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState 
      message={error.message || 'Something went wrong!'} 
      onRetry={reset} 
    />
  );
}
