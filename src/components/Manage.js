import React, { useState, useEffect } from "react";
import Basic from "../sections/Basic";
import Guests from "../sections/Guests";
import Ticketing from "../sections/Ticketing";
import Accomodations from "../sections/Accomodations";
import Media from "../sections/Media";
import Participants from "../sections/Participants";
import Sponsors from "../sections/Sponsors";
import Contacts from "../sections/Contacts";
import Dashboard from "../sections/Dashboard";
import Schedule from "../sections/Schedule";
import Tasks from "../sections/Tasks";
import Team from "../sections/Team";
import Potluck from "../sections/Potluck";
import Registry from "../sections/Registry";
import TimeSlots from "../sections/TimeSlots";

import { Formik } from "formik";
import { Row, Container, Col, Nav } from "reactstrap";
import { Button, KIND } from "baseui/button";
import styled from "styled-components";
import ChevronLeft from "baseui/icon/chevron-left";
import { BreadCrumbComponent } from "./Breadcrumb";
import {
  requestBase,
  getEventDetailUrl,
  combineDateAndTime,
  regularNavItems,
  groupNavItems,
  getGroupEventDetailUrl,
  EVENT_TYPE,
  ATTENDANCE_TYPE,
  formatTimeToServer,
  formatTimeFromServer,
} from "../utils";
import * as Yup from "yup";
import { toaster } from "baseui/toast";
import { Navigation } from "baseui/side-navigation";
import { convertToRaw, ContentState, convertFromHTML } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useParams, Prompt, Link } from "react-router-dom";
import EventActions from "./EventActions";
import Spinner from "./Spinner";

const ManageTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;
  }

  a {
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }
  }

  h1 {
    margin-left: 25px;
    font-size: 35px;
    flex: 1;
  }
