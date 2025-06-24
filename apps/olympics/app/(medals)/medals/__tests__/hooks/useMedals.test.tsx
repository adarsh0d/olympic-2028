import { renderHook, act, waitFor } from '@testing-library/react';
import { useMedals } from '../../hooks/useMedals';
import { OlympicsService } from '../../services/olympics';

// Mock the service
jest.mock('../../services/olympics');
jest.mock('../../utils/olympics', () => ({
  OlympicsUtils: {
    validateSortParam: jest.fn((param) => param || 'gold'),
    getSortDirectionFromURL: jest.fn(() => 'desc'),
    sortMedals: jest.fn((data) => data),
    updateSortInURL: jest.fn(),
  },
}));

const mockMedalsData = [
  {
    country: 'USA',
    gold: 9,
    silver: 7,
    bronze: 12,
    total: 28,
  },
  {
    country: 'CHN',
    gold: 3,
    silver: 4,
    bronze: 2,
    total: 9,
  },
];

describe('useMedals', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useMedals());

    expect(result.current.medalsData).toEqual([]);
    expect(result.current.sortedData).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.sortConfig).toEqual({
      type: 'gold',
      direction: 'desc',
    });
  });

  it('should fetch medals data on mount', async () => {
    (OlympicsService.fetchMedalsData as jest.Mock).mockResolvedValue(mockMedalsData);

    const { result } = renderHook(() => useMedals());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.medalsData).toEqual(mockMedalsData);
    expect(result.current.sortedData).toEqual(mockMedalsData);
    expect(result.current.error).toBeNull();
  });

  it('should handle fetch errors', async () => {
    const errorMessage = 'Failed to fetch medals data';
    (OlympicsService.fetchMedalsData as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    const { result } = renderHook(() => useMedals());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.medalsData).toEqual([]);
  });

  it('should handle sort changes', async () => {
    (OlympicsService.fetchMedalsData as jest.Mock).mockResolvedValue(mockMedalsData);

    const { result } = renderHook(() => useMedals());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Test sorting by silver
    act(() => {
      result.current.handleSort('silver');
    });

    expect(result.current.sortConfig).toEqual({
      type: 'silver',
      direction: 'desc',
    });
  });

  it('should toggle sort direction when clicking same column', async () => {
    (OlympicsService.fetchMedalsData as jest.Mock).mockResolvedValue(mockMedalsData);

    const { result } = renderHook(() => useMedals());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Initial state is gold desc
    expect(result.current.sortConfig.direction).toBe('desc');

    // Click gold again to toggle to asc
    act(() => {
      result.current.handleSort('gold');
    });

    expect(result.current.sortConfig).toEqual({
      type: 'gold',
      direction: 'asc',
    });

    // Click gold again to toggle back to desc
    act(() => {
      result.current.handleSort('gold');
    });

    expect(result.current.sortConfig).toEqual({
      type: 'gold',
      direction: 'desc',
    });
  });

  it('should refetch data when refetch is called', async () => {
    (OlympicsService.fetchMedalsData as jest.Mock)
      .mockResolvedValueOnce(mockMedalsData)
      .mockResolvedValueOnce([...mockMedalsData, { country: 'GBR', gold: 5, silver: 3, bronze: 1, total: 9 }]);

    const { result } = renderHook(() => useMedals());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.medalsData).toEqual(mockMedalsData);

    // Call refetch
    act(async () => {
      await result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.medalsData).toHaveLength(3);
    });
  });

  it('should handle network errors gracefully', async () => {
    (OlympicsService.fetchMedalsData as jest.Mock).mockRejectedValue(
      new Error('Network error')
    );

    const { result } = renderHook(() => useMedals());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Network error');
    expect(result.current.medalsData).toEqual([]);
  });

  it('should handle unknown errors', async () => {
    (OlympicsService.fetchMedalsData as jest.Mock).mockRejectedValue('Unknown error');

    const { result } = renderHook(() => useMedals());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Error retrieving medals data. Please try again later.');
  });
}); 