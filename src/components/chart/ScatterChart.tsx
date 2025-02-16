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
          <div className="flex items-center gap-2">
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
          {scatterLoading && (
            <div role="status" className="flex justify-center items-center ml-4">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
          </div>
        </div>
      </div>

      <div className="h-[50vh] overflow-y-auto">
        <Scatter data={chartData} options={options} />
        {scatterLoading && <p className="text-white mt-4">Loading...</p>}
      </div>
    </div>
  );
};

