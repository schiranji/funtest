import React from "react";
import { Line, Bar } from "react-chartjs-2";

import { summaryData } from "./summaryChartTemp";

const options = (title) => ({
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: title,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
});

const LineChart = (props) => {
  debugger;
  const data = {
    labels: props.data.map((item) => item.date),
    datasets: [
      {
        label: "# of Counts",
        data: props.data.map((item) => item.count),
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const ticketssummaryData = {
    labels: summaryData.data.ticketsSummary.map((item) => item.name),
    datasets: [
      {
        label: "# of Quantity",
        data: summaryData.data.ticketsSummary.map((item) => item.quantity),
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const boothsSummary = {
    labels: summaryData.data.boothsSummary.map((item) => item.name),
    datasets: [
      {
        label: "# of Quantity",
        data: summaryData.data.boothsSummary.map((item) => item.quantity),
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const sponsorsSummary = {
    labels: summaryData.data.sponsorsSummary.map((item) => item.name),
    datasets: [
      {
        label: "# of Quantity",
        data: summaryData.data.sponsorsSummary.map((item) => item.quantity),
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  return (
    <>
      <Line data={data} options={options("")} />
      <Bar data={ticketssummaryData} options={options("Tickets Summary")} />
      <Bar data={boothsSummary} options={options("Booths Summary")} />
      <Bar data={sponsorsSummary} options={options("Sponsors Summary")} />
    </>
  );
};

export default LineChart;
