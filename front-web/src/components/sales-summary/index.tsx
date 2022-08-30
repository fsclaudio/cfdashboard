import React from 'react';
import SalesSummaryCard from './sales-summary-card';
import { ReactComponent as AvataIcon } from '../../assets/avatar-icon.svg';
import { ReactComponent as BarChartIcon } from '../../assets/bar-chart-icon.svg';
import { ReactComponent as DoneIcon } from '../../assets/done-icon.svg';
import { ReactComponent as SyncIcon } from '../../assets/sync-icon.svg';
import './styles.css';

function SalesSummary() {
  return (
    <div className="sales-sammary-container">
      <SalesSummaryCard value={460} label={'Media'} icon={<DoneIcon />} />
      <SalesSummaryCard value={270} label={'Quantidade'} icon={<SyncIcon />} />
      <SalesSummaryCard value={350} label={'Minima'} icon={<BarChartIcon />} />
      <SalesSummaryCard value={630} label={'Maxima'} icon={<AvataIcon />} />
    </div>
  );
}

export default SalesSummary;
