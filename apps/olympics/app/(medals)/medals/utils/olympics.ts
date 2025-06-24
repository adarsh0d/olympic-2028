import { MedalData, SortType, SortDirection, SortConfig } from '../types';

export class OlympicsUtils {
  /**
   * Sort medals data with tie-breaking logic
   */
  static sortMedals(data: MedalData[], sortConfig: SortConfig): MedalData[] {
    const { type: sortType, direction } = sortConfig;
    
    return [...data].sort((a, b) => {
      // Primary sort
      if (a[sortType] !== b[sortType]) {
        const comparison = b[sortType] - a[sortType];
        return direction === 'desc' ? comparison : -comparison;
      }
      
      // Tie-breaking logic (always in descending order for consistency)
      let tieBreakResult = 0;
      switch (sortType) {
        case 'total':
          tieBreakResult = b.gold - a.gold; // Break ties by most gold
          break;
        case 'gold':
          tieBreakResult = b.silver - a.silver; // Break ties by most silver
          break;
        case 'silver':
          tieBreakResult = b.gold - a.gold; // Break ties by most gold
          break;
        case 'bronze':
          tieBreakResult = b.gold - a.gold; // Break ties by most gold
          break;
        default:
          tieBreakResult = 0;
      }
      
      return tieBreakResult;
    });
  }


  /**
   * Validate sort parameter from URL
   */
  static validateSortParam(sortParam: string | null): SortType {
    if (sortParam && ['total', 'gold', 'silver', 'bronze'].includes(sortParam)) {
      return sortParam as SortType;
    }
    return 'gold'; // Default sort
  }

  /**
   * Update URL with sort parameter without page reload
   */
  static updateSortInURL(sortConfig: SortConfig): void {
    const url = new URL(window.location.href);
    url.searchParams.set('sort', sortConfig.type);
    url.searchParams.set('direction', sortConfig.direction);
    window.history.pushState({}, '', url.toString());
  }

  /**
   * Get sort direction from URL
   */
  static getSortDirectionFromURL(): SortDirection {
    const url = new URL(window.location.href);
    const direction = url.searchParams.get('direction');
    return direction === 'asc' ? 'asc' : 'desc';
  }
} 