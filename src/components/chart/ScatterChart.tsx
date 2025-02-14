import React, { useState } from "react";
import { Scatter } from "react-chartjs-2";
import { Chart, ChartOptions, registerables } from "chart.js";

Chart.register(...registerables);

export const ScatterChart = () => {
  const [selectedOption, setSelectedOption] = useState("passenger_count");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const data = {
    datasets: [
      {
        label: "Passengers vs Trip Distance",
        data: [
          { x: 1, y: 2.5 },
          { x: 2, y: 3.2 },
          { x: 3, y: 4.8 },
          { x: 4, y: 5.1 },
          { x: 5, y: 7.4 },
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options: ChartOptions<"scatter"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Passenger Count vs Trip Distance",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Passenger Count",
        },
      },
      y: {
        title: {
          display: true,
          text: "Trip Distance (miles)",
        },
      },
    },
  };

  return (
    <div className="bg-[#0B192C] shadow-lg border border-e-slate-100 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-white">Scatter Chart</h2>

      <div className="mb-4">
        <label htmlFor="data-select" className="block text-white font-medium mb-2">
          Pilih Data:
        </label>
        <select
          id="data-select"
          value={selectedOption}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="passenger_count">Passenger Count</option>
          <option value="pickup_datetime">Pickup Date Time</option>
          <option value="dropoff_datetime">Dropoff Date Time</option>
        </select>
      </div>

    <div className="h-[50vh] overflow-y-auto">
      <Scatter data={data} options={options} />
    </div>
    </div>
  );
};
