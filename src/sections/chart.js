import React from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: [
    "10/12/2021",
    "12/12/2021",
    "13/12/2021",
    "14/12/2021",
    "15/12/2021",
    "16/12/2021",
  ],
  datasets: [
    {
      label: "# of Counts",
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.2)",
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const LineChart = (props) => {
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

  return (
    <>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
