import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = (props) => {
  const labels = Array.from({ length: 53 }, (_, index) => index + 1);
  const datasetData = props.data;

  const dengueData = labels.map((weekNumber) => {
    const weekData = datasetData.find(
      (item) => Number(item.week) === weekNumber
    );
    return weekData ? weekData.dengue_cases : 0;
  });

  const dhfData = labels.map((weekNumber) => {
    const weekData = datasetData.find(
      (item) => Number(item.week) === weekNumber
    );
    return weekData ? weekData.DHF_cases : 0;
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Dengue Cases Chart",
        data: dengueData,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "DHF Cases Chart",
        data: dhfData,
        fill: true,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: datasetData.length
          ? `Dengue in ${datasetData[0].year}`
          : "Dengue Cases",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Weeks",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Cases",
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
