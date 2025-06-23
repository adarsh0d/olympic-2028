import type { NextApiRequest, NextApiResponse } from 'next';
import { getMedalData } from '../../features/service';
import { CountryMedals } from '../../features/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CountryMedals[] | { error: string }>
) {
  try {
    const medals = await getMedalData();
    res.status(200).json(medals);
  } catch (e) {
    res.status(500).json({ error: 'Unable to fetch medal data' });
  }
}
