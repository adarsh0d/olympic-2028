import { OlympicsUtils } from '../../utils/olympics';
import { MedalData, SortConfig } from '../../types';

const mockMedalsData: MedalData[] = [
  {
    country: 'USA',
    gold: 9,
    silver: 7,
    bronze: 12,
    total: 28,
  },
  {
    country: 'CHN',
    gold: 9,
    silver: 4,
    bronze: 2,
    total: 15,
  },
  {
    country: 'GBR',
    gold: 5,
    silver: 8,
    bronze: 6,
    total: 19,
  },
];

describe('OlympicsUtils', () => {
  describe('sortMedals', () => {
    it('should sort by gold medals in descending order', () => {
      const sortConfig: SortConfig = { type: 'gold', direction: 'desc' };
      const result = OlympicsUtils.sortMedals(mockMedalsData, sortConfig);

      expect(result[0].country).toBe('USA');
      expect(result[1].country).toBe('CHN');
      expect(result[2].country).toBe('GBR');
    });

    it('should sort by gold medals in ascending order', () => {
      const sortConfig: SortConfig = { type: 'gold', direction: 'asc' };
      const result = OlympicsUtils.sortMedals(mockMedalsData, sortConfig);

      expect(result[0].country).toBe('GBR');
      expect(result[1].country).toBe('USA');
      expect(result[2].country).toBe('CHN');
    });

    it('should sort by total medals in descending order', () => {
      const sortConfig: SortConfig = { type: 'total', direction: 'desc' };
      const result = OlympicsUtils.sortMedals(mockMedalsData, sortConfig);

      expect(result[0].country).toBe('USA');
      expect(result[1].country).toBe('GBR');
      expect(result[2].country).toBe('CHN');
    });

    it('should break ties by gold medals when sorting by total', () => {
      const dataWithTies: MedalData[] = [
        { country: 'A', gold: 5, silver: 3, bronze: 2, total: 10 },
        { country: 'B', gold: 6, silver: 2, bronze: 2, total: 10 },
        { country: 'C', gold: 4, silver: 4, bronze: 2, total: 10 },
      ];

      const sortConfig: SortConfig = { type: 'total', direction: 'desc' };
      const result = OlympicsUtils.sortMedals(dataWithTies, sortConfig);

      expect(result[0].country).toBe('B'); // Most gold
      expect(result[1].country).toBe('A'); // Second most gold
      expect(result[2].country).toBe('C'); // Least gold
    });

    it('should break ties by silver medals when sorting by gold', () => {
      const dataWithTies: MedalData[] = [
        { country: 'A', gold: 5, silver: 3, bronze: 2, total: 10 },
        { country: 'B', gold: 5, silver: 4, bronze: 1, total: 10 },
        { country: 'C', gold: 5, silver: 2, bronze: 3, total: 10 },
      ];

      const sortConfig: SortConfig = { type: 'gold', direction: 'desc' };
      const result = OlympicsUtils.sortMedals(dataWithTies, sortConfig);

      expect(result[0].country).toBe('B'); // Most silver
      expect(result[1].country).toBe('A'); // Second most silver
      expect(result[2].country).toBe('C'); // Least silver
    });
  });

  describe('getFlagPosition', () => {
    it('should return correct position for known country codes', () => {
      expect(OlympicsUtils.getFlagPosition('USA')).toBeGreaterThanOrEqual(0);
      expect(OlympicsUtils.getFlagPosition('CHN')).toBeGreaterThanOrEqual(0);
      expect(OlympicsUtils.getFlagPosition('GBR')).toBeGreaterThanOrEqual(0);
    });

    it('should return 0 for unknown country codes', () => {
      expect(OlympicsUtils.getFlagPosition('UNKNOWN')).toBe(0);
      expect(OlympicsUtils.getFlagPosition('XYZ')).toBe(0);
    });

    it('should return different positions for different countries', () => {
      const usaPos = OlympicsUtils.getFlagPosition('USA');
      const chnPos = OlympicsUtils.getFlagPosition('CHN');
      const gbrPos = OlympicsUtils.getFlagPosition('GBR');

      expect(usaPos).not.toBe(chnPos);
      expect(chnPos).not.toBe(gbrPos);
      expect(usaPos).not.toBe(gbrPos);
    });
  });

  describe('getFlagEmoji', () => {
    it('should return correct emoji for known country codes', () => {
      expect(OlympicsUtils.getFlagEmoji('USA')).toBe('🇺🇸');
      expect(OlympicsUtils.getFlagEmoji('CHN')).toBe('🇨🇳');
      expect(OlympicsUtils.getFlagEmoji('GBR')).toBe('🇬🇧');
    });

    it('should return default emoji for unknown country codes', () => {
      expect(OlympicsUtils.getFlagEmoji('UNKNOWN')).toBe('🏳️');
      expect(OlympicsUtils.getFlagEmoji('XYZ')).toBe('🏳️');
    });
  });

  describe('validateSortParam', () => {
    it('should return valid sort types', () => {
      expect(OlympicsUtils.validateSortParam('gold')).toBe('gold');
      expect(OlympicsUtils.validateSortParam('silver')).toBe('silver');
      expect(OlympicsUtils.validateSortParam('bronze')).toBe('bronze');
      expect(OlympicsUtils.validateSortParam('total')).toBe('total');
    });

    it('should return default sort type for invalid parameters', () => {
      expect(OlympicsUtils.validateSortParam('invalid')).toBe('gold');
      expect(OlympicsUtils.validateSortParam(null)).toBe('gold');
      expect(OlympicsUtils.validateSortParam('')).toBe('gold');
    });
  });

  describe('updateSortInURL', () => {
    beforeEach(() => {
      // Mock window.location and history
      Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost:3000/medals',
        },
        writable: true,
      });

      Object.defineProperty(window, 'history', {
        value: {
          pushState: jest.fn(),
        },
        writable: true,
      });
    });

    it('should update URL with sort parameters', () => {
      const sortConfig: SortConfig = { type: 'silver', direction: 'asc' };
      const pushStateSpy = jest.spyOn(window.history, 'pushState');

      OlympicsUtils.updateSortInURL(sortConfig);

      expect(pushStateSpy).toHaveBeenCalledWith(
        {},
        '',
        expect.stringContaining('sort=silver')
      );
      expect(pushStateSpy).toHaveBeenCalledWith(
        {},
        '',
        expect.stringContaining('direction=asc')
      );
    });
  });

  describe('getSortDirectionFromURL', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost:3000/medals',
        },
        writable: true,
      });
    });

    it('should return asc when direction is asc', () => {
      Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost:3000/medals?direction=asc',
        },
        writable: true,
      });

      expect(OlympicsUtils.getSortDirectionFromURL()).toBe('asc');
    });

    it('should return desc for any other direction', () => {
      Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost:3000/medals?direction=desc',
        },
        writable: true,
      });

      expect(OlympicsUtils.getSortDirectionFromURL()).toBe('desc');
    });

    it('should return desc when no direction parameter', () => {
      Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost:3000/medals',
        },
        writable: true,
      });

      expect(OlympicsUtils.getSortDirectionFromURL()).toBe('desc');
    });
  });
}); 