import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, KIND } from "baseui/button";
import { EVENT_TYPE, requestBase } from "../utils";
import { useHistory } from "react-router-dom";
import { getEventDetailUrl } from "../utils";
import InfoPill from "./InfoPill";
import { Row, Col, Container } from "reactstrap";
import Spinner from "./Spinner";
import Table from "../shared/table";

const ListContainer = styled.div`
  margin-bottom: 50px;
`;

const EditEventTitle = styled.h2`
  margin: 50px 0;
`;

const NoEventsContainer = styled.div`
  padding: 15px 25px;
  margin-bottom: 50px;
  p {
    margin-bottom: 0;
  }
`;

const CreateEventButtonContainer = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const EventList = () => {
  const [managedEvents, setManagedEvents] = useState(null);
  const [managedEventsFilter, setFilterManagedEvents] = useState([]);
  const history = useHistory();
  const Eventbubble = ({ data }) => {
    return (
      <InfoPill inline>
        {data.eventType === EVENT_TYPE.group
          ? "Group"
          : data.eventType === EVENT_TYPE.regular
          ? "Public"
          : "Personal"}
      </InfoPill>
    );
  };

  const AttendanceMode = ({ data }) => {
    return (
      <InfoPill inline>
        {data.attendanceMode === "InPerson" ? "In Person" : data.attendanceMode}
      </InfoPill>
    );
  };
  const StatusMode = ({ data }) => {
    return (
      <InfoPill inline>{data.status === "A" ? "Published" : "Draft"}</InfoPill>
    );
  };

  const columns = [
    {
      field: "name",
    },
    {
      field: "likes",
    },
    {
      field: "eventType",
      cellRenderer: "eventCellRenderer",
    },
    {
      field: "attendanceMode",
      cellRenderer: "attendanceMode",
    },
    {
      field: "status",
      cellRenderer: "statusMode",
    },
  ];

  useEffect(() => {
    const getEvents = async () => {
      const eventsResponse = await requestBase.post(
        `/auth/event/event/search/getManagedEvents`,
        {},
        {}
      );
      const groupEventResponse = await requestBase.post(
        `/auth/grpEvent/event/search/getManagedEvents`,
        {},
        {}
      );
      const { data: events } = eventsResponse;
      const { data: groupEvents } = groupEventResponse;

      let allEvents = [];

      if (events.results && events.results.length > 0) {
        let regularMapped = events.results.map((e) => {
          return { ...e, eventType: "regular" };
        });
        allEvents = regularMapped;
      }

      if (groupEvents.results && groupEvents.results.length > 0) {
        let groupMapped = groupEvents.results.map((e) => {
          return { ...e, eventType: "group" };
        });
        allEvents = allEvents.concat(groupMapped);
      }
      setManagedEvents(allEvents);
    };
    getEvents();
  }, []);
  const [searchinItem, setSearchingItem] = useState("");
  return (
    <Container>
      <Row className="justify-content-between">
        <Col>
          <EditEventTitle>Your Events</EditEventTitle>
        </Col>

        <CreateEventButtonContainer>
          <input
            type="text"
            placeholder="Filter..."
            value={searchinItem}
            onChange={(e) => {
              if (e.target.value.length > 3) {
                const data = managedEvents.filter((item) => {
                  return item.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase());
                });

                setFilterManagedEvents(data);
              } else {
                setFilterManagedEvents([]);
              }
              setSearchingItem(e.target.value);
            }}
            style={{
              height: 40,
              borderRadius: 0,
              backgroundColor: "#F6F6F6",
              color: "#888",
              margin: "10px",
            }}
          />
          <Button
            size="default"
            onClick={() => {
              history.push("/newEvent");
            }}
          >
            Create new event
          </Button>
        </CreateEventButtonContainer>
      </Row>

      <Row>
        <Col>
          {managedEvents === null ? (
            <NoEventsContainer>
              <Spinner></Spinner>
            </NoEventsContainer>
          ) : managedEvents.length === 0 ? (
            <NoEventsContainer>
              <p>No events yet</p>
            </NoEventsContainer>
          ) : (
            <ListContainer>
              <Table
                editHandler={(data) => {
                  if (data.eventType == "group") {
                    history.push(`/groupEvent/${data.id}`);
                  } else {
                    history.push(`/event/${data.id}`);
                  }
                }}
                viewHandler={(data) => {
                  window.location.href = getEventDetailUrl(data);
                }}
                columns={columns}
                data={
                  managedEventsFilter.length === 0
                    ? managedEvents
                    : managedEventsFilter
                }
                pagination={true}
                paginationPageSize={15}
                height={700}
                frameworkComponents={{
                  eventCellRenderer: Eventbubble,
                  attendanceMode: AttendanceMode,
                  statusMode: StatusMode,
                }}
              ></Table>
            </ListContainer>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default EventList;
