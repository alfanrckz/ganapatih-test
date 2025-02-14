import { Chart, ChartOptions, registerables } from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(...registerables);

export const LineChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [3000, 4500, 4000, 5000, 6000, 7500],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.3, 
        pointBackgroundColor: "rgba(75, 192, 192, 1)", 
        pointRadius: 5, 
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Sales Trend",
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
          text: "Sales ($)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Line Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
};

