import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { KIND as ButtonKind } from "baseui/button";
import { Checkbox } from "baseui/checkbox";
import { Datepicker } from "baseui/datepicker";
import { FormControl } from "baseui/form-control";
import { Delete } from "baseui/icon";
import Show from "baseui/icon/show";
import { Input } from "baseui/input";
import {
  Modal,
  ModalButton,
  ModalFooter,
  ModalHeader,
  ROLE,
  SIZE,
} from "baseui/modal";
import { Textarea } from "baseui/textarea";
import { TimePicker } from "baseui/timepicker";
import { toaster } from "baseui/toast";
import { Form, Formik } from "formik";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import * as XLSX from "xlsx";
import * as Yup from "yup";
import ActionButton from "../components/ActionButton";
import SectionBody from "../components/SectionBody";
import SectionHeader from "../components/SectionHeader";
import SubSection from "../components/Subsection";
import { EVENT_TYPE, requestBase } from "../utils";

const headers = [
  { label: "Name", key: "name" },
  { label: "Room", key: "room" },
  { label: "Description", key: "description" },
  { label: "Participants", key: "participants" },
  { label: "Duration", key: "duration" },
  { label: "Start_Date", key: "startDate" },
  { label: "Start_Time", key: "startTime" },
  { label: "End_Time", key: "endTime" },
];

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  description: Yup.string().required("Description is Required").max(1024),
  room: Yup.string().required("Room is Required").max(50),
  participants: Yup.string().required("Participants is Required").max(1024),
  duration: Yup.string().required("Duration is Required"),
  startDate: Yup.string().required("Start Date is Required"),
  startTime: Yup.string().required("Start Time is Required"),
  endTime: Yup.string().required("End Time is Required"),
});

