import { Chart, ChartOptions, registerables } from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { baseUrl } from "../../api/api";

Chart.register(...registerables);

interface MonthlyData {
  month: string;
  totalTrips: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

export const BarChart = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseUrl.get("/taxi/monthly-trip-count");
  
        const data: MonthlyData[] = response.data;
  
        setChartData({
          labels: data.map((item: MonthlyData) => item.month),
          datasets: [
            {
              label: "Total Trips",
              data: data.map((item: MonthlyData) => item.totalTrips),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(0, 0, 0, 0.1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to fetch data");
        setChartData(null);
      }
    };
  
    fetchData();
  }, []);
  


  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: true, text: "Monthly Trip Count", font: { size: 18 }, color: "white" },
    },
    scales: {
      x: { title: { display: true, text: "Months", color: "white" } },
      y: { title: { display: true, text: "Total Trips", color: "white" }, beginAtZero: true },
    },
  };

  return (
    <div className="bg-[#0B192C] shadow-lg border-8 border-gray-400 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-white">Monthly Taxi Trips</h2>
      {error ? <p className="text-red-500">{error}</p> : chartData ? <Bar data={chartData} options={options} /> : <p>Loading...</p>}
    </div>
  );
};
