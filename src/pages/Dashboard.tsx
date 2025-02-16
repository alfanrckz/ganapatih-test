import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React from 'react';
import { BarChart } from '../components/chart/BarChart';
import { LineChart } from '../components/chart/LineChart';
import { ScatterChart } from '../components/chart/ScatterChart';

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
        <h1 className="text-2xl font-semibold text-white mb-4">Scatter Chart</h1>
        <ScatterChart />
      </div>

      <div className="bg-[#1E3E62] shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-white mb-4">Bar Chart</h1>
        <BarChart />
      </div>
      <div className="bg-[#1E3E62] shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-white mb-4">Line Graph</h1>
        <LineChart />
      </div>
    </div>
  );
};
