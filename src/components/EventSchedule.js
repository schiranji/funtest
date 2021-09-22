import React, { useState, useEffect, useRef } from "react";
import { Input } from "baseui/input";
import { FormControl } from "baseui/form-control";
import SectionBody from "../components/SectionBody";
import SectionHeader from "../components/SectionHeader";
import { Row, Col } from "reactstrap";
import { Delete } from "baseui/icon";
import { Datepicker } from "baseui/datepicker";
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
import { CSVLink } from "react-csv";
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
  startTime: Yup.string().required("Start Time is Required"),
  endTime: Yup.string().required("End Time is Required"),
});

const EventSchedule = () => {
  const [datass, setDatasss] = useState([]);
  const [update, setUpdate] = useState(false);
  const [showData, setShowData] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const fileInput = useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpened, setIsOpened] = React.useState(false);
  const { eventId } = useParams();
  const [checked, setChecked] = React.useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);

  useEffect(() => {
    const getEventMedia = async () => {
      let url = `/auth/event/event/view/getEvent/${eventId}`;
      const getReq = await requestBase.get(url);
      console.log("DADADAD", getReq.data.startDateTime);
      setGridApi(getReq.data.scheduleItems);
      setDatasss(...datass, getReq.data.scheduleItems);
    };
    getEventMedia();
  }, [eventId]);

  const onSubmitData = () => {
    const Arr = [];
    datass.map((data) => {
      const item = {
        startDateTime: data.startDateTime,
        endDateTime: data.endDateTime,
        description: data.description,
        participants: data.participants,
        duration: data.duration,
        name: data.name,
      };
      Arr.push(item);
    });
    requestBase.post(
      `/auth/event/eventManagement/edit/createUpdateSchedule/${eventId}`,
      JSON.parse(JSON.stringify(Arr))
    );
  };

  const processData = (dataString) => {
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
      data.id = Math.random();
      data.name = data.Name;
      data.participants = data.Participants;
      data.description = data.Description;
      data.duration = data.Duration;
      data.startDate = moment(data.Start_Date).format("DD MMM YYYY");
      data.startTime = data.Start_Time;
      data.endTime = data.End_Time;
      data.startDateTime = Date.parse(data.startDate + " " + data.startTime);
      data.endDateTime = Date.parse(data.startDate + " " + data.endTime);
      array.push(data);
    });
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

  useEffect(() => {
    if (datass.length !== 0) {
      onSubmitData();
    }
  }, [datass]);

  const onSubmit = (values, { resetForm }) => {
    resetForm({});
    if (checked !== true) {
      setIsOpened(false);
    }
    values.startDate = moment(values.startDate).format("DD MMM YYYY");
    values.startTime = moment(values.startTime).format("HH:mm");
    values.endTime = moment(values.endTime).format("HH:mm");
    values.startDateTime = Date.parse(
      values.startDate + " " + values.startTime
    );
    values.endDateTime = Date.parse(values.startDate + " " + values.endTime);
    toaster.positive(<p>Schedule has been added.</p>);
    setDatasss([...datass, values]);
  };

  const onUpdate = (values, { resetForm }) => {
    setUpdate(false);
    setIsOpened(false);
    resetForm({});
    values.startDate = moment(values.startDate).format("DD MMM YYYY");
    values.startTime = moment(values.startTime).format("HH:mm");
    values.endTime = moment(values.endTime).format("HH:mm");

    values.startDateTime = Date.parse(
      values.startDate + " " + values.startTime
    );
    values.endDateTime = Date.parse(values.startDate + " " + values.endTime);
    
    const filterData = datass.map((item) => {
      if (item.name == values.name) {
        item = values;
      }
      return item;
    });
    toaster.positive(<p>Schedule has been update.</p>);
    setDatasss(filterData);
  };

  const deleteData = (data) => {
    setSelectedScheduleId(data.id ? data.id : 26);
    setIsOpen(true);
  };

  const removeDatas = () => {
    setIsOpen(false);
    if (selectedScheduleId !== null) {
      requestBase.delete(
        `/auth/event/event/delete/schedule-item/${eventId}/${selectedScheduleId}`
      );
      // toaster.positive(<p>Schedule has been deleted.</p>);
    } else {
      toaster.warning(<p>Schedule item id is not found.</p>);
    }
  };

  const csvReport = {
    data: datass,
    headers: headers,
    filename: "FunZippy_Event_Schedule.csv",
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
              startDate: new Date(),
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
              isValid,
              values: value,
              errors,
              setFieldValue,
              resetForm,
            }) => {
              const editHandlar = (data) => {
                setUpdate(true);
                setIsOpened(true);
                data.startTime = new Date(data.startDateTime);
                data.endTime = new Date(data.endDateTime);
                data.startDate = new Date(data.startDateTime);
                console.log(data);
                for (const [key, value] of Object.entries(data)) {
                  setFieldValue(key, value);
                }
              };

              const viewData = (data) => {
                setShowData(true);
                setIsOpened(true);
                data.startTime = new Date(data.startDateTime);
                data.endTime = new Date(data.endDateTime);
                data.startDate = new Date(data.startDateTime);
                console.log(data);
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
                setChecked(false);
              };

              const BtnCellRenderer = (props) => {
                return (
                  <>
                    <ActionButton onClick={() => viewData(props.data)}>
                      View{" "}
                    </ActionButton>
                    <Delete size={35} onClick={() => deleteData(props.data)} />{" "}
                    |
                    <AiFillEdit
                      size={30}
                      onClick={() => editHandlar(props.data)}
                    />
                  </>
                );
              };

              return (
                <>
                  <div style={{ width: "100%", height: 600 }}>
                    <div style={{ margin: "10px 0" }}>
                      <CSVLink
                        {...csvReport}
                        style={{ textDecoration: "none", color: "black" }}
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
                            floatingFilter: true,
                          }}
                          suppressRowClickSelection={true}
                          rowSelection={"multiple"}
                          rowDragManaged={true}
                          animateRows={true}
                          rowData={datass}
                          frameworkComponents={{
                            btnCellRenderer: BtnCellRenderer,
                          }}
                          pagination={true}
                          paginationPageSize={8}
                        >
                          <AgGridColumn
                            field="name"
                            rowDrag={true}
                            filter="agTextColumnFilter"
                          />
                          <AgGridColumn
                            field="description"
                            filter="agTextColumnFilter"
                          />
                          <AgGridColumn
                            field="participants"
                            filter="agTextColumnFilter"
                          />
                          <AgGridColumn
                            field="duration"
                            filter="agTextColumnFilter"
                          />
                          {/* <AgGridColumn
                            field="startDate"
                            filter="agNumberColumnFilter"
                            floatingFilter={false}
                            cellRenderer={StartDate}
                          />
                          <AgGridColumn
                            field="startTime"
                            filter="agNumberColumnFilter"
                            floatingFilter={false}
                            cellRenderer={StartTime}
                          />
                          <AgGridColumn
                            field="endTime"
                            filter="agNumberColumnFilter"
                            floatingFilter={false}
                            cellRenderer={EndTime}
                          /> */}
                          <AgGridColumn
                            field="View | Delete | Edit"
                            cellClass="custom-athlete-cell"
                            cellRenderer="btnCellRenderer"
                            ilter="agNumberColumnFilter"
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
                            <Input
                              error={errors.description && touched.description}
                              name="description"
                              type="text"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={value.description}
                              placeholder={"Enter Description"}
                              disabled={showData}
                            ></Input>
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
                              value={value.startDate}
                              onChange={({ date }) => {
                                setFieldValue("startDate", date);
                              }}
                              minDate={new Date()}
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
                              onclick={handleSubmit}
                              style={{ backgroundColor: "white" }}
                              type="submit"
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
                                onclick={handleSubmit}
                                style={{ backgroundColor: "white" }}
                                type="submit"
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
