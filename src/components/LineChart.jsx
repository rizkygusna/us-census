import React from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const LineChart = ({ chartData }) => {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'US Population Per Year',
        color: '#3182CE',
        font: {
          size: 24,
        },
      },
    },
  };
  return <Line data={chartData} options={options} />;
};

export default LineChart;
