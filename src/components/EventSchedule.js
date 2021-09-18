import React, { useState, useEffect, useRef } from "react";
import { Input } from "baseui/input";
import { FormControl } from "baseui/form-control";
import SectionBody from "../components/SectionBody";
import SectionHeader from "../components/SectionHeader";
import { Row, Col, Table, Button } from "reactstrap";
import { Delete } from "baseui/icon";
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
  ModalBody,
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
import axios from "axios";
import { API_PATH } from "../Path";
import { requestBase, getEventSchedualUrl } from "../utils";
import { useParams, Prompt, Link } from "react-router-dom";
import {
  Checkbox,
  LABEL_PLACEMENT
} from "baseui/checkbox";

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

const EventSchedule = (props) => {
  const [datass, setDatasss] = useState([]);
  const [update, setUpdate] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const fileInput = useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpened, setIsOpened] = React.useState(false);
  const { eventId } = useParams();
  const [checked, setChecked] = React.useState(false);

  console.log("DADADA", eventId);

  const Cookieheaders = {
    Cookie:
      "_ga=GA1.2.2003048989.1631602995; JSESSIONID=8F1A43F067262D8C69A9F3CD579A0115; csrftkn=hNOcn; _gid=GA1.2.555156501.1631943552; _gat=1; AuthToken=30ee295f-6241-4811-bd59-9f8867bdec0f; eventSearchCriteria=%7B%22pageNo%22%3A1%2C%22resultsPerPage%22%3A20%2C%22radius%22%3A50%2C%22dateRange%22%3A%22%22%2C%22name%22%3A%22%22%2C%22city%22%3A%22%22%2C%22category1%22%3A%22%22%2C%22nickname%22%3A%22TestUser%22%7D",
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
      toaster.positive(<p>Schedule import in the table.</p>);
    }
  };

  const onSubmit = (values, { resetForm }) => {
    resetForm({});
    if(checked !== true){
      setIsOpened(false);
    }
    toaster.positive(<p>Schedule added in the table.</p>);
    values.id = Math.random();
    values.startDate = moment(values.startDate).format("DD MMM YYYY");
    values.startTime = moment(values.startTime).format("HH:mm");
    values.endTime = moment(values.endTime).format("HH:mm");
    setDatasss([...datass, values]);
  };

  const onUpdate = (values, { resetForm }) => {
    setUpdate(false);
    setIsOpened(false);
    resetForm({});
    toaster.positive(<p>Schedule Edit Successfully.</p>);
    values.startDate = moment(values.startDate).format("DD MMM YYYY");
    values.startTime = moment(values.startTime).format("HH:mm");
    values.endTime = moment(values.endTime).format("HH:mm");
    const filterData = datass.map((item) => {
      if (item.id == values.id) {
        item = values;
      }
      return item;
    });
    setDatasss(filterData);
  };

  const deleteData = (data) => {
    localStorage.setItem("id", data.id);
    setIsOpen(true);
  };

  const removeDatas = () => {
    const id = localStorage.getItem("id");
    setIsOpen(false);
    const filterData = datass.filter((item) => item.id != id);
    setDatasss(filterData);
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const onSubmitData = () => {
    const Arr = [];
    datass.map((data) => {
      const item = {
        startDate: data.startDate,
        startTime: data.startTime,
        endTime: data.endTime,
        description: data.description,
        participants: data.participants,
        duration: data.duration,
        name: data.name,
      };
      Arr.push(item);
    });
    axios
      .post(
        API_PATH +
          `/auth/event/eventManagement/edit/createUpdateSchedule/${eventId}`,
        Arr,
        {
          headers: Cookieheaders,
        }
      )
      .then((response) => {
        console.log("object", response);
      });
  };

  const csvReport = {
    data: datass,
    headers: headers,
    filename: "Clue_Mediator_Report.csv",
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
              id: "",
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
                data.startTime = new Date(
                  data.startDate + " " + data.startTime
                );
                data.endTime = new Date(data.startDate + " " + data.endTime);
                data.startDate = new Date(data.startDate);
                for (const [key, value] of Object.entries(data)) {
                  setFieldValue(key, value);
                }
              };

              const closeModal = () => {
                resetForm({});
                setIsOpened(false);
                setUpdate(false);
                setChecked(false)
              };

              const handleModalOpen = () => {
                resetForm({});
                setIsOpened(true);
                setChecked(false)
              };

              const BtnCellRenderer = (props) => {
                return (
                  <>
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
                        <ActionButton>Download File</ActionButton>
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
                        Upload File
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
                          onGridReady={onGridReady}
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
                          <AgGridColumn
                            field="startDate"
                            filter="agNumberColumnFilter"
                            floatingFilter={false}
                          />
                          <AgGridColumn
                            field="startTime"
                            filter="agNumberColumnFilter"
                            floatingFilter={false}
                          />
                          <AgGridColumn
                            field="endTime"
                            filter="agNumberColumnFilter"
                            floatingFilter={false}
                          />
                          <AgGridColumn
                            field="Delete | Edit"
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

                  <ActionButton
                    onClick={onSubmitData}
                    style={{ marginLeft: 20 }}
                  >
                    Save Schedule
                  </ActionButton>

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
                          ) : (
                            <>
                            <span style={{position: 'absolute', right:'35%',marginTop: 10}}>
                            <Checkbox
                            checked={checked}
                            onChange={e => setChecked(e.target.checked)}
                          >
                            Create another
                          </Checkbox>
                          </span>
                            <ActionButton
                              onclick={handleSubmit}
                              style={{ backgroundColor: "white" }}
                              type="submit"
                            >
                              Add new schedule
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
