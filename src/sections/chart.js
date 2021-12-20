import React from "react";
import { Line } from "react-chartjs-2";
import Table from "../shared/table";
import useCall from "../shared/useCall";
import { requestBase } from "../utils";

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
  },
];

const LineChart = (props) => {
  const ticketSaleSummary = useCall(
    () =>
      requestBase.post(
        `auth/event/eventManagement/view/ticketSaleSummary/${props.eventData.uid}`,
        {}
      ),
    [],
    []
  );

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
  debugger;
  return (
    <>
      <Line data={data} options={options("")} />

      {props.ticketSales &&
        props.ticketSales.data &&
        props.ticketSales.data.data && (
          <>
            <Table
              title={"Tickets Summary"}
              columns={columns}
              data={props.ticketSales.data.data.ticketsSummary}
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
              data={props.ticketSales.data.data?.boothsSummary}
              pagination={true}
              paginationPageSize={5}
              ActionRow="FIRST"
              flex={1.5}
            ></Table>
            <Table
              title={"Sponsors Summary"}
              isNoAction={true}
              columns={columns}
              data={props.ticketSales.data?.data?.sponsorsSummary}
              pagination={true}
              paginationPageSize={5}
              ActionRow="FIRST"
              flex={1.5}
            ></Table>
          </>
        )}
    </>
  );
};

export default LineChart;
