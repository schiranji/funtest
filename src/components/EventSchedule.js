import React, { useState, useEffect, useRef } from "react";
import { Input } from "baseui/input";
import { FormControl } from "baseui/form-control";
import SectionBody from "../components/SectionBody";
import SectionHeader from "../components/SectionHeader";
import { Row, Col } from "reactstrap";
import { Delete } from "baseui/icon";
import Show from "baseui/icon/show";
import { Datepicker, TimezonePicker } from "baseui/datepicker";
import { TimePicker } from "baseui/timepicker";
import SubSection from "../components/Subsection";
import ActionButton from "../components/ActionButton";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { AiFillEdit } from "react-icons/ai";
import * as XLSX from "xlsx";
import { toaster } from "baseui/toast";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";
import { KIND as ButtonKind } from "baseui/button";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { CSVLink, CSVDownload } from "react-csv";
import { requestBase } from "../utils";
import { useParams } from "react-router-dom";
import { Checkbox } from "baseui/checkbox";

const headers = [
  { label: "Name", key: "name" },
  { label: "Description", key: "description" },
  { label: "Participants", key: "participants" },
  { label: "Duration", key: "duration" },
  { label: "Start_Date", key: "startDate" },
  { label: "Start_Time", key: "startTime" },
  { label: "End_Time", key: "endTime" },
];

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  description: Yup.string().required("Description is Required"),
  participants: Yup.string().required("Participants is Required"),
  duration: Yup.string().required("Duration is Required"),
  startDate: Yup.string().required("Start Date is Required"),
  startTime: Yup.string().required("Start Time is Required"),
  endTime: Yup.string().required("End Time is Required"),
});

