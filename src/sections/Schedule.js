import React, { useState, useEffect } from "react";
import { Input } from "baseui/input";
import FormControl from "../components/FormControl";
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
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";


const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  description: Yup.string().required("Description is Required"),
  participants: Yup.string().required("Participants is Required"),
  duration: Yup.string().required("Duration is Required"),
});

const Schedule = () => {
  const [datass, setDatasss] = useState([]);
  const [update, setUpdate] = useState(false);
  // const [gridApi, setGridApi] = useState(null);
  // const [gridColumnApi, setGridColumnApi] = useState(null);
  // const [rowData, setRowData] = useState(null);

  const [isOpen, setIsOpen] = React.useState(false);

  const onSubmit = (values, { resetForm }) => {
    resetForm({});
    values.id = Math.random();
    setDatasss([...datass, values]);
  };

  const onUpdate = (values, { resetForm }) => {
    setUpdate(false);
    resetForm({});
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
    setIsOpen(false)
    const filterData = datass.filter(item => item.id != id);
    setDatasss(filterData)
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
        <ModalHeader>Hello world</ModalHeader>
        <ModalBody>Are you sure you want delete?</ModalBody>
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
              endDate: new Date(),
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
            }) => {
              const editHandlar = (data) => {
                setUpdate(true);
                for (const [key, value] of Object.entries(data)) {
                  setFieldValue(key, value);
                }
              };

              const BtnCellRenderer = (props) => {
                return (
                  <>
                    <Delete size={35} onClick={() => deleteData(props.data)} /> |
                    <AiFillEdit size={30} onClick={() => editHandlar(props.data)} />
                  </>
                );
              };
              return (
                <>
                  <div style={{ width: "100%", height: 250 }}>
                    <div
                      id="myGrid"
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                      className="ag-theme-alpine"
                    >
                      <AgGridReact
                        defaultColDef={{
                          sortable: true,
                          filter: true,
                        }}
                        rowDragManaged={true}
                        animateRows={true}
                        // onGridReady={onGridReady}
                        rowData={datass}
                        frameworkComponents={{
                          btnCellRenderer: BtnCellRenderer,
                        }}
                      >
                        <AgGridColumn field="name" rowDrag={true} />
                        <AgGridColumn field="description" />
                        <AgGridColumn field="participants" />
                        <AgGridColumn field="duration" />
                        <AgGridColumn field="startDate"/>
                        <AgGridColumn field="startTime" />
                        <AgGridColumn field="endDate" />
                        <AgGridColumn field="endTime" />
                        <AgGridColumn
                          field="Delete | Edit"
                          cellClass="custom-athlete-cell"
                          cellRenderer="btnCellRenderer"
                        />
                      </AgGridReact>
                    </div>
                  </div>
                  <Form>
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
                            error={errors.participants && touched.participants}
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
                            type="text"
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
                          error={errors.startDate}
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
                          error={errors.startTime}
                        >
                          <TimePicker
                            value={value.startTime}
                            onChange={(time) =>
                              setFieldValue("startTime", time)
                            }
                            creatable
                          ></TimePicker>
                        </FormControl>
                      </Col>
                      <Col>
                        <FormControl label="End Date" error={errors.endDate}>
                          <Datepicker
                            value={value.endDate}
                            onChange={({ date }) => {
                              setFieldValue("endDate", date);
                            }}
                            minDate={new Date()}
                          ></Datepicker>
                        </FormControl>
                      </Col>
                      <Col>
                        <FormControl label="End Time" error={errors.endTime}>
                          <TimePicker
                            value={value.endTime}
                            onChange={(time) => setFieldValue("endTime", time)}
                            creatable
                          ></TimePicker>
                        </FormControl>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        {update ? (
                          <ActionButton
                            onclick={handleSubmit}
                            style={{ backgroundColor: "white" }}
                            type="submit"
                          >
                            Update Schedule
                          </ActionButton>
                        ) : (
                          <ActionButton
                            onclick={handleSubmit}
                            style={{ backgroundColor: "white" }}
                            type="submit"
                          >
                            Add New Schedule
                          </ActionButton>
                        )}

                        <ActionButton style={{ marginLeft: 20 }}>
                          Save Schedule
                        </ActionButton>
                      </Col>
                      <Col></Col>
                    </Row>
                  </Form>
                </>
              );
            }}
          </Formik>
        </div>
      </SectionBody>
    </>
  );
};

export default Schedule;

// import React, { useState } from 'react';
// import { render } from 'react-dom';
// import { AgGridReact, AgGridColumn } from 'ag-grid-react';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

//  const Schedule = () => {
//   const [gridApi, setGridApi] = useState(null);
//   const [gridColumnApi, setGridColumnApi] = useState(null);
//   const [rowData, setRowData] = useState(null);

//   const onGridReady = (params) => {
//     setGridApi(params.api);
//     setGridColumnApi(params.columnApi);

//     const updateData = (data) => {
//       setRowData(data);
//     };

//     fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
//       .then((resp) => resp.json())
//       .then((data) => updateData(data));
//   };

//   return (
//     <div style={{ width: '100%', height: '100%' }}>
//       <div
//         id="myGrid"
//         style={{
//           height: '100%',
//           width: '100%',
//         }}
//         className="ag-theme-alpine"
//       >
//         <AgGridReact
//           defaultColDef={{
//             width: 170,
//             sortable: true,
//             filter: true,
//           }}
//           rowDragManaged={true}
//           animateRows={true}
//           onGridReady={onGridReady}
//           rowData={rowData}
//         >
//           <AgGridColumn field="athlete" rowDrag={true} />
//           <AgGridColumn field="country" />
//           <AgGridColumn field="year" width={100} />
//           <AgGridColumn field="date" />
//           <AgGridColumn field="sport" />
//           <AgGridColumn field="gold" />
//           <AgGridColumn field="silver" />
//           <AgGridColumn field="bronze" />
//         </AgGridReact>
//       </div>
//     </div>
//   );
// };

// export default Schedule;
