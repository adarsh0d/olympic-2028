import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { MedalData, SortType, SortConfig } from '../types';
import { OlympicsService } from '../services/olympics';
import { OlympicsUtils } from '../utils/olympics';

interface UseMedalsReturn {
  medalsData: MedalData[];
  sortedData: MedalData[];
  sortConfig: SortConfig;
  loading: boolean;
  error: string | null;
  handleSort: (sortType: SortType) => void;
  refetch: () => Promise<void>;
}

export function useMedals(): UseMedalsReturn {
  const searchParams = useSearchParams();
  const [medalsData, setMedalsData] = useState<MedalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ type: 'gold', direction: 'desc' });

  // Get sort parameter from URL on mount
  useEffect(() => {
    const sortParam = searchParams?.get('sort') ?? null;
    const validatedSort = OlympicsUtils.validateSortParam(sortParam);
    const direction = OlympicsUtils.getSortDirectionFromURL();
    setSortConfig({ type: validatedSort, direction });
  }, [searchParams]);

  // Fetch medals data
  const fetchMedalsData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await OlympicsService.fetchMedalsData();
      setMedalsData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error retrieving medals data. Please try again later.';
      setError(errorMessage);
      console.error('Error fetching medals:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedalsData();
  }, []);

  // Handle sort change with toggle logic
  const handleSort = (sortType: SortType) => {
    let newDirection: 'asc' | 'desc' = 'desc';
    
    // If clicking the same column, toggle direction
    if (sortConfig.type === sortType) {
      newDirection = sortConfig.direction === 'desc' ? 'asc' : 'desc';
    }
    
    const newSortConfig = { type: sortType, direction: newDirection };
    setSortConfig(newSortConfig);
    OlympicsUtils.updateSortInURL(newSortConfig);
  };

  // Refetch data
  const refetch = async () => {
    await fetchMedalsData();
  };

  // Get sorted data
  const sortedData = OlympicsUtils.sortMedals(medalsData, sortConfig);

  return {
    medalsData,
    sortedData,
    sortConfig,
    loading,
    error,
    handleSort,
    refetch,
  };
} 