const EventSchedule = () => {
  const [datass, setDatasss] = useState([]);
  const [update, setUpdate] = useState(false);
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

  useEffect(() => {
    const getEventMedia = async () => {
      try {
        let url = `/auth/event/event/search/schedule-item/${eventId}`;
        const getReq = await requestBase.get(url);
        // setMinimumDate(new Date(getReq.data.startDateTime));
        // setMaximumDate(new Date(getReq.data.endDateTime));
        console.log(new Date(getReq.data.startDateTime));
        if (getReq.data) {
          setGetRequest(false);
          setDatasss(...datass, getReq.data);
        } else {
          setDatasss([]);
        }
      } catch (e) {
        console.log("error!");
      }
    };
    getEventMedia();
  }, [eventId]);

  useEffect(() => {
    const Array = [];
    datass.map((values) => {
      values.startDate = moment(values.startDate).format("DD MMM YYYY");
      values.startTime = moment(values.startTime).format("HH:mm");
      values.endTime = moment(values.endTime).format("HH:mm");
      Array.push(values);
    });
    setGetDownload(Array);
  }, [datass]);

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
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"') d = d.substring(d.length - 2, 1);
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
    setDatasss((prev) => [...prev, ...array]);
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

  const onSubmit = async(values, { resetForm })  => {
    setGetRequest(true);
    console.log(values)
    resetForm({});
    if (checked !== true) {
      setIsOpened(false);
    }
    values.startDate = moment(values.startDate).format("DD MMM YYYY");
    values.startTime = moment(values.startTime).format("HH:mm");
    values.endTime = moment(values.endTime).format("HH:mm");
    values.startDateTime = new Date(
      values.startDate + " " + values.startTime
    ).toISOString();
    values.endDateTime = new Date(
      values.startDate + " " + values.endTime
    ).toISOString();
    console.log("record added values",values);
    const respo = await requestBase.post(
      `/auth/event/event/create/schedule-item/${eventId}`,
      JSON.parse(JSON.stringify(values))
    );
    
    if(respo){
      toaster.positive(<p>Schedule has been added.</p>);
      const getRes = await requestBase.get(
        `/auth/event/event/search/schedule-item/${eventId}`
      );
      if(getRes.data){
        setDatasss(getRes.data)
    }
    }
    // setDatasss([...datass, values]);
  };

  const onUpdate = (values, { resetForm }) => {
    setUpdate(false);
    setIsOpened(false);
    setGetRequest(true);
    resetForm({});
    values.startDate = moment(values.startDate).format("DD MMM YYYY");
    values.startTime = moment(values.startTime).format("HH:mm");
    values.endTime = moment(values.endTime).format("HH:mm");

    values.startDateTime = new Date(
      values.startDate + " " + values.startTime
    ).toISOString();
    values.endDateTime = new Date(
      values.startDate + " " + values.endTime
    ).toISOString();

    const filterData = datass.map((item) => {
      if (item.name === values.name) {
        item = values;
      }
      return item;
    });
    toaster.positive(<p>Schedule has been update.</p>);
    setDatasss(filterData);
  };

  const deleteData = (data) => {
    setSelectedScheduleId(data?.uid );
    setIsOpen(true);
  };

  const removeDatas = async () => { 
    setIsOpen(false);
    if (selectedScheduleId) {
      const response =await requestBase.delete(
        `/auth/event/event/delete/schedule-item/${eventId}/${selectedScheduleId}`
      );
      if(response.data.statusDescription === "Success"){
        const getRes =await requestBase.get(
          `/auth/event/event/search/schedule-item/${eventId}`
        );
        ;
        if(getRes.data){
          setDatasss(getRes.data)
        }
      }
      toaster.positive(<p>Schedule has been deleted.</p>);
    } else {
      toaster.warning(<p>Schedule item id is not found.</p>);
    }
  };

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
          <p>Set up your event's schedule!</p>
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

              const StartTime = (props) => {
                return moment(props.data.startDateTime).format(
                  "DD MMM YYYY HH:mm"
                );
              };
              return (
                <>
                  <div style={{ width: "100%", height: 600 }}>
                    <div style={{ margin: "10px 0" }}>
                      <CSVLink
                        data={getDownload ? getDownload : null}
                        headers={headers ? headers : null}
                        filename="FunZippy_Event_Schedule.csv"
                        target="_blank"
                        style={{ textDecoration: "none" }}
                      >
                        <ActionButton>Download Schedule</ActionButton>
                      </CSVLink>
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
                    </div>
                    <div className="grid-wrapper">
                      <div
                        id="myGrid"
                        style={{
                          height: 500,
                          width: "100%",
                        }}
                        className="ag-theme-alpine"
                      >
                        <AgGridReact
                          defaultColDef={{
                            sortable: true,
                            filter: true,
                            editable: true,
                            // floatingFilter: true,
                          }}
                          // suppressRowClickSelection={true}
                          rowDragManaged={false}
                          animateRows={true}
                          rowData={
                            searchinItem === ""
                              ? datass
                              : datass?.filter(
                                  (item) =>
                                    item?.name
                                      .toLowerCase()
                                      .indexOf(searchinItem.toLowerCase()) >
                                      -1 ||
                                    item?.duration
                                      .toLowerCase()
                                      .indexOf(searchinItem.toLowerCase()) >
                                      -1 ||
                                    item?.participants
                                      .toLowerCase()
                                      .indexOf(searchinItem.toLowerCase()) >
                                      -1 ||
                                    item?.description
                                      .toLowerCase()
                                      .indexOf(searchinItem.toLowerCase()) > -1
                                )
                          }
                          frameworkComponents={{
                            btnCellRenderer: BtnCellRenderer,
                          }}
                          pagination={true}
                          paginationPageSize={10}
                        >
                          <AgGridColumn field="name" rowDrag={true} />
                          {/* <AgGridColumn field="description" />
                          <AgGridColumn field="participants" /> */}
                          <AgGridColumn field="duration"/>
                          <AgGridColumn
                            field="startTime"
                            cellRenderer={StartTime}
                          />
                          <AgGridColumn
                            field="View | Delete | Edit"
                            cellClass="custom-athlete-cell"
                            cellRenderer="btnCellRenderer"
                            filter="agNumberColumnFilter"
                            floatingFilter={false}
                          />
                        </AgGridReact>
                      </div>
                    </div>
                  </div>

                  <ModalButton onClick={handleModalOpen}>
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
                              onBlur={handleBlur}
                              value={value.name}
                              placeholder={"Enter Name"}
                              disabled={showData}
                            ></Input>
                          </FormControl>
                        </Col>
                        <Col>
                          <FormControl
                            label="Description"
                            error={
                              touched.description ? errors.description : null
                            }
                          >
                            {!showData ? (
                              <Input
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
                              ></Input>
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
                      </Row>

                      <Row>
                        <Col>
                          <FormControl
                            label="Participants"
                            error={
                              touched.participants ? errors.participants : null
                            }
                          >
                            <Input
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
                              onBlur={handleBlur}
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
                            label="Start Date"
                            error={touched.startDate ? errors.startDate : null}
                          >
                            <Datepicker
                              value={minimumDate || new Date()}
                              onChange={({ date }) => {
                                setFieldValue("startDate", date);
                              }}
                              minDate={minimumDate !== null? minimumDate : new Date()}
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
