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
   * Get flag position for a country code in the flags.png sprite sheet
   * Flags are arranged alphabetically by country code
   */
  static getFlagPosition(countryCode: string): number {
    // Define the order of countries in the flags.png sprite sheet
    // This should match the exact order in your flags.png file
    const countryOrder = [
      'AFG', 'ALB', 'ALG', 'AND', 'ANG', 'ANT', 'ARG', 'ARM', 'ARU', 'ASA', 'AUS', 'AUT', 'AZE',
      'BAH', 'BAN', 'BAR', 'BDI', 'BEL', 'BEN', 'BER', 'BHU', 'BIH', 'BIZ', 'BLR', 'BOL', 'BOT', 'BRA', 'BRN', 'BRU', 'BUL', 'BUR',
      'CAF', 'CAM', 'CAN', 'CAY', 'CGO', 'CHA', 'CHI', 'CHN', 'CIV', 'CMR', 'COD', 'COK', 'COL', 'COM', 'CPV', 'CRC', 'CRO', 'CUB', 'CZE',
      'DEN', 'DJI', 'DMA', 'DOM',
      'ECU', 'EGY', 'ERI', 'ESA', 'ESP', 'EST', 'ETH',
      'FIJ', 'FIN', 'FRA', 'FSM',
      'GAB', 'GAM', 'GEO', 'GHA', 'GIN', 'GUM', 'GUY',
      'HAI', 'HKG', 'HON', 'HUN',
      'INA', 'IND', 'IRI', 'IRL', 'IRQ', 'ISL', 'ISR', 'ISV', 'ITA', 'IVB',
      'JAM', 'JOR', 'JPN',
      'KAZ', 'KEN', 'KGZ', 'KHM', 'KIR', 'KOR', 'KOS', 'KSA', 'KUW',
      'LAO', 'LAT', 'LBA', 'LBR', 'LCA', 'LES', 'LIE', 'LTU', 'LUX',
      'MAC', 'MAD', 'MAR', 'MAS', 'MDA', 'MDV', 'MEX', 'MHL', 'MKD', 'MLI', 'MLT', 'MNG', 'MNP', 'MOZ', 'MRI', 'MTN', 'MYA', 'MYS',
      'NAM', 'NCA', 'NED', 'NEP', 'NGR', 'NIG', 'NOR', 'NRU', 'NZL',
      'OMA',
      'PAK', 'PAN', 'PAR', 'PER', 'PHI', 'PLW', 'PNG', 'POL', 'POR', 'PRK',
      'QAT',
      'ROU', 'RSA', 'RUS', 'RWA',
      'SAM', 'SEN', 'SEY', 'SGP', 'SKN', 'SLE', 'SLO', 'SMR', 'SOL', 'SOM', 'SRB', 'SRI', 'STP', 'SUD', 'SUI', 'SUR', 'SVK', 'SWE', 'SWZ', 'SYR',
      'TAN', 'TGA', 'THA', 'TJK', 'TKM', 'TLS', 'TOG', 'TPE', 'TUN', 'TUR', 'TUV',
      'UGA', 'UKR', 'URU', 'USA', 'UZB',
      'VAN', 'VEN', 'VIE', 'VIN',
      'YEM',
      'ZAM', 'ZIM'
    ];
    
    const index = countryOrder.indexOf(countryCode);
    return index >= 0 ? index : 0; // Return 0 if country not found
  }

  /**
   * Get flag emoji for a country code (fallback)
   */
  static getFlagEmoji(countryCode: string): string {
    const flagMap: Record<string, string> = {
      'USA': '🇺🇸',
      'CHN': '🇨🇳',
      'JPN': '🇯🇵',
      'GBR': '🇬🇧',
      'ROC': '🇷🇺',
      'AUS': '🇦🇺',
      'NED': '🇳🇱',
      'FRA': '🇫🇷',
      'GER': '🇩🇪',
      'ITA': '🇮🇹',
      'CAN': '🇨🇦',
      'BRA': '🇧🇷',
      'NZL': '🇳🇿',
      'CUB': '🇨🇺',
      'HUN': '🇭🇺',
      'KOR': '🇰🇷',
      'POL': '🇵🇱',
      'CZE': '🇨🇿',
      'KEN': '🇰🇪',
      'NOR': '🇳🇴',
      'JAM': '🇯🇲',
      'ESP': '🇪🇸',
      'SWE': '🇸🇪',
      'SUI': '🇨🇭',
      'DEN': '🇩🇰',
      'CRO': '🇭🇷',
      'IRN': '🇮🇷',
      'SRB': '🇷🇸',
      'BEL': '🇧🇪',
      'BUL': '🇧🇬',
      'SLO': '🇸🇮',
      'UZB': '🇺🇿',
      'GEO': '🇬🇪',
      'TPE': '🇹🇼',
      'TUR': '🇹🇷',
      'GRE': '🇬🇷',
      'UG': '🇺🇬',
      'ECU': '🇪🇨',
      'IRL': '🇮🇪',
      'ISR': '🇮🇱',
      'QAT': '🇶🇦',
      'BAH': '🇧🇭',
      'CHI': '🇨🇱',
      'FIJ': '🇫🇯',
      'LAT': '🇱🇻',
      'THA': '🇹🇭',
      'VEN': '🇻🇪',
      'EST': '🇪🇪',
      'IND': '🇮🇳',
      'PHI': '🇵🇭',
      'SMR': '🇸🇲',
      'COL': '🇨🇴',
      'DJI': '🇩🇯',
      'JOR': '🇯🇴',
      'KOS': '🇽🇰',
      'MEX': '🇲🇽',
      'MNG': '🇲🇳',
      'SYR': '🇸🇾'
    };
    
    return flagMap[countryCode] || '🏳️';
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