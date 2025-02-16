import { Chart, ChartOptions, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { useTaxiStore } from "../../store/useTaxiStore";
import { useEffect, useState, useMemo } from "react";
import moment from "moment";

Chart.register(...registerables);

export const LineChart = () => {
  const { lineChartData, lineChartLoading, lineChartLimit, fetchLineChartData } = useTaxiStore();

  const [selectedLimit, setSelectedLimit] = useState(lineChartLimit);
  const [dateType, setDateType] = useState<"pickup" | "dropoff">("pickup"); // Pilihan default "pickup"

  useEffect(() => {
    fetchLineChartData(true, 1, selectedLimit);
  }, [selectedLimit, fetchLineChartData]);

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newLimit = Number(e.target.value);
      setSelectedLimit(newLimit);
    };

  const formattedData = useMemo(() => {
    if (!lineChartData || lineChartData.length === 0) return [];

    return lineChartData.map((item: any) => ({
      date: moment(dateType === "pickup" ? item.pickup_datetime : item.dropoff_datetime).format("YYYY-MM-DD"),
      fare: parseFloat(item.fare_amount),
    }));
  }, [lineChartData, dateType]); 

  const chartData = useMemo(() => {
    return {
      labels: formattedData.map((item) => item.date),
      datasets: [
        {
          label: "Fare Amount ($)",
          data: formattedData.map((item) => item.fare), 
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 2,
          tension: 0.3,
          pointBackgroundColor: "rgba(75, 192, 192, 1)",
          pointRadius: 5,
        },
      ],
    };
  }, [formattedData]); 

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Fare Amount Over Time",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: dateType === "pickup" ? "Pickup Date" : "Dropoff Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Fare Amount ($)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-[#0B192C] shadow-lg border-8 border-gray-400 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-white">Fare Amount Trend</h2>

      <div className="mb-4 flex flex-col sm:flex-row gap-4">
      <div>
      <label htmlFor="data-select" className="block text-white font-medium mb-2">
            Select Date Type
          </label>
        <select
          value={dateType}
          onChange={(e) => setDateType(e.target.value as "pickup" | "dropoff")}
          className="p-2 rounded border border-gray-300 bg-transparent text-white"
        >
          <option value="pickup" className="bg-[#0B192C]">Pickup Date</option>
          <option value="dropoff" className="bg-[#0B192C]">Dropoff Date</option>
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
            style={{ backgroundColor: "bg-[#0B192C]" }}
          >
            <option value={10} className="bg-[#0B192C]">10</option>
            <option value={50} className="bg-[#0B192C]">50</option>
            <option value={100}className="bg-[#0B192C]">100</option>
            <option value={500}className="bg-[#0B192C]">500</option>
            <option value={1000}className="bg-[#0B192C]">1000</option>
          </select>
        </div>
      </div>


      {/* Chart */}
      <Line data={chartData} options={options} />
      {lineChartLoading && <p className="text-white mt-4">Loading...</p>}
    </div>
  );
};
