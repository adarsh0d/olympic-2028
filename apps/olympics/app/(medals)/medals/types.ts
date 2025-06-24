export interface CountryMedals {
    code: string;
    gold: number;
    silver: number;
    bronze: number;
}

export interface MedalData {
  code: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
  flagPosition?: number;
}

export type SortType = 'total' | 'gold' | 'silver' | 'bronze';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  type: SortType;
  direction: SortDirection;
}

export interface MedalTableProps {
  data: MedalData[];
  sortConfig: SortConfig;
  onSort: (sortType: SortType) => void;
}

export interface MedalRowProps {
  country: MedalData;
  rank: number;
}

export interface MedalHeaderProps {
  sortType: SortType;
  currentSort: SortConfig;
  onSort: (sortType: SortType) => void;
  children: React.ReactNode;
}
