'use client';

import { useTranslations } from 'next-intl';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@workspace/ui/components/table';
import { MedalData, SortConfig } from '../types';
import { Flag } from './Flag';

interface MedalTableProps {
  data: MedalData[];
  sortConfig: SortConfig;
  onSort: (type: keyof Pick<MedalData, 'gold' | 'silver' | 'bronze' | 'total'>) => void;
}

export function MedalTable({ data, sortConfig, onSort }: MedalTableProps) {
  const t = useTranslations('medals');

  const handleSort = (type: keyof Pick<MedalData, 'gold' | 'silver' | 'bronze' | 'total'>) => {
      onSort(type);
  };

  const getSortIndicator = (type: keyof Pick<MedalData, 'gold' | 'silver' | 'bronze' | 'total'>) => {
    if (sortConfig.type === type) {
      return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  const getSortableHeader = (type: keyof Pick<MedalData, 'gold' | 'silver' | 'bronze' | 'total'>, label: string) => {
   
    return (
      <button
        onClick={() => handleSort(type)}
        className="flex items-center gap-1 hover:text-blue-600 transition-colors font-medium"
        aria-label={t('sortBy', { type: label.toLowerCase() })}
      >
        {label}
        <span className="text-sm">{getSortIndicator(type)}</span>
      </button>
    );
  };

  if (!data.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        {t('noData')}
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-16 text-center font-semibold">
              {t('rank')}
            </TableHead>
            <TableHead className="font-semibold">
              {t('country')}
            </TableHead>
            <TableHead className="text-center font-semibold">
              {getSortableHeader('gold', t('gold'))}
            </TableHead>
            <TableHead className="text-center font-semibold">
              {getSortableHeader('silver', t('silver'))}
            </TableHead>
            <TableHead className="text-center font-semibold">
              {getSortableHeader('bronze', t('bronze'))}
            </TableHead>
            <TableHead className="text-center font-semibold">
              {getSortableHeader('total', t('total'))}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((medal, index) => (
            <TableRow key={medal.code} className="hover:bg-gray-50 transition-colors">
              <TableCell className="text-center font-medium text-gray-900">
                {index + 1}
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Flag code={medal.code} alt={`${medal.code} flag`} />
                  <span className="text-gray-900">{medal.code}</span>
                </div>
              </TableCell>
              <TableCell className="text-center font-medium text-yellow-600">
                {medal.gold}
              </TableCell>
              <TableCell className="text-center font-medium text-gray-500">
                {medal.silver}
              </TableCell>
              <TableCell className="text-center font-medium text-amber-700">
                {medal.bronze}
              </TableCell>
              <TableCell className="text-center font-bold text-gray-900">
                {medal.total}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 