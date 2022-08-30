import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Filter from './components/filter';
import Header from './components/header';
import PieChartCard from './components/pie-chart-card';
import SalesByDate from './components/sales-by-date';
import SalesSummary from './components/sales-summary';
import SalesTable from './components/sales-table';
import { buildSalesByPaymentChart, buildSalesByStoreChart } from './helpers';
import { FilterData, PieChartConfig, SalesByPaymentMethod, SalesStoreData } from './types';
import { buildFilterParams, makeRequest } from './utils/request';

function App() {
  const [filterData, setFilterData] = useState<FilterData>();
  const [salesStoreData, setSalesStoreData] = useState<PieChartConfig>();
  const [salesPaymentMethodData, setSalesPaymentMethodData] = useState<PieChartConfig>();
  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    makeRequest
      .get<SalesStoreData[]>(`/sales/by-store`, { params })
      .then((response) => {
        const newSalesStoreData = buildSalesByStoreChart(response.data);
        setSalesStoreData(newSalesStoreData);
        console.log(salesStoreData);
      })
      .catch(() => {
        console.log('erro to fetch salse by store');
      });
  }, [params]);

  useEffect(() => {
    makeRequest
      .get<SalesByPaymentMethod[]>(`/sales/by-payment-method`, { params })
      .then((response) => {
        const newSalesPaymentMethod = buildSalesByPaymentChart(response.data);
        setSalesPaymentMethodData(newSalesPaymentMethod);
        console.log(salesStoreData);
      })
      .catch(() => {
        console.log('erro to fetch salse by payment method');
      });
  }, [params]);

  const onFilterChange = (filter: FilterData) => {
    setFilterData(filter);
  };
  return (
    <>
      <Header />
      <div className="app-container">
        <Filter onFilterChange={onFilterChange} />
        <SalesByDate filterData={filterData} />
        <div className="sales-overview-container">
          <SalesSummary filterData={filterData} />
          <PieChartCard
            name="Lojas"
            labels={salesStoreData?.labels}
            series={salesStoreData?.series}
          />
          <PieChartCard
            name="Pagamentos"
            labels={salesPaymentMethodData?.labels}
            series={salesPaymentMethodData?.series}
          />
        </div>
        <SalesTable filterData={filterData} />
      </div>
    </>
  );
}

export default App;
