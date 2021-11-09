import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { summaryData } from "./summaryChartTemp";
import Table from "../shared/table";

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


const columns = [
  {
    field: "name",
    headerName: "Name",
  },
  {
    field: "quantity",
    headerName: "Quantity",
  },

  {
    field: "lineItemTotal",
    headerName: "Total",
  }
];

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


      <Table
      title={"Tickets Summary"}
        columns={columns}
        data={ summaryData.data.ticketsSummary}
        pagination={true}
        paginationPageSize={5}
        ActionRow="FIRST"
        flex={1.5}
        isNoAction={true}
      ></Table>
      <Table
      title={"Booths Summary"}
         isNoAction={true}
        columns={columns}
        data={summaryData.data.boothsSummary}
        pagination={true}
        paginationPageSize={5}
        ActionRow="FIRST"
        flex={1.5}
      ></Table>
      <Table
      title={"Sponsors Summary"}
         isNoAction={true}
        columns={columns}
        data={summaryData.data.sponsorsSummary}
        pagination={true}
        paginationPageSize={5}
        ActionRow="FIRST"
        flex={1.5}
      ></Table>
    </>
  );
};

export default LineChart;
