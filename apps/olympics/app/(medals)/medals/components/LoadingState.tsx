'use client';

import { useTranslations } from 'next-intl';
import { LoadingState as SharedLoadingState } from '@workspace/ui/components/loading-state';

export function LoadingState() {
  const t = useTranslations('medals');

  return (
    <SharedLoadingState 
      message={t('loadingMessage')}
      size="lg"
      className="min-h-screen"
    />
  );
} 