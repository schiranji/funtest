import React, { useState, useEffect } from 'react';
import { Container, Row, Col, FormGroup } from 'reactstrap';
import {
  ProgressSteps,
  Step
} from "baseui/progress-steps";
import { Button, KIND } from "baseui/button";
import { ChevronRight, ChevronLeft } from "baseui/icon";
import { RadioGroup, Radio, ALIGN } from "baseui/radio";
import { Input } from 'baseui/input';
import { Datepicker, TimezonePicker } from 'baseui/datepicker';
import { TimePicker } from "baseui/timepicker";
import { Select, TYPE } from 'baseui/select';
import { Textarea } from 'baseui/textarea';
import styled from 'styled-components';
import {requestBase, combineDateAndTime, EVENT_TYPE, ATTENDANCE_TYPE, radioOverrides, formatTimeToServer} from '../utils';
import { useHistory, Prompt } from 'react-router-dom';
import { toaster } from 'baseui/toast';
import AddressSelector from './AddressSelector';
import FormControl from './FormControl';

const StepFooter = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: row;  
  justify-content: flex-end;
  width: 100%;
`

const StepInner = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  width: 100%;
  max-width: 500px;
`

const CreateContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`

const FormSectionHeader = styled.h3`
  font-size: 22px;
  margin: 25px 0 15px 0;
`

const CreateEventTitle = styled.h2`
  margin: 50px 0;
