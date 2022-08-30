import React, { useEffect, useMemo, useState } from 'react';
import './styles.css';
import ReactApexChart from 'react-apexcharts';
import { buildChartSeries, chartOptions, sumSalesByDate } from './helpers';
import { buildFilterParams, makeRequest } from '../../utils/request';
import { ChartSerieData, FilterData, SalesByDate } from '../../types';
import { formatDate, formatPrice } from '../../utils/formatters';

type Props = {
  filterData?: FilterData;
};
function SalesByDateComponent({ filterData }: Props) {
  const [chartSeries, setChartSeries] = useState<ChartSerieData[]>([]);
  const [totalSum, setTotalSum] = useState(0);

  const params = useMemo(() => buildFilterParams(filterData), [filterData]);
  useEffect(() => {
    makeRequest
      .get<SalesByDate[]>(`/sales/by-date`, { params })
      .then((response) => {
        const newChartSeries = buildChartSeries(response.data);
        setChartSeries(newChartSeries);
        const newTotlaSum = sumSalesByDate(response.data);
        setTotalSum(newTotlaSum);
      })
      .catch(() => {
        console.log('erro to fetch salse by date');
      });
  }, [params]);
  return (
    <div className="sales-by-date-container base-card">
      <div>
        <h4 className="sales-by-date-title">Evolução das Vendas</h4>
        {filterData?.dates && (
          <span className="sales-by-date-period">
            {formatDate(filterData?.dates?.[0])} até {formatDate(filterData?.dates?.[1])}
          </span>
        )}
      </div>
      <div className="sales-by-date-data">
        <div className="sales-by-date-quantity-container">
          <h2 className="sales-by-date-quantity">{formatPrice(totalSum)}</h2>
          <span className="sales-by-date-quantity-label"> Vendas no período </span>
          <span className="sales-by-date-quantity-description">
            O gráfico mostra as vendas em todas as lojas
          </span>
        </div>
        <div className="sales-bydate-chart">
          <ReactApexChart
            options={chartOptions}
            series={[{ name: 'Vendas', data: chartSeries }]}
            type="bar"
            height={240}
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}

export default SalesByDateComponent;
