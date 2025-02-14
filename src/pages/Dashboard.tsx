import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ScatterChart } from '../components/chart/scatterChart';
import { BarChart } from '../components/chart/barChart';
import { LineChart } from '../components/chart/LineChart';

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Dashboard: React.FC = () => {
  return (
    <div className='flex flex-col gap-5 pr-5'>
      <div className="bg-[#1E3E62] shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Histogram</h1>
        <ScatterChart />
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Histogram</h1>
        <BarChart />
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Histogram</h1>
        <LineChart />
      </div>
    </div>
  );
};
