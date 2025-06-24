import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Read medals data from the medals.json file in the data directory
    const dataPath = path.join(process.cwd(), 'app', '(medals)', 'medals', 'data', 'medals.json');
    const data = await fs.readFile(dataPath, 'utf8');
    const medalsData = JSON.parse(data);
    // Calculate total medals for each country
    const processedData = medalsData.map((country: any) => ({
      ...country,
      total: country.gold + country.silver + country.bronze
    }));
    
    return NextResponse.json(processedData);
  } catch (error) {
    console.error('Error reading medals data:', error);
    return NextResponse.json(
      { error: 'Failed to load medals data' },
      { status: 500 }
    );
  }
} 