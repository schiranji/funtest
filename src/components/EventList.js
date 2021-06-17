import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { ListItem, ListItemLabel } from "baseui/list";
import { Button, KIND } from 'baseui/button'
import { StyledSpinnerNext } from "baseui/spinner"
import {EVENT_TYPE, requestBase} from '../utils';
import { useHistory } from 'react-router-dom';
import { getEventDetailUrl } from '../utils'
import InfoPill from './InfoPill';
import { Table, Row, Col, Container } from 'reactstrap';
import Spinner from './Spinner';
import { Pagination } from "baseui/pagination";

const ListContainer = styled.div`
  margin-bottom: 50px;
`

const EditEventTitle = styled.h2`
  margin: 50px 0;
`

const ManageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const NoEventsContainer = styled.div`
  padding: 15px 25px;
  margin-bottom: 50px;

  p {
    margin-bottom: 0;
  }
`

const EventDetailLink = styled.a`
  text-decoration: none;
  
  &:hover {
    text-decoration: none;
  }
`

const TableHeader = styled.thead`
  background-color: #4f4457;
  color: #f8f8f8;
  font-family: Quicksand, sans-serif;
  border-radius: 5px;
`

const TableBody = styled.tbody`
  td, th {
    vertical-align: middle;
    padding: 1rem;
  }

  .event-name, .event-type, .event-likes {
    white-space: nowrap;
    padding-right: 50px;
  }
  
  .event-type {
    white-space: nowrap;
    padding-right: 50px;
  }
  
  .event-status {
    width: 100%;
  }
  
  .event-attendance-mode {
    white-space: nowrap;
    padding-right: 50px;  
  }

  .event-actions {
    white-space: nowrap;
  }
`

const CreateEventButtonContainer = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const EventList = () => {
  const [managedEvents, setManagedEvents] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const history = useHistory();

  useEffect(() => {
    const getEvents = async () => {
      const eventsResponse = await requestBase.post(`/auth/event/event/search/getManagedEvents`, {}, {})
      const groupEventResponse = await requestBase.post(`/auth/grpEvent/event/search/getManagedEvents`, {}, {})
      const { data: events } = eventsResponse;
      const { data: groupEvents } = groupEventResponse;

      let allEvents = []

      if (events.results && events.results.length > 0) {
        let regularMapped = events.results.map((e) => {
          return {...e, eventType: "regular"}
        });
        allEvents = regularMapped;
      } 
      
      if (groupEvents.results && groupEvents.results.length > 0) {
        let groupMapped = groupEvents.results.map((e) => {
          return {...e, eventType: "group"}
        });
        allEvents = allEvents.concat(groupMapped)
      } 

      let chunked = []
      var i,j,temparray,chunk = 10;
      for (i = 0, j = allEvents.length; i < j; i += chunk) {
          chunked.push(allEvents.slice(i,i+chunk));
      }
      console.log(chunked)
      setManagedEvents(chunked);
    }

    getEvents();
  }, [])

  return (
    <Container>
      <Row className="justify-content-between">
        <Col>
          <EditEventTitle>Your Events</EditEventTitle>
        </Col>
        <CreateEventButtonContainer>
          <Button
            size="default"
            onClick={() => {
              history.push("/newEvent")
            }}>
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
              <Table>
                <TableHeader>
                  <tr>
                    <th>Event name</th>
                    <th>Likes</th>
                    <th>Event type</th>
                    <th>Locality</th>
                    <th>Event status</th>
                    <th className="text-right pr-3">Actions</th>
                  </tr>
                </TableHeader>
                <TableBody>
                  {managedEvents[currentPage - 1].map((event) => (
                    <tr key={event.id}>
                      <td className="event-name">
                        {event.name}
                      </td>
                      <td className="event-likes">
                        {event.likes}
                      </td>
                      <td className="event-type">
                        <InfoPill inline>
                          {event.eventType === EVENT_TYPE.group ? "Group" 
                            : event.eventType === EVENT_TYPE.regular ? "Public" : "Personal" }
                        </InfoPill>
                      </td>
                      <td className="event-attendance-mode">
                        <InfoPill inline>
                          {event.attendanceMode === "InPerson" ? "In Person" : event.attendanceMode}
                        </InfoPill>
                      </td>
                      <td className="event-status">
                        <InfoPill inline>
                          {event.status === "A" ? "Published" : "Draft"}
                        </InfoPill>
                      </td>
                      <td className="event-actions">
                        <>
                          <Button 
                            size="compact"
                            kind={KIND.minimal} 
                            onClick={() => {
                              if (event.eventType == "group") {
                                history.push(`/groupEvent/${event.id}`)
                              } else {
                                history.push(`/event/${event.id}`)
                              }
                            }}>
                            Edit
                          </Button>
                          <EventDetailLink target="_blank" href={getEventDetailUrl(event)}>
                            <Button size="compact">
                              View
                            </Button>
                          </EventDetailLink>
                        </>
                      </td>
                    </tr>
                  ))}
                </TableBody>
              </Table>
              
              {managedEvents.length > 1 && (
                <Pagination
                  numPages={managedEvents.length}
                  currentPage={currentPage}
                  onPageChange={({ nextPage }) => {
                    setCurrentPage(
                      Math.min(Math.max(nextPage, 1), managedEvents.length)
                    );
                  }}
                  overrides={{
                    NextButton: {
                      style: ({ $theme }) => ({
                        backgroundColor: "#eaeaea",
                        ':hover:enabled': {
                          backgroundColor: $theme.colors.primary600,
                          color: "#eaeaea"
                        },
                      })
                    },
                    PrevButton: {
                      style: ({ $theme }) => ({
                        backgroundColor: "#eaeaea",
                        ':hover:enabled': {
                          backgroundColor: $theme.colors.primary600,
                          color: "#eaeaea"
                        },
                      })
                    },
                    Select: {
                      props: {
                        overrides: {
                          Root: {
                            style: ({ $theme }) => ({
                              backgroundColor: $theme.colors.warning600
                            })
                          }
                        }
                      }
                    }
                  }}
                />
              )}
            </ListContainer>
          )}
        </Col>
      </Row>
      
    </Container>
  )
}

export default EventList;