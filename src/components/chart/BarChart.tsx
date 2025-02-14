import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, ChartOptions, registerables } from "chart.js";

Chart.register(...registerables);

export const BarChart = () => {
  const [selectedOption, setSelectedOption] = useState("passenger_count");
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedOption(event.target.value);
    };
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Revenue (in USD)",
        data: [5000, 7000, 8000, 6000, 9000, 10000],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Revenue",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Revenue ($)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Bar Chart</h2>
      <div className="mb-4">
        <label htmlFor="data-select" className="block text-gray-700 font-medium mb-2">
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
      <Bar data={data} options={options} />
    </div>
  );
};

