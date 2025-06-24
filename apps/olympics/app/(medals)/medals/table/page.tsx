'use client';

import { useTranslations } from 'next-intl';
import { MedalTable } from '../components/MedalTable';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { useMedals } from '../hooks/useMedals';
import { getCurrentEnvironment } from '../../../../config/environments';

export default function MedalsTablePage() {
  const t = useTranslations('medals');
  const env = getCurrentEnvironment();
  const { sortedData, sortConfig, loading, error, handleSort, refetch } = useMedals();

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <a href="/" className="inline-block px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition-colors cursor-pointer">
            Back to Homepage
          </a>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('title')}
            </h1>
            <p className="text-gray-600">
              {t('description')}
            </p>
            {env.name !== 'Production' && (
              <div className="mt-2 text-sm text-gray-500">
                Environment: {env.name}
              </div>
            )}
          </div>
          
          <MedalTable 
            data={sortedData} 
            sortConfig={sortConfig} 
            onSort={handleSort} 
          />
        </div>
      </div>
    </div>
  );
} 