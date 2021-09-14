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
import 'ag-grid-enterprise';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  description: Yup.string().required("Description is Required"),
  participants: Yup.string().required("Participants is Required"),
  duration: Yup.string().required("Duration is Required"),
  startTime: Yup.string().required("Start Time is Required"),
  endTime: Yup.string().required("End Time is Required")
});

const Schedule = () => {
  const [datass, setDatasss] = useState([]);
  const [update, setUpdate] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);

  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpened, setIsOpened] = React.useState(false);

  const onSubmit = (values, { resetForm }) => {
    resetForm({});
    values.id = Math.random();
    values.startDate = moment(values.startDate).format("DD MMM YYYY");
    values.startTime = moment(values.startTime).format("HH:mm");
    values.endTime = moment(values.endTime).format("HH:mm");
    console.log("DADAD",values)
    setDatasss([...datass, values]);
  };

  const onUpdate = (values, { resetForm }) => {
    setUpdate(false);
    resetForm({});
    values.startDate = moment(values.startDate).format("DD MMM YYYY");
    values.startTime = moment(values.startTime).format("HH:mm");
    values.endTime = moment(values.endTime).format("HH:mm");
    console.log("DATAT",values)
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

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onBtnExport = () => {
    gridApi.exportDataAsCsv();
  };

  const onBtnImport = () => {
    console.log("HHHHH::")
  }

  const onFileChange = event => {
    setRowData(event.target.files[0]);
  };
  const onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "myFile",
      rowData,
      rowData.name
    );
    console.log(rowData);
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
                setIsOpened(true);
                data.startTime = new Date(data.startDate+" "+data.startTime);
                data.endTime = new Date(data.startDate+ " "+ data.endTime);
                data.startDate = new Date(data.startDate);
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
                  <div style={{ width: '100%', height: 600 }}>
                    <div style={{ margin: '10px 0' }}>
                      <ActionButton onClick={() => onBtnExport()}>
                        Download CSV export file
                      </ActionButton>
                      {/* <input type="file" onChange={onFileChange} />
                      <button onClick={onFileUpload}>
                        Upload!
                      </button> */}
                      {/* <ActionButton style={{ marginLeft: 20 }} onClick={() => onBtnImport()}>
                        CSV import file
                      </ActionButton> */}
                    </div>
                    <div className="grid-wrapper">
                      <div
                        id="myGrid"
                        style={{
                          height: 500,
                          width: '100%',
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
                          rowSelection={'multiple'}
                          rowDragManaged={true}
                          animateRows={true}
                          rowData={datass}
                          frameworkComponents={{
                            btnCellRenderer: BtnCellRenderer,
                          }}
                          pagination={true}
                          paginationPageSize={8}
                        >
                          <AgGridColumn field="name" rowDrag={true} filter="agTextColumnFilter" />
                          <AgGridColumn field="description" filter="agTextColumnFilter" />
                          <AgGridColumn field="participants" filter="agTextColumnFilter" />
                          <AgGridColumn field="duration" filter="agTextColumnFilter" />
                          <AgGridColumn field="startDate" filter="agNumberColumnFilter"
                            floatingFilter={false} />
                          <AgGridColumn field="startTime" filter="agNumberColumnFilter"
                            floatingFilter={false} />
                          <AgGridColumn field="endTime" filter="agNumberColumnFilter"
                            floatingFilter={false} />
                          <AgGridColumn
                            // field="Delete | Edit"
                            cellClass="custom-athlete-cell"
                            cellRenderer="btnCellRenderer"
                            ilter="agNumberColumnFilter"
                            floatingFilter={false}
                          />
                        </AgGridReact>
                      </div>
                    </div>
                  </div>

                  <ModalButton onClick={() => setIsOpened(true)}>
                    Add Schedule
                  </ModalButton>

                  <ActionButton style={{ marginLeft: 20 }}>
                    Save Schedule
                  </ActionButton>

                  <Modal
                    onClose={() => setIsOpened(false)}
                    isOpen={isOpened}
                    size={1000}
                    role={ROLE.alertdialog}
                  >
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
                          <FormControl label="End Time" error={touched.endTime ? errors.endTime : null}>
                            <TimePicker
                              value={value.endTime}
                              error={errors.endTime && touched.endTime}
                              onChange={(time) => setFieldValue("endTime", time)}
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
                              Update Schedule
                            </ActionButton>
                          ) : (
                            <ActionButton
                              onclick={handleSubmit}
                              style={{ backgroundColor: "white" }}
                              type="submit"
                            >
                              New Schedule
                            </ActionButton>
                          )}

                          <ModalButton type="button" style={{ marginLeft: 40, marginRight: 25 }}
                            kind={ButtonKind.tertiary}
                            onClick={() => setIsOpened(false)}
                          >
                            Cancel
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

export default Schedule;


// import { useState } from 'react'

// export default function Schedule(){
//     const [csvFile, setCsvFile] = useState();
//     const [csvArray, setCsvArray] = useState([]);
//     // [{name: "", age: 0, rank: ""},{name: "", age: 0, rank: ""}]

//     const processCSV = (str, delim=',') => {
//         const headers = str.slice(0,str.indexOf('\n')).split(delim);
//         const rows = str.slice(str.indexOf('\n')+1).split('\n');

//         const newArray = rows.map( row => {
//             const values = row.split(delim);
//             const eachObject = headers.reduce((obj, header, i) => {
//                 obj[header] = values[i];
//                 return obj;
//             }, {})
//             return eachObject;
//         })

//         setCsvArray(newArray)
//     }

//     const submit = () => {
//         const file = csvFile;
//         const reader = new FileReader();

//         reader.onload = function(e) {
//             const text = e.target.result;
//             console.log("DADA",text);
//             processCSV(text)
//         }
//         reader.readAsText(file);
//         console.log(reader)
//     }

//     return(
//         <form id='csv-form'>
//             <input
//                 type='file'
//                 accept='.csv'
//                 id='csvFile'
//                 onChange={(e) => {
//                     setCsvFile(e.target.files[0])
//                 }}
//             >
//             </input>
//             <br/>
//             <button
//                 onClick={(e) => {
//                     e.preventDefault()
//                     if(csvFile)submit()
//                 }}
//             >
//                 Submit
//             </button>
//             <br/>
//             <br/>
//             {csvArray.length>0 ? 
//             <>
//                 <table>
//                     <thead>
//                         <th>Name</th>
//                         <th>Age</th>
//                         <th>Rank</th>
//                     </thead>
//                     <tbody>
//                         {
//                             csvArray.map((item, i) => (
//                                 <tr key={i}>
//                                     <td>{item.name}</td>
//                                     <td>{item.age}</td>
//                                     <td>{item.rank}</td>
//                                 </tr>
//                             ))
//                         }
//                     </tbody>
//                 </table>
//             </> : null}
//         </form>
//     );

// }