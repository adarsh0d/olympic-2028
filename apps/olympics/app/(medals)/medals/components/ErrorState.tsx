'use client';

import { useTranslations } from 'next-intl';
import { ErrorState as SharedErrorState } from '@workspace/ui/components/error-state';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const t = useTranslations('medals');

  return (
    <SharedErrorState 
      message={message || t('errorMessage')}
      onRetry={onRetry}
      className="min-h-screen"
    />
  );
} 