import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SectionBody from "../components/SectionBody";
import SectionHeader from "../components/SectionHeader";
import { Row, Col } from "reactstrap";
import SubSection from "../components/Subsection";
import { Button } from "baseui/button";
import { requestBase } from "../utils";
import Chart from "./chart";
import useCall from "../shared/useCall";
import Table from "../shared/table";

const DashboardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Dashboard = ({ eventData }) => {
  const { id: eventId } = eventData;
  const [refresh, setRefresh] = useState(false);

  const dailyViews = useCall(
    () =>
      requestBase.post(
        `/auth/event/eventManagement/view/dailyViews/${eventId}`,
        {}
      ),
    [eventId, refresh],
    []
  );

  const ticketSales = useCall(
    () =>
      requestBase.post(
        `/auth/event/eventManagement/view/ticketSaleSummary/${eventId}`,
        {}
      ),
    [eventId, refresh],
    []
  );

  const columns = [
    {
      field: "signupName",
      headerName: "Name",
      cellRenderer: (props) =>
        props.data.signupName ? props.data.signupName : "Available",
    },
    {
      field: "emailAdddress",
      headerName: "Email",
      cellRenderer: (props) =>
        props.data.emailAdddress ? props.data.emailAdddress : "Available",
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
      cellRenderer: (props) =>
        props.data.emailAdddress ? props.data.emailAdddress : "Available",
    },
  ];

  return (
    <>
      <SectionHeader>
        <DashboardHeader>
          <h1>Event Dashboard</h1>
          <Button
            isLoading={dailyViews.isLoading}
            onClick={async () => {
              setRefresh(!refresh);
            }}
          >
            Refresh stats
          </Button>
        </DashboardHeader>
      </SectionHeader>
      <SectionBody>
        <SubSection>
          <p>All the latest stats for your event</p>
        </SubSection>
        {!dailyViews.isLoading && dailyViews.data.results.length > 0 && (
          <Chart data={dailyViews.data.results}></Chart>
        )}
        <Table
          columns={columns}
          data={ticketSales.data}
          pagination={true}
          viewDelete={true}
        ></Table>
      </SectionBody>
    </>
  );
};

export default Dashboard;
