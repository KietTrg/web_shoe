import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import Chart from "chart.js/auto";
const BarChart = ({ chardata, op }) => {
  return <Line options={op} data={chardata}></Line>;
};

export default BarChart;