const EventSchedule = (props) => {
  const [datass, setDatasss] = useState();
  const [update, setUpdate] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [showData, setShowData] = useState(false);
  const [minimumDate, setMinimumDate] = useState(null);
  const [maximumDate, setMaximumDate] = useState(null);
  const fileInput = useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpened, setIsOpened] = React.useState(false);
  const { eventId } = useParams();
  const [checked, setChecked] = React.useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
  const [searchinItem, setSearchingItem] = useState("");
  const [getRequest, setGetRequest] = useState(false);
  const [getDownload, setGetDownload] = useState([]);
  const [paginationSize, setPaginationSize] = useState(5);
  const [gridApi, setGridApi] = useState(null);
  const eventTyepe =
    props.eventData.eventType === EVENT_TYPE.group ? "groupEvent" : "event";
  const onGridReady = (params) => {
    setGridApi(params.api);
  };
  useEffect(() => {
    const getEventMedia = async () => {
      try {
        let url = `/auth/${eventTyepe}/event/search/schedule-item/${eventId}`;
        const getReq = await requestBase.get(url);
        // setMinimumDate(new Date(getReq.data.startDateTime));
        // setMaximumDate(new Date(getReq.data.endDateTime));
        console.log(new Date(getReq.data.startDateTime));
        if (getReq.data) {
          setGetRequest(false);
          setDatasss(getReq.data);
        } else {
          setDatasss();
        }
      } catch (e) {
        console.log("error!");
      }
    };
    getEventMedia();
  }, [eventId, refresh]);

  useEffect(() => {
    const Array = [];
    datass &&
      datass.map &&
      // eslint-disable-next-line array-callback-return
      datass.map((values) => {
        let myValue = { ...values };
        myValue.startDate =
          moment(new Date(values.startDateTime)).format("DD MMM YYYY") !==
          moment(new Date(values.endDateTime)).format("DD MMM YYYY")
            ? moment(new Date(values.startDateTime)).format("DD MMM YYYY")
            : "";
        myValue.startTime = moment(new Date(values.startDateTime)).format(
          "h:mma"
        );
        myValue.endTime = moment(values.endTime).format("HH:mm");
        Array.push(myValue);
      });
    setGetDownload(Array);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datass && datass.length]);

  // const onSubmitData = async() => {
  //   const Arr = [];
  //   let item = ""
  //   datass.map((data) => {
  //     item = {
  //       startDateTime: data.startDateTime,
  //       endDateTime: data.endDateTime,
  //       description: data.description,
  //       participants: data.participants,
  //       duration: data.duration,
  //       name: data.name,
  //     };
  //     Arr.push(item);
  //   });
  //   console.log("submittimg here",Arr);
  //   requestBase.post(
  //     `/auth/event/event/create/schedule-item/${eventId}`,
  //     JSON.parse(JSON.stringify(item))
  //   );
  // };

  const processData = (dataString) => {
    setGetRequest(true);
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(
      /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
      );
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }
        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
    }

    const array = [];
    list.map((data) => {
      data.name = data.Name;
      data.participants = data.Participants;
      data.description = data.Description;
      data.duration = data.Duration;
      data.endDateTime = new Date(data.Start_Date + " " + data.Start_Time);
      data.startDateTime = new Date(data.Start_Date + " " + data.End_Time);
      array.push(data);
    });
    console.log("HAHHA", array);
    //setDatasss((prev) => [...prev, ...array]);
  };

  const handleFileUpload = (e) => {
    if (e.target.value) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        processData(data);
      };
      reader.readAsBinaryString(file);
    }
  };

  // useEffect(() => {
  //   if (datass.length !== 0 && getRequest === true) {
  //     onSubmitData();
  //   }
  // }, [datass]);

  const onSubmit = async (values, { resetForm }) => {
    setGetRequest(true);
    console.log(values);
    resetForm({});
    if (checked !== true) {
      setIsOpened(false);
    }
    let formValue = { ...values };
    formValue.startDate = moment(values.startDate).format("DD MMM YYYY");
    formValue.startTime = moment(values.startTime).format("HH:mm");
    formValue.endTime = moment(values.endTime).format("HH:mm");

    formValue.startDateTime = new Date(
      formValue.startDate + " " + formValue.startTime
    );
    formValue.endDateTime = new Date(
      formValue.startDate + " " + formValue.endTime
    );

    const respo = await requestBase.post(
      `/auth/${eventTyepe}/event/create/schedule-item/${eventId}`,
      JSON.parse(JSON.stringify(formValue))
    );

    if (respo) {
      toaster.positive(<p>Schedule has been added.</p>);
      const getRes = await requestBase.get(
        `/auth/${eventTyepe}/event/search/schedule-item/${eventId}`
      );
      if (getRes.data) {
        setDatasss(getRes.data);
      }
    }
    // setDatasss([...datass, values]);
  };

  const onUpdate = async (values, { resetForm }) => {
    setUpdate(false);
    setIsOpened(false);
    setGetRequest(true);
    resetForm({});

    let formValue = { ...values };
    formValue.startDate = moment(values.startDate).format("DD MMM YYYY");
    formValue.startTime = moment(values.startTime).format("HH:mm");
    formValue.endTime = moment(values.endTime).format("HH:mm");

    formValue.startDateTime = new Date(
      formValue.startDate + " " + formValue.startTime
    );
    formValue.endDateTime = new Date(
      formValue.startDate + " " + formValue.endTime
    );

    const getRes = await requestBase.put(
      `/auth/${eventTyepe}/event/update/schedule-item/${eventId}/${values.uid}`,
      JSON.parse(JSON.stringify(formValue))
    );

    if (getRes.data.statusDescription === "Success") {
      setRefresh(!refresh);
      toaster.positive(<p>Schedule has been update.</p>);
    } else {
      toaster.negative(<p>something went wrong.</p>);
    }
  };

  const deleteData = (data) => {
    setSelectedScheduleId(data?.uid);
    setIsOpen(true);
  };

  const removeDatas = async () => {
    setIsOpen(false);
    if (selectedScheduleId) {
      const response = await requestBase.delete(
        `/auth/${eventTyepe}/event/delete/schedule-item/${eventId}/${selectedScheduleId}`
      );
      if (response.data.statusDescription === "Success") {
        const getRes = await requestBase.get(
          `/auth/${eventTyepe}/event/search/schedule-item/${eventId}`
        );
        if (getRes.data) {
          setDatasss(getRes.data);
        }
      }
      toaster.positive(<p>Schedule has been deleted.</p>);
    } else {
      toaster.warning(<p>Schedule item id is not found.</p>);
    }
  };

  const onPageSizeChanged = (e) => {
    console.log("newPageSize", e.target.value);
    setPaginationSize(e.target.value);
    if (gridApi) {
      gridApi.setDomLayout(e.target.value < 11 ? "autoHeight" : "normal");
      document.querySelector("#myGrid").style.height =
        e.target.value < 11 ? "" : "500px";
    }
  };
  const startDate = moment(props.eventData.startDateTime, "YYYY-MM-DD");
  const endDate = moment(props.eventData.endDateTime, "YYYY-MM-DD");
  const sameDayEvent = !startDate.diff(endDate);
  return (
    <>
      <Modal
        onClose={() => setIsOpen(false)}
        closeable
        isOpen={isOpen}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.dialog}
      >
        <ModalHeader>Are you sure you want delete?</ModalHeader>
        {/* <ModalBody>Are you sure you want delete?</ModalBody> */}
        <ModalFooter>
          <ModalButton
            kind={ButtonKind.tertiary}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </ModalButton>
          <ModalButton onClick={removeDatas}>Okay</ModalButton>
        </ModalFooter>
      </Modal>

      <SectionHeader>
        <h1>Event Scheduler</h1>
      </SectionHeader>

      <SectionBody>
        <SubSection>
          <p>
            {datass ? "Set up your event's schedule!" : "No schedule Found"}
          </p>
        </SubSection>
        <div>
          <Formik
            initialValues={{
              name: "",
              description: "",
              participants: "",
              duration: "",
              startDate: "",
              startTime: "",
              endTime: "",
              room: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={update ? onUpdate : onSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              touched,
              values: value,
              errors,
              setFieldValue,
              resetForm,
            }) => {
              const editHandlar = (data) => {
                setUpdate(true);
                setShowData(false);
                setIsOpened(true);
                data.startTime = data.startDateTime
                  ? new Date(data.startDateTime)
                  : new Date();
                data.endTime = data.endDateTime
                  ? new Date(data.endDateTime)
                  : new Date();
                data.startDate = data.startDateTime
                  ? new Date(data.startDateTime)
                  : new Date();
                for (const [key, value] of Object.entries(data)) {
                  setFieldValue(key, value);
                }
              };

              const viewData = (data) => {
                setShowData(true);
                setIsOpened(true);
                data.startTime = data.startDateTime
                  ? new Date(data.startDateTime)
                  : new Date();
                data.endTime = data.endDateTime
                  ? new Date(data.endDateTime)
                  : new Date();
                data.startDate = data.startDateTime
                  ? new Date(data.startDateTime)
                  : new Date();
                for (const [key, value] of Object.entries(data)) {
                  setFieldValue(key, value);
                }
              };

              const closeModal = () => {
                resetForm({});
                setIsOpened(false);
                setUpdate(false);
                setChecked(false);
              };

              const handleModalOpen = () => {
                resetForm({});
                setIsOpened(true);
                setShowData(false);
                setChecked(false);
              };

              const BtnCellRenderer = (props) => {
                return (
                  <>
                    <Show size={30} onClick={() => viewData(props.data)} /> |
                    <Delete
                      size={35}
                      onClick={() => deleteData(props.data)}
                    />{" "}
                    |
                    <AiFillEdit
                      size={30}
                      onClick={() => editHandlar(props.data)}
                    />
                  </>
                );
              };

              const StartDate = (props) => {
                return moment(new Date(props.data.startDateTime)).format(
                  "DD MMM YYYY"
                ) !==
                  moment(new Date(props.data.endDateTime)).format("DD MMM YYYY")
                  ? moment(new Date(props.data.startDateTime)).format(
                      "DD MMM YYYY"
                    )
                  : "";
              };
              const StartTime = (props) => {
                return moment(new Date(props.data.startDateTime)).format(
                  "h:mma"
                );
              };
              const handleDownload = () => {
                requestBase({
                  url: `/auth/event/event/export/schedule-item/${eventId}`, //your url
                  method: "GET",
                  responseType: "blob", // important
                }).then((response) => {
                  const url = window.URL.createObjectURL(
                    new Blob([response.data])
                  );
                  const link = document.createElement("a");
                  link.href = url;
                  link.setAttribute(
                    "download",
                    `schedules.${new Date().toString()}.csv`
                  ); //or any other extension
                  document.body.appendChild(link);
                  link.click();
                });
              };

              return (
                <>
                  <div style={{ width: "100%" }}>
                    {datass && (
                      <div>
                        <div style={{ margin: "10px 0" }}>
                          <ActionButton
                            className="photo-button m-1"
                            onClick={handleDownload}
                          >
                            Download Schedule
                          </ActionButton>
                          <input
                            type="file"
                            accept=".csv,.xlsx,.xls"
                            onChange={handleFileUpload}
                            ref={fileInput}
                            style={{ display: "none" }}
                          />
                          <ActionButton
                            className="photo-button m-1"
                            onClick={() => fileInput.current.click()}
                          >
                            Upload Schedule
                          </ActionButton>
                          <input
                            type="text"
                            placeholder="Filter..."
                            value={searchinItem}
                            onChange={(e) => setSearchingItem(e.target.value)}
                            style={{
                              height: 40,
                              borderRadius: 0,
                              backgroundColor: "#F6F6F6",
                              color: "#888",
                            }}
                          />
                          Page Size:
                          <select
                            style={{
                              width: "10%",
                              marginLeft: "5px",
                              marginBottom: "5px",
                            }}
                            onChange={onPageSizeChanged}
                            id="page-size"
                          >
                            <option value="5" selected={paginationSize === "5"}>
                              5
                            </option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                          </select>
                        </div>
                        {datass.length > 0 && (
                          <>
                            <div className="grid-wrapper">
                              <div
                                id="myGrid"
                                style={{
                                  width: "100%",
                                }}
                                className="ag-theme-alpine"
                              >
                                <AgGridReact
                                  onGridReady={onGridReady}
                                  domLayout={"autoHeight"}
                                  defaultColDef={{
                                    sortable: true,
                                    filter: true,

                                    // floatingFilter: true,
                                  }}
                                  // suppressRowClickSelection={true}
                                  rowDragManaged={true}
                                  animateRows={true}
                                  suppressMoveWhenRowDragging={true}
                                  rowData={
                                    searchinItem === ""
                                      ? datass
                                      : datass?.filter(
                                          (item) =>
                                            item?.name
                                              .toLowerCase()
                                              .indexOf(
                                                searchinItem.toLowerCase()
                                              ) > -1 ||
                                            item?.duration
                                              .toLowerCase()
                                              .indexOf(
                                                searchinItem.toLowerCase()
                                              ) > -1 ||
                                            item?.participants
                                              .toLowerCase()
                                              .indexOf(
                                                searchinItem.toLowerCase()
                                              ) > -1 ||
                                            item?.description
                                              .toLowerCase()
                                              .indexOf(
                                                searchinItem.toLowerCase()
                                              ) > -1
                                        )
                                  }
                                  frameworkComponents={{
                                    btnCellRenderer: BtnCellRenderer,
                                  }}
                                  pagination={true}
                                  paginationPageSize={paginationSize}
                                >
                                  <AgGridColumn field="name" rowDrag={true} />
                                  {/* <AgGridColumn field="description" />
                          <AgGridColumn field="participants" /> */}

                                  {!sameDayEvent && (
                                    <AgGridColumn
                                      field="startDate"
                                      cellRenderer={StartDate}
                                    />
                                  )}
                                  <AgGridColumn
                                    field="startTime"
                                    cellRenderer={StartTime}
                                  />
                                  <AgGridColumn field="duration" />
                                  <AgGridColumn
                                    field="Action"
                                    cellClass="custom-athlete-cell"
                                    cellRenderer="btnCellRenderer"
                                    filter="agNumberColumnFilter"
                                    floatingFilter={false}
                                  />
                                </AgGridReact>
                              </div>
                            </div>{" "}
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <ModalButton
                    style={{ marginTop: "50px" }}
                    onClick={handleModalOpen}
                  >
                    Add Schedule
                  </ModalButton>
                  {/* <ActionButton
                    onClick={onSubmitData}
                    style={{ marginLeft: 20 }}
                  >
                    Save Changes
                  </ActionButton> */}
                  <Modal onClose={closeModal} isOpen={isOpened} size={1000}>
                    <Form style={{ margin: 50 }}>
                      <Row>
                        <Col>
                          <FormControl
                            label="Name"
                            error={touched.name ? errors.name : null}
                          >
                            <Input
                              error={errors.name && touched.name}
                              name="name"
                              type="text"
                              onChange={handleChange}
                              value={value.name}
                              placeholder={"Enter Name"}
                              disabled={showData}
                            ></Input>
                          </FormControl>
                        </Col>
                        <Col>
                          <FormControl
                            label="Room"
                            error={touched.room ? errors.room : null}
                          >
                            <Input
                              error={errors.room && touched.room}
                              name="room"
                              type="text"
                              onChange={handleChange}
                              value={value.room}
                              placeholder={"Enter Room"}
                              disabled={showData}
                            ></Input>
                          </FormControl>
                        </Col>
                        <Col>
                          <FormControl
                            label="Duration"
                            error={touched.duration ? errors.duration : null}
                          >
                            <Input
                              error={errors.duration && touched.duration}
                              type="number"
                              name="duration"
                              onChange={handleChange}
                              value={value.duration}
                              placeholder={"Enter Duration"}
                              disabled={showData}
                            ></Input>
                          </FormControl>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormControl
                            label="Description"
                            error={
                              touched.description ? errors.description : null
                            }
                          >
                            {!showData ? (
                              <Textarea
                                error={
                                  errors.description && touched.description
                                }
                                name="description"
                                type="text"
                                title="HELLOOASHJSHH"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={value.description}
                                placeholder={"Enter Description"}
                                style={{ marginTop: 20 }}
                              ></Textarea>
                            ) : (
                              <input
                                id="username"
                                name="description"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={
                                  value.description.length > 15
                                    ? value.description.slice(0, 15) + "..."
                                    : value.description
                                }
                                disabled
                                title={value.description}
                                style={{
                                  width: "100%",
                                  height: 48,
                                  border: "none",
                                  borderRadius: 0,
                                  backgroundColor: "#F6F6F6",
                                  color: "#AFAFBF",
                                }}
                              />
                            )}
                          </FormControl>
                        </Col>
                        <Col>
                          <FormControl
                            label="Participants"
                            error={
                              touched.participants ? errors.participants : null
                            }
                          >
                            <Textarea
                              error={
                                errors.participants && touched.participants
                              }
                              name="participants"
                              type="text"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={value.participants}
                              placeholder={"Enter Participants"}
                              disabled={showData}
                            ></Textarea>
                          </FormControl>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormControl
                            label="Start Date"
                            error={touched.startDate ? errors.startDate : null}
                          >
                            <Datepicker
                              formatString={"dd/MM/yyyy"}
                              value={minimumDate || new Date()}
                              onChange={({ date }) => {
                                setFieldValue("startDate", date);
                              }}
                              minDate={
                                minimumDate !== null ? minimumDate : new Date()
                              }
                              maxDate={
                                maximumDate !== null ? maximumDate : null
                              }
                              disabled={showData}
                            ></Datepicker>
                          </FormControl>
                        </Col>
                        <Col>
                          <FormControl
                            label="Start Time"
                            error={touched.startTime ? errors.startTime : null}
                          >
                            <TimePicker
                              error={errors.startTime && touched.startTime}
                              value={value.startTime}
                              onChange={(time) =>
                                setFieldValue("startTime", time)
                              }
                              creatable
                              disabled={showData}
                            ></TimePicker>
                          </FormControl>
                        </Col>
                        {/* <Col>
                          <FormControl label="End Date" error={errors.endDate}>
                            <Datepicker
                              value={value.endDate}
                              onChange={({ date }) => {
                                setFieldValue("endDate", date);
                              }}
                              minDate={new Date()}
                            ></Datepicker>
                          </FormControl>
                        </Col> */}
                        <Col>
                          <FormControl
                            label="End Time"
                            error={touched.endTime ? errors.endTime : null}
                          >
                            <TimePicker
                              value={value.endTime}
                              error={errors.endTime && touched.endTime}
                              onChange={(time) =>
                                setFieldValue("endTime", time)
                              }
                              creatable
                              disabled={showData}
                            ></TimePicker>
                          </FormControl>
                        </Col>
                      </Row>
                      <Row>
                        <ModalFooter>
                          {update ? (
                            <ActionButton
                              onClick={handleSubmit}
                              style={{ backgroundColor: "white" }}
                              type="button"
                            >
                              Update schedule
                            </ActionButton>
                          ) : showData ? null : (
                            <>
                              <span
                                style={{
                                  position: "absolute",
                                  right: 350,

                                  marginTop: 10,
                                }}
                              >
                                <Checkbox
                                  checked={checked}
                                  onChange={(e) => setChecked(e.target.checked)}
                                >
                                  Create another
                                </Checkbox>
                              </span>
                              <ActionButton
                                onClick={handleSubmit}
                                style={{ backgroundColor: "white" }}
                                type="button"
                              >
                                Save new Schedule
                              </ActionButton>
                            </>
                          )}

                          <ModalButton
                            type="button"
                            style={{ marginLeft: 40, marginRight: 25 }}
                            onClick={closeModal}
                          >
                            Close
                          </ModalButton>
                        </ModalFooter>
                      </Row>
                    </Form>
                  </Modal>
                </>
              );
            }}
          </Formik>
        </div>
      </SectionBody>
    </>
  );
};
export default EventSchedule;
