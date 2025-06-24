import { render, screen, waitFor } from '@testing-library/react';
import MedalsPage from '../page';

// Mock the useMedals hook
jest.mock('../hooks/useMedals', () => ({
  useMedals: jest.fn(),
}));

// Mock the components
jest.mock('../components/MedalTable', () => ({
  MedalTable: ({ data, sortConfig, onSort }: any) => (
    <div data-testid="medal-table">
      <div data-testid="table-data">{JSON.stringify(data)}</div>
      <div data-testid="table-sort-config">{JSON.stringify(sortConfig)}</div>
      <button onClick={() => onSort('gold')} data-testid="sort-gold">Sort Gold</button>
    </div>
  ),
}));

jest.mock('../components/LoadingState', () => ({
  LoadingState: () => <div data-testid="loading-state">Loading...</div>,
}));

jest.mock('../components/ErrorState', () => ({
  ErrorState: ({ message, onRetry }: any) => (
    <div data-testid="error-state">
      <div data-testid="error-message">{message}</div>
      <button onClick={onRetry} data-testid="retry-button">Retry</button>
    </div>
  ),
}));

const mockUseMedals = require('../hooks/useMedals').useMedals;

describe('MedalsPage', () => {
  const mockMedalsData = [
    { country: 'USA', gold: 9, silver: 7, bronze: 12, total: 28 },
    { country: 'CHN', gold: 3, silver: 4, bronze: 2, total: 9 },
  ];

  const mockSortConfig = {
    type: 'gold' as const,
    direction: 'desc' as const,
  };

  const mockHandleSort = jest.fn();
  const mockRefetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state when loading is true', () => {
    mockUseMedals.mockReturnValue({
      sortedData: [],
      sortConfig: mockSortConfig,
      loading: true,
      error: null,
      handleSort: mockHandleSort,
      refetch: mockRefetch,
    });

    render(<MedalsPage />);

    expect(screen.getByTestId('loading-state')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render error state when error exists', () => {
    const errorMessage = 'Failed to fetch data';
    mockUseMedals.mockReturnValue({
      sortedData: [],
      sortConfig: mockSortConfig,
      loading: false,
      error: errorMessage,
      handleSort: mockHandleSort,
      refetch: mockRefetch,
    });

    render(<MedalsPage />);

    expect(screen.getByTestId('error-state')).toBeInTheDocument();
    expect(screen.getByTestId('error-message')).toHaveTextContent(errorMessage);
    expect(screen.getByTestId('retry-button')).toBeInTheDocument();
  });

  it('should render medals table when data is loaded successfully', () => {
    mockUseMedals.mockReturnValue({
      sortedData: mockMedalsData,
      sortConfig: mockSortConfig,
      loading: false,
      error: null,
      handleSort: mockHandleSort,
      refetch: mockRefetch,
    });

    render(<MedalsPage />);

    expect(screen.getByText('Olympic Medals Table')).toBeInTheDocument();
    expect(screen.getByText('Click on column headers to sort by medal type. Default sort is by gold medals in descending order.')).toBeInTheDocument();
    expect(screen.getByTestId('medal-table')).toBeInTheDocument();
  });

  it('should display correct page title and description', () => {
    mockUseMedals.mockReturnValue({
      sortedData: mockMedalsData,
      sortConfig: mockSortConfig,
      loading: false,
      error: null,
      handleSort: mockHandleSort,
      refetch: mockRefetch,
    });

    render(<MedalsPage />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Olympic Medals Table');
    expect(screen.getByText(/Click on column headers to sort/)).toBeInTheDocument();
  });

  it('should pass correct props to MedalTable component', () => {
    mockUseMedals.mockReturnValue({
      sortedData: mockMedalsData,
      sortConfig: mockSortConfig,
      loading: false,
      error: null,
      handleSort: mockHandleSort,
      refetch: mockRefetch,
    });

    render(<MedalsPage />);

    const tableData = screen.getByTestId('table-data');
    const tableSortConfig = screen.getByTestId('table-sort-config');

    expect(tableData).toHaveTextContent(JSON.stringify(mockMedalsData));
    expect(tableSortConfig).toHaveTextContent(JSON.stringify(mockSortConfig));
  });

  it('should handle retry functionality', async () => {
    const errorMessage = 'Network error';
    mockUseMedals.mockReturnValue({
      sortedData: [],
      sortConfig: mockSortConfig,
      loading: false,
      error: errorMessage,
      handleSort: mockHandleSort,
      refetch: mockRefetch,
    });

    render(<MedalsPage />);

    const retryButton = screen.getByTestId('retry-button');
    retryButton.click();

    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it('should apply correct styling classes', () => {
    mockUseMedals.mockReturnValue({
      sortedData: mockMedalsData,
      sortConfig: mockSortConfig,
      loading: false,
      error: null,
      handleSort: mockHandleSort,
      refetch: mockRefetch,
    });

    render(<MedalsPage />);

    const mainContainer = screen.getByText('Olympic Medals Table').closest('div');
    expect(mainContainer).toHaveClass('min-h-screen', 'bg-gray-50', 'py-8');

    const contentContainer = mainContainer?.querySelector('.max-w-7xl');
    expect(contentContainer).toHaveClass('max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8');

    const cardContainer = contentContainer?.querySelector('.bg-white');
    expect(cardContainer).toHaveClass('bg-white', 'rounded-lg', 'shadow-sm', 'p-6');
  });

  it('should handle empty data gracefully', () => {
    mockUseMedals.mockReturnValue({
      sortedData: [],
      sortConfig: mockSortConfig,
      loading: false,
      error: null,
      handleSort: mockHandleSort,
      refetch: mockRefetch,
    });

    render(<MedalsPage />);

    expect(screen.getByTestId('medal-table')).toBeInTheDocument();
    expect(screen.getByTestId('table-data')).toHaveTextContent('[]');
  });
});