`

const CreateNewEvent = () => {
  const [isDirty, setIsDirty] = useState(false);
  const [current, setCurrent] = useState(0);
  
  const [name, setName] = useState("")
  const [nameError, setNameError] = useState(null)
  const [summary, setSummary] = useState("");
  const [summaryError, setSummaryError] = useState(null)
  
  const [eventType, setEventType] = useState(EVENT_TYPE.regular)
  const [eventMeetingType, setEventMeetingType] = useState("InPerson")
  
  const [streetAddress, setStreetAddress] = useState("")
  const [locationName, setLocationName] = useState("")
  const [locationNameError, setLocationNameError] = useState(null)

  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("US")
  const [startDate, setStartDate] = useState(new Date())
  const [zipCode, setZipCode] = useState("");
  const [address2, setAddress2] = useState("")
  const [selectedPlace, setSelectedPlace] = useState([])
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)

  const [endDate, setEndDate] = useState(new Date())
  const [startTime, setStartTime] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date())
  const [endTimeError, setEndTimeError] = useState(null)
  const [timezone, setTimezone] = useState("")

  const [categories, setCategories] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categoryError, setCategoryError] = useState(null)

  const [newEvent, setNewEvent] = useState(null);
  const [createButtonLoading, setCreateButtonLoading] = useState(false)

  const [liveVideoUrl, setLiveVideoUrl] = useState("")
  const [liveVideoUrlError, setLiveVideoUrlError] = useState(null)
  const [liveStreamType, setLiveStreamType] = useState("funzippy")

  const history = useHistory();

  useEffect(() => {
    const getDropdownOptions = async () => {
      const req = await requestBase.post(`/getDropDownsOptions`, {
        product: "event",
        type: 'category'
      })

      setCategories(req.data.data.category)
    }
    getDropdownOptions();
  }, [])

  return (
    <Container>
      <Prompt
        when={isDirty}
        message={location =>
          `You have unsaved changes, are you sure you want to leave this page?`
        }
      />
      <Row>
        <Col>
          <CreateContent>
            <CreateEventTitle>Create a new event</CreateEventTitle>
            <ProgressSteps
              current={current}
              overrides={{
                Root: {
                  style: ({ $theme }) => {
                    return {
                      paddingLeft: "35px",
                      paddingRight: "35px",
                      paddingTop: "35px",
                      paddingBottom: "35px",
                      boxShadow: "0 5px 35px rgba(150, 150, 150, 0.24)",
                      borderRadius: "5px",
                      width: "100%",
                      maxWidth: "600px"
                    };
                  }
                },
                Icon: {
                  style: ({ $theme }) => {
                    return {
                      backgroundColor: $theme.colors.darkAccent
                    };
                  }
                },
                InnerIcon: {
                  style: ({ $theme }) => {
                    return {
                      backgroundColor: $theme.colors.accent
                    };
                  }
                },
                Tail: {
                  style: ({$theme}) => {
                    return {
                      backgroundColor: $theme.colors.darkAccent,
                    }
                  }
                },
                Title: {
                  style: ({
                    $theme,
                    $isActive,
                    $isCompleted,
                    $disabled
                  }) => {
                    return {
                      paddingBottom: $isActive ? "15px" : "0",
                      borderBottom: $isActive ? `2px solid ${$theme.colors.darkAccent}` : "2px solid transparent",
                      fontSize: "18px",
                      width: "100%",
                      fontFamily: "quicksand, sans-serif"
                    };
                  }
                }
              }}>
              <Step title="The basics">
                <StepInner>
                  <FormControl 
                    label="Event name"
                    error={nameError}>
                    <Input
                      error={nameError}
                      name="title"
                      type="text"
                      onChange={(e) => {
                        setName(e.target.value)
                        if (e.target.value !== "") {
                          setNameError(null)
                        }
                      }}
                      placeholder="My awesome event"
                      value={name}></Input>
                  </FormControl>
                  <FormControl 
                    label="Event description"
                    caption="Don't worry, you can change this later." 
                    error={summaryError}>
                      <Textarea
                        error={summaryError}
                        name="summary"
                        onChange={(e) => {
                          setSummary(e.target.value)
                          if (e.target.value !== "") {
                            setSummaryError(null)
                          }
                        }}
                        placeholder="Event summary"
                        value={summary}></Textarea>
                  </FormControl>
                  
                  <StepFooter>
                    <Button
                      size="compact"
                      endEnhancer={<ChevronRight size={22}></ChevronRight>}
                      onClick={() => {
                        if (name === "") {
                          setNameError("Name is required!")
                        }
                        if (summary === "") {
                          setSummaryError("Description is required!")
                        }
                        if (name !== "" && summary !== "") {
                          setNameError(null)
                          setSummaryError(null)
                          setCurrent(current+1)
                        }
                      }}>Next</Button>
                  </StepFooter>
                </StepInner>
              </Step>

              <Step title="Type of event">
                <StepInner>
                  <FormControl 
                    label="Event locality">
                    <RadioGroup
                      value={eventMeetingType}
                      onChange={e => setEventMeetingType(e.target.value)}
                      name="eventMeetingType"
                      align={ALIGN.vertical}
                      overrides={radioOverrides}
                    >
                      <Radio value={ATTENDANCE_TYPE.inPerson}>In person</Radio>
                      <Radio value={ATTENDANCE_TYPE.online}>Online</Radio>
                      <Radio 
                        description="Mix of online and in-person" 
                        value={ATTENDANCE_TYPE.mixed}>Mixed</Radio>
                    </RadioGroup>
                  </FormControl>

                  {(eventMeetingType === ATTENDANCE_TYPE.mixed || eventMeetingType === ATTENDANCE_TYPE.inPerson) && (
                    <FormControl 
                      label="Event address"
                      error={locationNameError}>
                      <AddressSelector
                        error={locationNameError}
                        address2={address2} setAddress2={setAddress2}
                        city={city} setCity={setCity}
                        country={country} setCountry={setCountry}
                        state={state} setState={setState}
                        lat={lat} setLat={setLat}
                        lng={lng} setLng={setLng}
                        locationName={locationName} setLocationName={(e) => {
                          if (e !== "") {
                            setLocationNameError(null)
                            setLocationName(e)
                          } else {
                            setLocationNameError("Address is required")
                          }
                        }}
                        zipCode={zipCode} setZipCode={setZipCode}
                        streetAddress={streetAddress} setStreetAddress={setStreetAddress}
                        selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace}
                        ></AddressSelector>
                    </FormControl>
                  )}

                  {(eventMeetingType === ATTENDANCE_TYPE.online) && (
                    <FormControl label="Livestream provider">
                      <RadioGroup
                        value={liveStreamType}
                        onChange={e => setLiveStreamType(e.target.value)}
                        name="liveStreamType"
                        align="vertical"
                        overrides={radioOverrides}>
                          <Radio 
                            value="funzippy"
                            description="Livestream features by Funzippy!"
                            >FunZippy Streaming</Radio>
                          <Radio 
                            value="custom"
                            description="You own livestream link (Zoom, Skype, Twitch, etc.)"
                            >Custom link</Radio>
                        </RadioGroup>
                    </FormControl>
                  )}

                  {(eventMeetingType === ATTENDANCE_TYPE.online) && (
                    <FormControl
                      label="Livestream link">
                      <Input
                        disabled={liveStreamType === "funzippy"}
                        error={liveVideoUrlError}
                        name="liveVideoUrl"
                        type="text"
                        onChange={(e) => {
                          setLiveVideoUrl(e.target.value)
                          if (e.target.value !== "") {
                            setLiveVideoUrlError(null)
                          }
                        }}
                        placeholder="Your livestream link"
                        value={liveVideoUrl}></Input>
                    </FormControl>
                  )}
                  
                  <FormControl 
                    label="Event access"
                    caption="You won't be able to change this later.">
                    <>
                      <RadioGroup
                        value={eventType}
                        onChange={e => setEventType(e.target.value)}
                        name="eventType"
                        align={ALIGN.vertical}
                        overrides={radioOverrides}
                      >
                        <Radio 
                          value={EVENT_TYPE.regular}
                          description="Once published, anyone will be able to see this event">Public</Radio>
                        <Radio 
                          value={EVENT_TYPE.group}
                          description="Once published, people with the link will be able to see this event."
                          >Group (Invite only)</Radio>
                        <Radio 
                          description="Personal appointment, only you will be able to see this event." 
                          value={EVENT_TYPE.private}>Personal</Radio>
                      </RadioGroup>
                    </>
                  </FormControl>

                  <StepFooter>
                    <Button
                      size="compact"
                      kind={KIND.minimal}
                      startEnhancer={<ChevronLeft size={22}></ChevronLeft>}
                      onClick={() => {
                        setCurrent(current-1)
                      }}>Back</Button>
                    <Button
                      size="compact"
                      endEnhancer={<ChevronRight size={22}></ChevronRight>}
                      onClick={() => {
                        if (eventMeetingType === "Mixed" || eventMeetingType === "InPerson") {
                          if (locationName === "") {
                            setLocationNameError("Address is required!")
                            return
                          } else {
                            setLocationNameError(null)
                          }
                        }
                        setCurrent(current+1)
                      }}>Next</Button>
                  </StepFooter>
                </StepInner>
              </Step>

              <Step title="Time and date">
                <StepInner>
                  <Row>
                    <Col>
                      <FormGroup>
                        <label>Start date</label>
                        <Datepicker
                          error={endTimeError}
                          value={startDate}
                          onChange={({date}) => {
                            setStartDate(Array.isArray(date) ? date[0] : date)
                            let combinedStart = combineDateAndTime(date, startTime)
                            let combinedEnd = combineDateAndTime(endDate, endTime)
                            if (combinedStart > combinedEnd) {
                              setEndDate(date)
                              setEndTime(startTime)
                            } 
                            if (combinedStart.valueOf() === combinedEnd.valueOf()) {
                              setEndTimeError("End of event must happen after start!")
                            } else {
                              setEndTimeError(null)
                            }
                          }}></Datepicker>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <label>End date</label>
                        <Datepicker
                          error={endTimeError}
                          value={endDate}
                          onChange={({date}) => {
                            setEndDate(Array.isArray(date) ? date[0] : date)
                            let combinedEnd = combineDateAndTime(date, endTime)
                            let combinedStart = combineDateAndTime(startDate, startTime);
                            if (combinedEnd < combinedStart) {
                              setStartDate(date)
                              setStartTime(endTime)
                            } 
                            if (combinedEnd.valueOf() === combinedStart.valueOf()) {
                              setEndTimeError("End of event must happen after start!")
                            } else {
                              setEndTimeError(null)
                            }
                          }}></Datepicker>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <label>Start time</label>
                        <TimePicker
                          error={endTimeError}
                          value={startTime}
                          onChange={time => {
                            setStartTime(time)
                            let combinedStart = combineDateAndTime(startDate, time)
                            let combinedEnd = combineDateAndTime(endDate, endTime)
                            if (combinedStart > combinedEnd) {
                              setEndTime(time)
                            }
                            if (combinedStart.valueOf() === combinedEnd.valueOf()) {
                              setEndTimeError("End of event must happen after start!")
                            } else {
                              setEndTimeError(null)
                            }
                          }}></TimePicker>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <label>End time</label>
                        <TimePicker
                          value={endTime}
                          error={endTimeError}
                          onChange={time => {
                            setEndTime(time)
                            let combinedStart = combineDateAndTime(startDate, startTime)
                            let combinedEnd = combineDateAndTime(endDate, time)
                            if (combinedEnd < combinedStart) {
                              setStartTime(time)
                            }
                            if (combinedStart.valueOf() === combinedEnd.valueOf()) {
                              setEndTimeError("End of event must happen after start!")
                            } else {
                              setEndTimeError(null)
                            }
                          }}></TimePicker>
                      </FormGroup>
                    </Col>
                  </Row>
                  {endTimeError && (
                    <Row>
                      <Col>
                        <p className="text-danger">{endTimeError}</p>
                      </Col>
                    </Row>
                  )}
                  <FormGroup>
                    <label>Timezone</label>
                    <TimezonePicker
                      value={timezone}
                      date={startDate}
                      onChange={(t) => {
                        setTimezone(t.id)
                      }}></TimezonePicker>
                  </FormGroup>
                  <StepFooter>
                    <Button
                      size="compact"
                      kind={KIND.minimal}
                      startEnhancer={<ChevronLeft size={22}></ChevronLeft>}
                      onClick={() => {
                        setCurrent(current-1)
                      }}>Back</Button>
                    <Button
                      size="compact"
                      endEnhancer={<ChevronRight size={22}></ChevronRight>}
                      onClick={() => {
                        let combinedStart = combineDateAndTime(startDate, startTime)
                        let combinedEnd = combineDateAndTime(endDate, endTime)
                        if (combinedStart.valueOf() === combinedEnd.valueOf()) {
                          setEndTimeError("End of event must happen after start!")
                          return
                        } else {
                          setEndTimeError(null)
                        }
                        setCurrent(current+1)
                      }}>Next</Button>
                  </StepFooter>
                </StepInner>
              </Step>

              <Step title="Category">
                <StepInner>
                  <FormControl 
                    label="Event category" 
                    error={categoryError}>
                    <Select
                      error={categoryError}
                      maxDropdownHeight="250px"
                      value={selectedCategory}
                      onChange={(t) => {
                        if (t.type === "clear" || t.type === "remove") {
                          setCategoryError("Select a category!")
                          setSelectedCategory([])
                          return
                        } else {
                          setCategoryError(null)
                        }
                        setSelectedCategory(t.value)
                      }}
                      valueKey="value"
                      type={TYPE.search}
                      options={categories}
                      getOptionLabel={({option}) => option.value}
                      getValueLabel={({option}) => option.value}></Select>
                  </FormControl>
                  <StepFooter>
                    <Button
                      size="compact"
                      kind={KIND.minimal}
                      startEnhancer={<ChevronLeft size={22}></ChevronLeft>}
                      onClick={() => {
                        setCurrent(current-1)
                      }}>Back</Button>
                    <Button
                      size="compact"
                      isLoading={createButtonLoading}
                      endEnhancer={<ChevronRight size={22}></ChevronRight>}
                      onClick={async () => {
                        if (selectedCategory === null || selectedCategory.length === 0) {
                          setCategoryError("Select a category!")
                          return
                        } else {
                          setCategoryError(null)
                        }

                        setCreateButtonLoading(true);

                        const startDateTime = combineDateAndTime(startDate, startTime);
                        const endDateTime = combineDateAndTime(endDate, endTime)
                        
                        if (endDateTime <= startDateTime) {
                          toaster.negative(<p>End of event should happen after start!</p>)
                          setCurrent(2)
                          setCreateButtonLoading(false)
                          return
                        }

                        const requestData = {
                          startDateTime: formatTimeToServer(new Date(startDateTime)),
                          endDateTime: endDateTime ? formatTimeToServer(new Date(endDateTime)) : null,
                          name: name,
                          address1: streetAddress,
                          address2: address2,
                          locationName: locationName,
                          city: city,
                          stateProvince: state,
                          country: country,
                          postalCode: zipCode,
                          description: summary,
                          attendanceMode: eventMeetingType,
                          longitude: lng,
                          latitude: lat,
                          timezone: timezone,
                          category1: selectedCategory[0].value
                        }

                        if (liveStreamType === "custom") {
                          requestData.liveVideoUrl = liveVideoUrl;
                          requestData.livestream = false;
                        } else if (liveStreamType === "funzippy") {
                          requestData.livestream = true;
                        }

                        try {
                          let newUrl, addUrl;
                          if (eventType === EVENT_TYPE.regular) {
                            const newEventReq = await requestBase.post(`/auth/event/event/create/newEvent`, {});
                            const newEventManagementReq = await requestBase.post(`/auth/event/eventManagement/create/newEvent`, {});
    
                            const req = await requestBase.post(`/auth/event/event/create/addEvent`, {
                              contacts: [...newEventReq.data.contacts],
                              uid: newEventReq.data.uid,
                              ...requestData,
                            }, {});
                            
                            const req2 = await requestBase.post(`/auth/event/event/create/addEventManagement`, {
                              ...newEventManagementReq.data,
                              eventId: req.data.data.id
                            });
                          
                            setNewEvent(req.data.data)
                          }
                          else if (eventType === EVENT_TYPE.group) {
                            const newEventReq = await requestBase.post(`/auth/grpEvent/event/create/newEvent`, {});
                            const newEventManagementReq = await requestBase.post(`/auth/grpEvent/eventManagement/create/newEvent`, {});
    
                            const req = await requestBase.post(`/auth/grpEvent/event/create/addEvent`, {
                              contacts: [...newEventReq.data.contacts],
                              uid: newEventReq.data.uid,
                              ...requestData,
                            }, {});
                            
                            const req2 = await requestBase.post(`/auth/grpEvent/eventManagement/create/addEventManagement`, {
                              ...newEventManagementReq.data,
                              eventId: req.data.data.id
                            });
                          
                            setNewEvent(req.data.data)
                          }
                          else if (eventType === EVENT_TYPE.private) {
                            const newEventReq = await requestBase.post(`/auth/persEvent/event/create/newEvent`, {});    
                            const req = await requestBase.post(`/auth/persEvent/event/create/addEvent`, {
                              contacts: [...newEventReq.data.contacts],
                              uid: newEventReq.data.uid,
                              ...requestData,
                            }, {});
                          
                            setNewEvent(req.data.data)
                          }

                        } catch {
                          toaster.negative(<p>Couldn't create the event.</p>)
                          setCreateButtonLoading(false)
                          return
                        }
                        
                        setIsDirty(false);
                        setCreateButtonLoading(false)
                        setCurrent(current+1);
                      }}>Create event</Button>
                  </StepFooter>
                </StepInner>
              </Step>

              <Step title="Done!">
                <StepInner>
                  <p>Event Created!</p>
                  <p>You can edit your event on the manage tab.</p>
                  <Button
                    onClick={() => {
                      history.push(`/${eventType === EVENT_TYPE.group ? "groupEvent" : "event"}/${newEvent.id}`)
                    }}>Edit your new event</Button>
                </StepInner>
              </Step>
            </ProgressSteps>
          </CreateContent>
        </Col>
      </Row>
    </Container>
  )
}

export default CreateNewEvent;