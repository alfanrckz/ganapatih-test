import React, { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import { Chart, ChartOptions, registerables } from "chart.js";
import { useTaxiStore } from "../../store/useTaxiStore";

Chart.register(...registerables);

export const ScatterChart = () => {
  const {
    scatterData,
    scatterLoading,
    fetchScatterData,
    loadMoreScatter,
    scatterHasMore,
    scatterLimit,
  } = useTaxiStore();

  const [selectedOption, setSelectedOption] = useState("passenger_count");
  const [selectedLimit, setSelectedLimit] = useState(scatterLimit);

  useEffect(() => {
    fetchScatterData(true, 1, selectedLimit);
  }, [selectedLimit, fetchScatterData]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(e.target.value);
    setSelectedLimit(newLimit);
  };

  const chartData = {
    datasets: [
      {
        label:
          selectedOption === "passenger_count"
            ? "Passenger Count vs Trip Distance"
            : "Fare vs Trip Distance",
        data: scatterData.map((item) => ({
          x: item.trip_distance,
          y:
            selectedOption === "passenger_count"
              ? Number(item.passenger_count)
              : Number(item.fare_amount),
        })),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options: ChartOptions<"scatter"> = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "white" }, position: "top" },
      title: {
        display: true,
        text:
          selectedOption === "passenger_count"
            ? "Passenger Count vs Trip Distance"
            : "Fare vs Trip Distance",
        color: "white",
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Trip Distance", color: "white" },
        ticks: { color: "white" },
        grid: { color: "rgba(255, 255, 255, 0.3)" },
      },
      y: {
        title: {
          display: true,
          text:
            selectedOption === "passenger_count"
              ? "Passenger Count"
              : "Fare Amount",
          color: "white",
        },
        ticks: { color: "white" },
        grid: { color: "rgba(255, 255, 255, 0.3)" },
      },
    },
  };

  return (
    <div className="bg-[#0B192C] shadow-lg border-8 border-gray-400 rounded-lg p-6">
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <div>
          <label htmlFor="data-select" className="block text-white font-medium mb-2">
            Select Data
          </label>
          <select
            id="data-select"
            value={selectedOption}
            onChange={handleOptionChange}
            className="px-4 py-2 border border-white rounded-md text-white"
            style={{ backgroundColor: "transparent" }}
          >
            <option value="passenger_count" className="bg-[#0B192C]">Passenger Count</option>
            <option value="fare" className="bg-[#0B192C]">Fare</option>
          </select>
        </div>

        <div>
          <label htmlFor="limit-select" className="block text-white font-medium mb-2">
            Select Data Limit
          </label>
          <select
            id="limit-select"
            value={selectedLimit}
            onChange={handleLimitChange}
            className="px-4 py-2 border border-white rounded-md text-white"
            style={{ backgroundColor: "transparent" }}
          >
            <option value={10} className="bg-[#0B192C]">10</option>
            <option value={50} className="bg-[#0B192C]">50</option>
            <option value={100} className="bg-[#0B192C]">100</option>
            <option value={500} className="bg-[#0B192C]">500</option>
            <option value={1000} className="bg-[#0B192C]">1000</option>
          </select>
        </div>
      </div>

      <div className="h-[50vh] overflow-y-auto">
        <Scatter data={chartData} options={options} />
        {scatterLoading && <p className="text-white mt-4">Loading...</p>}
        {scatterHasMore && (
          <div className="text-center mt-4">
            <button
              onClick={loadMoreScatter}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

