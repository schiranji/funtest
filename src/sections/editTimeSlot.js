import React from "react";
import { FormControl } from "baseui/form-control";
import { Formik, Form } from "formik";
import { Row, Col } from "reactstrap";
import { Modal, ModalHeader, ModalFooter } from "baseui/modal";
import { Datepicker } from "baseui/datepicker";
import { Button, KIND } from "baseui/button";
import { Input } from "baseui/input";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required").max(50),
  phone: Yup.string().max(20),
  email: Yup.string().email().max(50),
});
export const EditTimeSlot = (props) => {
  return (
    <Modal onClose={props.handleClose} isOpen={props.isOpen} size={1000}>
      <ModalHeader>Edit TimeSlot</ModalHeader>
      <Formik
        initialValues={{
          name: "",
          phone: "",
          email: "",
          startDateTime: new Date(props.data.startDateTime),
          endDateTime: new Date(props.data.endDateTime),
        }}
        validationSchema={SignupSchema}
        onSubmit={undefined}
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
                    disabled={props.viewOnly}
                  ></Input>
                </FormControl>
              </Col>
              <Col>
                <FormControl
                  label="Phone"
                  error={touched.phone ? errors.phone : null}
                >
                  <Input
                    error={errors.phone && touched.phone}
                    name="room"
                    type="text"
                    onChange={handleChange}
                    value={value.phone}
                    placeholder={"Enter Phone"}
                    disabled={props.viewOnly}
                  ></Input>
                </FormControl>
              </Col>
              <Col>
                <FormControl
                  label="Email"
                  error={touched.email ? errors.email : null}
                >
                  <Input
                    error={errors.email && touched.email}
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={value.email}
                    placeholder={"Enter Email"}
                    disabled={props.viewOnly}
                  ></Input>
                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormControl
                  label="Start Time"
                  error={touched.startDateTime ? errors.startDateTime : null}
                >
                  <Datepicker
                    formatString="MM/dd/yyyy HH:mm"
                    onChange={({ time, date }) => {}}
                    onBlur={handleBlur}
                    value={value.startDateTime}
                    timeSelectStart
                    disabled={props.viewOnly}
                  ></Datepicker>
                </FormControl>
              </Col>
              <Col>
                <FormControl
                  label="End Time"
                  error={touched.endDateTime ? errors.endDateTime : null}
                >
                  <Datepicker
                    formatString="MM/dd/yyyy HH:mm"
                    onChange={({ time, date }) => {}}
                    onBlur={handleBlur}
                    value={value.endDateTime}
                    timeSelectStart
                    disabled={props.viewOnly}
                  ></Datepicker>
                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col></Col>
              <Col></Col>
            </Row>
            <ModalFooter>
              <Button
                style={{ margin: "0px 10px" }}
                type="button"
                onClick={props.handleClose}
                kind={KIND.primary}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit} kind={KIND.primary}>
                Save
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