`;

const Manage = ({ eventType }) => {
  const [eventData, setEventData] = useState(null);
  const [eventManagementData, setEventManagementData] = useState(null);
  const [invitees, setInvitees] = useState([]);
  const [eventStatus, setEventStatus] = useState("Draft");

  const [currentSection, setCurrentSection] = useState("basic");
  const [isDirty, setDirty] = useState(false);
  const [editorStateFromEventData, setEditorStateFromEventData] = useState(
    null
  );
  const { eventId } = useParams();

  useEffect(() => {
    const loadInEvent = async () => {
      let getReq, eventMgmtReq, inviteesReq;

      if (eventType === EVENT_TYPE.regular) {
        getReq = await requestBase.get(
          `/auth/event/event/view/getEvent/${eventId}`
        );
        eventMgmtReq = await requestBase.post(
          `/auth/event/eventManagement/view/getEventManagement/${eventId}`
        );
        inviteesReq = await requestBase.post(
          `/auth/event/eventManagement/search/invitees/${eventId}`
        );
        setInvitees(inviteesReq.data.results);
      } else if (eventType === EVENT_TYPE.group) {
        getReq = await requestBase.get(
          `/auth/grpEvent/event/edit/searchById/${eventId}`
        );
        eventMgmtReq = await requestBase.post(
          `/auth/grpEvent/eventManagement/edit/searchByEventId/${eventId}`
        );
        inviteesReq = await requestBase.post(
          `/auth/grpEvent/eventUser/search/getEventUser/${eventId}`
        );
        setInvitees(inviteesReq.data.results);
      }

      let formattedEventData = getReq.data;

      console.log("objectkjwjfkjkjk:::", formattedEventData);
      formattedEventData.eventType = eventType;

      if (formattedEventData.attendanceMode === ATTENDANCE_TYPE.online) {
        if (formattedEventData.liveStream) {
          formattedEventData.liveStreamType = "funzippy";
        } else {
          formattedEventData.liveStreamType = "online";
        }
      }

      if (formattedEventData.ticketCategories) {
        formattedEventData.ticketCategories = formattedEventData.ticketCategories.map(
          (t) => {
            if (t.attendeeType) {
              t.attendeeType = [{ id: t.attendeeType, value: t.attendeeType }];
            } else {
              t.attendeeType = [];
            }

            return t;
          }
        );
      }

      if (formattedEventData.potluckItems) {
        formattedEventData.potluckItems = formattedEventData.potluckItems.map(
          (t) => {
            if (t.category) {
              t.category = [{ id: t.category, value: t.category }];
            } else {
              t.category = [];
            }

            return t;
          }
        );
      }

      if (formattedEventData.searchTags) {
        formattedEventData.searchTags = formattedEventData.searchTags.map(
          (t) => {
            return { id: t, label: t };
          }
        );
      }

      setEventData(formattedEventData);
      setEventStatus(formattedEventData.status);

      // "role" -> {id: "role", value: "role"} for each team member
      let formattedEventMgmtData = eventMgmtReq.data;
      if (formattedEventMgmtData.eventTeamMembers) {
        formattedEventMgmtData.eventTeamMembers = formattedEventMgmtData.eventTeamMembers.map(
          (t) => {
            if (t.roles) {
              t.roles = t.roles.map((r) => {
                return { id: r, value: r };
              });
            }

            if (t.groups) {
              t.groups = t.groups.map((g) => {
                return { id: g, value: g };
              });
            }

            return t;
          }
        );
      }

      if (formattedEventMgmtData.eventTasks) {
        formattedEventMgmtData.eventTasks = formattedEventMgmtData.eventTasks.map(
          (t) => {
            if (t.memberGroup) {
              t.memberGroup = [{ id: t.memberGroup, value: t.memberGroup }];
            }

            if (t.ownerUserId) {
              t.ownerUserId = [{ emailAddress: t.ownerUserId }];
            }

            if (t.taskMembers) {
              t.taskMembers = t.taskMembers.map((i) => {
                return { emailAddress: i };
              });
            }

            return t;
          }
        );
      }

      setEventManagementData(formattedEventMgmtData);

      const blocksFromHTML = convertFromHTML(getReq.data.description);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );

      setEditorStateFromEventData(convertToRaw(contentState));
    };

    loadInEvent();
  }, [eventId]);

  const sections = {
    dashboard: Dashboard,
    tasks: Tasks,
    schedule: Schedule,
    team: Team,
    basic: Basic,
    guests: Guests,
    ticketing: Ticketing,
    potluck: Potluck,
    registry: Registry,
    timeslots: TimeSlots,
    accomodations: Accomodations,
    media: Media,
    participants: Participants,
    sponsors: Sponsors,
    contacts: Contacts,
  };
  const TagName = sections[currentSection];

  const validationSchema = Yup.object().shape({
    event_name: Yup.string()
      .required("Event name is required!")
      .max(50, "Event name max length is 50 chars!"),
    summary: Yup.object().required("Event summary is required!"),
    category1: Yup.array().required("Category is required"),
    timeRange: Yup.array().required("Date range is required!"),
  });

  return (
    <>
      <Container fluid className="manage-event-container">
        {eventData && editorStateFromEventData ? (
          <>
            <Prompt
              when={isDirty}
              message={(location) =>
                `You have unsaved changes, are you sure you want to leave this page?`
              }
            />
            <ManageTitle className="manage-title">
              <div>
                <h1>Editing Event: {eventData.name}</h1>
              </div>
            </ManageTitle>
            <div style={{ margin: "20px" }}>
              <BreadCrumbComponent
                items={
                  eventType === EVENT_TYPE.group
                    ? groupNavItems
                    : regularNavItems
                }
                currentSection={currentSection}
                setCurrentSection={setCurrentSection}
              ></BreadCrumbComponent>
            </div>
            <Row>
              <Col md="3">
                <Navigation
                  activeItemId={currentSection}
                  onChange={({ item, event }) => {
                    event.preventDefault();
                    if (isDirty) {
                      toaster.warning(<p>Please save your changes!</p>);
                    }
                    setCurrentSection(item.itemId);
                  }}
                  items={
                    eventType === EVENT_TYPE.group
                      ? groupNavItems
                      : regularNavItems
                  }
                  overrides={{
                    NavLink: {
                      style: ({ $active, $theme }) => {
                        if (!$active) {
                          return {
                            transition: "color .2s ease",
                            ":hover": {
                              textDecoration: "none",
                              color: $theme.colors.primary300,
                            },
                          };
                        }
                        return {
                          transition: "color .2s ease",
                          ":hover": {
                            textDecoration: "none",
                            color: $theme.colors.primary300,
                          },
                        };
                      },
                    },
                    NavItem: {
                      style: ({ $active, $theme }) => {
                        if ($active) {
                          return {
                            transition:
                              "background-color .2s ease, color .2s ease",
                            backgroundColor: $theme.colors.primary300,
                            borderLeftColor: $theme.colors.primary500,
                            color: $theme.colors.mono900,
                            ":hover": {
                              color: $theme.colors.primary300,
                            },
                          };
                        }
                        return {
                          transition:
                            "color .2s ease, border-left-color .2s ease",
                          ":hover": {
                            color: $theme.colors.primary300,
                            borderLeftColor: $theme.colors.primary500,
                          },
                        };
                      },
                    },
                  }}
                ></Navigation>
              </Col>
              <Col className="event-preview">
                <Formik
                  validationSchema={validationSchema}
                  onSubmit={async (values) => {
                    const startDateTime = combineDateAndTime(
                      values.startDate,
                      values.startTime
                    ).toUTCString();

                    let endDateTime = null;
                    if (values.endDate !== null && values.endTime !== null) {
                      endDateTime = combineDateAndTime(
                        values.endDate,
                        values.endTime
                      ).toUTCString();

                      if (new Date(endDateTime) <= new Date(startDateTime)) {
                        toaster.negative(
                          <p>Event end should happen after event start.</p>
                        );
                        return;
                      }
                    }

                    let formattedTickets = values.ticketCategories.map((t) => {
                      let newT = { ...t };

                      if (newT.attendeeType) {
                        newT.attendeeType = [...t.attendeeType];

                        if (newT.attendeeType.length > 0) {
                          newT.attendeeType = newT.attendeeType[0].value;
                        } else {
                          delete newT.attendeeType;
                        }
                      }

                      return newT;
                    });

                    let formattedTags = values.searchTags.map((t) => {
                      let newTag = { ...t };
                      return newTag.label;
                    });
                    let body = {
                      ...eventData,
                      name: values.event_name,
                      attendanceMode: values.attendanceMode,
                      startDateTime: formatTimeToServer(
                        new Date(startDateTime)
                      ),
                      endDateTime: endDateTime
                        ? formatTimeToServer(new Date(endDateTime))
                        : null,
                      description: draftToHtml(values.summary)
                        .trim()
                        .replace(/\n/g, "<br>")
                        .replace(/\"/g, "'"),
                      transport: values.transportation,
                      parking: values.parking,
                      stateProvince: values.stateProvince,
                      postalCode: values.postalCode,
                      address2: values.address2,
                      address1: values.address1,
                      city: values.city,
                      country: values.country,
                      state: values.state,
                      locationName: values.locationName,
                      placesToStay: values.placesToStay,
                      category1: values.category1[0].value,
                      category2: values.category2
                        ? values.category2[0].value
                        : null,
                      rsvpRequired:
                        values.rsvpOrTicketed === "rsvp" ? true : false,
                      rsvpMaxCount:
                        values.rsvpOrTicketed === "rsvp"
                          ? values.rsvpMaxCount
                          : 0,
                      ticketUrls: values.ticketUrls,
                      videosUrls: values.videosUrls,
                      ticketCategories: formattedTickets,
                      contacts: values.contacts,
                      sponsorCategories: values.sponsorCategories,
                      boothCategories: values.boothCategories,
                      participants: values.participants,
                      searchTags: formattedTags,
                      summaryPicture: values.summaryPicture,
                      latitude: values.latitude,
                      longitude: values.longitude,
                      liveStream: values.liveStreamType === "funzippy",
                      timeSlots: values.timeSlots,
                    };

                    if (body.longLat) {
                      delete body.longLat;
                    }

                    // if event was livestream and is not now, set livestream to false,
                    // send custom liveVideoUrl, delete liveStreamId, liveStreamServerAddress, liveVideoUploadUrl
                    // if it was not livestream and is now, set livestream to true,
                    // delete liveVideoUrl, send

                    // if it was livestream and is still livestream, do nothing
                    // if it was not livestream and is still not livestream, send liveVideoUrl

                    if (eventData.attendanceMode === ATTENDANCE_TYPE.online) {
                      if (eventData.liveStreamType === "funzippy") {
                        // event was livestream
                        if (values.liveStreamType === "custom") {
                          // it is now not livestream
                          body.liveStream = false;

                          delete body.liveStreamId;
                          delete body.liveStreamServerAddress;
                          delete body.liveVideoUploadUrl;
                          body.liveVideoUrl = values.liveVideoUrl;
                        }
                      } else {
                        // event was not livestream
                        if (values.liveStreamType === "funzippy") {
                          // it is now livestream
                          body.liveStream = true;
                          if (body.liveVideoUrl) {
                            delete body.liveVideoUrl;
                          }
                        } else {
                          // is still not livestream
                          body.liveVideoUrl = values.liveVideoUrl;
                        }
                      }
                    }

                    console.log(body);

                    if (eventType === EVENT_TYPE.group) {
                      body.giftItems = values.giftItems;
                      let formattedPotluckItems = values.potluckItems.map(
                        (t) => {
                          let newT = { ...t };

                          if (newT.category && newT.category.length > 0) {
                            newT.category = newT.category[0].value;
                          }
                          return newT;
                        }
                      );

                      body.potluckItems = formattedPotluckItems;
                    }

                    // {id: "role", value: "role"} -> "role" for each team member
                    // in each of these formatting, we do a deep copy where necessary
                    // to avoid mutating the values in Formik - those values
                    // should be accessible to UI elements, while formatted values
                    // should be what goes into API call.
                    let formattedTeamMembers = values.eventTeamMembers.map(
                      (t) => {
                        let newT = { ...t };

                        if (t.roles) {
                          newT.roles = [...t.roles];
                          newT.roles = newT.roles.map((r) => {
                            return r.value;
                          });
                        }
                        if (t.groups) {
                          newT.groups = [...t.groups];
                          newT.groups = newT.groups.map((g) => {
                            return g.value;
                          });
                        }

                        return newT;
                      }
                    );

                    let formattedEventTasks = values.eventTasks.map((t) => {
                      let newT = { ...t };
                      if (t.memberGroup && t.memberGroup.length > 0) {
                        newT.memberGroup = [...t.memberGroup];
                        newT.memberGroup = newT.memberGroup[0].value;
                      }

                      if (t.ownerUserId && t.ownerUserId.length > 0) {
                        newT.ownerUserId = [...t.ownerUserId];
                        newT.ownerUserId = newT.ownerUserId[0].emailAddress;
                      }

                      if (t.taskMembers && t.taskMembers.length > 0) {
                        newT.taskMembers = [...newT.taskMembers];
                        newT.taskMembers = newT.taskMembers.map((i) => {
                          return i.emailAddress;
                        });
                      }

                      return newT;
                    });

                    let eventManagementBody = {
                      ...eventManagementData,
                      eventTasks: formattedEventTasks,
                      eventTeamMembers: formattedTeamMembers,
                    };

                    let inviteesBody = [...values.invitees];

                    try {
                      if (eventType === EVENT_TYPE.group) {
                        await Promise.all([
                          requestBase.post(
                            `/auth/grpEvent/event/edit/updateEvent/${eventData.id}`,
                            JSON.parse(JSON.stringify(body)),
                            {}
                          ),
                          requestBase.post(
                            `/auth/grpEvent/eventManagement/edit/updateEventManagement/${eventData.id}`,
                            JSON.parse(JSON.stringify(eventManagementBody)),
                            {}
                          ),
                          requestBase.post(
                            `/auth/grpEvent/eventUser/create/invitees/${eventData.id}`,
                            JSON.parse(JSON.stringify(inviteesBody)),
                            {}
                          ),
                        ]);
                        toaster.positive(<p>Successfully saved changes!</p>);
                      } else if (eventType === EVENT_TYPE.regular) {
                        console.log(
                          "DADADAD",
                          JSON.parse(JSON.stringify(eventManagementBody))
                        );
                        await Promise.all([
                          requestBase.post(
                            `/auth/event/event/edit/updateEvent/${eventData.id}`,
                            JSON.parse(JSON.stringify(body)),
                            {}
                          ),
                          requestBase.post(
                            `/auth/event/event/edit/updateEventManagement/${eventData.id}`,
                            JSON.parse(JSON.stringify(eventManagementBody)),
                            {}
                          ),
                          requestBase.post(
                            `/auth/event/eventManagement/create/invitees/${eventData.id}`,
                            JSON.parse(JSON.stringify(inviteesBody)),
                            {}
                          ),
                        ]);
                        toaster.positive(<p>Successfully saved changes!</p>);
                      }
                    } catch (e) {
                      console.log(e);
                      toaster.negative(
                        <p>Couldn't submit form, please try again.</p>
                      );
                    }
                  }}
                  initialValues={{
                    event_name: eventData.name,
                    attendanceMode: eventData.attendanceMode,
                    summary: editorStateFromEventData,
                    placesToStay: eventData.placesToStay || "",
                    parking: eventData.parking || "",
                    address1: eventData.address1 || "",
                    postalCode: eventData.postalCode || "",
                    address2: eventData.address2 || "",
                    city: eventData.city || "",
                    country: eventData.country || "",
                    stateProvince: eventData.stateProvince || "",
                    latitude: eventData.latitude || "",
                    longitude: eventData.longitude || "",
                    locationName: eventData.locationName || "",
                    selectedPlace: eventData.address1
                      ? [
                          {
                            description: eventData.address1,
                            structured_formatting: {
                              main_text: eventData.address1,
                            },
                          },
                        ]
                      : [],
                    transportation: eventData.transport || "",
                    category1: [{ value: eventData.category1 }],
                    category2: eventData.category2
                      ? [{ value: eventData.category2 }]
                      : null,
                    category3: null,
                    startDate: new Date(
                      formatTimeFromServer(new Date(eventData.startDateTime))
                    ),
                    startTime: new Date(
                      formatTimeFromServer(new Date(eventData.startDateTime))
                    ),
                    endDate: eventData.endDateTime
                      ? new Date(
                          formatTimeFromServer(new Date(eventData.endDateTime))
                        )
                      : null,
                    endTime: eventData.endDateTime
                      ? new Date(
                          formatTimeFromServer(new Date(eventData.endDateTime))
                        )
                      : null,
                    timeRange: [
                      new Date(eventData.startDateTime),
                      new Date(eventData.endDateTime),
                    ],
                    rsvpMaxCount: 1,
                    rsvpOrTicketed:
                      eventData.rsvpMaxCount > 0 || eventData.rsvpRequired
                        ? "rsvp"
                        : (eventData.ticketUrls &&
                            eventData.ticketUrls.length > 0) ||
                          (eventData.ticketCategories &&
                            eventData.ticketCategories.length > 0)
                        ? "ticketed"
                        : "open",
                    rsvpRequired: false,
                    summaryPicture: eventData.summaryPicture || null,
                    contacts: eventData.contacts || [],
                    ticketUrls: eventData.ticketUrls || [],
                    videosUrls: eventData.videosUrls || [],
                    ticketCategories: eventData.ticketCategories || [],
                    sponsorCategories: eventData.sponsorCategories || [],
                    boothCategories: eventData.boothCategories || [],
                    participants: eventData.participants || [],
                    searchTags: eventData.searchTags || [],
                    giftItems: eventData.giftItems || [],
                    potluckItems: eventData.potluckItems || [],
                    timeSlots: eventData.timeSlots || [],
                    eventTeamMembers:
                      eventManagementData.eventTeamMembers || [],
                    eventTasks: eventManagementData.eventTasks || [],
                    invitees: invitees,
                    timezone: eventData.timezone || null,
                    liveStream: eventData.liveStream,
                    liveVideoUrl: eventData.liveVideoUrl,
                    liveStreamType: eventData.liveStream
                      ? "funzippy"
                      : "custom",
                  }}
                >
                  {(formikProps) => (
                    <>
                      <EventActions
                        isDirty={isDirty}
                        setDirty={setDirty}
                        eventData={eventData}
                        eventType={eventType}
                      ></EventActions>

                      <TagName
                        eventType={eventType}
                        eventData={eventData}
                        eventManagementData={eventManagementData}
                        whenAny={setDirty}
                        values={formikProps.values}
                        formikProps={formikProps}
                      ></TagName>
                    </>
                  )}
                </Formik>
              </Col>
            </Row>
          </>
        ) : (
          <Row>
            <Col>
              <Spinner></Spinner>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Manage;
