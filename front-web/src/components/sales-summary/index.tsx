import React, { useEffect, useMemo, useState } from 'react';
import SalesSummaryCard from './sales-summary-card';
import { ReactComponent as AvataIcon } from '../../assets/avatar-icon.svg';
import { ReactComponent as BarChartIcon } from '../../assets/bar-chart-icon.svg';
import { ReactComponent as DoneIcon } from '../../assets/done-icon.svg';
import { ReactComponent as SyncIcon } from '../../assets/sync-icon.svg';
import './styles.css';
import { FilterData, SalesSummaryData } from '../../types';
import { buildFilterParams, makeRequest } from '../../utils/request';

type Props = {
  filterData?: FilterData;
};

const initialSummary = {
  avg: 0,
  count: 0,
  max: 0,
  min: 0
};

function SalesSummary({ filterData }: Props) {
  const [summary, setSummary] = useState<SalesSummaryData>(initialSummary);

  const params = useMemo(() => buildFilterParams(filterData), [filterData]);
  useEffect(() => {
    makeRequest
      .get<SalesSummaryData>(`/sales/summary`, { params })
      .then((response) => {
        setSummary(response.data);
      })
      .catch(() => {
        console.log('erro to fetch salse by date');
      });
  }, [params]);
  return (
    <div className="sales-sammary-container">
      <SalesSummaryCard value={summary?.avg?.toFixed(2)} label={'Media'} icon={<DoneIcon />} />
      <SalesSummaryCard value={summary?.count} label={'Quantidade'} icon={<SyncIcon />} />
      <SalesSummaryCard value={summary?.min} label={'Minima'} icon={<BarChartIcon />} />
      <SalesSummaryCard value={summary?.max} label={'Maxima'} icon={<AvataIcon />} />
    </div>
  );
}

export default SalesSummary;
