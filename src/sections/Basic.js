import React, { useState, useEffect } from 'react'
import { Row, Col } from 'reactstrap';
import { Datepicker, TimezonePicker } from "baseui/datepicker";
import { Input } from "baseui/input";
import { RadioGroup, Radio, ALIGN } from "baseui/radio";
import FormControl from "../components/FormControl";
import { Select, TYPE } from "baseui/select";
import { FileUploader } from 'baseui/file-uploader'
import ActionButton from '../components/ActionButton';
import { combineDateAndTime, EVENT_TYPE, handleWithAnyFunction, requestBase } from '../utils'
import SectionHeader from '../components/SectionHeader';
import SectionBody from '../components/SectionBody';
import { Editor } from 'react-draft-wysiwyg';
import { toaster } from 'baseui/toast';
import { TimePicker } from 'baseui/timepicker';
import { Button, KIND } from 'baseui/button';
import {
  StatefulTooltip,
  PLACEMENT,
  TRIGGER_TYPE
} from "baseui/tooltip";
import { useParams } from 'react-router-dom';
import { HiddenRow, ATTENDANCE_TYPE, radioOverrides } from '../utils'
import AddressSelector from '../components/AddressSelector';
import { Block } from 'baseui/block'

// whenAny should be a function; it will be called when
// any input changes. 
const Basic = ({formikProps, whenAny, eventData, eventType}) => {
  const { handleSubmit, 
          handleBlur, 
          handleChange, 
          values, 
          errors,
          setFieldValue } = formikProps;
  const handleWithAny = handleWithAnyFunction(handleChange, whenAny);
  const submitWithAny = handleWithAnyFunction(handleSubmit, whenAny, false)
  const [categories, setCategories] = useState(null)
  const [visibilities, setVisibilities] = useState(null)
  const [ageGroups, setAgeGroups] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [thumbnailProgress, setThumbnailProgress] = useState(null);
  const [thumbnailProgressMessage, setThumbnailProgressMessage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [existingDate, setExistingDate] = useState(values.endTime !== null)
  const { eventId } = useParams();

  useEffect(() => {
    const getDropdownOptions = async () => {
      const req = await requestBase.post(`/getDropDownsOptions`, {
        product: "event",
        type: 'ageGroup,category,visibility'
      })
      
      setCategories(req.data.data.category)
      setVisibilities(req.data.data.visibility)
      setAgeGroups(req.data.data.ageGroup)
    }
    getDropdownOptions();
  }, [])

  const addressSetter = (fieldName) => {
    return (value) => {
      whenAny(true)
      setFieldValue(fieldName, value)
    }
  }

  return (
    <>
      <SectionHeader>
        <h1>Basic Details</h1>
      </SectionHeader>
      <SectionBody>
        <form onSubmit={submitWithAny}>
          <Row>
            <Col>
              <FormControl label="Event Name" error={errors.event_name}>
                <Input 
                  error={errors.event_name}
                  name="event_name"
                  type="text"
                  onChange={handleWithAny}
                  onBlur={handleBlur}
                  value={values.event_name}
                  placeholder={"My awesome event..."}></Input>
              </FormControl>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col>
              <FormControl
                label="Start Date"
                error={errors.startDate}>
                <Datepicker
                  value={values.startDate}  
                  onChange={({date}) => {
                    whenAny(true)
                    
                    if (date > values.endDate) {
                      setFieldValue("endDate", date)
                      setFieldValue("endTime", values.startTime)
                    }
                    setFieldValue("startDate", date);
                  }}
                ></Datepicker>
              </FormControl>
            </Col>
            <Col>
              <FormControl
                label="Start Time"
                error={errors.startTime}>
                <StatefulTooltip
                  content={() => (
                    <Block padding={"20px"}>
                      Start typing to filter
                    </Block>
                  )}
                  triggerType={TRIGGER_TYPE.click}
                  placement={PLACEMENT.right}
                >
                  <TimePicker
                    value={values.startTime}  
                    onChange={(time) => {
                      whenAny(true)
                      
                      let combinedStart = combineDateAndTime(values.startDate, time);
                      let combinedEnd = combineDateAndTime(values.endDate, values.endTime);
                      if (combinedStart > combinedEnd) {
                        setFieldValue("endTime", time)
                      }
                      setFieldValue("startTime", time);
                    }}
                    creatable
                  ></TimePicker>
                </StatefulTooltip>
              </FormControl>
            </Col>

            {existingDate ? (
              <>
                <Col>
                  <FormControl
                    label="End Date"
                    error={errors.endDate}>
                    <Datepicker
                      value={values.endDate}  
                      onChange={({date}) => {
                        whenAny(true)
                        setFieldValue("endDate", date);
                      }}
                    ></Datepicker>
                  </FormControl>
                </Col>
                <Col>
                  <FormControl
                    label="End Time"
                    error={errors.endTime}>
                    <TimePicker
                      value={values.endTime}  
                      onChange={(time) => {
                        whenAny(true)
                        setFieldValue("endTime", time);
                      }}
                      creatable
                    ></TimePicker>
                  </FormControl>
                </Col>
                <Col md={2}>
                  <Button 
                    kind={KIND.minimal}
                    onClick={(e) => {
                      e.preventDefault();
                      
                      setFieldValue("endDate", null);
                      setFieldValue("endTime", null);
                      setExistingDate(false);
                    }}>Remove end date/time</Button>
                </Col>
              </>
            ) : (
              <Col md={2}>
                <Button 
                  kind={KIND.minimal}
                  onClick={(e) => {
                    e.preventDefault();
                    
                    setFieldValue("endDate", new Date());
                    setFieldValue("endTime", new Date());
                    setExistingDate(true);
                  }}>Add end date/time</Button>
              </Col>
            )}
          </Row>

          {values.timezone && (
            <Row>
              <Col sm="4">
                <FormControl
                  label="Event timezone">
                  <TimezonePicker
                    date={values.startDate}
                    value={values.timezone}
                    onChange={handleWithAny}
                    onBlur={handleBlur}></TimezonePicker>
                </FormControl>
              </Col>
            </Row>
          )}

          <Row>
            <Col sm="2">
              <FormControl 
                label="Event locality">
                <>
                  <RadioGroup
                    value={values.attendanceMode}
                    onChange={handleWithAny}
                    onBlur={handleBlur}
                    error={errors.attendanceMode}
                    align={ALIGN.vertical}
                    overrides={radioOverrides}
                    name="attendanceMode"
                  >
                    <Radio 
                      value={ATTENDANCE_TYPE.inPerson}>In person</Radio>
                    <Radio 
                      value={ATTENDANCE_TYPE.online}>Online</Radio>
                    <Radio  
                      value={ATTENDANCE_TYPE.mixed}>Mixed</Radio>
                  </RadioGroup>
                </>
              </FormControl>
            </Col>
            
            {(values.attendanceMode === ATTENDANCE_TYPE.inPerson || values.attendanceMode === ATTENDANCE_TYPE.mixed) && (
              <Col>
                <FormControl label="Event location">
                  <AddressSelector
                    inline
                    address2={values.address2} setAddress2={addressSetter("address2")}
                    city={values.city} setCity={addressSetter("city")}
                    country={values.country} setCountry={addressSetter("country")}
                    state={values.stateProvince} setState={addressSetter("stateProvince")}
                    lat={values.latitude} setLat={addressSetter("latitude")}
                    lng={values.longitude} setLng={addressSetter("longitude")}
                    locationName={values.locationName} setLocationName={addressSetter("locationName")}
                    zipCode={values.postalCode} setZipCode={addressSetter("postalCode")}
                    streetAddress={values.address1} setStreetAddress={addressSetter("address1")}
                    selectedPlace={values.selectedPlace} setSelectedPlace={addressSetter("selectedPlace")}
                    ></AddressSelector>
                </FormControl>
              </Col>
            )}

            {(values.attendanceMode === ATTENDANCE_TYPE.online) && (
              <Col>
                <FormControl label="Livestream provider">
                  <RadioGroup
                    value={values.liveStreamType}
                    onChange={handleWithAny}
                    onBlur={handleBlur}
                    align={ALIGN.vertical}
                    name="liveStreamType"
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
                <FormControl
                  label="Livestream link">
                  <Input
                    disabled={values.liveStreamType === "funzippy"}
                    error={errors.liveVideoUrl}
                    name="liveVideoUrl"
                    type="text"
                    onChange={handleWithAny}
                    onBlur={handleBlur}
                    value={values.liveVideoUrl}
                    placeholder="Your livestream link"
                    ></Input>
                </FormControl>
              </Col>
            )}

          </Row>

          {eventData.eventType === EVENT_TYPE.regular && (
            <Row>
              <Col md={6}>
                <FormControl label="Category" error={errors.category1}>
                  <Select
                    maxDropdownHeight="250px"
                    options={categories}
                    type={TYPE.search}
                    name="category1"
                    value={values.category1}
                    valueKey="value"
                    getOptionLabel={({option}) => option.value}
                    getValueLabel={({option}) => option.value}
                    placeholder="Select category"
                    onChange={params => {
                      whenAny(true)
                      setFieldValue("category1", params.value)
                    }}
                  />
                </FormControl>
              </Col>
              <Col md={6}>
                <FormControl label="Subcategory" error={errors.category2}>
                  <Select
                    maxDropdownHeight="250px"
                    options={categories}
                    type={TYPE.search}
                    name="category2"
                    value={values.category2 || ""}
                    valueKey="value"
                    getOptionLabel={({option}) => option.value}
                    getValueLabel={({option}) => option.value}
                    placeholder="Select category"
                    onChange={params => {
                      whenAny(true)
                      setFieldValue("category2", params.value)
                    }}
                  />
                </FormControl>
              </Col>
            </Row>
          )}

          <HiddenRow>
            <input
              readOnly 
              value={values.summaryPicture ? values.summaryPicture : ""}
              name="summaryPicture"></input>
            <input
              readOnly 
              value={values.latitude ? values.latitude : ""}
              name="latitude"></input>
            <input
              readOnly 
              value={values.longitude ? values.longitude : ""}
              name="longitude"></input>
            <input
              readOnly 
              value={values.locationName ? values.locationName : ""}
              name="locationName"></input>
            <input
              readOnly 
              value={values.address2 ? values.address2 : ""}
              name="address2"></input>
          </HiddenRow>
          
          <Row>
            {values.summaryPicture && (
              <Col sm={3}>
                <img className="p-2 img-fluid" src={values.summaryPicture}></img>
              </Col>
            )}
            <Col>
              <FormControl error={thumbnailError} label="Event cover image">
                <FileUploader
                  progressAmount={uploading ? thumbnailProgress : null}
                  progressMessage={uploading ? thumbnailProgressMessage : ""}
                  multiple={false}
                  onCancel={() => {
                    setUploading(false)
                  }}
                  onRetry={() => {
                    setUploading(false)
                  }}
                  maxSize={1048576}
                  onDropRejected={() => {
                    setThumbnailError("That file may be too large! Please use images only.");
                    setUploading(false);
                  }}
                  onDropAccepted={async (e) => {
                    setUploading(true);
                    setThumbnailError(null)
                    const formData = new FormData();
                    formData.append("file", e[0])

                    try {
                      let url = eventType === EVENT_TYPE.regular ? 
                        `/auth/event/event/edit/uploadEventSummaryPicture/${eventData.id}` :
                        `/auth/grpEvent/event/edit/uploadEventSummaryPicture/${eventData.id}`
                        
                      let req = await requestBase.post(url, formData, {
                        onUploadProgress: (e) => {
                          let percentage = Math.round(e.loaded * 100 / e.total)
                          setThumbnailProgress(percentage);
                          setThumbnailProgressMessage(`${percentage}% done.`)
                        }
                      })
                      
                      toaster.positive(<p>Successfully uploaded image!</p>)
                      setUploading(false)
                    } catch (e) {
                      setThumbnailError(e.response.data)
                    }

                    // make req to get new eventData, set summaryPicture field
                    try {
                      let url = eventType === EVENT_TYPE.regular ? 
                        `/auth/event/event/view/getEvent/${eventId}` :
                        `/auth/grpEvent/event/view/getEvent/${eventId}`

                      let req = await requestBase.get(url);
                      setFieldValue("summaryPicture", req.data.summaryPicture);
                    } catch (e) {
                      console.log("error!")
                    }
                  }}
                  accept="image/*"></FileUploader>
              </FormControl>
            </Col>
          </Row>
          
          <Row>
            <Col>
              <FormControl label="Event summary" error={errors.summary}>
                <Editor
                  toolbar={{
                    options: ['blockType', 'inline', 'link', 'emoji', 'history'],
                  }}
                  initialContentState={values.summary}
                  onContentStateChange={(e) => {
                    whenAny(true);
                    setFieldValue("summary", e);
                  }}>
                </Editor>
              </FormControl>
            </Col>
          </Row>

          <Row>
            <Col>
              <FormControl label="Event tags" error={errors.eventTags}>
                <Select
                  options={values.searchTags}
                  name="searchTags"
                  creatable
                  multi
                  value={values.searchTags}
                  labelKey="label"
                  valueKey="id"
                  placeholder="Select or add tags"
                  onChange={params => {
                    whenAny(true)
                    setFieldValue("searchTags", params.value)
                  }}
                />
              </FormControl>
            </Col>
          </Row>

          <Row>
              <Col>
                <ActionButton type="submit">Save Changes</ActionButton>
              </Col>
          </Row>
        </form>
      </SectionBody>
    </>
  )
}

export default Basic;
