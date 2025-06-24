import { render, screen, fireEvent } from '@testing-library/react';
import { MedalTable } from '../../components/MedalTable';
import { MedalData, SortConfig } from '../../types';

const mockData: MedalData[] = [
  {
    country: 'USA',
    gold: 9,
    silver: 7,
    bronze: 12,
    total: 28,
    flagPosition: 0,
  },
  {
    country: 'CHN',
    gold: 3,
    silver: 4,
    bronze: 2,
    total: 9,
    flagPosition: 1,
  },
];

const mockSortConfig: SortConfig = {
  type: 'gold',
  direction: 'desc',
};

const mockOnSort = jest.fn();

describe('MedalTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders table with correct headers', () => {
    render(
      <MedalTable 
        data={mockData} 
        sortConfig={mockSortConfig} 
        onSort={mockOnSort} 
      />
    );

    expect(screen.getByText('Rank')).toBeInTheDocument();
    expect(screen.getByText('Country')).toBeInTheDocument();
    expect(screen.getByText('Gold')).toBeInTheDocument();
    expect(screen.getByText('Silver')).toBeInTheDocument();
    expect(screen.getByText('Bronze')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('renders medal data correctly', () => {
    render(
      <MedalTable 
        data={mockData} 
        sortConfig={mockSortConfig} 
        onSort={mockOnSort} 
      />
    );

    expect(screen.getByText('USA')).toBeInTheDocument();
    expect(screen.getByText('CHN')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument(); // USA gold
    expect(screen.getByText('3')).toBeInTheDocument(); // CHN gold
    expect(screen.getByText('28')).toBeInTheDocument(); // USA total
    expect(screen.getByText('9')).toBeInTheDocument(); // CHN total
  });

  it('shows sort indicators for active sort column', () => {
    render(
      <MedalTable 
        data={mockData} 
        sortConfig={mockSortConfig} 
        onSort={mockOnSort} 
      />
    );

    // Should show descending arrow for gold column
    expect(screen.getByText('Gold ↓')).toBeInTheDocument();
  });

  it('calls onSort when column headers are clicked', () => {
    render(
      <MedalTable 
        data={mockData} 
        sortConfig={mockSortConfig} 
        onSort={mockOnSort} 
      />
    );

    fireEvent.click(screen.getByText('Gold ↓'));
    expect(mockOnSort).toHaveBeenCalledWith('gold');

    fireEvent.click(screen.getByText('Silver'));
    expect(mockOnSort).toHaveBeenCalledWith('silver');

    fireEvent.click(screen.getByText('Bronze'));
    expect(mockOnSort).toHaveBeenCalledWith('bronze');

    fireEvent.click(screen.getByText('Total'));
    expect(mockOnSort).toHaveBeenCalledWith('total');
  });

  it('displays flag images with correct positioning', () => {
    render(
      <MedalTable 
        data={mockData} 
        sortConfig={mockSortConfig} 
        onSort={mockOnSort} 
      />
    );

    const flagElements = screen.getAllByTitle(/flag$/);
    expect(flagElements).toHaveLength(2);
    
    // Check that flag elements have the correct styling
    flagElements.forEach((flag) => {
      expect(flag).toHaveStyle({
        backgroundImage: 'url(/medals/flags.png)',
      });
    });
  });

  it('renders empty table when no data provided', () => {
    render(
      <MedalTable 
        data={[]} 
        sortConfig={mockSortConfig} 
        onSort={mockOnSort} 
      />
    );

    expect(screen.getByText('Rank')).toBeInTheDocument();
    expect(screen.getByText('Country')).toBeInTheDocument();
    expect(screen.getByText('Gold')).toBeInTheDocument();
    expect(screen.getByText('Silver')).toBeInTheDocument();
    expect(screen.getByText('Bronze')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    render(
      <MedalTable 
        data={mockData} 
        sortConfig={mockSortConfig} 
        onSort={mockOnSort} 
      />
    );

    const table = screen.getByRole('table');
    expect(table).toHaveClass('w-full');

    const tableContainer = table.parentElement;
    expect(tableContainer).toHaveClass('rounded-md', 'border', 'overflow-hidden');
  });
}); 