import fs from 'fs';
import path from 'path';
import { CountryMedals } from './types';

export async function getMedalData(): Promise<CountryMedals[]> {
  const filePath = path.join(process.cwd(), 'apps/medals/data/medals.json');

  try {
    const fileContents = await fs.promises.readFile(filePath, 'utf-8');
    const data: CountryMedals[] = JSON.parse(fileContents);
    return data;
  } catch (error) {
    console.error("Failed to load medal data:", error);
    throw new Error('Unable to fetch medal data');
  }
}
