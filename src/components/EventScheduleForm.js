import { KIND as ButtonKind } from "baseui/button";
import { Datepicker } from "baseui/datepicker";
import { Input } from "baseui/input";
import {
  ModalButton, ModalFooter
} from "baseui/modal";
import { TimePicker } from "baseui/timepicker";
import { Form, Formik } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import * as Yup from "yup";
import ActionButton from "../components/ActionButton";
import FormControl from "../components/FormControl";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  description: Yup.string().required("Description is Required"),
  participants: Yup.string().required("Participants is Required"),
  duration: Yup.string().required("Duration is Required"),
  startTime: Yup.string().required("Start Time is Required"),
  endTime: Yup.string().required("End Time is Required"),
});

export default function EventScheduleForm(props) {
  const [update, setUpdate] = useState(props.update);
  const [datass, setDatasss] = useState([]);

  const onSubmit = (values, { resetForm }) => {
    resetForm({});
    values.id = Math.random();
    values.startDate = moment(values.startDate).format("DD MMM YYYY");
    values.startTime = moment(values.startTime).format("HH:mm");
    values.endTime = moment(values.endTime).format("HH:mm");
    console.log("DADAD", values);
    setDatasss([...datass, values]);
  };

  const onUpdate = (values, { resetForm }) => {
    setUpdate(false);
    resetForm({});
    values.startDate = moment(values.startDate).format("DD MMM YYYY");
    values.startTime = moment(values.startTime).format("HH:mm");
    values.endTime = moment(values.endTime).format("HH:mm");
    console.log("DATAT", values);
    const filterData = datass.map((item) => {
      if (item.id === values.id) {
        item = values;
      }
      return item;
    });
    setDatasss(filterData);
  };

  return (
    <Formik
      initialValues={{
        id: '',
        name: update ? props.editData.name : "",
        description: update ? props.editData.description : "",
        participants: update ? props.editData.participants :  "",
        duration: update ? props.editData.duration :  "",
        startTime:  update ? new Date(
            props.editData.startDate + " " + props.editData.startTime
            ) : "",
        endTime: update ? new Date(props.editData.startDate + " " + props.editData.endTime) : "",
        startDate: update ? new Date(props.editData.startDate) : new Date(),
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
        return (
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
                  error={touched.description ? errors.description : null}
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
                  error={touched.participants ? errors.participants : null}
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
                    onChange={(time) => setFieldValue("startTime", time)}
                    creatable
                  ></TimePicker>
                </FormControl>
              </Col>
              <Col>
                <FormControl
                  label="End Time"
                  error={touched.endTime ? errors.endTime : null}
                >
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

                <ModalButton
                  type="button"
                  style={{ marginLeft: 40, marginRight: 25 }}
                  kind={ButtonKind.tertiary}
                  onClick={() => props.setIsOpened(false)}
                >
                  Cancel
                </ModalButton>
              </ModalFooter>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
}
