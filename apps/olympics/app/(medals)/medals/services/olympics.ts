import { MedalData } from '../types';
import { getCurrentEnvironment } from '../../../../config/environments';

export class OlympicsService {
  private static getApiUrl(endpoint: string): string {
    const env = getCurrentEnvironment();
    return `${env.apiBaseUrl}${endpoint}`;
  }

  static async fetchMedalsData(): Promise<MedalData[]> {
    try {
      const env = getCurrentEnvironment();
      const url = env.medalsApiUrl;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: env.cache.enabled ? 'default' : 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch medals data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching medals data:', error);
      throw new Error('Failed to fetch medals data');
    }
  }

  static async fetchFlagsData(): Promise<Record<string, string>> {
    try {
      const env = getCurrentEnvironment();
      const url = env.flagsApiUrl;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: env.cache.enabled ? 'default' : 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch flags data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching flags data:', error);
      throw new Error('Failed to fetch flags data');
    }
  }

  static async exportMedalsData(format: 'csv' | 'json' = 'json'): Promise<string> {
    try {
      const medalsData = await this.fetchMedalsData();
      
      if (format === 'csv') {
        const headers = ['Rank', 'Country', 'Gold', 'Silver', 'Bronze', 'Total'];
        const csvContent = [
          headers.join(','),
          ...medalsData.map((medal, index) => 
            `${index + 1},${medal.country},${medal.gold},${medal.silver},${medal.bronze},${medal.total}`
          )
        ].join('\n');
        
        return csvContent;
      }
      
      return JSON.stringify(medalsData, null, 2);
    } catch (error) {
      console.error('Error exporting medals data:', error);
      throw new Error('Failed to export medals data');
    }
  }
} 