import React, { useState } from "react";
import { FormControl } from "baseui/form-control";
import { Formik, Form, useFormikContext } from "formik";
import { Row, Col } from "reactstrap";
import { Modal, ModalHeader, ModalFooter } from "baseui/modal";
import { Datepicker } from "baseui/datepicker";
import { Button, KIND } from "baseui/button";
import { Input } from "baseui/input";
import * as Yup from "yup";
import { requestBase } from "../utils";
import { toaster } from "baseui/toast";
import { TimePicker } from "baseui/timepicker";
import moment from "moment";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SignupSchema = Yup.object().shape({
  signupName: Yup.string().max(50),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, {
      message: "Phone number is not valid",
    })
    .max(15)
    .min(9),
  emailAdddress: Yup.string().email("Please enter valid email").max(50),
  startDateTime: Yup.string().required("Please provide date"),
  endDateTime: Yup.string().required("Please provide date"),
  startTime: Yup.string().required("Please provide time"),
  endTime: Yup.string().required("Please provide time"),
});

export const EditTimeSlot = (props) => {
  const [isloading, setLoading] = useState(false);
  const HandleSave = async (values) => {
    values.startDateTime = new Date(
      moment(values.startDateTime).format("DD MMM YYYY") +
        " " +
        moment(values.startTime).format("HH:mm")
    );
    values.endDateTime = new Date(
      moment(values.endDateTime).format("DD MMM YYYY") +
        " " +
        moment(values.endTime).format("HH:mm")
    );

    setLoading(true);
    const url = props.isNew
      ? `/auth/groupEvent/event/create/timeslot/${props.eventManagementData.eventId}`
      : `/auth/groupEvent/event/update/timeslot/${props.eventManagementData.eventId}/${values.uid}`;
    try {
      const response = await requestBase[props.isNew ? "post" : "put"](
        url,
        JSON.parse(JSON.stringify(values))
      );
      if (response.data.statusDescription === "Success") {
        toaster.positive(<p>TimeSlot has been update.</p>);
      } else {
        toaster.negative(<p>something went wrong.</p>);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toaster.negative(<p>something went wrong.</p>);
    }
    setTimeout(() => {
      props.handleClose();
      props.pageRefresh();
    }, 100);
  };
  const { setFieldValue, values } = useFormikContext();
  const { startTime, endTime } = values;

  return (
    <Modal onClose={props.handleClose} isOpen={props.isOpen} size={1000}>
      <ModalHeader>
        {(props.viewOnly ? "View" : props.isNew ? "Create" : "Edit") +
          " TimeSlot"}
      </ModalHeader>
      <Formik
        initialValues={
          props.isNew
            ? {
                signupName: "",
                phoneNumber: "",
                emailAdddress: "",
                startDateTime: "",
                endDateTime: "",
                startTime: "",
                endTime: "",
              }
            : {
                ...props.data,
                signupName: props.data.signupName,
                phoneNumber: props.data.phoneNumber,
                emailAdddress: props.data.emailAdddress,
                startDateTime: new Date(props.data.startDateTime),
                endDateTime: new Date(props.data.endDateTime),
                startTime: new Date(props.data.startDateTime),
                endTime: new Date(props.data.endDateTime),
              }
        }
        validationSchema={SignupSchema}
        onSubmit={HandleSave}
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
        }) => (
          <Form style={{ margin: 50 }}>
            <Row>
              <Col>
                <FormControl
                  label="Start Date"
                  error={touched.startDateTime ? errors.startDateTime : null}
                >
                  <Datepicker
                    formatString="MM/dd/yyyy"
                    onChange={({ time, date }) => {
                      setFieldValue("startDateTime", date);
                    }}
                    onBlur={handleBlur}
                    value={value.startDateTime}
                    disabled={props.viewOnly}
                    minDate={startTime}
                    maxDate={endTime}
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
                  label="End Date"
                  error={touched.endDateTime ? errors.endDateTime : null}
                >
                  <Datepicker
                    formatString="MM/dd/yyyy"
                    onChange={({ time, date }) => {
                      setFieldValue("endDateTime", date);
                    }}
                    onBlur={handleBlur}
                    value={value.endDateTime}
                    disabled={props.viewOnly}
                    minDate={startTime}
                    maxDate={endTime}
                  ></Datepicker>
                </FormControl>
              </Col>
              <Col>
                <FormControl
                  label="End Time"
                  error={touched.endTime ? errors.endTime : null}
                >
                  <TimePicker
                    error={errors.endTime && touched.endTime}
                    value={value.endTime}
                    onChange={(time) => setFieldValue("endTime", time)}
                    creatable
                  ></TimePicker>
                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormControl
                  label="Name"
                  error={touched.signupName ? errors.signupName : null}
                >
                  <Input
                    error={errors.signupName && touched.signupName}
                    name="signupName"
                    type="text"
                    onChange={handleChange}
                    value={value.signupName}
                    placeholder={"Enter Name"}
                    disabled={props.viewOnly}
                  ></Input>
                </FormControl>
              </Col>
              <Col>
                <FormControl
                  label="Phone"
                  error={touched.phoneNumber ? errors.phoneNumber : null}
                >
                  <Input
                    error={errors.phoneNumber && touched.phoneNumber}
                    name="phoneNumber"
                    type="text"
                    onChange={handleChange}
                    value={value.phoneNumber}
                    placeholder={"Enter Phone"}
                    disabled={props.viewOnly}
                  ></Input>
                </FormControl>
              </Col>
              <Col>
                <FormControl
                  label="Email"
                  error={touched.emailAdddress ? errors.emailAdddress : null}
                >
                  <Input
                    error={errors.emailAdddress && touched.emailAdddress}
                    type="email"
                    name="emailAdddress"
                    onChange={handleChange}
                    value={value.emailAdddress}
                    placeholder={"Enter Email"}
                    disabled={props.viewOnly}
                  ></Input>
                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col></Col>
              <Col></Col>
            </Row>
            <ModalFooter>
              <Button
                style={{ "margin-right": "10px" }}
                type="button"
                onClick={props.handleClose}
                kind={KIND.primary}
              >
                Cancel
              </Button>
              {!props.viewOnly && (
                <Button
                  isloading={isloading}
                  type={"submit"}
                  onClick={handleSubmit}
                  kind={KIND.primary}
                >
                  Save
                </Button>
              )}
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
