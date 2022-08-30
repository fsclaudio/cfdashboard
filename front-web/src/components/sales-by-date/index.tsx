import React from 'react';
import './styles.css';
import ReactApexChart from 'react-apexcharts';
import { chartOptions } from './helpers';

const initialData = [
  {
    x: '2022-01-02',
    y: 54
  },
  {
    x: '2022-02-01',
    y: 44
  },
  {
    x: '2022-03-05',
    y: 54
  },
  {
    x: '2022-04-02',
    y: 84
  },
  {
    x: '2022-05-05',
    y: 54
  },
  {
    x: '2022-06-02',
    y: 54
  }
];
function SalesByDate() {
  return (
    <div className="sales-by-date-container base-card">
      <div>
        <h4 className="sales-by-date-title">Evolução das Vendas</h4>
        <span className="sales-by-date-period"> 01/01/2020 a 31/01/2022</span>
      </div>
      <div className="sales-by-date-data">
        <div className="sales-by-date-quantity-container">
          <h2 className="sales-by-date-quantity">469.988,00</h2>
          <span className="sales-by-date-quantity-label"> Vendas no período </span>
          <span className="sales-by-date-quantity-description">
            O gráfico mostra as vendas em todas as lojas
          </span>
        </div>
        <div className="sales-bydate-chart">
          <ReactApexChart
            options={chartOptions}
            series={[{ name: 'Vendas', data: initialData }]}
            type="bar"
            height={240}
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}

export default SalesByDate;
