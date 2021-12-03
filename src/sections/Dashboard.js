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
import { EVENT_TYPE } from "../utils";

const DashboardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Dashboard = ({ eventData }) => {
  const onGridReady = (params) => {
    params.api.sizeColumnsToFit();
  };
  const { id: eventId } = eventData;
  const [refresh, setRefresh] = useState(false);
  const eventType =
    eventData.eventType === EVENT_TYPE.group ? "grpEvent" : "event";

  const dailyViews = useCall(
    () =>
      requestBase.post(
        `/auth/${eventType}/eventManagement/view/dailyViews/${eventData.uid}`,
        {}
      ),
    [eventId, refresh],
    []
  );

  const ticketSales = useCall(
    () =>
      requestBase.post(
        `/auth/${eventType}/eventManagement/view/ticketSaleSummary/${eventId}`,
        {}
      ),
    [eventId, refresh],
    []
  );

  const rsvpCount = useCall(
    () =>
      requestBase.post(
        `/auth/${eventType}/eventManagement/view/rsvpCounts/${eventId}`,
        {}
      ),
    [eventId, refresh],
    []
  );

  const columns = [
    {
      field: "invitedCount",
      headerName: "Invited",
    },
    {
      field: "acceptCount",
      headerName: "Accepted",
    },

    {
      field: "adultCount",
      headerName: "Adult Count",
    },
    {
      field: "kidsCount",
      headerName: "Kids Count",
    },

    {
      field: "declineCount",
      headerName: "Declined",
    },
    {
      field: "tentativeCount",
      headerName: "Tentative",
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
          <Chart
            ticketSales={ticketSales}
            data={dailyViews.data.results}
          ></Chart>
        )}
        {!rsvpCount.isLoading && (
          <Table
            height={100}
            columns={columns}
            data={[rsvpCount.data.data]}
            viewDelete={true}
            onGridReady={onGridReady}
            isNoAction={true}
          ></Table>
        )}
      </SectionBody>
    </>
  );
};

export default Dashboard;
