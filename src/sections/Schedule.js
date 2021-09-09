import React, { useState } from "react";
import { Input } from "baseui/input";
import FormControl from "../components/FormControl";
import SectionBody from "../components/SectionBody";
import SectionHeader from "../components/SectionHeader";
import { Row, Col,Table } from "reactstrap";
import { Datepicker, TimezonePicker } from "baseui/datepicker";
import { TimePicker } from "baseui/timepicker";
import SubSection from "../components/Subsection";
import ActionButton from "../components/ActionButton";
import { Formik, Form} from "formik";
import * as Yup from "yup";
import moment from 'moment';


const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  description: Yup.string().required("Description is Required"),
  participants: Yup.string().required("Participants is Required"),
  duration: Yup.string().required("Duration is Required"),
  // email: Yup.string().email('Invalid email').required('Required'),
});
const Schedule = () => {

  const [datassss, setDatasss] = useState([]);

  const onSubmit = (values) =>{
    const value = {
      description: values.description,
      duration: values.duration,
      name:values.name,
      participants: values.participants,
      startDate: (values.startDate).toDateString(),     
      startTime: (values.startTime).toString(), 
      endDate: (values.endDate).toDateString(),
      endTime: (values.endTime).toString()
    };
    setDatasss([...datassss,value]);
  }
  console.log("object",datassss)

  return (
    <>
      <SectionHeader>
        <h1>Event Scheduler</h1>
      </SectionHeader>
      <SectionBody>
      <Table>
      <thead>
        <tr>
          <th>S no.</th>
          <th>Name</th>
          <th>Description</th>
          <th>Duration</th>
          <th>Participants</th>
          <th>Start Date</th>
          <th>Start Time</th>
          <th>End Date</th>
          <th>End Time</th>
        </tr>
      </thead>
      <tbody>
        {
          datassss.map((data, index) => {
            return(
              <tr>
              <th scope="row">{index + 1}</th>
              <td>{data.name}</td>
              <td>{data.description}</td>
              <td>{data.duration}</td>
              <td>{data.participants}</td>
              <td>{moment(data.startDate).format("DD/MM/YYYY")}</td>
              <td>{moment(data.startTime).format("hh:mm a")}</td>
              <td>{moment(data.endDate).format("DD/MM/YYYY")}</td>
              <td>{moment(data.endTime).format("hh:mm a")}</td>
            </tr>
            )
          })
        }
      </tbody>
    </Table>
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
              endDate: new Date(),
              startTime: '',
              endTime: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              onSubmit(values);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue}) => (
              <Form>
                <Row>
                  <Col>
                    <FormControl label="Name" error={errors.name}>
                      <Input
                        error={errors.name}
                        name="name"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        placeholder={"Enter Name"}
                      ></Input>
                    </FormControl>
                  </Col>
                  <Col>
                    <FormControl label="Description" error={errors.description}>
                      <Input
                        error={errors.description}
                        name="description"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        placeholder={"Enter Description"}
                      ></Input>
                    </FormControl>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormControl
                      label="Participants"
                      error={errors.participants}
                    >
                      <Input
                        error={errors.participants}
                        name="participants"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.participants}
                        placeholder={"Enter Participants"}
                      ></Input>
                    </FormControl>
                  </Col>
                  <Col>
                    <FormControl label="Duration" error={errors.duration}>
                      <Input
                        error={errors.duration}
                        type="number"
                        name="duration"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.duration}
                        placeholder={"Enter Duration"}
                      ></Input>
                    </FormControl>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormControl label="Start Date" error={errors.startDate}>
                      <Datepicker
                        value={values.startDate}
                        onChange={({date}) => {
                          setFieldValue("startDate", date);
                        }}
                        minDate={new Date()}
                      ></Datepicker>
                    </FormControl>
                  </Col>
                  <Col>
                    <FormControl label="Start Time" error={errors.startTime}>
                      <TimePicker
                        value={values.startTime}
                        onChange={(time) => setFieldValue("startTime", time)}
                        creatable
                      ></TimePicker>
                    </FormControl>
                  </Col>
                  <Col>
                    <FormControl label="End Date" error={errors.endDate}>
                      <Datepicker
                        value={values.endDate}
                        onChange={({date}) => {
                          setFieldValue("endDate", date);
                        }}
                        minDate={new Date()}
                      ></Datepicker>
                    </FormControl>
                  </Col>
                  <Col>
                    <FormControl label="End Time" error={errors.endTime}>
                      <TimePicker
                        value={values.endTime}
                        onChange={(time) => setFieldValue("endTime", time)}
                        creatable
                      ></TimePicker>
                    </FormControl>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ActionButton onclick={handleSubmit} style={{backgroundColor: 'white'}} type="submit">
                      Add New Schedule
                    </ActionButton>
                    <ActionButton style={{marginLeft: 20}}>
                      Save Schedule
                    </ActionButton>
                  </Col>
                  <Col>
                    
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
      </SectionBody>
    </>
  );
};

export default Schedule;
