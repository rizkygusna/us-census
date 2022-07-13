import React from 'react';
import Chart from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ chartData }) => {
  return <Pie data={chartData}></Pie>;
};

export default PieChart;
